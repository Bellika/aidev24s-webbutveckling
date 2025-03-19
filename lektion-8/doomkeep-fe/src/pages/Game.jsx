import React from "react";
import { useCharacter } from "../context/CharacterContext";
import { useNavigate } from "react-router-dom"

const Game = () => {
    const { character } = useCharacter(); // Hämta karaktären från Context
    const navigate = useNavigate()

    if (!character) {
        return <div>Please select a character first!</div>; // Om ingen karaktär finns, visa meddelande
    }

    const startRiddle = () => {
        // Navigera till Riddle-sidan. Eftersom vi nu använder contexten, behöver vi inte skicka namn och klass via URL.
        navigate("/riddle");
      };

    return (
        <div>
            <h1>Game Start!</h1>
            <button onClick={startRiddle}>Continue</button>
            <h2>Your Character: {character.name}</h2>
            <p><strong>Class:</strong> {character.class_type}</p>
            <p><strong>Health:</strong> {character.health}</p>
            <p><strong>Strength:</strong> {character.strength}</p>
        </div>
    );
}

export default Game