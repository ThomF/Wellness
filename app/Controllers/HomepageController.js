import { appState } from "../AppState.js"
import { zensService } from "../Services/ZensService.js"
import { Pop } from "../Utils/Pop.js"
import { setHTML, setText } from "../Utils/Writer.js"


function _drawHomeImage() {
    // console.log("[drawing bg appstate]", appState.background)
    // @ts-ignore
    document.body.style.backgroundImage = `url("${appState.background.image}")`
}


function _drawQuote() {
    let quote = appState.quote
    setHTML('time', quote?.quoteTemplate)
    // console.log('quotes are fake')
}

function _drawWeather() {
    let temp = appState.temp
    console.log('[_drawWeather]', temp)
    setHTML('weather', temp?.tempTemplate)
}

export class HomepageController {

    constructor() {
        // debugger
        this.getImages()
        this.getQuote()
        this.getTemp()
        // console.log("home page up and running")
        appState.on('quote', _drawQuote)
        appState.on('background', _drawHomeImage)
        appState.on('temp', _drawWeather)

    }

    async getImages() {
        try {
            // console.log("getting image")
            await zensService.getImages()
        } catch (error) {
            console.error(error)
        }
    }



    async getQuote() {
        try {
            await zensService.getQuote()
        } catch (error) {
            console.error(error)
        }
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