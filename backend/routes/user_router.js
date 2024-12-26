const express= require('express');
const router=express.Router();
const usermodel=require('../models/userschema');

router.get('/users',async function(req,res,next){
  let user_data=await usermodel.create({
    username: "ranjeet",
    password: "singh",
    posts: [],
    fullname:"ranjeet Kumar",
    email: "rk2505152@gmail.com"
  })
  res.send(user_data);
})

module.exports=router;