import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CharacterSheet from '../components/CharacterSheet'

const Menu = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <div>
      <nav>
        <p>Hej</p>
        <Link to='/create-character'></Link>
      </nav>
      <button onClick={() => setIsSheetOpen(true)}>Show Character</button>

      <CharacterSheet
        characterId={1}
        characterName={"Markus"}
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
      />
    </div>
  )
}

export default Menu