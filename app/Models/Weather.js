export class Weather {

    constructor(data) {
        this.temp = data.main
        this.weather = data.weather.description
        this.icon = data.icon
        this.boise = data.name
    }

    get weatherTemplate() {
        return `
        <div>${this.temp}</div>
        <div>${this.boise}</div>
        <div>${this.weather}</div>
        `
    }


}