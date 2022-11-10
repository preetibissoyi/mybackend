const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const route = require("./routes/route");
const port = process.env.PORT || 3000;



app.use(express.json());

mongoose.connect("mongodb+srv://preeti:miausi28@cool.mvus2rp.mongodb.net/preeti",

    {
      useNewUrlParser: true,
    }

  )

  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));



app.use("/", route);
app.listen(port, (req, res) => {
  console.log("Express is Running on", port);

});



   
