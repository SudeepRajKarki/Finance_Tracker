import React from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer"
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import { useState,useEffect } from "react";
import { BrowserRouter as Router,Routes,Route, BrowserRouter, useNavigate} from "react-router-dom";
import Income from "./pages/Income";
import Expense from "./pages/Expense";

function App() {
  const[user,setUser]=useState(null);

  useEffect(()=>{

    const storedUser=JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  },[] );

  return (
    <>
    <div className="flex flex-col min-h-screen">
    <BrowserRouter>
      <Navbar/>
      <main className="flex-grow">
      <Routes>
        <Route path="/dashboard" element={
          <PrivateRoute>
             <Dashboard/>
          </PrivateRoute>
         }/>
          <Route path="/income" element={
          <PrivateRoute>
             <Income/>
          </PrivateRoute>
         }/>
          <Route path="/expense" element={
          <PrivateRoute>
             <Expense/>
          </PrivateRoute>
         }/>
        <Route path="/" element={user ?<Dashboard/> :<Home/>}/>
        <Route path="/login" element={ user ? <Navigate to="/dashboard" replace /> : <Login />}/>
        <Route path="/register" element={ user ? <Navigate to="/dashboard" replace /> : <Register />}/>
        <Route path="*" element={user ? <Navigate to="/dashboard" replace /> : <Navigate to="/" replace /> }/>

      </Routes>
      </main>
      </BrowserRouter>
      <Footer/>
    </div>
    </>
    
  );
}

export default App;
