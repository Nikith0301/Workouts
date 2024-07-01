import React from 'react'
import { useDispatch, useSelector } from "react-redux";

import { increment } from '../store.cjs';

export default function CompA() {

    let dispatch = useDispatch();

    let count = useSelector((state) => state.counter.count);
    function handleClick(){
        dispatch(increment())
    }

  return (
    <div> 
        <button onClick={()=>handleClick()}>+</button>
    </div>
  )
}
