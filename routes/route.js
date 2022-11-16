const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const blogController= require("../controllers/blogController")
const Middleware= require("../middleware/auth")


router.post('/authors',authorController.createAuthor)

router.post("/blogs",Middleware.authenticate,blogController.createBlog)

router.get('/blogs',Middleware.authenticate,blogController.getblog)


router.put("/blogs/:blogId",Middleware.authenticate,blogController.updatedBlog)


router.delete("/blogs/:blogId",Middleware.authenticate,blogController.deleteBlog)

router.delete("/blogs",Middleware.authenticate,Middleware.auth2,blogController.deleteDocument)

router.post("/login",authorController.loginAuthor)



module.exports = router;     