from flask import Blueprint, request, jsonify
from controllers.enemy_controller import create_enemy

enemy_routes = Blueprint('enemy_routes', __name__)

@enemy_routes.route('/create-enemy', methods=['POST'])
def create_enemy_route():

  data = request.get_json()

  new_enemy, error = create_enemy(data)
  if error: 
    return jsonify({'error': error}), 400
  return jsonify({
    "message": "Enemy created!",
    "character_id": new_enemy.id,
    "name": new_enemy.name,
    "health": new_enemy.health,
    "enemy_type": new_enemy.enemy_type,
    "strength": new_enemy.strength,
    "agility": new_enemy.agility,
    "intelligence": new_enemy.intelligence,
    "image_url": new_enemy.image_url
  })
