 const{count} = require("console")
 const bookModel= require("../models/bookModel")
 const authorModel = require("../models/authorModel")
 const publishermodel =require("../models/publishemodel")
//3
const createBook= async function (req, res) {
     let data = req.body
     let saveData = await bookModel.create(data)
     res.send({msg:saveData})
 }

 const getBooksData= async function (req, res) {
     let books = await bookModel.find()
     res.send({msg:allBooks})
 }
//3 a b c d
 const CheckingAuthorID = async function (req, res) {
    let {author ,publisher} = req .body
    

     if (!author){
        res.send("author required") 
     }
     if (!publisher) {
         res.send("publisher required")    
     }

     let authorData = await authorModel.findById({ _id:author })
     if(!authorData){
         res.send("Author not Available ")  }
      let publisherData = await publishermodel.findById({ _id:publisher })
      if(!publisherData){
         res.send("publisher not Avalable")
 }


 let book = req.body
 let bookCreated = await bookModel.create(book)
 res.send({data:bookCreated}) 
}

//4
 const BooksWithAuthorDetail =async function (req,res) {
     let data = await   bookModel.find().populate("author").populate("publisher")
  
     res.send(data)
  }
  //5 a
 const SchemaUpdate = async function(req,res){
     let key =await publishermodel.find({name:["penguin","Got publisher"]}).select({_id:1})
     let key1 =await bookModel.find({publisher:key}).select({_id:1});
     for (let index =0 ; index < key1.length ;index++){
        const element =key1[index];
         let key001 =await bookModel.findByIdAndUpdate(element,{$set:{isHardcover:true}})

        console.log(key001)
     }
     res.send({msg:Updated})
 }
 //5b
 const Updatprice= async function (req,res){

    let key = await authorModel.find({rating:{$gte:2}}).select({_id:1});
     let books = await bookModel.find({author:key}).select({_id:1});
     for (let index = 0 ; index < books.length;index++){
       const  element = books[index] 
       let Newupdate = await bookModel.findByIdAndUpdate(element,{$inc:{price:10}})  
         console.log (Newupdate)
     }
     res.send({msg:"updated"})
 }







    
 module.exports.createBook= createBook
 module.exports.getBooksData= getBooksData 
module.exports.CheckingAuthorID =CheckingAuthorID 
 module.exports.BooksWithAuthorDetail=BooksWithAuthorDetail
 module.exports.SchemaUpdate=SchemaUpdate
 module.exports. Updatprice= Updatprice



 
