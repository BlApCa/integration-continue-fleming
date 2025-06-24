from fastapi import FastAPI, HTTPException
import mysql.connector

app = FastAPI()

db_config = {
    "host": "db",
    "user": "admin",
    "password": "PvdrTAzTeR247sDnAZBr",
    "database": "app_db"
}

@app.post("/users/")
def create_user(email: str, password: str):
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    cursor.execute("INSERT INTO users (email, password) VALUES (%s, %s)", (email, password))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "User created successfully"}

@app.get("/users/")
def get_users():
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT id, email FROM users WHERE is_admin = FALSE")
    users = cursor.fetchall()
    cursor.close()
    conn.close()
    return users

@app.delete("/users/{user_id}")
def delete_user(user_id: int):
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    cursor.execute("DELETE FROM users WHERE id = %s", (user_id,))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "User deleted successfully"}