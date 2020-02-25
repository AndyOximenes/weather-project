
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const query = req.body.cityName;
  const apiKey = "7ba47c67d4ddcae02c509927afe006ac";
  const unit = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`;

  https.get(url, response => {
    console.log(response.statusCode);

    response.on("data", data => {
      const weatherDate = JSON.parse(data);
      const temp = weatherDate.main.temp;
      const weatherDescription = weatherDate.weather[0].description;
      const icon = weatherDate.weather[0].icon;
      const imgURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      res.write(
        `<h1>The temperature in ${query} is ${temp} degrees Celcius</h1>`
      );
      res.write(
        `The weather is currently <strong>"${weatherDescription}"</strong>`
      );
      res.write(`<p><img src="${imgURL}" alt="weather icon"></p>`);
      res.send();
    });
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
