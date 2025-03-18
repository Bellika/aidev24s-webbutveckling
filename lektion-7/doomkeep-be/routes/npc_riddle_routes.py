from flask import Blueprint, request, jsonify, session
from controllers.npc_riddle_controller import summon_npc_riddle
from controllers.story_controller import delete_story

npc_riddle_routes = Blueprint('npc_riddle_routes', __name__)

@npc_riddle_routes.route('/generate-riddle', methods=['POST'])
def generate_riddle():
    data = request.get_json()  
    riddle_data = summon_npc_riddle(data)  
    
    if riddle_data['success']:
        return jsonify({
            "message": "Here is your riddle, try to solve it!",
            "intro": riddle_data['intro'],
            "riddle": riddle_data['riddle'],
            "correct_answer": riddle_data['correct_answer']  # Debugging, kan tas bort i prod.
        }), 200
    else:
        return jsonify({
            "message": "Failed to generate riddle.",
            "error": riddle_data['message']
        }), 400

@npc_riddle_routes.route('/check-answer', methods=['POST'])
def check_answer():
    user_answer = request.get_json().get('answer', '').lower()
    
    correct_answer = session.get('correct_answer', '').lower()
    
    if user_answer == correct_answer:
        session.pop('correct_answer', None)
        return jsonify({"message": "Correct! You may proceed."}), 200
    else:
        session.pop('correct_answer', None)
        story_data = {"story": []}
        delete_story(story_data)

        return jsonify({"message": "Incorrect. You have failed. The shadows consume you."}), 400

