const express = require('express');

const router = express.Router();

const validateToken=require("../midlleware/auth")

const userController= require("../controllers/userController")

router.get("/test-me", function (req, res) {

    res.send("its running")

})

router.post("/users", userController.createUser  )

router.post("/login", userController.loginUser)

router.post("/users/:userId", validateToken.validateToken, userController.getUserData)

router.put("/users/:userId",validateToken.validateToken, userController.updateUser)

router.delete("/users/:userId",validateToken.validateToken,userController.deletedSchoolData)

module.exports = router;