export class Weather{

    constructor(data){
        this.temp = data.name
        this.weather = data.weather.description
        this.icon = data.icon
        this.boise = data.name
    }

    get tempTemplate(){
        return`
        <div>${this.temp}</div>
        <div class="text-center on-hover"><i class="mdi mdi-earth mdi-spin"></i> ${this.weather}</div>
        `
    }


}