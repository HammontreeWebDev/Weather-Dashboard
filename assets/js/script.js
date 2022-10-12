function initText() {
    // This section is retrieving the last searched for location name for the top section and checking if local storage exists... if it does not exist, it will default to Atlanta, GA...

    let geoCity = localStorage.getItem("geoCity");
    let geoState = localStorage.getItem("geoState");
    let geoCountry = localStorage.getItem("geoCountry");

    if (geoCity == null ) {
        atlantaPage.init();
    }

    else {
        sectionCityNameID[0].textContent = `${JSON.parse(geoCity)}, ${JSON.parse(geoState)}, ${JSON.parse(geoCountry)}`
    }

    // -----------------------------------------------//
    // This section will check local storage to see if a value exists pertaining to the current day that weather in a particular location was searched for.. if it does not exist, the value will default to atlantaPage.init() from atlanta.js
    let timeStamp = localStorage.getItem("currentDate");

    if (timeStamp === null) {
        // default to atlanta stats found in atlanta.js
        atlantaPage.init();
    }

    else {
        let date = new Date(timeStamp * 1000);

        sectionCurrentDayID[0].textContent = `${date.toDateString()}`
    }
    // -------------------------------------------//
    // get weather icon from local storage if it exists and place it on page
    let weatherIcon = localStorage.getItem("weatherIcon");

    if (weatherIcon === null) {
        // Do Nothing.. if the local storage is null in the first if statement, it should be here too.. don't want to run the function several times
    }

    else if (weatherIcon == '01d') {
        sectionWeatherIconID.attr('src', icon01d);
    }
    else if (weatherIcon == '01n') {
        sectionWeatherIconID.attr('src', icon01n);
    }
    else if (weatherIcon == '02d') {
        sectionWeatherIconID.attr('src', icon02d);
    }
    else if (weatherIcon == '02n') {
        sectionWeatherIconID.attr('src', icon02n);
    }
    else if (weatherIcon == '03d') {
        sectionWeatherIconID.attr('src', icon03d);
    }
    else if (weatherIcon == '03n') {
        sectionWeatherIconID.attr('src', icon03n);
    }
    else if (weatherIcon == '04d') {
        sectionWeatherIconID.attr('src', icon04d);
    }
    else if (weatherIcon == '04n') {
        sectionWeatherIconID.attr('src', icon04n);
    }
    else if (weatherIcon == '09d') {
        sectionWeatherIconID.attr('src', icon09d);
    }
    else if (weatherIcon == '09n') {
        sectionWeatherIconID.attr('src', icon09n);
    }
    else if (weatherIcon == '10d') {
        sectionWeatherIconID.attr('src', icon10d);
    }
    else if (weatherIcon == '10n') {
        sectionWeatherIconID.attr('src', icon10n);
    }
    else if (weatherIcon == '11d') {
        sectionWeatherIconID.attr('src', icon11d);
    }
    else if (weatherIcon == '11n') {
        sectionWeatherIconID.attr('src', icon11n);
    }
    else if (weatherIcon == '13d') {
        sectionWeatherIconID.attr('src', icon13d);
    }
    else if (weatherIcon == '13n') {
        sectionWeatherIconID.attr('src', icon13n);
    }
    else if (weatherIcon == '50d') {
        sectionWeatherIconID.attr('src', icon50d);
    }
    else if (weatherIcon == '50n') {
        sectionWeatherIconID.attr('src', icon50n);
    };

    // get temp, humidity, and wind speed from local storage and if it exists, show for current day section
    let temp = localStorage.getItem("temp");
    let humidity = localStorage.getItem("humidity");
    let wind_speed = localStorage.getItem("windSpeed");

    if (sectionTempID[0].textContent === null) {
        // Do Nothing.. if the local storage is null in the first if statement, it should be here too.. don't want to run the function several times
    }
    else {
        sectionTempID[0].textContent = `Temp: ${temp} \u00B0F`;
        sectionHumidityID[0].textContent = `Humidity: ${humidity}%`;
        sectionWindID[0].textContent = `Wind: ${wind_speed} mph`;
    };
    // -------------------------------------------//
    
    // show five day forecast for last searched item using local storage if it exists...
    if (fiveDayForecast[0].innerHTML === null) {
        // Do Nothing.. if the local storage is null in the first if statement, it should be here too.. don't want to run the function several times
    }
    else {
        const forecastString = localStorage.getItem("dailyForecast");
        const forecastData = JSON.parse(forecastString);
        console.log(forecastData);

        fiveDayForecast[0].innerHTML = forecastData.map((day, idx) => {
            if (idx <= 4){

                let weatherIcon = day.weather[0].icon;

                if (weatherIcon == '01d') {
                    weatherIcon = icon01d
                }
                else if (weatherIcon == '01n') {
                    weatherIcon = icon01n
                }
                else if (weatherIcon == '02d') {
                    weatherIcon = icon02d;
                }
                else if (weatherIcon == '02n') {
                    weatherIcon = icon02n
                }
                else if (weatherIcon == '03d') {
                    weatherIcon = icon03d
                }
                else if (weatherIcon == '03n') {
                    weatherIcon = icon03n
                }
                else if (weatherIcon == '04d') {
                    weatherIcon = icon04d
                }
                else if (weatherIcon == '04n') {
                    weatherIcon = icon04n
                }
                else if (weatherIcon == '09d') {
                    weatherIcon = icon09d
                }
                else if (weatherIcon == '09n') {
                    weatherIcon = icon09n
                }
                else if (weatherIcon == '10d') {
                    weatherIcon = icon10d
                }
                else if (weatherIcon == '10n') {
                    weatherIcon = icon10n
                }
                else if (weatherIcon == '11d') {
                    weatherIcon = icon11d
                }
                else if (weatherIcon == '11n') {
                    weatherIcon = icon11n
                }
                else if (weatherIcon == '13d') {
                    weatherIcon = icon13d
                }
                else if (weatherIcon == '13n') {
                    weatherIcon = icon13n
                }
                else if (weatherIcon == '50d') {
                    weatherIcon = icon50d
                }
                else if (weatherIcon == '50n') {
                    weatherIcon = icon50n
                }
                
                let date = new Date(day.dt * 1000);

        return `<div id="forecast-body" class="card col mx-2">
                <div class="card-body p-2">
                    <h5 id="forecast-date" class="card-title">${date.toDateString()}</h5>
                    <img id="forecast-icon" src=${weatherIcon} alt="weather icon">
                    <ul class="p-0">
                        <li id="forecast-temp" class="list-style">Temp: ${day.temp.day} </li>
                        <li id="forecast-wind" class="list-style">Wind: ${day.wind_speed} </li>
                        <li id="forecast-humidity" class="list-style">Humidity: ${day.humidity} </li>
                    </ul>
                </div>
            </div>`
            }
        }).join('');
    }
    
};

initText();

// either show error on invalid input or fire this alert on page load:
// alert("If using the autocompleteForm feature, for U.S. Cities, do NOT include the country code in the city input text field.");

// site is fully functional for the most part... note: commas are appearing after local storage is set and page is reloaded where the data is being pulled from local storage vs. live response... live response data looks good.. need to fix comma issue... also need to work on the left side to save city name that was searched for so that user can click the button and the data will be shown again... not sure how but its obviously possible...