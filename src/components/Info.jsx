import { useState ,useEffect} from 'react'
import UserBox from './UserBox'

import axios from 'axios'
export default function Info() {

  
  const [users, setUsers] = useState(['name'])
  const[edit,setEdit]=useState(false);
  const [newUser,setnewUser]=useState("sai");
  const[newPassword,setnewPassword]=useState("1234")

  async function addUser() {
    try {
      const response = await axios.post('http://localhost:3000/users', { "email": newUser, "password": newPassword });
      console.log('response received is-:', response.data);
    } catch (error) {
      console.error('There was an error adding the user:', error);
    }
  }

  function  fetchUsers(){
    axios.get('http://localhost:3000/users')
      .then(res => {
        setUsers(res.data);
        console.log(res.data); // log the fetched data directly
      })
      .catch(err => {
        console.error('Error fetching users:', err);
      });
}

async function handleEdit(inp,id){

  let res=users.map((v)=>{if(v._id!==id){ return v} else{
    
    return inp} })
   setUsers(res)
   try{
    const res=await axios.post("http://localhost:3000/update",{"id":id,"email":inp.email})
    console.log('resonse is-:',res)
    }
    
    catch(e){
    console.log(e)
    }
  
}




function deleteUser(id){
  axios.delete(`http://localhost:3000/users/${id}`)
  .then(res => {
    console.log('deleted',res.data);
    setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
  })
  .catch(err => {
    console.error('Error deleting user:', err);
  });
}
function updateUser(){
  console.log(sabal)

}

function handleChange(e){

let inptText=e.target.value;
// set()

}


  return (
    <>

<h2>Add user</h2>
<label>username</label>  <input onChange={(e)=>{

setnewUser(e.target.value)
}}/>

<label>password</label><input  onChange={(e)=>{

setnewPassword(e.target.value)
}} />
<button onClick={addUser}>add user</button>
     <h2>Below are the list of itmes in database</h2>
     <button onClick={fetchUsers}>Fetch Users</button>
<UserBox users={users} handleEdit={handleEdit}/>

    


    </>
  )
}

