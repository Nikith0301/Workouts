import React from 'react'
import { useDispatch, useSelector } from "react-redux";


import { decrement } from '../store.cjs'

export default function CompB() {
    let dispatch = useDispatch();
    


  return (
    <button onClick={()=>dispatch(decrement(3))}>-</button>
  )
}
