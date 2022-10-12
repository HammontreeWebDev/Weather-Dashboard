// declare any global var associated with ID's and elements
let citySearchID = $("#city-search");
let stateSearchID = $("#state-search");
let countrySearchID = $("#country-search");
let searchBtn = $("#searchBtn");
let highlightWeatherID = $('#highlight-weather');
let sectionCityNameID = $('#section-city-name');
let sectionCurrentDayID = $('#section-current-day');
let sectionWeatherIconID = $('#section-weather-icon');
let sectionTempID = $('#section-temp');
let sectionWindID = $('#section-wind');
let sectionHumidityID = $('#section-humidity');
let fiveDayForecast = $('#five-day-forecast');
let errorSectionID = $('#error-section');

// set all weather icons to a variable
let icon01d = 'assets/img/01d.png';
let icon01n = 'assets/img/01n.png';
let icon02d = 'assets/img/02d.png';
let icon02n = 'assets/img/02n.png';
let icon03d = 'assets/img/03d.png';
let icon03n = 'assets/img/03n.png';
let icon04d = 'assets/img/04d.png';
let icon04n = 'assets/img/04n.png';
let icon09d = 'assets/img/09d.png';
let icon09n = 'assets/img/09n.png';
let icon10d = 'assets/img/10d.png';
let icon10n = 'assets/img/10n.png';
let icon11d = 'assets/img/11d.png';
let icon11n = 'assets/img/11n.png';
let icon13d = 'assets/img/13d.png';
let icon13n = 'assets/img/13n.png';
let icon50d = 'assets/img/50d.png';
let icon50n = 'assets/img/50n.png';


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
            .catch(error => {
                alert(`Whoops! Something went wrong! \n${error} \nPlease make sure you include only city names in the city field, state codes (i.e. GA and NOT Georgia) in the state field, and country codes in the country field in order to ensure the best possible experience`);
            });
    },
    // take lat and long from user entered city name and pass them into a variable that will then be passed into a template literal string for the one call url so that we can get the weather without having to put in a lon and lat ourselves!!! WOOOHOOO.. Makin it easy for the user.
    fetchWeather: (response) => {
        console.log(response)

        // set local storage for retrieved name of city entered to display to top section, this will ensure that the next time the user visits the page, the last city they looked up will be available to them
        // -----------------------------------//
        localStorage.setItem("geoCity", JSON.stringify(response[0].name));

        localStorage.setItem("geoState", JSON.stringify(response[0].state));

        localStorage.setItem("geoCountry", JSON.stringify(response[0].country));

        let geoCity = localStorage.getItem("geoCity");
        let geoState = localStorage.getItem("geoState");
        let geoCountry = localStorage.getItem("geoCountry");

        sectionCityNameID[0].textContent = `${JSON.parse(geoCity)}, ${JSON.parse(geoState)}, ${JSON.parse(geoCountry)}`
        // -----------------------------------//

        console.log(response[0].lat);
        console.log(response[0].lon);
        let lat = response[0].lat;
        let lon = response[0].lon;
        let key = '2c8438a889150a71aa165db59d155f28';
        // specify imperial units
        let oneCallUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${key}`;

        fetch(oneCallUrl)
            .then(response => {
                if (!response.ok) throw new Error(response.statusText)
                return response.json();
            })
            .then(weatherData => {
                app.showWeather(weatherData);
            })
            .catch(error => {
                alert(`Whoops! Something went wrong! \n${error}`);
            })
    },
    // need to show data on page here:
    showWeather: (response) => {
        console.log(response.current);
        // add current date (dt) for top section to local storage for initText() and update page based on response
        localStorage.setItem("currentDate", response.current.dt)

        let timeStamp = response.current.dt;

        let date = new Date(timeStamp * 1000);

        sectionCurrentDayID[0].textContent = `${date.toDateString()}`
        // ---------------------------------------//
        // add current weather icon for top section to local storage for initText() and update page based on response
        localStorage.setItem("weatherIcon", response.current.weather[0].icon);

        let weatherIcon = response.current.weather[0].icon;

        // set up if else if statement to evaluate the value of the weather icon and set text to appropriate img src
        if (weatherIcon == '01d') {
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
        }
        // ---------------------------------------// 
        // For top section (current day) set temp, wind, and humidity to local storage for textinit() and then place on page based on response
        // console.log(response.current.temp.day);
        // console.log(response.current.humidity);
        // console.log(response.current.wind_speed);

        localStorage.setItem("temp", response.current.temp);
        localStorage.setItem("humidity", response.current.humidity);
        localStorage.setItem("windSpeed", response.current.wind_speed);

        let temp = response.current.temp;
        let humidity = response.current.humidity;
        let wind_speed = response.current.wind_speed;

        sectionTempID[0].textContent = `Temp: ${temp} \u00B0F`;
        sectionHumidityID[0].textContent = `Humidity: ${humidity}%`;
        sectionWindID[0].textContent = `Wind: ${wind_speed} mph`

        // ---------------------------------------// 
        // Five Day Forecast:
        console.log(response.daily[1]);

        // set local storage for text.init();
        let firstDay = response.daily[1];
        let secondDay = response.daily[2];
        let thirdDay = response.daily[3];
        let fourthDay = response.daily[4];
        let fifthDay = response.daily[5];
        let forecastStorage = [firstDay, secondDay, thirdDay, fourthDay, fifthDay];
        localStorage.setItem("dailyForecast", JSON.stringify(forecastStorage));

        // write five day forecast out to HTML
        fiveDayForecast[0].innerHTML = response.daily.map((day, idx) => {

            let weatherIcon = day.weather[0].icon;

            if (idx > 0 && idx <= 5) {
                if (weatherIcon == '01d') {
                    weatherIcon = icon01d;
                }
                else if (weatherIcon == '01n') {
                    weatherIcon = icon01n;
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
        // ---------------------------------------// 
    }
}

app.init();