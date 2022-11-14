const BlogModel = require("../models/blogModel.js");
const createBlog= async function(req,res){
    try{
    let body= req.body
   let author=body.authorId
    if(!author){
       return res.status(400).send({status:false,msg:"authorId must be present"})
    }
    let blogData= await BlogModel.create(body)
     res.status(201).send({data:blogData})
    }
    catch(error){
        res.status(404).send({msg:error.message})
    }

}

const getblogwithauthor = async function(req,res){
    try{
       let blogs = await BlogModel.find().populate('authorId')
       res.status(200).send({ststus:true,message:blogs})
    }
    catch(error){
          res.status(500).send({status:true,message:error.message})
    }
    
}


module.exports.createBlog=createBlog 
module.exports.getblogwithauthor = getblogwithauthor