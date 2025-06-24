from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector
from typing import Optional
from pydantic import BaseModel
import os
from dotenv import load_dotenv

load_dotenv()

class User(BaseModel):
    email: str
    password: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    birth_date: Optional[str] = None
    city: Optional[str] = None
    postal_code: Optional[str] = None

class AdminCredentials(BaseModel):
    email: str
    password: str

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    try:
        return mysql.connector.connect(
            host=os.getenv("MYSQL_HOST"),
            user=os.getenv("MYSQL_USER"),
            password=os.getenv("MYSQL_ROOT_PASSWORD"),
            database=os.getenv("MYSQL_DATABASE"),
            port=int(os.getenv("MYSQL_PORT", "3306"))
        )
    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Database connection failed: {err}")

@app.post("/admin/login")
async def admin_login(credentials: AdminCredentials):
    conn = get_db()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("""
            SELECT * FROM users
            WHERE email = %s AND password = %s AND is_admin = TRUE
        """, (credentials.email, credentials.password))
        user = cursor.fetchone()
        if user:
            return {"success": True}
        raise HTTPException(status_code=401, detail="Invalid credentials")
    finally:
        cursor.close()
        conn.close()

@app.post("/users")
async def create_user(user: User):
    conn = get_db()
    cursor = conn.cursor()
    try:
        cursor.execute("""
            INSERT INTO users (email, password, first_name, last_name, birth_date, city, postal_code)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """, (user.email, user.password, user.first_name, user.last_name,
              user.birth_date, user.city, user.postal_code))
        conn.commit()
        return {"message": "User created successfully"}
    except mysql.connector.Error as err:
        raise HTTPException(status_code=400, detail=str(err))
    finally:
        cursor.close()
        conn.close()

@app.get("/users")
async def get_users(admin: bool = False):
    conn = get_db()
    cursor = conn.cursor(dictionary=True)
    try:
        query = "SELECT id, email FROM users WHERE is_admin = FALSE" if not admin else "SELECT * FROM users"
        cursor.execute(query)
        users = cursor.fetchall()
        return {"users": users}
    finally:
        cursor.close()
        conn.close()

@app.delete("/users/{user_id}")
async def delete_user(user_id: int, credentials: AdminCredentials):
    conn = get_db()
    cursor = conn.cursor(dictionary=True)
    try:
        # Verify admin credentials
        cursor.execute("""
            SELECT * FROM users
            WHERE email = %s AND password = %s AND is_admin = TRUE
        """, (credentials.email, credentials.password))
        admin = cursor.fetchone()
        if not admin:
            raise HTTPException(status_code=401, detail="Invalid admin credentials")

        # Delete user
        cursor.execute("DELETE FROM users WHERE id = %s", (user_id,))
        conn.commit()
        return {"message": "User deleted successfully"}
    finally:
        cursor.close()
        conn.close()

@app.delete("/users/{user_id}")
async def delete_user(user_id: int, credentials: AdminCredentials):
    conn = get_db()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("""
            SELECT * FROM users
            WHERE email = %s AND password = %s AND is_admin = TRUE
        """, (credentials.email, credentials.password))
        admin = cursor.fetchone()
        if not admin:
            raise HTTPException(status_code=401, detail="Invalid admin credentials")

        cursor.execute("DELETE FROM users WHERE id = %s", (user_id,))
        conn.commit()
        return {"message": "User deleted successfully"}
    finally:
        cursor.close()
        conn.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)