const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req, res) {
    
    res.sendFile(__dirname+"/index.html");
    
});

app.post("/",function(req,res){

    console.log("post recieved");

    const query = req.body.Cityname;
    const apiKey = "425448c769dda744604bf85db6f752f4";
    
      const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="+query+"&appid="+apiKey;

  https.get(url, function (response) {

        console.log(response.statusCode);
    
    response.on("data",function(data){
        const weather = JSON.parse(data);
        const temp = weather.main.temp;
        const pressi = weather.main.pressure;
        const weatherDescription = weather.weather[0].description;
        const Icon = weather.weather[0].icon;
        const Imageurl = "http://openweathermap.org/img/wn/"+Icon+"@2x.png";

        res.write("<p>The weather is currently "+weatherDescription+"</p>");

        res.write("<h1>The temperature in "+query+ " is "+temp+" degree celsius</h1>");
        res.write("<img src="+Imageurl+">");
        res.send();
    });

  });
});
app.listen(3000, function () {
  console.log("server 3000 has started");
});
