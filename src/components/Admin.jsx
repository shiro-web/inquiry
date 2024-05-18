import React from 'react';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const navigate = useNavigate();

    const auth = getAuth();
    const logOut = () => {
        signOut(auth).then(() => {
      // Sign-out successful.
      navigate('/')
    }).catch((error) => {
      // An error happened.
    });
    }
  return (
    <div>
        <h1>管理画面</h1>
        <p onClick={logOut}>ログアウト</p>
    </div>
  )
}

export default Admin