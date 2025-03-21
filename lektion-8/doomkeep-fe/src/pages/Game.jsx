import React from "react";
import { useCharacter } from "../context/CharacterContext";
import { useNavigate } from "react-router-dom"

const Game = () => {
    const { character } = useCharacter(); 
    const navigate = useNavigate()

    if (!character) {
        return <div>Please select a character first!</div>; 
    }

    const startRiddle = () => {
        navigate("/riddle");
      };

    return (
        <div>
            <h1>Game Start!</h1>
            <button onClick={startRiddle}>Continue</button>
            <h2>Your Character: {character.name}</h2>
            {character.image_url && <img src={character.image_url} alt="Character" style={{ width: "200px", borderRadius: "8px" }} />}
            <p><strong>Class:</strong> {character.class_type}</p>
            <p><strong>Health:</strong> {character.health}</p>
            <p><strong>Strength:</strong> {character.strength}</p>
        </div>
    );
}

export default Game