const middlewaremodel= require("../models/middlewaremodel")
const basicCode= async function(req, res) {
    console.log(req.url)
    console.log("hii  i am path of this url "+req.path)
    res.send({ msg: "This is coming from controller handler"})
    }


module.exports.basicCode=basicCode