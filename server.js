const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
//const argv = require('yargs').argv;


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.locals.weather='';
app.locals.error='';


let apiKey = 'ed2e492d8adc80a8ce6028c7fea9417e';


app.get('/', function (req, res) {
 // res.send('Hello World!')
  
  res.render('index');
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

app.post('/', function (req, res) {
	
	let city = req.body.city;
	let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
	
	
request(url, function (err, response, body) {
  if(err){
    console.log('error:', error);
	res.render('index', {weather: null, error: 'Error, please try again'});
  } else {
	  let weather = JSON.parse(body)
	  if(weather.main == undefined){
		  console.log('body:', body);
		  res.render('index',{weather: null, error: 'Error, please try again'});
	  }else {
		  console.log('body:', body);
		  let weathertext = `It's ${weather.main.temp} in ${weather.name}! `;
		  res.render('index', {weather: weathertext, error: null});
	  }
  }
});	
})




