// declare any global var associated with ID's and elements
let citySearchID = $("#city-search")
let tableBody = $("#weather-table");

const app = {
    init: () => {
        citySearchID.on('keydown', (event)=> {
            if (event.keyCode === 13) {
                app.fetchLocation();
            }
        });
    },
    fetchLocation: (event) => {
        let cityName = $('input:text').val();
        let key = '2c8438a889150a71aa165db59d155f28';
        let geo = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},FL,US&appid=${key}`;

        //fetch city name entered into field and get lat and long from geocoder in order to pass into the one call url
        fetch(geo)
        .then(response =>{
            if (!response.ok) throw new Error(response.statusText)
            return response.json();
        })
        .then(geoData => {
            app.showLocation(geoData);
        })
        .catch(console.error)
    },
    showLocation: (response) => {
        console.log(response)
        // works!!
        console.log(response[0].lat);
        let lat = response[0].lat;
        let lon = response[0].lon;
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