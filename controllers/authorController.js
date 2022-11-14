const validation  = require("../validator/validation");
const authors = require("../models/authorModel.js");

let {isEmpty, isValidName, isValidEmail, isValidObjectId, isValidPassword} = validation

const createAuthor= async function(req,res){
    try{
        let data = req.body
    if(Object.keys(data).length==0){
        return res.status(400).send({ststus:false,message:"Body is empty"})
    }

    let {fname,lname,title,email,password} = data

    if(!fname||!lname||!title||!email||!password) {
        return res.status(400).send({status:false,message:"all fields must be required"})
    }

    if(!isEmpty(fname)){
        return res.status(400).send({status:false,message:"First Name is required"})
    }
    if(!isEmpty(lname)){
        return res.status(400).send({status:false,message:"Last Name is required"})
    }
    if(!isEmpty(title)){
        return res.status(400).send({status:false,message:"title  is required"})
    }
    if(!isEmpty(email)){
        return res.status(400).send({status:false,message:"Email is required"})
    }
    if(!isEmpty(password)){
        return res.status(400).send({status:false,message:"password is required"})
    }

    if(title != "Mr" && title != "Mrs" && title != "Miss"){
        res.status(400).send({msg:"Not have appropiate title"})
    }

    if(!isValidName(fname)){
        return res.status(400).send({status:false,message:"fname is Wrong"})
    }

    if(!isValidName(lname)){
        return res.status(400).send({status:false,message:"lname is wrong"})
    }

    if(!isValidEmail(email)){
        return res.status(400).send({status:false,message:"Email is wrong"})
    }

    if(!isValidPassword(password)){
        return res.status(400).send({status:false,message:"Password is wrong"})
    }
    

    let autherCreate = await authors.create(data)
    res.status(201).send({status:true,data:autherCreate})
    }
    catch(error){
          res.status(500).send({status:true,message:error.message})
    }
    
}

module.exports.createAuthor = createAuthor



