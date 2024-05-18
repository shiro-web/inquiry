import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

const SendMessage = () => {
    const { id } = useParams();
    const [message,setMessage] = useState();
    const [datas,setDatas] = useState();

    useEffect(() => {
        const q = query(collection(db, "users",id,"messages"),orderBy("createdAt"));
        const unsub = onSnapshot(q, (querySnapshot) => {
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
    }

  return (
    <div>
        {datas && datas.map((data) => (
            <p>{data.text}</p>
        ))}
        <form onSubmit={sendMessage}>
            <input 
                type="text"
                placeholder='メッセージを入力してください。'
                onChange={(e) =>setMessage(e.target.value) }
            />
            <input className='bg-blue-500 w-20 m-auto rounded-md p-2 text-white' type="button" value={"送信"} />
        </form>
    </div>
  )
}

export default SendMessage