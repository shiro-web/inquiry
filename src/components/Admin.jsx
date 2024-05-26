import React, { useContext, useEffect, useState } from 'react';
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import AppContext from '../context/Context';

const Admin = () => {
    const navigate = useNavigate();
    const [datas,setDatas] = useState();
    const {user} = useContext(AppContext)

    const auth = getAuth();
    const logOut = () => {
        signOut(auth).then(() => {
      // Sign-out successful.
      localStorage.removeItem('user');
      navigate('/')
    }).catch((error) => {
      // An error happened.
    });
}


useEffect(() => {
    if(user){
        navigate("/admin")
    }
},[user])

    useEffect(() => {
        if(user){
            onSnapshot(collection(db, "users"), (querySnapshot) => {
                const userDatas = querySnapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    };
                });
                setDatas(userDatas);
            });
        }else{
            navigate(`/`)
        }
    },[user])
    
    console.log(user)

  return (
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
}

export default Admin