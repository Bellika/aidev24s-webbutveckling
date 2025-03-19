import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Menu from "./pages/Menu"
import CreateCharacter from "./pages/CreateCharacter"
import NewGame from './pages/NewGame'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Menu />}/>
          <Route path="/new-game" element={<NewGame />}/>
          <Route path="/create-character" element={<CreateCharacter />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App