const userModel = require("../models/Newuser");
const jwt = require("jsonwebtoken");
const Newuser = require("../models/Newuser");



const createUser = async function (req,res) {
 const data=req.body;
 const savedData=await Newuser.create(data)
 res.send(savedData)
};

const login= async function (req, res) {
 const userName = req.body.emailId;
  const password = req.body.password;
  let user = await userModel.findOne({ emailId: userName, password: password });
  if (!user){
    return res.send({ msg:"username & the password must be required" });
  }
  
  let token = jwt.sign({userId: user._id.toString()},"preeti");
res.setHeader("x-auth-token", token);
res.send({data:token  });
};

const updatedUserData= async (req, res) => {
  let UserId =req.params.userId;
  let UserDetails =await userModel.findById(userId)
  if (!UserDetails) 
  return res.send({status:false,msg:"NO SUCH USER EXISTS"});
let userData=req.body;
let updatedUser=await Newuser.findOneAndUpdate(
  {_id:userId},
userData,
{new:true}
);
res.send({status:true,data:updateUser})
}

const userPost=async (req,res)=>{
  let user=await Newuser.findById(req.params.userId);
  const message=req.body.message;
  const updatedpost=user.posts;
  updatedpost.push(message)
  const updateData =await Newuser.findOneAndUpdate(
   {_id:user._id} ,
   {posts:updatedpost},
   {
    new:true,
   }
  );
  res.send({status:true,posts:updateData});
}

module.exports.createUser = createUser;
module.exports.login =login  ;
module.exports.userPost= userPost;
module.exports.updatedUserData=updatedUserData;
