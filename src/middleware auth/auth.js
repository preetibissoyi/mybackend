const jwt= require("jsonwebtoken");


const authenticate=(req, res, next)=>{
    try {
        let token =req.headers["x-auth-token"];
      if (!token)return res.status(404).send("token must be requried");
      
      let decodedToken=jwt.verify(token,"preeti");
      if(!decodedToken){
       return  res.send ({ msg:"Access Denied"}) 
      }
        req.loggedIn = decodedToken.userId;
      next()  ;
          
  }
  catch(err){
    res.send({msg:"Access Denied"})
  }
} ;
 const authorise=(req,res,next)=>{
    let checkAuthorise=req.params.userId;
    if (checkAuthorise !==req.loggedIn) {
     return   res.status (404).send({ msg:"YOU ARE NOT VALID USER" });
    }
 }


 module.exports.authenticate=authenticate;
 module.exports.authorise=authorise;
