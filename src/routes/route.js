const express = require("express");
const router = express.Router();
const cowinController = require("../controllers/cowinController");
const weathercontroller = require("../controllers/weathercontroller");
const memes= require("../controllers/memes");


//1
router.get("/cowin/states", cowinController.getStates);
router.get("/cowin/districtsInState/:stateId", cowinController.getDistricts);
router.get("/cowin/getByPin", cowinController.getByPin);
router.post("/cowin/getOtp", cowinController.getOtp);
router.get("/getByDistrictId", cowinController.getByDistrictId);

//2
router.get("/weather/london",weathercontroller.getLondonWeather);
router.get("/weather/london/temperature", weathercontroller.getLondonTemperature);
router.get("/getSelectedCities", weathercontroller.getSelectedCities);

//3
router.post("/meme", memes.meme);
module.exports = router;






