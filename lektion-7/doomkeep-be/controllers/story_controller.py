import json

def load_story():
    try:
        with open("story.json", "r", encoding="utf-8") as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return {}

def save_story(new_message):
    story_data = load_story()
    story_data["story"].append(new_message)  
    
    with open("story.json", "w", encoding="utf-8") as f:
        json.dump(story_data, f, indent=4, ensure_ascii=False)

def delete_story(new_message):
    with open("story.json", "w", encoding="utf-8") as f:
        json.dump(new_message, f, indent=4, ensure_ascii=False)
