const authors = require("../models/authorModel.js");
const createAuthor= async function(req,res){
    try{
        let data = req.body
    if(Object.keys(data).length==0){
        return res.status(400).send({ststus:false,message:"Body is empty"})
    }

    let {fname,lname,title,email,password} = data

    if(!fname||!lname||!title||!email||!password) {
        return res.send(400).send({status:false,message:"all fields must be required"})
    }
    let autherCreate = await authors.create(data)
    res.status(201).send({status:true,data:autherCreate})
    }
    catch(error){
          res.status(500).send({status:true,message:error.message})
    }
    
}

// const getblogwithauthor = async function(req,res){
//     try{
//        let blogs = await BlogModel.find().populate('authorId')
//        res.status(200).send({ststus:true,message:blogs})
//     }
//     catch(error){
//           res.status(500).send({status:true,message:error.message})
//     }
    
// }


module.exports.createAuthor = createAuthor
//module.exports.getblogwithauthor = getblogwithauthor


