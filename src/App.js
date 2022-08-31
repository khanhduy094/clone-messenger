import logo from "./logo.svg";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./page/Login/Login";
import Home from "./page/Home/Home";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    
    </div>
  );
}

export default App;
