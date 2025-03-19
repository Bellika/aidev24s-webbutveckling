import React, { useEffect, useState } from "react"
import { getCharacter } from "../services/characterApi"

export default function CharacterSheet({ characterId, characterName, isOpen, onClose }) {
  const [character, setCharacter] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (isOpen) {
      fetchCharacter()
    }
  })

  const fetchCharacter = async () => {
    if (!characterId && !characterName) return 

    setLoading(true)
    setError(null)

    try {
      const data = await getCharacter({ id: characterId, name: characterName})
      setCharacter(data)
    } catch (error) {
      setError(error, 'Could not fetch character')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div>
      <div>
        <button onClick={onClose}>X</button>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {character && (
          <>
            <h2>{character.name}</h2>
            <p><strong>Class:</strong> {character.class_type}</p>
            <p><strong>Health:</strong> {character.health}</p>
            <p><strong>Strenght:</strong> {character.strength}</p>
            <p><strong>Agility:</strong> {character.agility}</p>
            <p><strong>Intelligence:</strong> {character.intelligence}</p>
            <p><strong>Backstory:</strong></p>
            <p>{character.backstory}</p>
            {character.image_url && <img src={character.image_url} alt="Character" style={{ width: "200px", borderRadius: "8px" }} />}
          </>
        )}
      </div>
    </div>
  )
}