function initText() {
    // upon page load, check local storage for saved data... if none exists, populate with data from Atlanta, GA
    // However, if it does exist, populate page with that data instead

    let geoCity = localStorage.getItem("geoCity");
    let geoState = localStorage.getItem("geoState");
    let geoCountry = localStorage.getItem("geoCountry");

    if (geoCity == null ) {
        // run atlanta.js | for other if statements we will leave this out. It is assumed that if the city name is null, so is the rest of the information.
        atlantaPage.init();
    }

    else {
        sectionCityNameID[0].textContent = `${JSON.parse(geoCity)}, ${JSON.parse(geoState)}, ${JSON.parse(geoCountry)}`
    }

    let timeStamp = localStorage.getItem("currentDate");

    if (timeStamp === null) {
        // do nothing
    }

    else {
        let date = new Date(timeStamp * 1000);

        sectionCurrentDayID[0].textContent = `${date.toDateString()}`
    }

    let weatherIcon = localStorage.getItem("weatherIcon");

    if (weatherIcon === null) {
        // do nothing
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

    let temp = localStorage.getItem("temp");
    let humidity = localStorage.getItem("humidity");
    let wind_speed = localStorage.getItem("windSpeed");

    if (sectionTempID[0].textContent === null) {
        // do nothing
    }
    else {
        sectionTempID[0].textContent = `Temp: ${temp} \u00B0F`;
        sectionHumidityID[0].textContent = `Humidity: ${humidity}%`;
        sectionWindID[0].textContent = `Wind: ${wind_speed} mph`;
    };

    if (fiveDayForecast[0].innerHTML === null) {
        // do nothing
    }
    else {
        const forecastString = localStorage.getItem("dailyForecast");
        const forecastData = JSON.parse(forecastString);

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

        return `<div id="forecast-body" class="card col-lg-2 col-md col-sm m-2">
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

