import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import NoteState from "./Context/Notes/noteState";
import Alert from "./Components/Alert";
import Login from "./Components/Login";
import Signup from "./Components/Signup";

function App() {

   return (
    <NoteState>
      <Router>
        <Navbar />
        <Alert/>
        <div className="container">
        <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route exact path="/About" element={<About />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/signup" element={<Signup />}></Route>
        </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
