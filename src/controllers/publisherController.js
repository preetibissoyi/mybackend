const publishermodel= require("../models/publishemodel")

const createpublisher= async function (req, res) {
    let author = req.body
    let authorCreated = await AuthorModel.create(author)
    res.send({data: authorCreated})
}

const getPublisherData= async function (req, res) {
    let authors = await publisherModel.find()
    res.send({data: authors})
}

module.exports.createpublisher= createpublisher
module.exports.getPublisherData= getPublisherData