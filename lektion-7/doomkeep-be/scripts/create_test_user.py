from app import create_app
from config.db import db
from models.User import User
from werkzeug.security import generate_password_hash

app = create_app()
app.app_context().push() 

test_user = User(
    username="testuser",
    password=generate_password_hash("password")  
)

db.session.add(test_user)
db.session.commit()

print("Test user created successfully!")
