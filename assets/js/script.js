let cities = [];

let cityFormEl=document.querySelector("#city-search-form");
let cityInputEl=document.querySelector("#city");
let weatherContainerEl=document.querySelector("#current-weather-container");
let citySearchInputEl = document.querySelector("#searched-city");
let forecastTitle = document.querySelector("#forecast");
let forecastContainerEl = document.querySelector("#fiveday-container");
let pastSearchButtonEl = document.querySelector("#past-search-buttons");

let formSumbitHandler = function(event){
    event.preventDefault();
    let city = cityInputEl.value.trim();
    if(city){
        getCityWeather(city);
        get5Day(city);
        cities.unshift({city});
        cityInputEl.value = "";
    } else{
        alert("Please enter a City");
    }
    saveSearch();
    pastSearch(city);
}

let saveSearch = function(){
    localStorage.setItem("cities", JSON.stringify(cities));
};

let getCityWeather = function(city){
    let apiKey = "aa56e812832ff057049df2cef78bff07";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            displayWeather(data, city);
        });
    });
};

let displayWeather = function(weather, searchCity){

    weatherContainerEl.textContent= "";  
    citySearchInputEl.textContent=searchCity;
 
 
    let currentDate = document.createElement("span")
    currentDate.textContent=" (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
    citySearchInputEl.appendChild(currentDate);
 
 
    let weatherIcon = document.createElement("img")
    weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
    citySearchInputEl.appendChild(weatherIcon);
 
    let temperatureEl = document.createElement("span");
    temperatureEl.textContent = "Temperature: " + weather.main.temp + " °F";
    temperatureEl.classList = "list-group-item"
   
    
    let humidityEl = document.createElement("span");
    humidityEl.textContent = "Humidity: " + weather.main.humidity + " %";
    humidityEl.classList = "list-group-item"
 
    
    let windSpeedEl = document.createElement("span");
    windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
    windSpeedEl.classList = "list-group-item"
 
   
    weatherContainerEl.appendChild(temperatureEl);
 
    
    weatherContainerEl.appendChild(humidityEl);
 
    
    weatherContainerEl.appendChild(windSpeedEl);
 
    let lat = weather.coord.lat;
    let lon = weather.coord.lon;
    getUvIndex(lat,lon)
 }
 
 let getUvIndex = function(lat,lon){
     let apiKey = "aa56e812832ff057049df2cef78bff07";
     let apiURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`
     fetch(apiURL)
     .then(function(response){
         response.json().then(function(data){
             displayUvIndex(data)
            
         });
     });
 
 }
  
 let displayUvIndex = function(index){
     let uvIndexEl = document.createElement("div");
     uvIndexEl.textContent = "UV Index: "
     uvIndexEl.classList = "list-group-item"
 
     uvIndexValue = document.createElement("span")
     uvIndexValue.textContent = index.value
 
     if(index.value <=2){
         uvIndexValue.classList = "favorable"
     }else if(index.value >2 && index.value<=8){
         uvIndexValue.classList = "moderate "
     }
     else if(index.value >8){
         uvIndexValue.classList = "severe"
     };
 
     uvIndexEl.appendChild(uvIndexValue);
 
    
     weatherContainerEl.appendChild(uvIndexEl);
 }

 let get5Day = function(city){
    let apiKey = "aa56e812832ff057049df2cef78bff07";
    let apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
           displayget5Day(data);
        });
    });
};