const express=require('express');
const router = express.Router();
const User=require("../models/user")


const {handleGetAllUsers,handleGetUserById}= require('../controllers/user')

router.get("/",handleGetAllUsers)

// router.get("/users",async(req,res)=>{
//      const allUser = await User.find({});
//      const html = 
//      `
//      <ul>
//           ${allUser.map((user)=>`<li>${user.firstName}</li>`).join("")}
//      </ul>
//      `;
//      res.send(html)
// })

router.get("/:id",handleGetUserById)

router.post("/api/users",async(req,res)=>{
     const body=req.body;
     console.log(body);
     if (!body||!body.email||!body.first_name||!body.country) {
          return res.status(400).json({message:"Please fill the required fields"})
     }
     const result = await User.create({
          firstName:body.first_name,
          lastName:body.last_name,
          email:body.email,
          gender:body.gender,
          country:body.country
     })

     return res.status(201).json({result})
     
})

router.patch("/api/users/:id",async(req,res)=>{
     console.log(req.params.id);
     
     const id = (req.params.id);
     const isValid=mongoose.isValidObjectId(id)
     if (!isValid) {
          return res.status(404).json({
               message: "Invalid id"
          })
     }

     const user=await User.findByIdAndUpdate(id,{lastName:"Shaikh"})

     if(!user){
          return res.status(404).json({
               message: "User not found"
          })
     }

     return res.status(200).json({user})
     
})

router.delete("/api/users/:id",async(req,res)=>{
     const id = (req.params.id);
     const user =await User.findByIdAndDelete(id)

     return user?res.json({success:true}):res.json({success:false})



})

module.exports=router;