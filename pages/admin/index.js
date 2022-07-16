import { setCookie,getCookie } from 'cookies-next';
import {useState} from 'react';
import axios from 'axios';
import {useRouter} from 'next/router'

function Admin() {
  const[email,setEmail] = useState('') ;
  const[password,setPassword] = useState('') ;
  const router=useRouter();

  const handleLogin=(e) =>{
    e.preventDefault();
    const data={email: email, password: password};
    console.log(data);
    axios.post('https://exchange123.herokuapp.com/admin/auth/login',data)
    .then((res)=>{
     if(res.data.msg){
      window.alert(res.data.msg)
    }else{
      setCookie('admin-token',res.data.token);
      router.reload();
     }
     
    }).catch((err)=>{
      window.alert("something went wrong");
    })
    
  }

  return (
    <div className="grid place-items-center h-screen">
      
  <form className=" shadow-lg rounded px-8 pt-6 pb-8  bg-blue-400 " onSubmit={handleLogin}>
  <h1 className="uppercase text-2xl text-center text-white">Admin login</h1>
    <div className="mb-4">
      <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
        Username
      </label>
      <input value={email} onChange={(e)=>setEmail(e.target.value)}required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline" id="username" type="email" placeholder="Email(admin@gmail.com)"></input>
    </div>
    <div className="mb-6">
      <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
        Password
      </label>
      <input value={password} onChange={(e)=>setPassword(e.target.value)} required className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="password(admin)"></input>
    </div>
    <div className="flex items-center justify-between">
      <button className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Sign In
      </button>
      
    </div>
  </form>
</div>
  )
}

export async function getServerSideProps(ctx) {

  if(getCookie('admin-token',ctx)){
    const res= await axios.get('https://exchange123.herokuapp.com/admin/auth/verify',{
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": getCookie('admin-token',ctx),
    },
  })
  if(res.data.islogin){
    return {
    redirect: {
      permanent: false,
      destination: "/admin/dashboard"
    }
  }}else{
    return {
      props:{}
    }
  }
  

}else{
  return {
    props:{}
  }
}

  
}

export default Admin