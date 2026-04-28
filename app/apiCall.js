
import { Currentday } from "./currentClass.js";

let key = "e0217525f98640b799f35f2348c81445";
let key2 = "9d1d45c0027e9178ed578fbeb5679ac6";
let data;
let LatLon;
let weatherDataCurrent;
let weatherDataForecastDayByDay;

let curentConditions;

export function getData() {


    CityTolatLon("Indianapolis");
    console.log("Getting data...");
}

function CallAPI() {

    //Conver City State to Lat and Lon
   

    //use city state lat and lon to call API
   // let url = `https://api.openweathermap.org/data/3.0/onecall?lat=${LatLon.lat}&lon=${LatLon.lon}&exclude={part}&appid=${key}`;
}

//API Call to get Lat and Lon from City State
async function CityTolatLon(city) {
    let url = `http://api.openweathermap.org/geo/1.0/direct?q=${city},IN,USA&limit=5&appid=${key}`;
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        data = await response.json();
        LatLon = {lat: data[0].lat, lon: data[0].lon};
        console.log(data);
        console.log(LatLon);
        getWeatherCurrent();
    } catch (error) {
        console.error("Error fetching city coordinates:", error);
    }
}

async function getWeatherCurrent() {
    let url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${LatLon.lat}&lon=${LatLon.lon}&units=imperial&appid=${key}`;
    
    try {
        let response = await fetch(url2);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        weatherDataCurrent = await response.json();
        curentConditions = new Currentday(weatherDataCurrent);
        getWeatherForecast();
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

async function getWeatherForecast() {
    let url3 = `https://api.openweathermap.org/data/2.5/forecast?lat=${LatLon.lat}&lon=${LatLon.lon}&units=imperial&appid=${key}`;
    try {
        let response = await fetch(url3);               
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        weatherDataForecastDayByDay = await response.json();
        curentConditions.setDayHour(weatherDataForecastDayByDay);
        console.log("Fully Populated Current Conditions Object:");
        DisplayData()
    } catch (error) {
        console.error("Error fetching weather forecast data:", error);
    }   
}

function DisplayData() {
    let target = document.getElementById("MainBody");
    target.innerHTML = curentConditions.makeCurentDash();
    target.innerHTML += curentConditions.makeDaily()
}   