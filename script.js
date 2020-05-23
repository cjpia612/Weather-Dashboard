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
                $("#oneDate").text(dayOne);
                $("#twoDate").text(dayTwo);
                $("#threeDate").text(dayThree);
                $("#fourDate").text(dayFour);
                $("#fiveDate").text(dayFive);

                
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
