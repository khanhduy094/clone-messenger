import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { useApp } from "./context/AppContext";
import Home from "./page/Home/Home";
import Login from "./page/Login/Login";

function App() {

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />}  />
      </Routes>
    
    </div>
  );
}

export default App;
