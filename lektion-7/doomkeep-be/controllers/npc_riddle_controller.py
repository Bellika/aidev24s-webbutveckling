from flask import Flask, session
import os
import openai 
from dotenv import load_dotenv
from controllers.story_controller import load_story, save_story

load_dotenv() 

openai.api_key = os.getenv('OPENAI_API_KEY')

import openai

def generate_npc_and_riddle(character_name, class_type):

    story_data = load_story()
    previous_story = story_data.get('story', [])

    story_so_far = "\n".join(previous_story) if previous_story else "This is the first encounter with an NPC."

    prompt = f"""
        Play the role of a NPC for a fantasy game and answer like you're speaking directly to the player. 
        The setting of the game is a cursed, dark fortress that has appeared in a forest. 
        The player must enter this fortress to defeat the evil within. We are inside the fortress. 
        The player's name is {character_name} and is a {class_type}.

        The NPC could be a monster, human, or any other fantasy creature.
        The NPC should explain the riddle clearly.

        **Important:** The 'story so far' should include all prior interactions with previous NPCs in the game world, 
        including any riddles the player has solved or any important events that have occurred in the story. 

        Story so far:
        {story_so_far}

        Now, continue the adventure by presenting a new riddle or event that pushes the narrative forward. 

        Provide the riddle and its correct answer in this format:

        **Riddle:** [riddle text]  
        **Answer:** [correct answer] 

        Don't write anything after the answer.
    """
    
    response = openai.chat.completions.create(
        model='gpt-4o',
        messages=[
      {'role': 'system', 'content': "You are a NPC"},
      {'role': 'user', 'content': prompt},
    ],
    temperature=0.8
    ) 
    
    return response.choices[0].message.content.strip()


def summon_npc_riddle(data):
    npc_message = generate_npc_and_riddle(data['name'], data['class_type'])

    print(npc_message)
    
    try:
        parts = npc_message.split("**Riddle:**")
        intro_text = parts[0].strip() if len(parts) > 1 else ""

        riddle_parts = parts[1].split("**Answer:**") if len(parts) > 1 else ["", ""]
        riddle_text = riddle_parts[0].strip()
        correct_answer = riddle_parts[1].split("\n")[0].strip().lower() if len(riddle_parts) > 1 else ""

        session['correct_answer'] = correct_answer

        save_story(npc_message)

        return {
            "success": True,
            "intro": intro_text,
            "riddle": riddle_text,
            "correct_answer": correct_answer
        }
    
    except IndexError:
        return {"success": False, "message": "Error generating riddle."}


