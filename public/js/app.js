var weatherApi = "/weather";//Client-Side (JavaScript in the Browser) api call
const  weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const weatherIcon = document.querySelector('.weatherIcon i');
const weatherCondition = document.querySelector('.weatherCondition');
const tempElement = document.querySelector('.temperature span');
const locationElement = document.querySelector('.place');
const dateElement = document.querySelector('.date');
const currentDate = new Date();
const options = { month:"long"};
const monthName = currentDate.toLocaleDateString("en-us",options);

dateElement.textContent = currentDate.getDate()+ ","+ monthName;

if ("geolocation" in navigator) {
    locationElement.textContent = "Loading...";

    navigator.geolocation.getCurrentPosition(
        function (position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`;

            fetch(apiUrl)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    // console.log(data);
                    if (data && data.address && data.address.city) {
                        const city = data.address.city;
                        showData(city);

                        // locationElement.textContent = `Your current city: ${city}`;
                    } else {
                        locationElement.textContent = "City not found!";
                    }
                })
                .catch((error) => {
                    console.error("Error fetching location data:", error);
                    locationElement.textContent = "Error fetching location data";
                });
        },
        function (error) {
            console.error("Error getting geolocation:", error.message);
            locationElement.textContent = "Error getting geolocation";
        }
    );
} else {
    console.log("Geolocation is not available on this browser");
    locationElement.textContent = "Geolocation is not available on this browser";
}
weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(search.value);
    locationElement.textContent = "Loading...";
    weatherIcon.className="";
    tempElement.textContent="";
    weatherCondition.textContent="";
    showData(search.value);
});
function showData(city){
getWeatherData(city,(result)=>{
    // console.log(result);

    if(result.cod==200){
        if(result.weather[0].description.toLowerCase().includes("rain")){
            weatherIcon.className="wi wi-day-rain";

        }
        else if(result.weather[0].description.toLowerCase().includes("fog")){
            weatherIcon.className="wi wi-day-fog";

        }
        else{
                    weatherIcon.className="wi wi-day-cloudy";

        }
        locationElement.textContent=result.name;
        tempElement.textContent= (result.main.temp-273.5).toFixed(2)+String.fromCharCode(176);
        weatherCondition.textContent=result.weather[0].description.toUpperCase();
 
    }
    else{
        locationElement.textContent = "City not found";


    }
});
}
function getWeatherData(city,callback){
    const locationApi = weatherApi + "?address="+ city;
    fetch(locationApi).then((response)=>{
        response.json().then((response)=>{
            callback(response);
        })
    })
}