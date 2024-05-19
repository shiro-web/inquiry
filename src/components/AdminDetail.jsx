import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { db } from '../firebase';

const AdminDetail = () => {
    const { id } = useParams();
    const [datas,setDatas] = useState();
    const [name,setName] = useState();
    const [message,setMessage] = useState();
    const [situation,setSituation] = useState();
    

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

    const sendMessage = async(e) => {
        e.preventDefault();
        const collectionRef = collection(db, "users",id,"messages");
        await addDoc(collectionRef, {
            text:message,
            role:"admin",
            createdAt:serverTimestamp(),
      });
      setMessage("")
    }

    useEffect(() => {
        onSnapshot(doc(db, "users",id), (doc) => {
            const newSituation = doc.data().situation;
            setSituation(newSituation);
            console.log(newSituation)
        });
    },[])

    const startSupport = async() => {
        await updateDoc(doc(db, "users",id), {
            situation: "processing"
          });
    }

    const returnUnsupport = async() => {
        await updateDoc(doc(db, "users",id), {
            situation: "backlog"
          });
    }

    const completionSupport = async() => {
        await updateDoc(doc(db, "users",id), {
            situation: "completion"
          });
    }

  return (
    <div className='bg-gray-200 w-96 m-auto pt-4 relative flex flex-col h-screen'>
            <div className='mb-4'>
                {
                    situation === 'backlog' ? (<p className='text-red-600 font-bold text-center'>未対応</p>) :
                    situation === 'processing' ? (<p className='text-yellow-600 font-bold text-center'>対応中</p>) :
                    situation === 'completion' ? (<p className='text-green-600 font-bold text-center'>完了</p>) : ''
                }
            </div>
        <div className='flex justify-center align-middle gap-2 mb-8 '>
            <button onClick={startSupport} className='bg-blue-400 p-1 rounded-md text-white'>対応開始</button>
            <button onClick={returnUnsupport} className='bg-red-400 p-1 rounded-md text-white'>未対応に戻す</button>
            <button onClick={completionSupport} className='bg-green-400 p-1 rounded-md text-white'>完了</button>
        </div>
        <h1 className='text-3xl text-center'>チャットの内容</h1>
            <div className='flex-grow overflow-y-auto p-4'>
                {datas && datas.map((data) => (
                    <div className=''>
                        <p  className={data.role ? 'bg-green-400 rounded-md w-40 ml-auto p-4' : 'bg-white rounded-md w-40 mr-auto p-4'}>{data.text}</p>
                    </div>
                ))}
            </div>
            <form onSubmit={sendMessage} className='text-center w-full '>
                <input
                    className='p-2 w-3/4 focus:outlinie-none' 
                    type="text"
                    placeholder='メッセージを入力してください。'
                    onChange={(e) =>setMessage(e.target.value) }
                    value={message}
                    readOnly = {situation === "backlog"}
                />
                <input className='bg-blue-500 w-1/4 p-2 text-white' type="submit" value={"送信"} />
                {situation === "backlog"
                ? 
            (<p className='text-center'>チャットをするには、対応開始ボタンを押してください。</p>)
                :
            ""
            }
            </form>  
        </div>
  )
}

export default AdminDetail