import React, { useEffect, useState } from 'react';
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const Admin = () => {
    const navigate = useNavigate();
    const [datas,setDatas] = useState();

    const auth = getAuth();
    const logOut = () => {
        signOut(auth).then(() => {
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
    
    console.log(datas)

  return (
    <div>
        <h1>管理画面</h1>
        <p onClick={logOut}>ログアウト</p>
        <div className='grid grid-cols-2 w-96'>
            {
                datas && datas.map((data,index) => (
                    <Link to={`/admin/${data.id}`} key={data.id} className='border p-4'>
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