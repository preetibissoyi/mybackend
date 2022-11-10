let axios = require("axios");

//1
const getlondonweather = async function (req, res) {
    try {
        let q = req.query.london;
        let appid = req.query.appid;

        var options = {
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${london},&appid=${appid}`
        }
        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.massage })
    }
}

//2
const londonTemp=async function (req, res) {
    try {
        let london = req.query.london;
        let appid = req.query.appid;

        var options = {
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?london=${london},&appid=${appid}`
        }
        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({Temperature: result.data.main.temp })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.massage })
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
          `http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=8ddc043612f60b8c9f5c6784c23cdb90`
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
   
  


module.exports.getlondonweather = getlondonweather
module.exports.londonTemp=londonTemp
module.exports.getSelectedCities=getSelectedCities