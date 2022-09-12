import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { useApp } from "./context/AppContext";
import { fetchToken, onMessageListener } from "./firebase-app/config";
import Home from "./page/Home/Home";
import Login from "./page/Login/Login";

function App() {
  const [isTokenFound, setTokenFound] = useState(false);
  fetchToken(setTokenFound);

  onMessageListener().then(payload => {
    // setNotification({title: payload.notification.title, body: payload.notification.body})
    // setShow(true);
    console.log(payload);
  }).catch(err => console.log('failed: ', err));

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
