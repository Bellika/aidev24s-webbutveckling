from models.User import User 
from werkzeug.security import check_password_hash

def authenticate_user(username, password):
  user = User.query.filter_by(username=username).first()

  if not user:
    return None, 'User not found'
  
  if not check_password_hash(user.password_hash, password):
    return None, 'Incorrect password'
  
  return {'id': user.id, 'username': user.username}, None