from flask import Blueprint, render_template

view_routes = Blueprint('view_routes', __name__)

@view_routes.route('/')
def home():
  return render_template('index.html')

@view_routes.route('/create-user')
def create_user():
  return render_template('create-user.html')