import { useEffect, useRef, useState } from 'react';
import './App.css';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Contact from './components/Contact';
import Home from './components/Home';
import Login from './components/Login';
import Admin from './components/Admin';
import AdminDetail from './components/AdminDetail';
import { useDispatch } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { login } from './redux/actions.jsx';

function App() {
  const dispatch = useDispatch();
  const auth = getAuth();

  useEffect(() => {
    // アプリケーションが初期化される際にFirebaseの認証状態を確認し、Reduxの状態を更新する
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // ログイン状態をReduxの状態に反映
        dispatch(login(user));
      }
    });

    return () => unsubscribe();
  }, [auth, dispatch]);
  
  return (
    <Router>
      <Routes>
        <Route>
          <Route path="/" element={<Home />} />
          <Route path="/contact/:id" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} isAuthenticated={true} />
          <Route path="/admin/:id" element={<AdminDetail />} isAuthenticated={true} />
        </Route>
      </Routes>
  </Router>
  );
}

export default App;
