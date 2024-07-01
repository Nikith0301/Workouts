import axios from 'axios'

const WorkDetails = (props) => {
 
const {workout,handleDelete}=props;
const key=workout._id;
   
  
    return (
     
      <div className="card"  key={workout._id}>

  <div className="card-body">
    <h5 className="card-title">{workout.title}</h5>
    <p className="card-text">Load: {workout.load}</p>
    <p className="card-text">Reps: {workout.reps}</p>
    <button value={key} onClick={(e)=>handleDelete(e) }>delete</button>
  </div>
</div>
    )
  }
  
  export default WorkDetails