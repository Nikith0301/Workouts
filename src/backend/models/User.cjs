const mongoose = require('mongoose');
const bcrypt=require('bcrypt')
const { isEmail } = require('validator');



const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  }
});

// userSchema.pre('save',async function(next){

//   const salt=await bcrypt.genSalt()
//   this.password=await bcrypt.hash(this.password,salt);
//   next();

// })


// userSchema.statics.login=async function(email,password){

//   const user=User.findOne({email})//{ email } is shorthand for { email: email }, which creates an object where the key is email and the value is the variable email.

//   if(user){
//     const auth = await  bcrypt.compare(password,user.password)
//     if(auth){
//       console.log('coreect password')
//       return user
//     }
//     throw Error("incorrect password")
//   }
//   throw Error("incorrect email")
// }

userSchema.statics.signup= async function(email,password){
  let exists=await this.findOne({email});
  if(exists){
    throw Error("UnserName already there")
  }

  const salt=await bcrypt.genSalt(10);
  const hash=await bcrypt.hash(password,salt);

  const user=this.create({email,password:hash})
  return user
}


userSchema.statics.login= async function(email,password){

  // try{
    if(!email ||!password){
     throw Error("all fileds must be filler") 
    }

    const user=await User.findOne({email});
    if (!user){
      throw Error('Incorrect email')
    }

    const match=await bcrypt.compare(password,user.password)
    if(!match){
      throw Error('Incorrect password')
    }
    return user

  // }
}



const User = mongoose.model('user', userSchema);// this is the collection or tablename name in database

module.exports = User; 