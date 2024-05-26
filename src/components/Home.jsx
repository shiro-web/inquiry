import React, { useContext, useEffect } from 'react';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import AppContext from '../context/Context';

const Home = () => {
    const navigate = useNavigate();
    const { register, handleSubmit,formState: { errors } } = useForm();
    const {user} = useContext(AppContext)
    
    const onSubmit = async(data) =>{
      const collectionRef = collection(db, "users");
      const docRef = await addDoc(collectionRef, {
        name: data.name,
        mail: data.mail,
        tel: data.tel,
        type:data.type,
        content: data.content,
        situation:"backlog"
      });
      navigate(`/contact/${docRef.id}`)
    }

    useEffect(() => {
        if(user){
            navigate("/admin")
        }
    },[user])

  return (
    <div className='pt-16 w-96 m-auto'>
        <p>useContext</p>
        <h1 className='text-3xl'>お問い合わせフォーム</h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)} >
            <div className=''>
                <div className='flex gap-2'>
                    <label htmlFor="name">お名前</label>
                    <input {...register("name", { required: "※お名前は必須です。", maxLength: { value: 16, message: "※お名前は16文字以内で入力してください" } })} className='border' id='name' type="text" />                   
                </div>
                {errors.name && <span className='text-sm text-red-600'>{errors.name.message}</span>}
            </div>
            <div>
                <div className='flex gap-2'>
                    <label htmlFor="mail">メールアドレス</label>
                    <input {...register("mail", { required: "※メールアドレスは必須です。", maxLength: { value: 200, message: "※メールアドレスは、200文字以内にしてください" } })} className='border' id='mail' type="email" />
                </div>
                {errors.mail && <span className='text-sm text-red-600'>{errors.mail.message}</span>}
            </div>
            <div>
                <div className='flex gap-2'>
                    <label htmlFor="tel">電話番号</label>
                    <input {...register("tel", { required: "※電話番号は必須です。", maxLength: { value: 12, message: "※電話番号は12文字以内にしてください" } })} className='border' id='tel' type="tel" />
                </div>
                {errors.tel && <span className='text-sm text-red-600'>{errors.tel.message}</span>}
            </div>
            <div>
                <div className='flex gap-2'>
                    <label htmlFor="type">製品種別</label>
                    <select {...register("type", { required: "※製品種別の選択は必須です。"})} name="type" id="" className='border' >
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
                {errors.type && <span className='text-sm text-red-600'>{errors.type.message}</span>}
            </div>
            <div>
                <div className='flex flex-col'>
                    <label htmlFor="content">お問い合わせ内容</label>
                    <textarea {...register("content", { required: "※お問い合わせ内容は必須です。", maxLength: { value: 2000, message: "※お問い合わせ内容は2000文字以内にしてください。" } })} className='border' name="content" id="content" ></textarea>
                </div>
                {errors.content && <span className='text-sm text-red-600'>{errors.content.message}</span>}
            </div>
            <input className='bg-blue-500 w-20 m-auto rounded-md p-2 text-white' type="submit" value={"送信"} />
        </form>
    </div>
  )
}

export default Home