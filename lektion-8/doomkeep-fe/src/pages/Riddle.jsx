import React, { useEffect, useState } from "react";
import { getRiddle } from "../services/riddleApi";  // Importera API-anropet
import { useCharacter } from "../context/CharacterContext"; // Använd context för att få karaktärens data

const Riddle = () => {
  const { character } = useCharacter(); // Hämta karaktärens data från contexten
  const [riddleData, setRiddleData] = useState(null); // Håller reda på riddeln och intro
  const [loading, setLoading] = useState(true); // För att visa laddningsstatus
  const [error, setError] = useState(null); // För att visa eventuella fel

  useEffect(() => {
    if (!character || !character.name || !character.class_type) {
      setError("Character data is missing.");
      setLoading(false);
      return; // Avbryt om karaktärens data inte finns
    }

    const fetchRiddle = async () => {
      try {
        // Gör API-anrop för att hämta riddeln
        const data = await getRiddle({ name: character.name, classType: character.class_type });

        // Om anropet lyckas, sätt riddle-data
        setRiddleData(data);
      } catch (error) {
        // Om något går fel, sätt felmeddelande
        setError("Failed to fetch riddle.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRiddle(); // Kör fetchRiddle vid render
  }, [character]); // Kör om character ändras

  return (
    <div>
      <h1>Riddle Encounter</h1>

      {/* Visa laddningsindikator */}
      {loading && <p>Loading riddle...</p>}

      {/* Visa felmeddelande om något gick fel */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Visa riddeln om den finns */}
      {riddleData && (
        <div>
          <p>{riddleData.intro}</p>
          <p><strong>Riddle:</strong> {riddleData.riddle}</p>
          {/* Här kan du lägga till interaktivitet för att svara på riddeln */}
        </div>
      )}
    </div>
  );
};

export default Riddle;
