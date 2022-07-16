import Userheader from './components/userheader'
import UserLogin from './components/userLogin';
import {useState} from 'react';
import Image from 'next/image'
import { setCookie,getCookie } from 'cookies-next';
import axios from 'axios'
import {useRouter} from 'next/router'
import Checkprice from './components/checkprice';

function Home({islogin}) {
  
  const[loginmodal,setLoginModal]=useState(false) ;
  const[checkmodal,setCheckModal] = useState(false) ;
  const[email,setEmail] = useState('') ;
  const[password,setPassword] = useState('') ;
  const router=useRouter();

  const handleLogin=(e) =>{
    e.preventDefault();
    const data={email: email, password: password};
    axios.post('https://exchange123.herokuapp.com/user/auth/login',data)
    .then((res)=>{
     if(res.data.msg){
      window.alert(res.data.msg)
    }else{
      setCookie('user-token',res.data.token);
      router.reload();
     }
     
    }).catch((err)=>{
      console.log(err)
      window.alert("something went wrong");
    })
    
  }
  const handleRegister=(e) =>{
    e.preventDefault();
    const data={email: email, password: password};
    axios.post('https://exchange123.herokuapp.com/user/auth/register',data)
    .then((res)=>{
      if(res.data.msg){
        window.alert(res.data.msg)
      }else{
        setCookie('user-token',res.data.token);
        router.reload();
       }
    }).catch((err)=>{
      window.alert("something went wrong");
    })
  }

  const openExchange=() =>{
    if(!islogin){
      setLoginModal(true);
    }
    else{
      setCheckModal(true)
    }
  }

  return (
    <div >
      <Userheader open={setLoginModal} islogin={islogin}/>
      {
        loginmodal&&<UserLogin 
        close={setLoginModal} 
        email={email} 
        password={password} 
        setEmail={setEmail}
        setPassword={setPassword}
        login={handleLogin} 
        register={handleRegister} />
      }
      {
        checkmodal&&<Checkprice
        close={setCheckModal}/>
      }
      <div className="flex flex-col justify-center items-center md:flex-row gap-4">
        <Image height={500} width={500} src={'/heroimg.png'}/>
        <div className="flex flex-col justify-center items-center gap-3">
          <h1 className="text-2xl uppercase space-x-4 tracking-wide">Mobile Exchange Offer</h1>
        <h1>Bring Your OLD phone and get NEW one</h1>
        <button onClick={openExchange} type="button" className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Exchange now</button>
        </div>
    
        
      </div>
      
    </div>
  )
}

export async function getServerSideProps(ctx) {
  let islogin=false;
  if(getCookie('user-token',ctx)){
    const res= await axios.get('https://exchange123.herokuapp.com/user/auth/verify',{
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": getCookie('user-token',ctx),
    },
  })
  islogin=res.data.islogin;
  return {
    props: {islogin: islogin}, 
  }

}else{
  islogin=false;
  return {
    props: {islogin: islogin}, 
  }
}

  
}


export default Home;
