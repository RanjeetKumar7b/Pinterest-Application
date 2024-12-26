const express= require('express');
const router=express.Router();
const postmodel=require('../models/postschema');
const usermodel = require('../models/userschema');

router.get('/posts',async function(req,res,next){
  let post_data=await postmodel.create({
    postText: "hello my post",
    users: "6592d5f99ddc9b739af0deb5"
  })
  let user_id=await usermodel.findOne({_id:"6592d5f99ddc9b739af0deb5"});
  user_id.posts.push(post_data._id);
  await user_id.save();
  res.send("done");
})
router.get('/getallpost',async function(req,res,next){
         let userfff= await usermodel
         .findOne({_id:"6592d5f99ddc9b739af0deb5"})
         .populate('posts')
         res.send(userfff);                    
})

module.exports=router;