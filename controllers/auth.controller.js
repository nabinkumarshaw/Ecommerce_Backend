/**
 * I need to write the controller / logic to register a user
 */
    const bcrypt=require('bcryptjs')
    const user_model=require('../models/user.model')
    const jwt=require('jsonwebtoken')
    const secret=require('../configs/auth.config')
    exports.signup= async (req,res)=>{
    /**
     * logic to create the user    
     */

    //1)read the reques body
        const request_body=req.body   //this will get me the request body in the form of javascript object

    //2)insert the data in the user collection in mongo db
        const userObj={
            name:request_body.name,
            userId:request_body.userId,
            email:request_body.email,
            userType:request_body.userType,
            password:bcrypt.hashSync(request_body.password,8)
        }

        try{
            const user_created=await user_model.create(userObj);
            /**
             * Return this user
            */
            const res_obj={
                name:user_created.name,
                email:user_created.email,
                userId:user_created.userId,
                userType:user_created.userType,
                createdAt:user_created.createdAt,
                updatedAt:user_created.updatedAt
            }
            res.status(201).send(res_obj)
        }
        catch(err){
            console.log("Error while registering the user",err)
            res.status(500).send({
                message:"some error happened while registering the user"
            })
        }

    //3)return the response back to the user

}

    //login for user
    exports.signin =async (req,res)=>{
        
        //check if the user id is present in the system
        const user= await user_model.findOne({userId:req.body.userId})
        if(user==null){
            return res.status(400).send({
                message: "user id passed is not a valid user id"
            })
        }

        //if password is correct
        const isPasswordValid=bcrypt.compareSync(req.body.password,user.password)
        // bcrypt.compareSync(password provided by the user,password stored in the database)
        if(!isPasswordValid){
            return res.status(401).send({
                message:"you have entered the wrong password"
            })
        }
        //using jwt we can create the access token with the given Time to leave and return

        const token=jwt.sign({id:user.userId},secret.secret,{expiresIn:120})  //on what data you are going to creat the token first one is the secret keyword

        res.status(200).send({
            name: user.name,
            userId: user.userId,
            email: user.email,
            userType: user.userType,
            accessToken: token
        })
    }