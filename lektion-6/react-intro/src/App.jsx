import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Header from "./components/Header"
import Users from "./pages/Users"
import CreateUser from "./pages/CreateUser"

function App() {

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/users" element={<Users />}/>
          <Route path="/create-user" element={<CreateUser />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
