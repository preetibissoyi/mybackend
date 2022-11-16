const{isValidObjectId}= require("mongoose")
const moment= require("moment")
const jwt= require("jsonwebtoken")

const BlogModel = require("../models/blogModel.js");
const AuthorModel = require("../models/authorModel.js");


//-------------------------------------------create Blog---------------------------------------------------------------------
const createBlog= async function(req,res){
    try{
    let data= req.body

let {title,body,authorId}=data
    if(!title||!body||!authorId){  
       return res.status(400).send({status:false,msg:"these field  must be present"})
    }
if(!isValidObjectId(authorId)){
    return res.status(400).send({status:false,msg:"authorId is invalid"})
}
//console.log(req.body.isPublished)
 if(req.body.isPublished){
       data["publishedAt"]=moment().format()
 }
 
    let blogData= await BlogModel.create(data)    
     res.status(201).send({status:true,data:blogData})
    }
    catch(error){
        res.status(404).send({msg:error.message})
    }

}

//--------------------------Get blog---------------------------------------------------------------------

// const getblog = async function(req,res){
//     try{
//      const {authorId,category,tags,subcategory}= req.query
//     //let blogData=req.query
        
//        let getblogs = await BlogModel.find({$and:[{isDeleted:false,isPublished:true}]})
//        if(!getblogs){
//          return res.status(400).send({status:false,msg:"blog not found"})  
//        }
//          res.status(200).send({status:true,data:getblogs})
//        let filterblog= await BlogModel.find({$or:[{authorId:authorId},{category:category},{tags:tags},{subcategory:subcategory}]}).populate("authorId")
//     //    let filterblog= await BlogModel.find(blogData)
//       return res.status(200).send({status:true,data:filterblog})
//        }
//     catch(error){  
//        return res.status(500).send({status:true,message:error.message})
//     }
    
// }


const getblog = async function(req,res){
    try{
        const {authorId,category,tags,subcategory}= req.query
    
       let getblogs = await BlogModel.find({$and:[{isDeleted:false,isPublished:true}]})

       if(!getblogs){
         return res.status(400).send({status:false,msg:"blog not found"})  
       }
        res.status(200).send({status:true,data:getblogs})

       let filterblog= await BlogModel.find({$or:[{authorId:authorId},{category:category},{tags:tags},{subcategory:subcategory}]}).populate("authorId")
    
        return res.status(200).send({status:true,data:filterblog})
    }
    catch(error){
         return  res.status(500).send({status:true,message:error.message})
    }
    
}











//-----------------------------------update Blog-----------------------------------------------------------------------//

const updatedBlog= async function (req,res){
    try {

        let alldata=req.body  
        let blogId=req.params.blogId;
    
    if(Object.keys(alldata).length==0)
    return res.status(400).send({status:false,msg:"plz enter blog details for updating"})
     
    if(!blogId)
    return res.status(400).send({status:false,msg:" blogId is required"})
    let findBlogId=await BlogModel.findById(blogId);//blogId
     
      if(findBlogId.isDeleted==true){
        return res.status(404).send({status:false,msg:"Blog already deleted"})
      }

   let authorId= findBlogId.authorId.toString()
   if(req.verifyToken.authorId !==authorId){
   return  res.status(401).send({status:false,msg:"not Authorized"})
   }

      let updatedBlog=await BlogModel.findOneAndUpdate(
        {_id:blogId},
        {
        $set : {
          title:alldata.title,
          body:alldata.body,
          category:alldata.category,
          publishedAt:moment().format(),
          isPublished:true
        },
        $push:{tags:req.body.tags, subcategory:req.body.subcategory},
        },
        {new:true}
      )
      return res.status(200).send({status:true,msg:updatedBlog})
    
    } catch (error) {
        res.status(500).send({status:false,msg:error.message})
    } 
 }

//------------------------------delete Blog-----------------------------------------------------------------------------------
  
const deleteBlog=async function(req,res){
    try{
   const blogId= req.params.blogId
   if(!isValidObjectId(blogId)){
    return res.status(400).send({status:false,msg:"blogId is invalid"})
}
   let blog= await BlogModel.findById(blogId)
   if(!blog){
    return res.status(400).send({status:false,msg:"blogId is not found"})
   }
   if(!blog.isDeleted==false){  
    return res.status(400).send({status:false,msg:"blog does not exist"})
   }
   let authorId=blog.authorId.toString()
   if(req.verifyToken.authorId!==authorId){
    res.status(401).send({status:false,msg:"not authorised"})
   }
   let markDeleted= await BlogModel.findOneAndUpdate({_id:blogId},{$set:{isDeleted:true,deletedAt:moment().format()}})
   res.status(200).send({status:true,data:markDeleted})
}
catch(error){
    res.status(500).send({status:false,msg:error.message})
}
}

//--------------------------------delete Document----------------------------------------------------------------------------------------


const deleteDocument=async function(req,res){

    try{
     const{category, authorId, tags, subcategory}=req.query
     
     let deleteDoc= await BlogModel.updateMany({$or:[{category:category},{authorId:authorId},{tags:tags},{subcategory:subcategory}]},{$set:{isDeleted:true,deletedAt:moment().format()}},{new:true})
     if(!deleteDoc){
        return res.status(404).send({status:false,msg:"document is not present"})
     }
      res.status(200).send({status:true,data:deleteDoc})
}
catch(error){
    return res.status(500).send({msg:error.message})
}
}


module.exports.createBlog=createBlog 
module.exports.getblog=getblog
module.exports.updatedBlog=updatedBlog
module.exports.deleteBlog=deleteBlog
module.exports.deleteDocument=deleteDocument

