
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

        this.description = weatherJSON.weather[0].description;
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
            if(hourlyBlocks === undefined){
                hourlyBlocks = block.CreateBlock();
            } else {
                hourlyBlocks += block.CreateBlock();
            }

        })

        let dash = `
            <div id="curentContaner">
            <div id="curentTitle">
                <h2>${this.makeDate()}</h2>
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
                            <h3>${this.sunSet.toLocaleTimeString()}</h3>
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

    makeDate(){
        let dateString;

        let month = this.dateTime.getMonth() + 1;

        switch(month){
            case 1:
                dateString = "January";             
                break;
            case 2:
                dateString = "February";

            case 3:
                dateString = "March";
                break;
            case 4:
                dateString = "April";
                break;  
            case 5:
                dateString = "May";
                break;
            case 6:
                dateString = "June";
                break;  
            case 7:
                dateString = "July";
                break;      
            case 8:
                dateString = "August";
                break;
            case 9:
                dateString = "September";
                break;
            case 10:
                dateString = "October";
                break;
            case 11:
                dateString = "November";
                break;
            case 12:    
                dateString = "December";
                break;
        }   
        dateString += ` ${this.dateTime.getDate()}, ${this.dateTime.getFullYear()}`;

        return dateString;
    }
}