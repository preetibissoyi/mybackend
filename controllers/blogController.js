const{isValidObjectId}= require("mongoose")
const moment= require("moment")

const BlogModel = require("../models/blogModel.js");
const AuthorModel = require("../models/authorModel.js");
//-------------------------------------------create Blog---------------------------------------------------------------------
const createBlog= async function(req,res){
    try{
    let data= req.body

let {title,body,authorId}=data
    if(!title||!body||!authorId){  
       return res.status(400).send({status:false,msg:"this field  must be present"})
    }
if(!isValidObjectId(authorId)){
    return res.status(400).send({status:false,msg:"authorId is invalid"})
}

    let blogData= await BlogModel.create(data)
     res.status(201).send({status:true,data:blogData})
    }
    catch(error){
        res.status(404).send({msg:error.message})
    }

}

// const getblog = async function(req,res){
//     try{

//     //     let {authorId,category,tags,subcategory}=req.query;
//     //     let filter={ isDeleted:false, ispublished:true}
//     //     if (authorId){filter.authorId=authorId}

//     //     if(req.query.authorId){
//     //         if(!isValidObjectId(req.query.authorId)){
//     //           return res.status(400).send({status:false,msg:"please enter valid AithorId"})
//     //         }else{
//     //             req.query.authorId=authorId
//     //         }
//     //     }
//     //     if (category) {filter.category=category}
//     //     if (tags) {filter.tags=tags}
//     //     if (subcategory) {filter.subcategory=subcategory}

//     //     let saveData=await BlogModel.find(filter)
//     //     if(saveData.length==0){
//     //         return res.status(400).send({status:false,msg:"NO!! such blog"})
//     //     }else{
//     //         return res.status(200).send({status:false,data:saveData})
//     //     }
//     }
//     catch(error){
//                    res.status(500).send({status:true,message:error.message})
//            }
       
    
// }


const getblog = async function(req,res){
    try{
        const {authorId,category,tags,subcategory}= req.query
    
        
       let getblogs = await BlogModel.find({$or:[{isDeleted:false,isPublished:true}]})
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

const updatedBlog= async (req,res)=>{
    try {

        let alldata=req.body
        let blogId=req.params.blogId;
    
    if(Object.keys(alldata).length==0)
    return res.status(400).send({status:false,msg:"plz enter blog details for updating"})
     
    if(!blogId)
    return res.status(400).send({status:false,msg:" blogId is required"})
      let findBlogId=await BlogModel.findById(blogId);
     
      if(findBlogId.isDeleted==true){
        return res.status(400).send({status:false,msg:"Blog already deleted"})
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
   const blogId= req.params.blogId
   let blog= await BlogModel.findById(blogId)
   if(!blog){
    return res.status(400).send({status:false,msg:"blogId is not found"})
   }
   if(!blog.isDeleted==false){  
    return res.status(400).send({status:false,msg:"blog does not exist"})
   }
   let markDeleted= await BlogModel.findOneAndUpdate({_id:blogId},{$set:{isDeleted:true,deletedAt:moment().format()}})
   res.status(200).send({status:true,data:markDeleted})
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

