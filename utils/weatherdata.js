const request = require("request");//request 3 rd party api

const openWeatherMap = {
    BASIC_URL : "https://api.openweathermap.org/data/2.5/weather?q=",
    SECRET_KEY : "0ec0402f8ed508b17ee9e0e31e5e3b00"

};
const weatherData = (address,callback)=>{
    const url = openWeatherMap.BASIC_URL + encodeURIComponent(address) + "&APPID=" + openWeatherMap.SECRET_KEY;
    console.log(url);
    request({url,json:true}, (error,data)=>{
        if(error){
            callback(true,"unable to fetch data "+ error);
        }
        callback(false,data.body);
    });

};
    

module.exports = weatherData;