$(document).ready(function(){

    $(".btn").click(function(){
        event.preventDefault();
        var city= $("#cityInput").val();

        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=6b8ef924d7aa3ffc3be582be83541797",
            method: "GET",
            dataType: "jsonp",
            success: function(data){
                console.log(data);
            }
        });

    });


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
