import React, { useState } from 'react'
import axios from 'axios'
import {useSignUp} from '../hooks/useSignUp'
export default function SignUp() {

const[name,setName]=useState("");
const [pwd,setPwd]=useState("");
const {signup, error, isLoading} = useSignUp();
    function handleName(e){
        // console.log(e.target.value);
        setName(e.target.value);
    }
   

   async function handleSubmit(){
      //  let response=await axios.post('http://localhost:3000/signup',{email:name,password:pwd})
      //  console.log(response.data)
       await signup(name, pwd)
    }

  return (
    <>
    <h1>Sign Up Page</h1>
    <label>Username</label>
    <input onChange={handleName} value={name}/>
    <label>Password</label>
    <input onChange={(e)=>setPwd(e.target.value)} value={pwd} />


    <button onClick={handleSubmit}>Sign Up</button>
    </>
  )
}
