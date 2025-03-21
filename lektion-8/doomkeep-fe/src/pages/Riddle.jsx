import React, { useEffect, useState } from "react";
import { getRiddle } from "../services/riddleApi"; 
import { useCharacter } from "../context/CharacterContext"; 

const Riddle = () => {
  const { character } = useCharacter(); 
  const [riddleData, setRiddleData] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    if (!character || !character.name || !character.class_type) {
      setError("Character data is missing.");
      setLoading(false);
      return; 
    }

    const fetchRiddle = async () => {
      try {
        const data = await getRiddle({ name: character.name, classType: character.class_type });
        
        setRiddleData(data);
      } catch (error) {
        setError("Failed to fetch riddle.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRiddle(); 
  }, [character]); 

  return (
    <div>
      <h1>Riddle Encounter</h1>


      {loading && <p>Loading riddle...</p>}


      {error && <p style={{ color: "red" }}>{error}</p>}

      {riddleData && (
        <div>
          <p>{riddleData.intro}</p>
          <p><strong>Riddle:</strong> {riddleData.riddle}</p>

        </div>
      )}
    </div>
  );
};

export default Riddle;
