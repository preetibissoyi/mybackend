const bookModel = require('../models/booksModel');

const createBooks = async function(req,res){
    let data = req.body
    let storeData = await bookModel.create(data)
    res.send({message: storeData})

}

const booksList = async function(req,res){
    let allBooks = await bookModel.find()
    res.send({message: allBooks})
}

module.exports.booksList = booksList
module.exports.createBooks = createBooks