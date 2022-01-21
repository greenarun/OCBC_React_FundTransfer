import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './Modules/Home/Home'
import Login from './Modules/Login/Login'
import Register from './Modules/Register/Register'
import './App.css';

const App = () => {
  const [loggedIn, setloggedIn] = useState(false);
  const [token, setToken] = useState()
  const [name, setName] = useState('')
  function callbackFunction(childData) {
    setloggedIn(childData);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={loggedIn ? <Home token={token} name={name} /> : <Login parentCallback={callbackFunction} setToken={setToken} setName={setName} />} />
        <Route path="/home" element={loggedIn ? <Home token={token} name={name} /> : <Navigate replace to="/" />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
