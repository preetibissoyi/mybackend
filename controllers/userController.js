const blogs = require("../models/blogModel.js");
const authors = require("../models/authorModel.js");

/*--------------------------------------CREATEING-BLOG-------------------------------------------------- */

// const creatBook = async function(req,res){
//     let data = req.body
//     let bookCreate = await blogs.create(data)
//     res.send({data:bookCreate})
// }

/*--------------------------------------CREATING-AUTHER-------------------------------------------------- */

const creatAuther = async function(req,res){
    let data = req.body
    let autherCreate = await authors.create(data)
    res.send({data:autherCreate})
}

module.exports.creatBook = creatBook
module.exports.creatAuther = creatAuther