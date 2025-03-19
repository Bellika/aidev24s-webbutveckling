import React, { useState } from "react"
import { getCharacter } from "../services/characterApi"
import { useCharacter } from "../context/CharacterContext"
import { useNavigate } from "react-router-dom"

export default function NewGame() {
  const { setSelectedCharacter } = useCharacter()
  const [character, setCharacter] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [characterName, setCharacterName] = useState('')
  const navigate = useNavigate()

  const fetchCharacter = async () => {
    if (!characterName) return 

    setLoading(true)
    setError(null)

    try {
      const data = await getCharacter({name: characterName})
      setCharacter(data)
      setSelectedCharacter(data)
      navigate('/game')
    } catch (error) {
      setError(error, 'Could not fetch character')
    } finally {
      setLoading(false)
    }
  }

  const handleSearchClick = () => {
    fetchCharacter()
  }

  return (
    <div>
      <div>
      <input
          type="text"
          placeholder="Search character by name"
          value={characterName}
          onChange={(e) => setCharacterName(e.target.value)}
        />
        <button onClick={handleSearchClick}>Search</button>
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