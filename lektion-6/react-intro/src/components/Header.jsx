import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header>
      <h1>AIDEV</h1>
      <nav>
        <Link to='/'>Home</Link>
        <br></br>
        <Link to='/about'>About</Link>
        <br></br>
        <Link to='/users'>Users</Link>
        <br></br>
        <Link to='/create-user'>Create User</Link>
      </nav>
    </header>    
  )
}

export default Header