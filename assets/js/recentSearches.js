// The purpose of this js is to take recent searches from the user that have already been saved to local storage and begin saving each search under a new KEY. This new KEY will become an object once more than one search has been performed. Then, each search will appear to the left of the page under the search bar where the user can then click and easily access recent searches they have performed again.

// declare class that we will use to append the buttons;

let searchHistoryId = $('#search-history');
let citiesEl = $('.cities')

// list out all variables needed to represent each key that has been saved to local storage
let currentIcon = localStorage.getItem("weatherIcon");
let currentHumidity = localStorage.getItem("humidity");
let currentDate = localStorage.getItem("currentDate");
currentDate = new Date(currentDate * 1000);
let currentTemp = localStorage.getItem("temp");
let currentCity = localStorage.getItem("geoCity");
currentCity = JSON.parse(currentCity);
let currentWindSpeed = localStorage.getItem("windSpeed");
let currentCountry = localStorage.getItem("geoCountry");
currentCountry = JSON.parse(currentCountry);
let currentState = localStorage.getItem("geoState");
currentState = JSON.parse(currentState);

let futureForecast = localStorage.getItem("dailyForecast");
futureForecast = JSON.parse(futureForecast);

let lastCitySearched = {
    'weatherIcon': currentIcon,
    'currentHumidity': currentHumidity,
    'currentDate': currentDate,
    'currentTemp': currentTemp,
    'currentCity': currentCity,
    'currentWindSpeed': currentWindSpeed,
    'currentCountry': currentCountry,
    'currentState': currentState,
    'futureForecast': futureForecast,
}


// create if/elseif statement to give the appropriate png to each weather icon value
if (currentIcon == '01d') {
    currentIcon = icon01d;
}
else if (currentIcon == '01n') {
    currentIcon = icon01n;
}
else if (currentIcon == '02d') {
    currentIcon = icon02d;
}
else if (currentIcon == '02n') {
    currentIcon = icon02n
}
else if (currentIcon == '03d') {
    currentIcon = icon03d
}
else if (currentIcon == '03n') {
    currentIcon = icon03n
}
else if (currentIcon == '04d') {
    currentIcon = icon04d
}
else if (currentIcon == '04n') {
    currentIcon = icon04n
}
else if (currentIcon == '09d') {
    currentIcon = icon09d
}
else if (currentIcon == '09n') {
    currentIcon = icon09n
}
else if (currentIcon == '10d') {
    currentIcon = icon10d
}
else if (currentIcon == '10n') {
    currentIcon = icon10n
}
else if (currentIcon == '11d') {
    currentIcon = icon11d
}
else if (currentIcon == '11n') {
    currentIcon = icon11n
}
else if (currentIcon == '13d') {
    currentIcon = icon13d
}
else if (currentIcon == '13n') {
    currentIcon = icon13n
}
else if (currentIcon == '50d') {
    currentIcon = icon50d
}
else if (currentIcon == '50n') {
    currentIcon = icon50n
}

// create if else statements for each of the 5 buttons that dont exist... evaluate if it does not exist OR if the current number of buttons is equal to or greater than 4... if so, create first button

if (citiesEl[0] != true || citiesEl.length >= 4) {
    searchHistoryId[0].innerHTML = `<button class="cities btn-one btn py-2 fs-5 my-3 col-12">${currentCity}</button>`;
}





let html = `            <button class="cities btn-one btn py-2 fs-5 my-3 col-12"></button>
<button class="cities btn-one btn py-2 fs-5 my-3 col-12"></button>
<button class="cities btn-one btn py-2 fs-5 my-3 col-12"></button>
<button class="cities btn-one btn py-2 fs-5 my-3 col-12"></button>
<button class="cities btn-one btn py-2 fs-5 my-3 col-12"></button>`