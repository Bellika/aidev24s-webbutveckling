from flask import Blueprint, request, jsonify
from controllers.character_controller import create_character, get_character_by_id_or_name

character_routes = Blueprint('character_routes', __name__)

@character_routes.route('/get-character', methods=['GET'])
def get_character():
   character_id = request.args.get('id')
   name = request.args.get('name')

   character_data, error = get_character_by_id_or_name(character_id=character_id, name=name)

   if error:
    return jsonify({'error': error}), 404
   else:
    return jsonify({'user': character_data}), 200

@character_routes.route('/create-character', methods=['POST'])
def create_character_route():

  data = request.get_json()

  new_char, error = create_character(data)
  if error:
      return jsonify({"error": error}), 400
  return jsonify({
      "message": "Character created!",
      "character_id": new_char.id,
      "name": new_char.name,
      "health": new_char.health,
      "class_type": new_char.class_type,
      "strength": new_char.strength,
      "agility": new_char.agility,
      "intelligence": new_char.intelligence,
      "backstory": new_char.backstory,
      "image_url": new_char.image_url
  }), 201