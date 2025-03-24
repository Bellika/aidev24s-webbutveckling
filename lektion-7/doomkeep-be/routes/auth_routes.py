from flask import Blueprint, jsonify, request, make_response
from controllers.auth_controller import authenticate_user, verify_jwt

auth_routes = Blueprint('auth', __name__)

@auth_routes.route('/login', methods=['POST'])
def login():
  data = request.get_json()

  if not data or 'username' not in data or 'password' not in data: 
    return jsonify({'error': 'Missing username or password'}), 400
  
  token, error = authenticate_user(data['username'], data['password'])

  if error:
    return jsonify({'error': error}), 401
  
  response = make_response(jsonify({'message': 'Login successful'}))
  response.set_cookie('token', token, httponly=True, samesite='Lax')

  return response, 200

@auth_routes.route('/logout', methods=['POST'])
def logout():
  response = make_response(jsonify({'message': 'Logged out'}))
  response.set_cookie('token', '', expires=0)
  return response, 200

@auth_routes.route('/me', methods=['GET'])
def get_current_user():
  user, error = verify_jwt()

  if error:
    return jsonify({'error': error}), 401
  
  return jsonify({'user': user}), 200