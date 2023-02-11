import { appState } from "../AppState.js"
import { zensService } from "../Services/ZensService.js"
import { setHTML, setText } from "../Utils/Writer.js"


function _drawHomeImage(){
    console.log("[drawing bg appstate]",appState.background)
    // @ts-ignore
    document.body.style.backgroundImage =  `url("${appState.background.image}")`
}

// function _drawLocaleTime(){
//     let template = ''
//     appState.time.forEach(z => template += z.timeTemplate)
//     setHTML('time', template)
//     console.log('not enough time')
// }
function _drawQuote(){
    let quote = appState.quote
    setHTML('time', quote?.quoteTemplate)
    console.log('quotes are fake')
}


export class HomepageController{

    constructor(){
        // debugger
        this.getImages()
        this.getQuote()
        console.log("home page up and running")
        appState.on('quote', _drawQuote)
        appState.on('background', _drawHomeImage)
        // this.getTime()
        
    }

    async getImages(){
        try {
            console.log("getting image")
            await zensService.getImages()
        } catch (error) {
            console.error(error)
        }
    }

    // getTime(){
    //     try {
    //         zensService.getTime()
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    async getQuote(){
        try {
            await zensService.getQuote()
        } catch (error) {
            console.error(error)
        }
    }
}