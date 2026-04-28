

export class dayWeather{

    constructor(weatherBlock) {
        // Initialize dayHour properties if needed
        let dateTime = new Date(weatherBlock.dt * 1000);

        this.date = {month: dateTime.getMonth(), day: dateTime.getDate(), dayName: this.DayNumToName(dateTime.getDay())};
        this.hourly = [];
        this.newBlock(weatherBlock);
    }

    newBlock(weatherBlock) {
        this.hourly.push(new hourWeather(weatherBlock));
    }

    CreateBlock(){
        let day = ` 
                <div class="dayBar">
                <h2>${this.date.dayName}, ${this.date.month}/${this.date.day}</h2>
                <div class="dayHourBar">`

        this.hourly.forEach(block => {
            day += block.CreateBlock();
        })

        day += `</div></div>`
        return day;
    }

    DayNumToName(num){
        switch(num){
            case 0: return "Sunday";
            case 1: return "Monday";
            case 2: return "Tuesday";
            case 3: return "Wednesday";
            case 4: return "Thursday";
            case 5: return "Friday";
            case 6: return "Saturday";
        }       
    }
}

export class hourWeather{

    constructor(weatherBlock) {
        // Initialize dayHour properties if needed
        let dateTime = new Date(weatherBlock.dt * 1000);
        //3 houre blocks
        this.timeBlock = dateTime.getHours();
        
        this.temperature = weatherBlock.main.temp;
        this.condition = weatherBlock.weather[0].description;
        
        


    }

    CreateBlock(){

        let block = `
                <div class="curHourTile">
                    <h3>${this.GetTime()}</h3>
                    <img src="https://openweathermap.org/payload/api/media/file/10d%402x.png" alt="">
                    <h3>${this.condition}</h3>
                    <h3>${this.temperature}°F</h3>
                </div>
        `
        return block;
    }

    GetTime(){
        let time = this.timeBlock;  
        if(time > 12){
            time -= 12;
            return time + ":00 PM";
        }else if(time === 0){
            return "12:00 AM";
        }else if(time === 12){
            return "12:00 PM";
        }else{
            return time + ":00 AM";
        }       
    }
}