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
import RouteComponents from './routes/routes.js';

function App() {
 
  
  return (
    <Router>
      <Routes>
        {RouteComponents}
      </Routes>
  </Router>
  );
}

export default App;
