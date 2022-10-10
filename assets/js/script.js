// declare any global var associated with ID's and elements
let citySearchID = $("#city-search")
let stateSearchID = $("#state-search")
let countrySearchID = $("#country-search")
let searchBtn = $("#searchBtn");

const app = {
    init: () => {
        // add event listener if user presses the enter key when finished with the country
        countrySearchID.on('keydown', (event) => {
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
            .then(response => {
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
    // need to show data on page here:
    showWeather: (response) => {
        console.log(response);
    }
}

const autoCompleteForm = {
    init: () => {
        autoCompleteForm.fetchCities();
    },

    fetchCities: (event) => {


        fetch('https://countriesnow.space/api/v0.1/countries/population/cities')
            .then(response => {
                if (!response.ok) throw new Error(response.statusText)
                return response.json();
            })
            .then(citiesData => {
                autoCompleteForm.showCities(citiesData);
            })
            .catch(console.error)
    },

    showCities: (response) => {
        // use .map to place all city names in an array
        const cityNames = response.data.map(({ city }) => city);
        // set data to local storage to use as source for autocompleteForm form
        localStorage.setItem("cityNames", JSON.stringify(cityNames));
        const cityNameStorage = localStorage.getItem("cityNames");

        $(function () {
            citySearchID.autocomplete({

                minLength: 3,
                autoFocus: true,
                source: JSON.parse(cityNameStorage),
            });
        });
        autoCompleteForm.fetchCountries();
    },

    fetchCountries: (event) => {

        fetch('https://countriesnow.space/api/v0.1/countries/iso')
            .then(response => {
                if (!response.ok) throw new Error(response.statusText)
                return response.json();
            })
            .then(countriesData => {
                autoCompleteForm.showCountries(countriesData);
            })
            .catch(console.error);
    },

    showCountries: (response) => {
        // console.log(response);
        // use .map to place all city names in an array
        const countryNames = response.data.map(({ Iso2 }) => Iso2);
        // console.log(countryNames);
        localStorage.setItem("countryNames", JSON.stringify(countryNames));
        const countryNameStorage = localStorage.getItem("countryNames");

        $(function () {
            countrySearchID.autocomplete({
                autoFocus: true,
                source: JSON.parse(countryNameStorage),
            });
        });

        autoCompleteForm.fetchStates();
    },

    fetchStates: (event) => {

        fetch('https://countriesnow.space/api/v0.1/countries/states')
            .then(response => {
                if (!response.ok) throw new Error(response.statusText)
                return response.json();
            })
            .then(statesData => {
                autoCompleteForm.showStates(statesData);
            })
            .catch(console.error)
    },

    showStates: (response) => {
        // console.log(response.data[232].states);
        const stateCodes = response.data[232].states.map(({ state_code }) => state_code);
        localStorage.setItem("stateCodes", JSON.stringify(stateCodes));
        const stateCodeStorage = localStorage.getItem("stateCodes");

        $(function () {
            stateSearchID.autocomplete({
                autoFocus: true,
                source: JSON.parse(stateCodeStorage),
            })
        })
    }
}

// initialize the page upon loading
app.init();
autoCompleteForm.init();

// either show error on invalid input or fire this alert on page load:
// alert("If using the autocompleteForm feature, for U.S. Cities, do NOT include the country code in the city input text field.");