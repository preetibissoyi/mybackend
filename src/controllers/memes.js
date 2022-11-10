let axios=require("axios")

//3rd assignment
let meme = async function (req, res) {
   try {
     let templateid = req.query.template_id;
     let text0 = req.query.text0;
     let text1 = req.query.text1;
     let username = req.query.username;
     let password = req.query.password;
     let option = {
       method: "post",
       url: `https://api.imgflip.com/caption_image?template_id=${templateid}&text0=${text0}&text1=${text1}&username=${username}&password=${password}`,
     };
     let result = await axios(option);
     res.send({ data: result.data });
   } catch (err) {
     console.log(err);
     res.status(500).send({ msg: err.message });
   }
 };

module.exports.meme=meme