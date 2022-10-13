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
            .catch(error => {
                alert(`Whoops! Something went wrong! \n${error}`);
            })
    },

    showCities: (response) => {

        const cityNames = response.data.map(({ city }) => city);

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
            .catch(error => {
                alert(`Whoops! Something went wrong! \n${error}`);
            });
    },

    showCountries: (response) => {

        const countryNames = response.data.map(({ Iso2 }) => Iso2);

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
            .catch(error => {
                alert(`Whoops! Something went wrong! \n${error}`);
            })
    },

    showStates: (response) => {
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
autoCompleteForm.init();