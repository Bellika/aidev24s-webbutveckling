import React from 'react'
import styles from '../styles/Menu.module.css'
import LinkButton from '../components/LinkButton'

const Menu = () => {

  return (
    <div className={styles.container}>
      <h1>DOOMKEEP</h1>
      <nav className={styles.mainMenu}>
        <LinkButton to="/new-game">New Game</LinkButton>
        <LinkButton to='/create-character'>Create Character</LinkButton>
      </nav>
    </div>
  )
}

export default Menu