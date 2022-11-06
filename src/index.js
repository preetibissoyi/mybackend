const express = require('express');
const { default:mongoose} = require("mongoose");
const route = require('./routes/route.js');
const port=process.env.PORT || 3000;
const app = express();




mongoose.connect("mongodb+srv://preeti:miausi28@cool.mvus2rp.mongodb.net/preeti", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) );

app.use(express.json());
 //app.use(bodyParser.urlencoded({ extended: true }));


app.use('/', route)


app.listen(port,() => {
    console.log('Express app running on port ' ,port)
});
