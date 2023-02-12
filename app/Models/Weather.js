export class Weather {

    constructor(data) {
        this.temp = data.main.temp
        this.feelsLike = data.main.feels_like
        this.boise = data.name
        this.icon = data.weather[0].description
    }

    get weatherTemplate() {
        return `
        <div>${this.boise}</div>
        `
    }
    // <img src="${this.icon}">
    // NOTE this grabs kelvin
    // <div>${this.temp}</div>
    // <div>${this.feelsLike}</div>


}