const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://rk2505152:user123@cluster0.xvscmpg.mongodb.net/pinterest');
var connection=mongoose.connection
connection.on('error',()=>{
          console.log("mongo db connection is failed");
      })
connection.on('connected',()=>{
    console.log("mongo db connection is succesfull");
});
module.exports=mongoose;