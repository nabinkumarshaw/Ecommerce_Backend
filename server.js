/**
 * This will be the starting of the file
 */

const express=require("express")
const mongoose=require('mongoose')
const app=express();
const server_config=require("./configs/server.config")
const db_config=require("./configs/db.config");
const user_model=require("./models/user.model")
const bcrypt=require("bcryptjs");

app.use(express.json())  //converting the json object to javascript object
//this is called middleware

/**
 * create an admin user at the starting of the application
 * if not already present
 */

//connection with mongo database and app
mongoose.connect(db_config.db_url)

const db=mongoose.connection;

db.once("open",()=>{
    console.log("connected to Mongo_Database")
     init(); //we want when the server gets started there remain a admin userid
})
db.on("error",()=>{
    console.log("There is an error while connecting to mongo database")
})

//creating the init function
async function init(){
    try{
        let user= await user_model.findOne({userId: "admin"}); //we are searching here

        if(user){
            console.log("Admin is already present");
            return
        }
    }
    catch(err){
        console.log("error while reading the code ",err)
    }
    try {
         user=await user_model.create({
            name:"Nabin" ,
            userId:"admin",
            email:"nabinkumarshaw123@gmail.com",
            userType:"ADMIN",
            password: bcrypt.hashSync("nabin@2004",10)   //here 10 is salt
          })
          console.log("Admin created ",user);


    } catch (error) {
        console.log("Ther is an error in creating admin ",error);
    }
}

/**
 * Stich the rout to the server
 */
require('./routes/auth.routes')(app)  //calling routes and passing app object
require('./routes/category.routes')(app) //stiching category routes

/**
 * now start the server
 */

app.listen(server_config.port,()=>{
    console.log("srver started at port number: "+ server_config.port);
})