import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { db } from '../firebase';

const AdminDetail = () => {
    const { id } = useParams();
    const [datas,setDatas] = useState();
    const [name,setName] = useState();
    useEffect(() => {
        onSnapshot(doc(db, "users",id), (querySnapshot) => {
            const userName = (querySnapshot.data().name)
            setName(userName)
        });
    },[])
    
    useEffect(() => {
        const q = query(collection(db, "users",id,"messages"),orderBy("createdAt"));
         onSnapshot(q, (querySnapshot) => {
            const newDatas = querySnapshot.docs.map((doc) => doc.data());
            setDatas(newDatas);
            console.log(newDatas)
        });
    },[])

  return (
    <div>
        <h1 className='text-3xl mb-8'>チャットの内容</h1>
        {datas && datas.map((data) => (
            <div>
                <p>{data.text}</p>
            </div>
        ))}
    </div>
  )
}

export default AdminDetail