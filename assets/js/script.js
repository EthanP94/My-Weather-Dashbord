let cities = [];
let apiKey = "aa56e812832ff057049df2cef78bff07";
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
    apiKey = "aa56e812832ff057049df2cef78bff07";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            displayWeather(data, city);
        });
    });
};
