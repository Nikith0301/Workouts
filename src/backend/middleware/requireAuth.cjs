const jwt=require('jsonwebtoken')
const User=require('../models/User.cjs')
const requireAuth=async (req,res,next)=>{
    //verify authentication before givind control/user data
    const {authorization}=req.headers //destructure authorization from headers

    if(!authorization){
        return res.status(404).json({error:"authorization token required"})


    }

    const token=authorization.split(' ')[1]

    try{
    const {_id}=jwt.verify(token,'serectfurushima')
        //req.abc
    req.user=await User.findOne({_id}).select('_id')
    next()
    }
    catch(e){
        console.log(e)
        return res.status(404).json({error:"authorization not verified"})
    }

}

module.exports=requireAuth