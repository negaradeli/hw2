// for hardcoded Chicago
let getWeather = function() {
  let latitude = '41.8781';
  let longitude = '-87.6298';
  let openweathermap_api_url = 'https://api.openweathermap.org/data/2.5/weather?'
  openweathermap_api_url += 'lat=' + latitude
  openweathermap_api_url += '&lon=' + longitude
  openweathermap_api_url +='&appid=4ce6f502d38ddae567bf1702b05e168c&units=imperial'

  fetch(openweathermap_api_url).then(convertToJSON).then(updateWeather).catch(displayError);
}

let updateWeather = function(data) {
  // console.debug(data);
  document.querySelector("#weather h4").innerHTML = data.name;
  document.querySelector("#weather p").innerHTML = "It is "+data.main.temp+" degrees outside.";
  pic = document.querySelector('#weather img');
  pic.src = "http://openweathermap.org/img/w/"+data.weather[0].icon+".png";
}

// For user's current location
let userlocation = function(info) {
  console.info("latitude: "+info.coords.latitude);
  console.info("longitude: "+info.coords.longitude);
  let latitude = info.coords.latitude;
  let longitude = info.coords.longitude;
  let openweathermap_api_url = 'https://api.openweathermap.org/data/2.5/weather?'
  openweathermap_api_url += 'lat=' + latitude
  openweathermap_api_url += '&lon=' + longitude
  openweathermap_api_url +='&appid=4ce6f502d38ddae567bf1702b05e168c&units=imperial'

  fetch(openweathermap_api_url).then(convertToJSON).then(updateWeather2).catch(displayError);
}

let updateWeather2 = function(data) {
  document.querySelector("#weather2 h4").innerHTML = data.name;
  document.querySelector("#weather2 p").innerHTML = "It is "+data.main.temp+" degrees outside.";
  pic = document.querySelector('#weather2 img');
  pic.src = "http://openweathermap.org/img/w/"+data.weather[0].icon+".png";
}

// common codes for both scenarios
let convertToJSON = function(response) {
  return response.json();
}

let displayError = function(error) {
  console.debug(error);
  window.alert("Sorry, something went wrong.");
}

let form = document.getElementById("get_forecast");
form.addEventListener("click", function(event) {
  event.preventDefault();
  getWeather();
})

let form2 = document.getElementById("get_forecast2");
form2.addEventListener("click", function(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(userlocation);
})


// HINT:
// Weather icon example: http://openweathermap.org/img/w/04n.png
// The very last part ('10d.png') can change based on the current conditions.
