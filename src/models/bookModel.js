const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema( {
    name: String,
    price: Number,
    ratings:Number,
        author_id: {
        type: ObjectId,
        ref: "Author(reff,populate)"
    }, 
    publisherID:{
       type :ObjectId,
       ref: "publisher(reff,populate)"
    }


}, { timestamps: true });


module.exports = mongoose.model('Book(reff,populate)',bookSchema)