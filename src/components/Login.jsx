import { useState,useEffect } from "react"
// import { useLogin } from '../hooks/useLogin';
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { LOGIN,LOGOUT } from "../store.cjs";

const Login = () => {

const userinfo=useSelector((state)=>{
  // console.log('info is',state)
  return state.user
})

  const dispatch=useDispatch();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const {login,error,loading}=useLogin()

  useEffect(()=>{
    let user=JSON.parse(localStorage.getItem('user'))
    if(user){
      dispatch(LOGIN(user))
    }
    console.log('userinfo',userinfo)
  })

  const handleLogout =async(e)=>{

  localStorage.removeItem('user')
  dispatch(LOGOUT())
}

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('something')
    
    const response=await axios.post("http://localhost:3000/login",{email,password})
    localStorage.setItem('user',JSON.stringify(response.data))
    console.log(response.data)
    
    dispatch(LOGIN(response.data))
    // await login(email,password)
    console.log(userinfo)

  }

  return (
    <>
    <h2>hi</h2>
     <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>
      
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <button>Log in</button>
    
      {/* {error && <div className="error">{error}</div>} */}
    </form>
    <button onClick={handleLogout}>logout</button>
    </>
   
  )
}

export default Login