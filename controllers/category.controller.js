/**
 * controller for creating the category
 * 
 * post localhost:8888/ecomm/api/v1/auth/categories
 * {
    "name":"Household",
    "description": "This will have all the household items"
    }
 */


const category_model=require('../models/category.model')

exports.createNewcategory =async (req,res)=>{

    //read the request body
    const request_body=req.body
    //create the category object
    const cat_data = {
        name: request_body.name,
        description:request_body.description
    }

    //insert into mongodb
    try{
        const category =await category_model.create(cat_data);
        return res.status(201).send(category)
    }
    catch(err){
        console.log("Error while creating the category",err)
        return res.status(500).send({
            message:"Error while creating the category"
        })
    }
    //return the response of the created category
}

