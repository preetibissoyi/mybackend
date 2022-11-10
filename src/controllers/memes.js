let axios=require("axios")


let memes=async function(req,res){
   try {
    let  templateid=req.quary. template_id;
    let text0=req.quary.text0;
    let text1 = req.query.text1;
    let username=req.quary.username;
    let password=req.quary.password;

    let option={
      method:"post" ,
      URL :`https://api.imgflip.com/caption_image? template_id=${templateid}&text0=${text0}&text1=${text1}&username=${username}&passwaord=${password}`
    }

let result = await axios(options)
console.log(result.data)
res.status(200).send({ msg: result.data })
}
catch (err) {
console.log(err)
res.status(500).send({ msg: err.massage })

   
   } 
}

module.exports.memes=memes