$(document).ready(function(){
    var lat = [];
    var lon = [];

    $(".btn").click(function(){
        event.preventDefault();
        currentWeather();
        fiveDay();
    });

    function currentWeather(){
        var city= $("#cityInput").val();
        var currentDate = moment().format("MMMM Do YYYY");
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=6b8ef924d7aa3ffc3be582be83541797",
            method: "GET",
            dataType: "jsonp",
            success: function(data){
                $("#city").text(city+" " + currentDate);
                $("#temp").text("Temperature: " + data.main.temp+ 'F');
                $("#humidity").text("Humidity: " + data.main.humidity + '%');
                $("#wind").text("Wind Speed: " + data.wind.speed+ ' MPH');

                lat.push(data.coord.lat);
                lon.push(data.coord.lon);

                getUV();

                lat.splice(0,1);
                lon.splice(0,1);
          
            }
        });
        
    }
    function getUV(){
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat[0] + "&lon=" + lon[0] +"&appid=6b8ef924d7aa3ffc3be582be83541797",
            method: "GET",
            dataType: "json",
            success: function (data){
                $("#UVI").text("UV Index: " + data.value);

                if (data.value <= 2.99) {                  
                    $("#UVI").css({"background-color": "limegreen", "color": "white", "display": "block", "padding": "1.5%", "max-width": "20%"});
                } else if (data.value >= 3 & data.value <= 5.99) {
                     $("#UVI").css({"background-color": "gold", "color": "white", "display": "block", "padding": "1.5%", "max-width": "20%"});
                } else if (data.value >= 6 & data.value <= 7.99) {
                     $("#UVI").css({"background-color": "orange", "color": "white", "display": "block", "padding": "1.5%", "max-width": "20%"});
                } else if (data.value >= 8) {
                     $("#UVI").css({"background-color": "red", "color": "white", "display": "block", "padding": "1.5%", "max-width": "20%"});
                };
            }
        });
    }

    function fiveDay(){
        var city= $("#cityInput").val();
        var dayOne= moment().add(1, 'days').format('L');
        var dayTwo= moment().add(2, 'days').format('L');
        var dayThree= moment().add(3, 'days').format('L');
        var dayFour= moment().add(4, 'days').format('L');
        var dayFive= moment().add(5, 'days').format('L');

        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial" + "&appid=6b8ef924d7aa3ffc3be582be83541797",
            method: "GET",
            dataType: "jsonp",
            success: function(data){
                //  To get the date for the 5 day forecast
                $("#oneDate").text(dayOne);
                $("#twoDate").text(dayTwo);
                $("#threeDate").text(dayThree);
                $("#fourDate").text(dayFour);
                $("#fiveDate").text(dayFive);

                // To get the weather icon for the forecast from 12PM Afternoon

                $("#oneIcon").attr("src", "http://openweathermap.org/img/w/" + data.list[4].weather[0].icon + ".png");
                $("#twoIcon").attr("src", "http://openweathermap.org/img/w/" + data.list[12].weather[0].icon + ".png");
                $("#threeIcon").attr("src", "http://openweathermap.org/img/w/" + data.list[20].weather[0].icon + ".png");
                $("#fourIcon").attr("src", "http://openweathermap.org/img/w/" + data.list[28].weather[0].icon + ".png");
                $("#fiveIcon").attr("src", "http://openweathermap.org/img/w/" + data.list[36].weather[0].icon + ".png");

                // To get the temperature for the forecast from 12PM Afternoon

                $("#oneTemp").text("Temp: " + data.list[4].main.temp + "F");
                $("#twoTemp").text("Temp: " + data.list[12].main.temp + "F");
                $("#threeTemp").text("Temp: " + data.list[20].main.temp + "F");
                $("#fourTemp").text("Temp: " + data.list[28].main.temp + "F");
                $("#fiveTemp").text("Temp: " + data.list[36].main.temp + "F");

                // To get the humidity for the forecast from 12PM Afternoon. 

                $("#oneHum").text("Humidity: " + data.list[4].main.humidity + "%");
                $("#twoHum").text("Humidity: " + data.list[12].main.humidity + "%");
                $("#threeHum").text("Humidity: " + data.list[20].main.humidity + "%");
                $("#fourHum").text("Humidity: " + data.list[28].main.humidity + "%");
                $("#fiveHum").text("Humidity: " + data.list[36].main.humidity + "%");

            } 
        });
        
    }
});
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
// WHEN I open the weather dashboard
// THEN I am presented with the last searched city forecast
