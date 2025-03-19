import React from "react";
import { useCharacter } from "../context/CharacterContext"; // Hämta karaktär från Context

const Game = () => {
    const { character } = useCharacter(); // Hämta karaktären från Context

    if (!character) {
        return <div>Please select a character first!</div>; // Om ingen karaktär finns, visa meddelande
    }

    return (
        <div>
            <h1>Game Started!</h1>
            <h2>Your Character: {character.name}</h2>
            <p><strong>Class:</strong> {character.class_type}</p>
            <p><strong>Health:</strong> {character.health}</p>
            <p><strong>Strength:</strong> {character.strength}</p>
            {/* Här kan du visa spelets innehåll */}
        </div>
    );
}

export default Game