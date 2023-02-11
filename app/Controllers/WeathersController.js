import { appState } from "../AppState.js"
import { zensService } from "../Services/ZensService.js"
import { Pop } from "../Utils/Pop.js"
import { setHTML } from "../Utils/Writer.js"



function _drawWeather() {
    let temp = appState.temp
    console.log('[_drawWeather]', temp)
    setHTML('weather', temp?.weatherTemplate)
}

export class WeathersController {

    constructor() {
        this.getTemp()
        appState.on('temp', _drawWeather)

    }

    async getTemp() {
        try {
            zensService.getTemp()
            // zensService.kelvin()
        } catch (error) {
            console.error(error)
            Pop.error(error)
        }
    }

}