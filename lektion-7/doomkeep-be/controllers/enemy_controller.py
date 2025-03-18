from models.Enemy import Enemy, db 
import os
import openai 
from dotenv import load_dotenv

load_dotenv() 

openai.api_key = os.getenv('OPENAI_API_KEY')

def create_enemy(data):
  enemy_type = data['enemy_type']
  stats = {
    "Skeleton": {"strength": 8, "agility": 6, "intelligence": 2, "defence": 4, "health": 85},
    "Ghoul": {"strength": 9, "agility": 6, "intelligence": 3, "defence": 3, "health": 110},
    "Vampire": {"strength": 10, "agility": 9, "intelligence": 8, "defence": 6, "health": 140},
    "Knight": {"strength": 12, "agility": 5, "intelligence": 5, "defence": 10, "health": 130},
    "Spirit": {"strength": 7, "agility": 10, "intelligence": 9, "defence": 2, "health": 75},
    "Abomination": {"strength": 13, "agility": 2, "intelligence": 1, "defence": 12, "health": 160},
    "Sorcerer": {"strength": 5, "agility": 4, "intelligence": 15, "defence": 3, "health": 100},
  }

  if enemy_type not in stats:
    return None, 'Invalid enemy type'
  
  stats = stats[enemy_type]
  image_url = generate_image(data['name'], enemy_type)

  new_enemy = Enemy(
    name=data['name'],
    enemy_type=enemy_type,
    health=stats['health'],
    strength=stats['strength'],
    agility=stats['agility'],
    intelligence=stats['intelligence'],
    image_url=image_url
  )

  db.session.add(new_enemy)
  db.session.commit()

  return new_enemy, None

def generate_image(name, enemy_type):
  response = openai.images.generate(
    model="dall-e-3",
    prompt=f"Make an image of this type of npc for a videogame: {enemy_type}, the name of this one is {name}, the setting is dark-fantasy. The image should only be of the character. Make it in the style of a 90s videogame. There should be no text in the image",
    size="1024x1024",
    quality="standard",
    n=1,
  )
  print(response.data[0].url)
  return response.data[0].url