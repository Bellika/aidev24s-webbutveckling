import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Menu from "./pages/Menu"
import CreateCharacter from "./pages/CreateCharacter"

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Menu />}/>
          <Route path="/create-character" element={<CreateCharacter />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App