const express = require('express');
const router = express.Router();

const userController= require("../controllers/userController.js")

router.post('/authorscreat',userController.creatAuther)

router.post("/createBlog",userController.createBlog)

router.get('/getblogs',userController.getblogwithauthor)

module.exports = router;