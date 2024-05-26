import React, { useEffect, useState } from 'react';
import { getAuth, signOut } from "firebase/auth";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/reducers';

const Admin = () => {
    const navigate = useNavigate();
    const [datas,setDatas] = useState();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const auth = getAuth();

    const logOut = () => {
        signOut(auth).then(() => {
            dispatch(logout());
            localStorage.removeItem('user');
      // Sign-out successful.
      navigate('/')
    }).catch((error) => {
      // An error happened.
    });
}

    useEffect(() => {
        onSnapshot(collection(db, "users"), (querySnapshot) => {
            const userDatas = querySnapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                };
            });
            setDatas(userDatas);
        });
    },[])
    
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            navigate('/login');
        }
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

  return (
    isAuthenticated ? (
    <div className='p-16'>
        <h1>管理画面</h1>
        <p onClick={logOut}>ログアウト</p>
        <div className='grid grid-cols-4'>
            {
                datas && datas.map((data,index) => (
                    <Link to={`/admin/${data.id}`} key={data.id} className='border p-4'>
                        <p>
                            {
                                data.situation === 'backlog' ? (<p className='text-red-600 font-bold text-center'>未対応</p>) :
                                data.situation === 'processing' ? (<p className='text-yellow-600 font-bold text-center'>対応中</p>) :
                                data.situation === 'completion' ? (<p className='text-green-600 font-bold text-center'>完了</p>) : ''
                            }
                        </p>
                        <p>{index + 1}</p>
                        <p>{data.name}</p>
                        <p>{data.mail}</p>
                        <p>{data.tel}</p>
                        <p>{data.type}</p>
                        <p>{data.content}</p>
                    </Link>
                ))
            }
        </div>
    </div>
    ) 
    :
    <Navigate to="/login" />
  )
}

export default Admin