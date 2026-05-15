const User = require('../models/user')

async function handleGetAllUsers (req,res) {
    const allUser = await User.find({});
     return res.json({allUser})
}

async function handleGetUserById(req,res) {
    const id= (req.params.id);

     const isValid=mongoose.isValidObjectId(id)
     if (!isValid) {
          return res.status(404).json({
               message: "Invalid id"
          })
     }
     const user= await User.findById(id)

     return user?res.status(200).json({user}):res.status(404).json({
          message: "User not found"
     })
}

module.exports={
    handleGetAllUsers,
    handleGetUserById,
}