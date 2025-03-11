from flask import Flask 
from config.db import db, get_database_uri
from routes.user_routes import user_routes
from routes.auth_routes import auth_routes

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = get_database_uri()
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

app.register_blueprint(auth_routes, url_prefix='/auth')
app.register_blueprint(user_routes, url_prefix='/users')

@app.route('/ping')
def ping():
  return 'Server is running'

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=5000, debug=True)