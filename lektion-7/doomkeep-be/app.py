from flask import Flask, session, jsonify
from flask_cors import CORS 
from config.db import db, get_database_uri
from routes.character_routes import character_routes
from routes.enemy_routes import enemy_routes
from routes.npc_riddle_routes import npc_riddle_routes
from routes.user_routes import user_routes
from routes.auth_routes import auth_routes

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.secret_key = 'secret-key'

app.config['SQLALCHEMY_DATABASE_URI'] = get_database_uri()
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(user_routes, url_prefix='/api/user')
app.register_blueprint(character_routes,  url_prefix='/api')
app.register_blueprint(enemy_routes, url_prefix='/api')
app.register_blueprint(npc_riddle_routes, url_prefix='/api')

@app.route('/view-story', methods=['GET'])
def view_story():
    story = session.get('story', '')
    return jsonify({"story": story})

@app.route('/ping')
def ping():
  return 'Server is running'

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=5000, debug=True)