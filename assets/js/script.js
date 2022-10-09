// declare any global var associated with ID's and elements
let citySearchID = $("#city-search")
let stateSearchID = $("#state-search")
let countrySearchID = $("country-search")
let searchBtn = $("#searchBtn");

const app = {
    init: () => {
        // add event listener if user presses the enter key when finished with the country
        countrySearchID.on('keydown', (event)=> {
            if (event.keyCode === 13) {
                app.fetchLocation();
            }
        });
        // add event listener if user presses the search button
        searchBtn.on('click', app.fetchLocation);

    },
    fetchLocation: (event) => {
        let cityName = citySearchID.val();
        let stateName = stateSearchID.val();
        let countryName = countrySearchID.val();
        let key = '2c8438a889150a71aa165db59d155f28';
        let geo = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateName},${countryName}&appid=${key}`;

        //fetch city name entered into field and get lat and long from geocoder in order to pass into the one call url
        fetch(geo)
        .then(response =>{
            if (!response.ok) throw new Error(response.statusText)
            return response.json();
        })
        .then(geoData => {
            app.fetchWeather(geoData);
        })
        .catch(console.error)
    },
    // take lat and long from user entered city name and pass them into a variable that will then be passed into a template literal string for the one call url so that we can get the weather without having to put in a lon and lat ourselves!!! WOOOHOOO.. Makin it easy for the user.
    fetchWeather: (response) => {
        console.log(response)
        // works!!
        console.log(response[0].lat);
        console.log(response[0].lon);
        let lat = response[0].lat;
        let lon = response[0].lon;
        let key = '2c8438a889150a71aa165db59d155f28';
        let oneCallUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${key}`;

        fetch(oneCallUrl)
        .then(response => {
            if (!response.ok) throw new Error(response.statusText)
            return response.json();
        })
        .then(weatherData => {
            app.showWeather(weatherData);
        })
        .catch(console.error)
    },
    showWeather: (response) => {
        console.log(response);
    }
}

// initialize the page upon loading
app.init();


// create function for autocomplete of data that uses the weather API
// $(function () {
//     var availableCities = [];

//     citySearchID.autocomplete({
//         source: availableCities
//     });
// });

//   add relevant event listeners