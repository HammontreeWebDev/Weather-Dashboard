// declare any global var associated with ID's and elements
let citySearchID = $("#city-search")
let tableBody = $("#weather-table");

const app = {
    init: () => {
        citySearchID.on('keydown', (event)=> {
            if (event.keyCode === 13) {
                app.fetchWeather();
            }
        });
    },
    fetchWeather: (event) => {
        let cityName = citySearchID.value;
        let key = '2c8438a889150a71aa165db59d155f28';
        let lang = 'en';
        let units = 'imperial';
        let oneCallurl = `https://api.openweathermap.org/data/3.0/onecall?`;
        let geo = `http://api.openweathermap.org/geo/1.0/direct?q=orlando,FL,US&appid=${key}`;

        //fetch city name entered into field and get lat and long from geocoder in order to pass into the one call url
        fetch(geo)
        .then(response =>{
            if (!response.ok) throw new Error(response.statusText)
            return response.json();
        })
        .then(geoData => {
            app.showWeather(geoData);
        })
        .catch(console.error)
    },
    showWeather: (response) => {
        console.log(response);
    }
}

app.init();


// create function for autocomplete of data that uses the weather API
// $(function () {
//     var availableCities = [];

//     citySearchID.autocomplete({
//         source: availableCities
//     });
// });

//   add relevant event listeners