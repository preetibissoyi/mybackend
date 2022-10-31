const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const publisherSchema = new mongoose.Schema( {
    name: String,
    headQuater:String

}, { timestamps: true });

module.exports = mongoose.model('publisher(reff,populate)', publisherSchema)