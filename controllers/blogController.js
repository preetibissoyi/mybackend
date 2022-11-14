const BlogModel = require("../models/blogModel.js");
const authorModel = require('../models/authorModel')

const createBlog= async function(req,res){
    try{
    let body= req.body

    if(!author){
       return res.status(400).send({status:false,msg:"AuthorId must be present"})
    }

    let AuthorId = await authorModel.find({ _id:body.authorId })
        if (!AuthorId) {
            return res.status(400).send({ status: false, msg: "Author is Not Valid" })
        }
   
    let blogData= await BlogModel.create(body)
     res.status(201).send({message:"successful-response-structure",data:blogData})
    }
    catch(error){
        res.status(404).send({msg:error.message})
    }

}

const getblogwithauthor = async function(req,res){
    try{
       let blogs = await BlogModel.find().populate("authorId")
       res.status(200).send({msg:blogs})
    }
    catch(error){
          res.status(500).send({status:true,message:error.message})
    }
    
}



module.exports.createBlog=createBlog 
module.exports.getblogwithauthor = getblogwithauthor