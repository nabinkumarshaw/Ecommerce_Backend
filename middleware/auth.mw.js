
/**
 * create a middleware check if the request body is correct
 */
const user_model=require('../models/user.model')
const jwt=require('jsonwebtoken')
const auth_config=require('../configs/auth.config')

const verifySignup= async(req,res,next)=>{
    try{
        //check for the name if nioot present
        if(!req.body.name){
            return res.status(400).send({
                message:"Failed! name field is not provided"
            })
        }

        //check for the email if not present
        if(!req.body.email){
            return res.status(400).send({
                message:"Failed! Email field is not provided"
            })
        }

        //check for the userid if not present
        if(!req.body.userId){
            return res.status(400).send({
                message:"Failed! userid field is not provided"
            })
        }

        //check for the user with the same user id present
        const user=user_model.findOne({userId: req.body.user})
        if(user){
            return res.status(400).send({
                message:"Failed! user was already present"
            })
        }
        next()    // passing the value to operate the result
    }
    catch(err){
        console.log("error while validating signup" ,err);
        res.status(500).send({
            message:"error while validating"
        })
    }
}


const verifySignin =async(req,res,next)=>{

    if(!req.body.userId){
        return res.status(400).send({
            message: "userId is not provided"
        })
    }

    if(!req.body.password){
        return res.status(400).send({
            message: "password is not provided"
        })
    }

    next();
}

const verifyToken = (req,res,next)=>{
    //check if the token is present in the header
        const token=req.headers['x-access-token']  //[if in the header]
        if(!token){
            return res.status(403).send({
                message:"No token found : Unauthorized"
            })
        }

    //if it's the valid token
        jwt.verify(token,auth_config.secret, async (err,decoded) =>{
            if(err){
                return res.status(401).send({
                    message:"Unauthorized !"
                })
            }
            const user=await user_model.findOne({userId :decoded.id})
            if(!user){
                return res.status(400).send({
                    message:"Unauthorized ,this user for this token doesn't exist"
                })
            }
            //set the user info in the request body
            req.user=user;
             //move to the next step
            next();
        }) 
}

const isAdmin=(req,res,next)=>{
    const user=req.user
    if(user && user.userType =="ADMIN"){
        next()
    }
    else{
        res.status(400).send({
            message: "only admin usersare allowed to post here!"
        })
    }
}

module.exports={
    verifySignup:verifySignup,
    verifySignin:verifySignin,
    verifyToken:verifyToken,
    isAdmin:isAdmin
}