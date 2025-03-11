from flask import Blueprint, jsonify, request
from controllers.user_controller import get_all_users, create_user, get_user_by_id_or_username

user_routes = Blueprint('user_routes', __name__)

@user_routes.route('/', methods=['GET'])
def get_users():
  users = get_all_users()
  return jsonify({'users': users}), 200

@user_routes.route('/', methods=['POST'])
def post_user():
    
  data = request.get_json()

  if not data or 'username' not in data or 'password' not in data:
    return jsonify({'error': 'Missing username or password'}), 400  
  
  new_user, error = create_user(data['username'], data['password'])
  
  if error:
        return jsonify({'error': error}), 400  

  return jsonify({'message': 'User created successfully', 'user': new_user}), 201 

@user_routes.route('/search', methods=['GET'])
def search_user():
  user_id = request.args.get('id')
  username = request.args.get('username')

  user_data, error = get_user_by_id_or_username(user_id=user_id, username=username)

  if error:
    return jsonify({'error': error}), 404
  else:
    return jsonify({'user': user_data}), 200