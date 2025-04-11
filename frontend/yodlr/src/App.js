import './App.css';
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SignupForm from './components/Auth/signup';
import AdminDashBoard from "./components/AdminPage/admin"
import AppNavbar from './components/NavBar/NavBar';
import ThankYou from './components/Auth/ThankYou';
import HomePage from './components/HomePage/HomePage';
import AdminSignUP from "./components/AdminPage/AdminSignup"
import Login from "./components/AdminPage/Login";
import PrivateRoute from "./components/common/PrivateRoute";


function App() {

  const [currAdmin, setCurrAdmin] = useState(() => {
    const stored = localStorage.getItem("currentAdmin");
    return stored ? JSON.parse(stored) : null;
  });

  const handleLogout = function () {
    setCurrAdmin(null);
    localStorage.removeItem("currAdmin");
  }
  return (

    <div className='App'>
      <AppNavbar currAdmin={currAdmin} logout={handleLogout} />
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<Login setCurrAdmin={setCurrAdmin} />} />
        <Route path="/admin" element={<AdminSignUP />} />
        <Route path="/thank-you" element={<ThankYou />} />

        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute currAdmin={currAdmin}>
              <AdminDashBoard />
            </PrivateRoute>
          }
        />

      </Routes>
    </div>

  );
}

export default App;


