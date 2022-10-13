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
let citiesEl = $('.cities');

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

let searchHistory = {
    cityName: [],
    countryName: [],
    stateName: [],
    currentDate: [],
    currentTemp: [],
    currentWind: [],
    currentHumidity: [],
    currentWeatherIcon: [],
    forecast: [],
};

const app = {
    init: () => {
        citySearchID.on('keydown', (event) => {
            if (event.keyCode === 13) {
                app.fetchLocation();
            }
        });

        countrySearchID.on('keydown', (event) => {
            if (event.keyCode === 13) {
                app.fetchLocation();
            }
        });

        stateSearchID.on('keydown', (event) => {
            if (event.keyCode === 13) {
                app.fetchLocation();
            }
        });

        searchBtn.on('click', app.fetchLocation);

    },
    fetchLocation: (event) => {
        let cityName = citySearchID.val();
        let stateName = stateSearchID.val();
        let countryName = countrySearchID.val();
        // reset value to clear text form after it has been stored in a variable
        citySearchID[0].value = '';
        stateSearchID[0].value = '';
        countrySearchID[0].value = '';

        let key = '2c8438a889150a71aa165db59d155f28';
        let geo = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateName},${countryName}&appid=${key}`;

        //fetch city name entered into field and get lat and long from geocoder in order to pass into the one call url
        fetch(geo)
            .then(response => {
                if (!response.ok) throw new Error(response.statusText)
                return response.json();
            })
            .then(geoData => {
                // makes sure that live responses are being recorded into the search history array.
                searchHistory.cityName.unshift(geoData[0].name);
                searchHistory.stateName.unshift(geoData[0].state);
                searchHistory.countryName.unshift(geoData[0].country);
                app.fetchWeather(geoData);
            })
            .catch(error => {
                alert(`Whoops! Something went wrong! \n${error} \nPlease make sure you include only city names in the city field, state codes (i.e. GA and NOT Georgia) in the state field, and country codes in the country field in order to ensure the best possible experience`);
            });
    },

    fetchWeather: (response) => {

        // set local storage so that the last searched for location will display on the page by default when the page is refreshed or closed and re-opened.

        localStorage.setItem("geoCity", JSON.stringify(response[0].name));

        localStorage.setItem("geoState", JSON.stringify(response[0].state));

        localStorage.setItem("geoCountry", JSON.stringify(response[0].country));

        let geoCity = localStorage.getItem("geoCity");
        let geoState = localStorage.getItem("geoState");
        let geoCountry = localStorage.getItem("geoCountry");

        sectionCityNameID[0].textContent = `${JSON.parse(geoCity)}, ${JSON.parse(geoState)}, ${JSON.parse(geoCountry)}`

        let lat = response[0].lat;
        let lon = response[0].lon;
        let key = '2c8438a889150a71aa165db59d155f28';

        let oneCallUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${key}`;

        fetch(oneCallUrl)
            .then(response => {
                if (!response.ok) throw new Error(response.statusText)
                return response.json();
            })
            .then(weatherData => {
                // instead of recording the live responses here, we are going to do them in the showWeather property.
                app.showWeather(weatherData);
            })
            .catch(error => {
                alert(`Whoops! Something went wrong! \n${error}`);
            })
    },

    showWeather: (response) => {

        // Current Day:

        localStorage.setItem("currentDate", response.current.dt)

        let timeStamp = response.current.dt;

        let date = new Date(timeStamp * 1000);

        sectionCurrentDayID[0].textContent = `${date.toDateString()}`

        let weatherIcon = response.current.weather[0].icon;

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

        localStorage.setItem("weatherIcon", response.current.weather[0].icon);
        localStorage.setItem("temp", response.current.temp);
        localStorage.setItem("humidity", response.current.humidity);
        localStorage.setItem("windSpeed", response.current.wind_speed);

        let temp = response.current.temp;
        let humidity = response.current.humidity;
        let wind_speed = response.current.wind_speed;

        sectionTempID[0].textContent = `Temp: ${temp} \u00B0F`;
        sectionHumidityID[0].textContent = `Humidity: ${humidity}%`;
        sectionWindID[0].textContent = `Wind: ${wind_speed} mph`;

        // set to search History array
        searchHistory.currentWeatherIcon.unshift(response.current.weather[0].icon);
        searchHistory.currentTemp.unshift(temp);
        searchHistory.currentWind.unshift(wind_speed);
        searchHistory.currentHumidity.unshift(humidity);
        searchHistory.currentDate.unshift(date);

        // Five Day Forecast:
        let firstDay = response.daily[1];
        let secondDay = response.daily[2];
        let thirdDay = response.daily[3];
        let fourthDay = response.daily[4];
        let fifthDay = response.daily[5];
        let forecastStorage = [firstDay, secondDay, thirdDay, fourthDay, fifthDay];
        localStorage.setItem("dailyForecast", JSON.stringify(forecastStorage));

        // place in search history:
        searchHistory.forecast.unshift(forecastStorage);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

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

        // reusable function for searchHistory section
        function searchHistoryWeatherIcon(index) {
            let historyIcon = searchHistory.currentWeatherIcon[index];

                    if (historyIcon == '01d') {
                        sectionWeatherIconID.attr('src', icon01d);
                    }
                    else if (historyIcon == '01n') {
                        sectionWeatherIconID.attr('src', icon01n);
                    }
                    else if (historyIcon == '02d') {
                        sectionWeatherIconID.attr('src', icon02d);
                    }
                    else if (historyIcon == '02n') {
                        sectionWeatherIconID.attr('src', icon02n);
                    }
                    else if (historyIcon == '03d') {
                        sectionWeatherIconID.attr('src', icon03d);
                    }
                    else if (historyIcon == '03n') {
                        sectionWeatherIconID.attr('src', icon03n);
                    }
                    else if (historyIcon == '04d') {
                        sectionWeatherIconID.attr('src', icon04d);
                    }
                    else if (historyIcon == '04n') {
                        sectionWeatherIconID.attr('src', icon04n);
                    }
                    else if (historyIcon == '09d') {
                        sectionWeatherIconID.attr('src', icon09d);
                    }
                    else if (historyIcon == '09n') {
                        sectionWeatherIconID.attr('src', icon09n);
                    }
                    else if (historyIcon == '10d') {
                        sectionWeatherIconID.attr('src', icon10d);
                    }
                    else if (historyIcon == '10n') {
                        sectionWeatherIconID.attr('src', icon10n);
                    }
                    else if (historyIcon == '11d') {
                        sectionWeatherIconID.attr('src', icon11d);
                    }
                    else if (historyIcon == '11n') {
                        sectionWeatherIconID.attr('src', icon11n);
                    }
                    else if (historyIcon == '13d') {
                        sectionWeatherIconID.attr('src', icon13d);
                    }
                    else if (historyIcon == '13n') {
                        sectionWeatherIconID.attr('src', icon13n);
                    }
                    else if (historyIcon == '50d') {
                        sectionWeatherIconID.attr('src', icon50d);
                    }
                    else if (historyIcon == '50n') {
                        sectionWeatherIconID.attr('src', icon50n);
                    }
        }

        // reusable function for the current weather
        function weatherHistory(index) {
            sectionCityNameID[0].textContent = `${searchHistory.cityName[index]}, ${searchHistory.stateName[index]}, ${searchHistory.countryName[index]}`;
            sectionCurrentDayID[0].textContent = searchHistory.currentDate[index].toDateString();
            sectionTempID[0].textContent = `Temp: ${searchHistory.currentTemp[index]} \u00B0F`;
            sectionHumidityID[0].textContent = `Humidity: ${searchHistory.currentHumidity[index]}%`;
            sectionWindID[0].textContent = `Wind: ${searchHistory.currentWind[index]} mph`;
        }

        function forecastHistory(index) {
            fiveDayForecast[0].innerHTML = searchHistory.forecast[index].map((day, idx) => {

                let weatherIcon = day.weather[0].icon;
    
                if (idx >= 0 && idx <= 5) {
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

        // handle search history:
        for (var i = 0; i < citiesEl.length; i++) {
            if (searchHistory.cityName[i]) {
                // show buttons each time a city is searched for
                citiesEl[i].style.display = 'flex';
                citiesEl[i].textContent = `${searchHistory.cityName[i]}, ${searchHistory.stateName[i]}, ${searchHistory.countryName[i]}`;
            }

                citiesEl.on('click', (event => {

                    if (event.target === citiesEl[0]) {
                        weatherHistory(0);
                        searchHistoryWeatherIcon(0);
                        forecastHistory(0);
                    }
                    else if (event.target === citiesEl[1]) {
                        weatherHistory(1)
                        searchHistoryWeatherIcon(1);
                        forecastHistory(1);
                    }
                    else if (event.target === citiesEl[2]) {
                        weatherHistory(2)
                        searchHistoryWeatherIcon(2);
                        forecastHistory(2);
                    }
                    else if (event.target === citiesEl[3]) {
                        weatherHistory(3)
                        searchHistoryWeatherIcon(3);
                        forecastHistory(3);
                    }
                    else if (event.target === citiesEl[4]) {
                        weatherHistory(4)
                        searchHistoryWeatherIcon(4);
                        forecastHistory(4);

                    }
                }))

            }
    }
}

app.init();
