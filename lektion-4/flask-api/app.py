from flask import Flask
from routes.user_routes import user_routes
from routes.view_routes import view_routes

app = Flask(__name__, template_folder='templates')

app.register_blueprint(view_routes)
app.register_blueprint(user_routes, url_prefix='/users')

@app.route('/ping')
def ping():
  return 'Server is running'

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=5000, debug=True)
