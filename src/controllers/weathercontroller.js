let axios = require("axios");



                   //2nd assignment\\
                   

//1
let getLondonWeather = async function (req, res) {
  try {
    let london = req.query.q;
    let appid = req.query.appid;
    let option = {
      method: "get",
      url: `http://api.openweathermap.org/data/2.5/weather?q=${london},&appid=${appid}`,
    };
    let result = await axios(option);
    console.log(result.data);
    res.status(200).send({ msg: result.data });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};


//2
let getLondonTemperature = async function (req, res) {
  try {
    let london = req.query.q;
    let appid = req.query.appid;
    let option = {
      method: "get",
      url: `http://api.openweathermap.org/data/2.5/weather?q=${london},&appid=${appid}`,
    };
    let result = await axios(option);
    console.log(result.data);
    res.status(200).send({ Temperature: result.data.main.temp });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};


//3
let getSelectedCities = async function (req, res) {
  try {
    let cities = [
      "Bengaluru",
      "Mumbai",
      "Delhi",
      "Kolkata",
      "Chennai",
      "London",
      "Moscow",
    ];
    let cityObjArray = [];
    for (i = 0; i < cities.length; i++) {
      let obj = { city: cities[i] };
      let resp = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=59d48664731fa12e8c8ebf2ed79090f5`
      );
      obj.temp = resp.data.main.temp;
      cityObjArray.push(obj);
    }
    let sorted = cityObjArray.sort(function (a, b) {
      return a.temp - b.temp;
    });
    res.status(200).send({ status: true, data: sorted });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};

module.exports.getLondonWeather = getLondonWeather;
module.exports.getLondonTemperature = getLondonTemperature;
module.exports.getSelectedCities = getSelectedCities;