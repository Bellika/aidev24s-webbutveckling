import React from 'react'
import styles from '../styles/Menu.module.css'
import LinkButton from '../components/LinkButton'
import Button from '../components/Button'
import { logout } from '../services/authApi'

const Menu = () => {

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout failed', error)
    }
  }

  return (
    <div className={styles.container}>
      <h1>DOOMKEEP</h1>
      <nav className={styles.mainMenu}>
        <LinkButton to="/new-game">New Game</LinkButton>
        <LinkButton to='/create-character'>Create Character</LinkButton>
        <LinkButton to='/login'>Login</LinkButton>
        <Button onClick={handleLogout}>Logout</Button>
      </nav>
    </div>
  )
}

export default Menu