//Making a GET request with the node HTTPS module.
//Step 1: Install npm packages and create your server and create your home page GET request.
//Step 2: In order to be able to get the current weather instead of just the "I am running ". we have to be able to crate a GET request that directs us to the API of the open weather map. Therefore we are going to require the HTTPS module.

// Step 3: Ater requiring the https module. inside our app.get() we are going to add out https.get method and paste our external URL server API



//Requiring the HTTPS module already installed in our node package.
const https = require("https");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(express.urlencoded({
    extended: true
}));

app.get("/", function (request, response) {

    response.sendFile(__dirname + "/index.html");
});



app.post("/", function(reqq, ress){

   //dont ever forget to add the "https://" before pasting the URL of the external data API of your choice
 const city = reqq.body.cityName;   
 const id = "3b8f4b6b08fb9eadf36fcde08a873a17";
 const measure = "metric"
 const weatherURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+id+"&units="+measure;

 https.get(weatherURL, function (res) {
     //to check the status code of your URL
     console.log(res.statusCode);

     // to get the data from the external server using the .ON method on the res of the callback function. This will display the result or data in bytes or hexadecimal
     res.on("data", function(data) {

    // This is where we convert JSON to a Javascript Object. Using JSON.parse();
         const weatherData = JSON.parse(data);

     //we want to tap into our Javascript object we can do this by using the vanilla javascript of getting information from an object

         const temp = weatherData.main.temp;
         const description = weatherData.weather[0].description;
         const icon = weatherData.weather[0].icon;
         const imageURL = "https://openweathermap.org/img/wn/" +icon+ "@2x.png";
         console.log(temp + " " + description);
         ress.write("<p> The weather Description in "+ city+" is: " + description + "</p>");
         ress.write("<h1>The current Tempature is " + temp + " degree celsius in "+ city + "</h1>");
         ress.write("<img src=" + imageURL + ">")

         ress.send();

     });
 });
});


app.listen(3000, function () {

    console.log("I am up and running on port 3000.");

});
















