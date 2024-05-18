import { useRef, useState } from 'react';
import './App.css';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Contact from './components/Contact';
import Home from './components/Home';
import Login from './components/Login';
import Admin from './components/Admin';
import AdminDetail from './components/AdminDetail';

function App() {
 
  
  return (
    <Router>
    <div className="w-80 m-auto pt-10">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/contact/:id" element={<Contact />} />
        <Route path="/login/" element={<Login />} />
        <Route path="/admin/" element={<Admin />} />
        <Route path="/admin/:id" element={<AdminDetail />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
