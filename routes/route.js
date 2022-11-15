const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")

const blogController= require("../controllers/blogController")

router.post('/authors',authorController.createAuthor)

router.post("/blogs",blogController.createBlog)

router.get('/blogs',blogController.getblog)

//router.get("/filterBlogs",blogController.getblogByFilter)
router.put("/blogs/:blogId",blogController.updatedBlog)
router.delete("/blogs/:blogId",blogController.deleteBlog)
router.delete("/blogs",blogController.deleteDocument)

module.exports = router;