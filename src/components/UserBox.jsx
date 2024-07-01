import React, { useState } from 'react'


export default function UserBox({handleEdit,handleDelete,users}) {
  return (
    <ul>

{users.map((user,idx)=>
(
  <li><Row user ={user} id={idx} handleDelete={handleDelete} handleEdit={handleEdit}  /></li>


) )}

    </ul>
  )
}

function Row({user,id,handleDelete,handleEdit}){

const[editable,isEditable]=useState(false);
let Content;

if (editable) {
    Content = (
      <>
        <input
          value={user.email}
          onChange={(event) => handleEdit({ ...user, email: event.target.value },user._id)}
        />
         <button>Delete</button>
         <button onClick={()=>{isEditable(false)}}>Update</button>
      </>
    );
  }
  else{
    Content=(
        <>{user.email}
        
        <button>Delete</button>
        <button onClick={()=>{isEditable(true)}}>Edit</button>
        </>
    )
}
return Content;
}




