import jwt 
import datetime 
from flask import jsonify, request
from models.User import User
from werkzeug.security import check_password_hash

SECRET_KEY = 'secret-key' # Denna nyckel sparar ni som en ENV. 

def generate_jwt(user):
  payload = {
    'id': user.id,
    'username': user.username,
    'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
  }
  token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
  return token

def authenticate_user(username, password):
  user = User.query.filter_by(username=username).first()

  if not user:
    return None, 'User not found'
  
  if not check_password_hash(user.password_hash, password):
    return None, 'Incorrect password'
  
  token = generate_jwt(user)

  return token, None

def verify_jwt():
  token = request.cookies.get('token')

  if not token:
    return None, 'Missing token'
  
  try:
    payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
    return {'id': payload['id'],  'username': payload['username']}, None
  except jwt.ExpiredSignatureError:
    return None, 'Token expired'
  except jwt.InvalidTokenError:
    return None, 'Invalid token'