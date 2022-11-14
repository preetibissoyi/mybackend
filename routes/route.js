const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const blogController= require("../controllers/blogController")

router.post('/creatauthor',authorController.createAuthor)
router.post("/createBlog",blogController.createBlog)
router.get('/getblogs',blogController.getblogwithauthor)

module.exports = router;