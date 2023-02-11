export class Weather {

    constructor(data) {
        this.temp = data.main.temp
        this.feelsLike = data.main.feels_like
        this.boise = data.name
    }

    get weatherTemplate() {
        return `
        <div>${this.boise}</div>
        `
    }
    // NOTE this grabs kelvin
    // <div>${this.temp}</div>
    // <div>${this.feelsLike}</div>


}