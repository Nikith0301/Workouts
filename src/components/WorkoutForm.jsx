import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { createWork } from "../store.cjs";

const WorkoutForm = ({ }) => {
 
 
  const [title, setTitle] = useState('')
  const [load, setLoad] = useState(0)
  const [reps, setReps] = useState(0)
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([]) 
  const workout = {title, load, reps} 
  let dispatch=useDispatch();
  let workouts=useSelector((state)=>state.workout)

const addWorkout = async () => {
  console.log(workout)
  let user=localStorage.getItem('user');

user=JSON.parse(user);
if(!user){
  console.log('you must be logged in ')
  return 
}
const resp = await axios.post('http://localhost:3000/workouts/', workout, {
  headers: {
    Authorization: `Bearer ${user.token}`
  }
});


    if(resp){
      dispatch(createWork(resp.data))
    }
    else{
      console.log('update failed')
    }
  
};

  // const{title,load,reps,handleSubmit}=props;

  // const handleSubmit = async (e) => {
  //   e.preventDefault()

  //   const workout = {title, load, reps}

  //   const response = await axios.post('http://localhost:3000/workouts/', {workout  }
  //   )
  //   const json = await response.json()

  //   if (!response) {
  //     setError(json.error)
  //     setEmptyFields(json.emptyFields)
  //   }
  //   if (response) {
  //     setTitle('')
  //     setLoad('')
  //     setReps('')
  //     setError(null)
  //     setEmptyFields([])
  //     console.log('new workout added', json)
  //     // dispatch({type: 'CREATE_WORKOUT', payload: json})
  //   }
  // }

  return (
    <div className="row" >
      <h3>Add a New Workout</h3>

      <label>Excersize Title:</label>
      <input 
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Load (in kg):</label>
      <input 
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes('load') ? 'error' : ''}
      />

      <label>Reps:</label>
      <input 
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes('reps') ? 'error' : ''}
      />

      <button onClick={addWorkout} >Add Workout</button>
      {error && <div className="error">{error}</div>}
    </div>
  )
}

export default WorkoutForm