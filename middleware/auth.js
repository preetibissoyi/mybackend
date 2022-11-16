const jwt= require("jsonwebtoken")
const blogModel = require("../models/blogModel")

const authenticate= async function(req,res,next){
    try{
   let token= req.headers["x-api-key"]
   if(!token){
    return res.status(400).send({status:false,msg:"token must be present"})
   }
   let verifyToken= jwt.verify(token,"Project-1-Blog")
   if(!verifyToken){
    return res.status(401).send({status:false,msg:"token is invalid"})
   }
   req.verifyToken=verifyToken
}
catch(error){
    res.status(500).send({status:false,msg:error.message})
}
next()
}

//--------------------------------------auth 2 for delete document-------------------------------------

const auth2= async function(req,res,next){
    try{
        let token= req.headers["x-api-key"]
        console.log(token)
        if(!token){
         return res.status(400).send({status:false,msg:"token must be present"})
        }

        let verifyToken= jwt.verify(token,"Project-1-Blog")
        if(!verifyToken){
         return res.status(400).send({status:false,msg:"token is invalid"})
        }

        const{category, authorId, tags, subcategory}=req.query
         let  loggedinAuthor= verifyToken.authorId.toString()
         if(authorId !==loggedinAuthor){
            return res.status(403).send({status:false,msg:"author is not allowed for this request"})
         }
         next()
        }
  catch(error){
    res.status(500).send({status:false,msg:error.message})
  }
}
 




module.exports.authenticate=authenticate
//module.exports.auth1=auth1
module.exports.auth2=auth2