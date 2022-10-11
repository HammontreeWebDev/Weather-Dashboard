// This script will not be called unless the user has loaded up the app for the first time or clears their local storage...

const atlantaPage = {
    init: () => {
        atlantaPage.fetchLocation();
    },

    fetchLocation: (event) => {
        let key = '2c8438a889150a71aa165db59d155f28';
        let geo = `http://api.openweathermap.org/geo/1.0/direct?q=atlanta,GA,US&appid=${key}`;

        fetch(geo)
        .then(response => {
            if (!response.ok) throw new Error(response.statusText)
            return response.json();
        })
        .then(geoData => {
            // we could sit here and re-write the entire function but instead, we can just pass on the geodata to the app.fetchWeather function in the previous script and boom! Not only will we get everything intended but atlanta will also get stored to local storage...
            app.fetchWeather(geoData);
        })
        .catch(error => {
            sectionCityNameID[0].textContent = error;
        })
    }
}