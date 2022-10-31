 const express = require('express');
 const router = express.Router();

 const authorController= require("../controllers/authorController")
 const bookController= require("../controllers/bookController")
  const publisherController= require("../controllers/publisherController")



 router.post("/createAuthor", authorController.createAuthor  )

 router.get("/getAuthorsData", authorController.getAuthorsData)

 router.post("/createpublisher",publisherController .createpublisher )

 router.get("getPublisherData",publisherController.getPublisherData)

 router.post("/creatBook", bookController.createBook)

 router.get("/getBooksData",bookController.getBooksData)

 router.post("/.CheckingAuthorID",bookController.CheckingAuthorID)

 router.get("/getBooksWithAuthorDetail", bookController. BooksWithAuthorDetail)

 router.put("/SchemaUpdate",bookController.SchemaUpdate)

 router.put("/Updatprice",bookController.Updatprice)

 module.exports = router;