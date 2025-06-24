from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector
from pydantic import BaseModel
import os

class User(BaseModel):
    email: str
    password: str
    first_name: str | None = None
    last_name: str | None = None
    birth_date: str | None = None
    city: str | None = None
    postal_code: str | None = None

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    return mysql.connector.connect(
        host=os.getenv("MYSQL_HOST"),
        user=os.getenv("MYSQL_USER"),
        password=os.getenv("MYSQL_ROOT_PASSWORD"),
        database=os.getenv("MYSQL_DATABASE")
    )

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
        query = "SELECT id, email, is_admin FROM users" if not admin else "SELECT * FROM users"
        cursor.execute(query)
        users = cursor.fetchall()
        return {"users": users}
    finally:
        cursor.close()
        conn.close()

@app.delete("/users/{user_id}")
async def delete_user(user_id: int, admin_email: str, admin_password: str):
    conn = get_db()
    cursor = conn.cursor()
    try:
        cursor.execute("""
            SELECT is_admin FROM users 
            WHERE email = %s AND password = %s
        """, (admin_email, admin_password))
        result = cursor.fetchone()
        
        if not result or not result[0]:
            raise HTTPException(status_code=403, detail="Not authorized")
            
        cursor.execute("DELETE FROM users WHERE id = %s", (user_id,))
        conn.commit()
        return {"message": "User deleted successfully"}
    finally:
        cursor.close()
        conn.close()