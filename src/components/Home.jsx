import React from 'react';
import { useRef, useState } from 'react';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const nameRef = useRef();
    const [name,setName] = useState();
    const mailRef = useRef();
    const [mail,setMail] = useState();
    const telRef = useRef();
    const [tel,setTel] = useState();
    const typeRef = useRef();
    const [type,setType] = useState();
    const contentRef = useRef();
    const [content,setContent] = useState();
    const navigate = useNavigate()
  
    const onSubmit = async() =>{
      const nameValue = nameRef.current.value
      setName(nameValue)
  
      const mailValue = mailRef.current.value
      setMail(mailValue)
  
      const telValue = telRef.current.value
      setTel(telValue)
  
      const typeValue = typeRef.current.value
      setType(typeValue)
  
      const contentValue = contentRef.current.value
      setContent(contentValue)
  
      console.log(nameValue + "/" + mailValue + "/" + telValue + "/" + typeValue + "/" + contentValue);
      const collectionRef = collection(db, "users");
      const docRef = await addDoc(collectionRef, {
        name: nameValue,
        mail: mailValue,
        tel: telValue,
        content: contentValue,
      });
      console.log(docRef.id)
      console.log("保存されました");
      navigate(`/contact/`)
    }
  return (
    <div>
        <h1 className='text-3xl'>お問い合わせフォーム</h1>
        <form className='flex flex-col gap-4'>
            <div className='flex gap-2'>
                <label htmlFor="name">お名前</label>
                <input className='border' id='name' type="text" ref={nameRef} />
            </div>
            <div className='flex gap-2'>
                <label htmlFor="mail">メールアドレス</label>
                <input className='border' id='mail' type="email" ref={mailRef} />
            </div>
            <div className='flex gap-2'>
                <label htmlFor="tel">電話番号</label>
                <input className='border' id='tel' type="tel" ref={telRef} />
            </div>
            <div className='flex gap-2'>
                <label htmlFor="type">製品種別</label>
                <select name="type" id="" className='border' ref={typeRef}>
                    <option value="A001">A001</option>
                    <option value="A002">A002</option>
                    <option value="A003">A003</option>
                    <option value="A004">A004</option>
                    <option value="A005">A005</option>
                    <option value="A006">A006</option>
                    <option value="A007">A007</option>
                    <option value="A008">A008</option>
                    <option value="A009">A009</option>
                    <option value="A0010">A0010</option>
                    <option value="A0011">A0011</option>
                    <option value="A0012">A0012</option>
                    <option value="A0013">A0013</option>
                    <option value="A0014">A0014</option>
                    <option value="A0015">A0015</option>
                    <option value="A0016">A0016</option>
                </select>
            </div>
            <div className='flex flex-col'>
                <label htmlFor="content">お問い合わせ内容</label>
                <textarea className='border' name="content" id="content" ref={contentRef}></textarea>
            </div>
            <input onClick={onSubmit} className='bg-blue-500 w-20 m-auto rounded-md p-2 text-white' type="button" value={"送信"} />
        </form>
    </div>
  )
}

export default Home