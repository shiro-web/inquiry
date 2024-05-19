import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

const SendMessage = () => {
    const { id } = useParams();
    const [message,setMessage] = useState();
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
        });
    },[])

    const sendMessage = async(e) => {
        e.preventDefault();
        const collectionRef = collection(db, "users",id,"messages");
        await addDoc(collectionRef, {
            text:message,
            createdAt:serverTimestamp(),
      });
      setMessage("")
    }

  return (
    <div className='bg-slate-300 h-screen w-96 m-auto'>
        <h1 className='text-3xl mb-8 '>{name && name}さん</h1>
        {datas && datas.map((data) => (
            <div className='p-4'>
                <p className={data.role ? 'bg-white rounded-md w-40 mr-auto p-4' : 'bg-green-400 rounded-md w-40 ml-auto p-4'}>{data.text}</p>              
            </div>
        ))}
        <form onSubmit={sendMessage} className='text-center'>
            <input 
                type="text"
                placeholder='メッセージを入力してください。'
                onChange={(e) =>setMessage(e.target.value) }
                value={message}
            />
            <input className='bg-blue-500 w-20 m-auto rounded-md p-2 text-white' type="submit" value={"送信"} />
        </form>
    </div>
  )
}

export default SendMessage