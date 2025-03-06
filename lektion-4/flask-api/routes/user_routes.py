from flask import Blueprint, jsonify, request
from controllers.user_controller import get_all_users, get_user_by_id, create_user, update_user, delete_user

user_routes = Blueprint('user_routes', __name__)

@user_routes.route('/', methods=['GET'])
def get_users():
  return jsonify(get_all_users())

@user_routes.route('/<int:user_id>', methods=['GET'])
def get_user(user_id):
  user = get_user_by_id(user_id)
  if user:
    return jsonify(user)
  return jsonify({'error': 'User not found'}), 404

@user_routes.route('/', methods=['POST'])
def add_user():
  data = request.get_json()
  if not data or 'username' not in data or 'password' not in data:
    return jsonify({'error': 'Missing data'}), 400
  new_user = create_user(data['username'], data['password'])
  return jsonify(new_user), 201

@user_routes.route('/<int:user_id>', methods=['PUT'])
def edit_user(user_id):
  data = request.get_json()
  if not data:
    return jsonify({'error': 'Missing data'}), 400
  
  updated_user = update_user(user_id, data.get('username'), data.get('password'))
  if update_user: 
    return jsonify(updated_user)
  return jsonify({'error': 'User not found'}), 404

@user_routes.route('/<int:user_id>', methods=['DELETE'])
def remove_user(user_id):
  if delete_user(user_id):
    return jsonify({'message': 'User deleted'})
  return jsonify({'error': 'User not found'}), 404
