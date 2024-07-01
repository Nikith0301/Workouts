// this takes model and connects to mongoDB


// const { findOneAndDelete } = require('../models/User.cjs')
const Workout=require('../models/WorkOutModel.cjs')

const mongoose= require ('mongoose')

const getWorks =async(req,res)=>{

    const user_id=req.user._id

    const works=await Workout.find({user_id}).sort({createdAt: -1})

    res.status(200).json(works)

}

const getWork =async(req,res)=>{

    const {id}=req.params;
    console.log("finding by id")
    const work=await Workout.findById(id);
    if (!work) {
        return res.status(404).json({error: 'No such workout'})
      }
      
      res.status(200).json(work)
}


const createWork=async(req,res)=>{
 const user_id=req.user._id
   const{title,reps,load}= req.body;

   let emptyFields = []

   if(!title) {
     emptyFields.push('title')
   }
   if(!load) {
     emptyFields.push('load')
   }
   if(!reps) {
     emptyFields.push('reps')
   }
   if(emptyFields.length > 0) {
     return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
   }

   try{
    const work=await Workout.create({title,reps,load,user_id})
    res.status(200).json(work)
   }
   catch(error){
    console.log("error while creating doc in db")
res.status(400).json({error:error.message})
   }




}

const deleteWork=async(req,res)=>{

    const{id}=req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
      }
    const work=await Workout.findOneAndDelete({_id:id})
    
    if(!work){
        res.status(404).json({error: 'No such workout to delete '})
        
    }
    res.status(200).json(work)
   

}


const updateWork=async(req,res)=>{
const {id}=req.params;

if (!mongoose.Types.ObjectId.isValid(id)) {
  return res.status(404).json({error: 'No such workout'})
}
  const doc=await Workout.findOneAndUpdate({_id:id},{...req.body})

  if(!doc){
    res.status(404).json({error:"No such id found in db"})
  }
  res.status(200).json(doc)
}

module.exports ={createWork,deleteWork,getWork,getWorks,updateWork}