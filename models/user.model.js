const mongoose=require('mongoose');

/**
 * name
 * user id
 * password 
 * userType
 * email
 */
const userSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    userId:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true,
        lowarcase:true,
        minLength:true,
        unique:true
    },
    userType:{
        type:String,
        required:true,
        default:"ADMIN",
        enum:["CUSTOMER","ADMIN"]
    }
},{timestamps:true,versionKey:false})

module.exports=mongoose.model("User",userSchema);