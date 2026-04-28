
import { dayWeather, hourWeather } from "./dayHourClass.js";

export class Currentday {

    constructor( weatherJSON) {
        this.hourly = [];
        this.daily = [];

        this.dateTime = new Date(weatherJSON.dt * 1000);
        this.temperature = weatherJSON.main.temp;
        this.feelTemperature = weatherJSON.main.feels_like;
        this.maxTemperature = weatherJSON.main.temp_max;
        this.minTemperature = weatherJSON.main.temp_min;

        this.humidity = weatherJSON.main.humidity;

        this.windSpeed = weatherJSON.wind.speed;
        this.windDirection = weatherJSON.wind.deg;

        this.sunRise = new Date(weatherJSON.sys.sunrise * 1000);
        this.sunSet = new Date(weatherJSON.sys.sunset * 1000);
    }

    setDayHour(weatherJSON) {
        let curentday = this.dateTime.getDate();
        let newDate = 0;
        let newDay;

        weatherJSON.list.forEach(element => {
            let elementdate = new Date(element.dt * 1000);
            console.log(element);
            if (elementdate.getDate() === curentday) {
                this.hourly.push(new hourWeather(element));
            }else if(elementdate.getDate() == newDate){
                newDay.newBlock(element);
            } else {
                newDate = elementdate.getDate();
                newDay = new dayWeather(element);
                if(newDay !== undefined){
                    this.daily.push(newDay);
                }
            }
        });
    }

    makeCurentDash(){
        let target = document.getElementById("MainBody");
        let hourlyBlocks;

        this.hourly.forEach(block => {
            hourlyBlocks += block.CreateBlock();
        })

        let dash = `
            <div id="curentContaner">
            <div id="curentTitle">
                <h2>${this.dateTime.toLocaleDateString()}</h2>
            </div>
            <div id="curentDashbored">
                <div id="curentCondition" class="curentDashTile">

                    <img id="consitionImg" src="https://openweathermap.org/payload/api/media/file/10d%402x.png" alt="">
                    <h3>${this.description}</h3>
                </div>

                <div id="curentTemp" class="curentDashTile">
                    <h1>${this.temperature}°F</h1>
                    <div id="tempFeel">
                        <h2>Fells Like</h2>
                        <h2>${this.feelTemperature}°F</h2>
                    </div>
                    <h3>Hight: ${this.maxTemperature}°F</h3>
                    <h3>Low: ${this.minTemperature}°F</h3>
                </div>

                <div id="curentMesures" class="curentDashTile">
                    <div id="curentHumidity" class="CurMesBar">
                        <h2>Humidity</h2>
                        <h2>${this.humidity}%</h2>
                    </div>

                    <div id="curentWindSpeed" class="CurMesBar">
                        <h2>Wind</h2>
                        <h2>${this.windSpeed} mph</h2>
                    </div>

                    <div id="curentWindDirection" class="CurMesBar">
                        <h2>Wind Direction</h2>
                        <h2>${this.windDirection}°</h2>
                    </div>

                    <div id="curentSun" class="CurMesBar">
                        <div id="sunRiseBox">
                            <img src="../images/sunrise.png" alt="">
                            <h3>Sunrise</h3>
                            <h3>${this.sunRise.toLocaleTimeString()}</h3>
                        </div>
                        <div id="sunSetBox">
                            <img src="../images/sunset.png" alt="">
                            <h3>Sunset</h3>
                            <h3>${this.sunSet.toLocaleTimeString()}
                        </div>
                    </div>

                </div>
            </div>
            <div id="curentHourly">
        `

        dash += hourlyBlocks;

        dash += `
            </div>
        </div>
        `
        return dash;

    }

    makeDaily(){
        let dailyBlocks = `<div id="dailyHourly">`;

        this.daily.forEach(block => {
            dailyBlocks += block.CreateBlock();
        })
        return dailyBlocks;
    }
}