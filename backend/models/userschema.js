const mongoose=require('mongoose');
const plm=require('passport-local-mongoose');
const user_schema=new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Post'
  }],
  profile: {
    type:String,
  },
  fullname:{
     type:String,
  },
  email: {
        type:String,
        required: true
  }
})
user_schema.plugin(plm);
module.exports=mongoose.model('User',user_schema);