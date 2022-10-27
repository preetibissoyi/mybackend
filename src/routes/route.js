const express = require('express');
const router = express.Router();
const bookController = require('../controllers/booksController');


// router.get("/test-me", function (req, res) {
//     res.send("My first ever api!")
// })

// router.post("/createUser", UserController.createUser  )

// router.get("/getUsersData", UserController.getUsersData)
router.post("/createBooks",bookController.createBooks);

router.get("/booksList", bookController.booksList);

module.exports = router;