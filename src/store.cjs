import { configureStore, createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const state = [
  {
    _id: "01",
    title: "monry",
    load: 0,
    reps: 0,
  },
];

const counterState = {
  count: 0,
};

const userState={
    // email:"",
    token:""
}

const userSlice = createSlice({
  name: "user",
  initialState: userState,
  reducers: {
    LOGIN:(state,action)=>{
        state.email=action.payload.email
        state.token=action.payload.token
        // console.log(state)
    },
    LOGOUT:(state,action)=>{
        state=null
        console.log(state)
    }
  },
});

const workoutSlice = createSlice({
  name: "workout",
  initialState: state,
  reducers: {
    createWork: (state, action) => {
      console.log([
        action.payload._id,
        action.payload.title,
        action.payload.reps,
      ]);
      state.push([
        action.payload._id,
        action.payload.title,
        action.payload.reps,
      ]);
    },
    setWorkout: (state, action) => {
      console.log("store.cjs", action.payload);
      return (state = action.payload);
    },
  },
});

const counterSlice = createSlice({
  name: "counter",
  initialState: counterState,
  reducers: {
    increment: (state, action) => {
      state.count = state.count + 1;
    },
    decrement: (state, action) => {
      state.count = state.count - action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    workout: workoutSlice.reducer,
    counter: counterSlice.reducer,
    user:userSlice.reducer
  },
});
export default store;
export const { createWork, setWorkout } = workoutSlice.actions;
export const { increment, decrement } = counterSlice.actions;
export const {LOGIN,LOGOUT} = userSlice.actions;
