# Weather Dashboard
## Description
A fully functional and interactive dashboard that allows the user to check current and future conditions anywhere in the world.

## Features
The first time that the dashboard is loaded up in your browser, you will be presented with the current and future weather conditions of Atlanta, Georgia, US. Each time that you search for a city, a search history of the last 5 cities searched will begin to appear. In order to view recently searched cities, all you need to do is click on the button that has the city name you wish to display. When you refresh the page, your search history will reset, however, the last city that you entered into the dashboard will be available to view until you search for a new city, regardless of how many times you refresh the page.
\
\
The dashboard features the usage of 3 API's.\
1. Countries Now API found at (https://countriesnow.space/api/v0.1) to obtain information for the autocomplete feature in the search fields.
2. GeoCoding API found at (https://openweathermap.org/api) to obtain latitude and longitude of cities, so that we can properly use the One Call API.
3. One Call API found at (https://openweathermap.org/api) to obtain current and future weather conditions for anywhere in the world.

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```
## Deployed Application
Link to deployed application:
https://hammontreewebdev.github.io/Weather-Dashboard/
<img width="1728" alt="Screen Shot 2022-10-13 at 9 58 50 AM" src="https://user-images.githubusercontent.com/113649683/195618063-933d3b72-f342-419c-ae2e-33610bdc9011.png">
