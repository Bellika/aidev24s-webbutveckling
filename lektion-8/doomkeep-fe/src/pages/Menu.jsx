import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/Menu.module.css'

const Menu = () => {

  return (
    <div className={styles.container}>
      <h1>DOOMKEEP</h1>
      <nav className={styles.mainMenu}>
        <Link to='new-game'>New Game</Link>
        <Link to='create-character'>Create Character</Link>
      </nav>
    </div>
  )
}

export default Menu