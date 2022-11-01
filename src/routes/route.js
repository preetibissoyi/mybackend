const express = require('express');
const router = express.Router();
const UserController= require("../controllers/usercontroller")
const commonMW = require ("../models/middlewaremodel")




 router.get("/basicRoute", commonMW.mid1, UserController.basicCode)
module.exports=router