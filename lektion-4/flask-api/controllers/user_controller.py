import json
from models.user_model import User

USERS_FILE = 'users.json'

def read_users():
  try: 
    with open(USERS_FILE, 'r') as file:
      return json.load(file)
  except FileNotFoundError:
    return []
  
def write_users(users):
  with open(USERS_FILE, 'w') as file:
    json.dump(users, file, indent=4)
  
def get_all_users():
  users = read_users()
  return [User(**user).to_dict() for user in users]

def get_user_by_id(user_id):
  users = read_users()
  for user in users:
    if user['id'] == user_id:
      return User(**user).to_dict()
  return None

def create_user(username, password):
  users = read_users()
  new_user = User(id=len(users) + 1, username=username, password=password)
  users.append(new_user.to_dict())
  write_users(users)
  return new_user.to_dict()

def update_user(user_id, username:None, password=None):
  users = read_users()
  for user in users:
    if user['id'] == user_id:
      if username:
        user['username'] = username
      if password:
        user['password'] = password
      write_users(users)
      return user
  return None

def delete_user(user_id):
  users = read_users()
  new_users = [user for user in users if user["id"] != user_id]
  if len(new_users) == len(users):
    return None
  write_users(new_users)
  return True