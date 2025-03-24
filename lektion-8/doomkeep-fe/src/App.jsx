import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { CharacterProvider } from "./context/CharacterContext"
import Menu from "./pages/Menu"
import CreateCharacter from "./pages/CreateCharacter"
import NewGame from './pages/NewGame'
import Game from "./pages/Game"
import Riddle from "./pages/Riddle"
import Login from "./pages/Login"

function App() {

  return (
    <>
      <CharacterProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/new-game" element={<NewGame />} />
            <Route path="/create-character" element={<CreateCharacter />} />
            <Route path="/game" element={<Game />} />
            <Route path="/riddle" element={<Riddle />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </CharacterProvider>
    </>
  )
}

export default App