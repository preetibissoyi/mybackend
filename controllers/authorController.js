// const validation  = require("../validator/validation");
// const authors = require("../models/authorModel.js");

// let {isEmpty, isValidName, isValidEmail, isValidObjectId, isValidPassword} = validation

// const createAuthor= async function(req,res){
//     try{
//         let data = req.body
//     if(Object.keys(data).length==0){
//         return res.status(400).send({ststus:false,message:"Body is empty"})
//     }

//     let {fname,lname,title,email,password} = data

//     if(!fname||!lname||!title||!email||!password) {
//         return res.status(400).send({status:false,message:"this field is required"})
//     }

//     if(!isEmpty(fname)){
//         return res.status(400).send({status:false,message:"First Name is required"})
//     }
//     if(!isEmpty(lname)){
//         return res.status(400).send({status:false,message:"Last Name is required"})
//     }
//     if(!isEmpty(title)){
//         return res.status(400).send({status:false,message:"title  is required"})
//     }
//     if(!isEmpty(email)){
//         return res.status(400).send({status:false,message:"Email is required"})
//     }
//     if(!isEmpty(password)){
//         return res.status(400).send({status:false,message:"password is required"})
//     }

//     if(title != "Mr" && title != "Mrs" && title != "Miss"){
//         res.status(400).send({msg:"Not have appropiate title"})
//     }

//     if(!isValidName(fname)){
//         return res.status(400).send({status:false,message:"fname is Wrong"})
//     }

//     if(!isValidName(lname)){
//         return res.status(400).send({status:false,message:"lname is wrong"})
//     }

//    // if (!checkValid(email)) return res.status(400).send({ status: false, message: "Spaces aren't Allowed." })
//     if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/).test(email)) { 
//         return res.status(400).send({ status: false, msg: "Please provide valid Email" })
//  }


//     // if (!(/^(?=.[A-Z])(?=.[a-z])(?=.[0-9])(?=.[!@#$%^&])[a-zA-Z0-9!@#$%^&]{8,32}$/).test(password)) {
//     //      return res.status(400).send({ status: false, msg: "Your password must be at least 6 characters long, contain at least one number and symbol, and have a mixture of uppercase and lowercase letters." }) }

//     // if(!isValidEmail(email)){
//     //     return res.status(400).send({status:false,message:"Email is wrong"})
//     // }


//     if(!isValidPassword(password)){
//         return res.status(400).send({status:false,message:"Password is wrong"})
//     }
    

//     let authorCreate = await authors.create(data)
//     res.status(201).send({status:true,data:authorCreate})
//     }
//     catch(error){
//           res.status(500).send({status:true,message:error.message})
//     }
    
// }

// module.exports.createAuthor = createAuthor



const validation  = require("../validator/validation");

const AuthorModel = require("../models/authorModel.js");


let { isValidName, isValidEmail, isValidPassword, isEmpty } = validation //Destructuring

const createAuthor= async function(req,res){ // Checking body is empty or not
    try{
        let data = req.body
    if(Object.keys(data).length==0){
        return res.status(400).send({status:false,message:"Body is empty"})
    }

    let {fname,lname,title,email,password} = data //Destructuring

    if(!fname||!lname||!title||!email||!password) {
        return res.status(400).send({status:false,message:"all fields must be required"})
    }

//------------------------Checking attributes are empty or not-----------------------------------/

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

//-----------------------------------Checking Valid Title or Not------------------------------------------------/

    if(title != "Mr" && title != "Mrs" && title != "Miss"){
        res.status(400).send({msg:"Not have appropiate title"})
    }

    if(!isValidName(fname)){ // Name validation
        return res.status(400).send({status:false,message:"fname is Wrong"})
    }

    if(!isValidName(lname)){  // Name validation
        return res.status(400).send({status:false,message:"lname is wrong"})
    }

    if(!isValidEmail(email)){ // Email validation
        return res.status(400).send({status:false,message:"Please provide valid Email"})
    }

    if(!isValidPassword(password)){ // Password validation
        return res.status(400).send({status:false,message:"Your password must have characters, contain at least one number and symbol, and have a mixture of uppercase and lowercase letters."})
    }
    
    //-----------------------------------CREATING AUTHOR-----------------------------------------------------/

    let autherCreate = await AuthorModel.create(data)
    res.status(201).send({status:true,data:autherCreate})
    }
    catch(error){
          res.status(500).send({status:true,message:error.message})
    }
    
}

module.exports.createAuthor = createAuthor