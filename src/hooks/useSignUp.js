import { useState } from "react";
import axios from 'axios'
import { useAuthContext } from "../hooks/AuthHooks";
import { useContext } from "react"
// const {dispatch}=useContext(useAuthContext)

export const  useSignUp=()=>{
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState(null)
    const {dispatch} = useAuthContext()

    const signup=async (name,pwd)=>{
        setLoading(true)
        console.log(name)
        console.log(pwd)
        const response=await axios.post('http://localhost:3000/signup',{email:name,password:pwd})
        // const json=await response.json()

        if(!response.ok){
            setLoading(false)
            setError(response.error)
        }
// console.log(response.data)
        //save user to localStorage
        localStorage.setItem('user',JSON.stringify(response.data))

        dispatch({type:'LOGIN',payload:response.data})
        setLoading(false);
    }
return{signup,error,loading};
}