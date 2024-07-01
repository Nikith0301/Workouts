import { useState, useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import axios from 'axios'
import Info from "./components/Info";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import WorkDetails from "./components/WorkDetails";
import WorkoutForm from "./components/WorkoutForm";
import CompA from "./components/CompA";
import CompB from "./components/CompB";
import { setWorkout } from "./store.cjs";

// import Home from "./components/Home";
function App() {
  // const [workouts, setWorks] = useState();
  let dispatch=useDispatch()
  let workouts=useSelector((state)=>state.workout)
  const fetchWorkouts = async () => {
   
    let  user = localStorage.getItem('user');
    user=JSON.parse(user);
    if(!user){
      console.log('you must be logged in ')
      return 
    }
    console.log('getting',user.token)
    // Make the Axios request with the token in the Authorization header
    const response = await axios.get('http://localhost:3000/workouts/', {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    // const json = await response.json()

    if (response) {
      // dispatch({type: 'SET_WORKOUTS', payload: json})
      // console.log('done',response)
      // setWorks(response.data)
      dispatch(setWorkout(response.data))
      console.log("The state is",workouts)
    }
    else{
      console.log('not got')
    }
  }

  const handleDelete = async (e) => {
    let user=localStorage.getItem('user')
    user=JSON.parse(user)
    let workout_id=e.target.value
    const response = await axios.delete('http://localhost:3000/workouts/'+workout_id, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    });
    // const response = await axios.get('http://localhost:3000/workouts/')
    console.log(e.target.value)
    // console.log(response.data)
    const f=workouts.filter((work)=>(work._id!==e.target.value))
    // console.log(f)
    
    if (response) {
     
      console.log(f)
      // setWorks(f)
      dispatch(setWorkout(f))
    }
  }

 
  let count = useSelector((state) => state.counter.count);
  // useEffect(()=>fetchWorkouts(),[])

  return (
    <>
      <BrowserRouter>
      {/* <NavBar/> */}
        <Routes>
          <Route path="/" element={<Info />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
       <button onClick={fetchWorkouts} >Fetch FRom DB</button>
       <div className="container " >
<div className="row"> 
<div className="col"> 
  {workouts && workouts.map((workout) => (
  <WorkDetails key={workout._id} workout={workout} handleDelete={handleDelete}/>

))}
</div>

<div className="col"> <WorkoutForm  /></div>
</div>

</div>
     
   {/* <CompA/>{count}<CompB/> */}
     
    </>
  );
}

export default App;
