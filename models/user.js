const mongoose=require("mongoose")

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required:true,
        },
        lastName:{
            type: String,
        },
        email:{
            type:String,
            require: true,
            unique: true,
        },
        gender:{
            type:String
        },
        country:{
            type:String
        }
    },{timestamps:true}
)

const User = mongoose.model('user',userSchema);

module.exports=User;