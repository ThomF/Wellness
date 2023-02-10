import { appState } from "../AppState.js"
import { zensService } from "../Services/ZensService.js"


function _drawHomeImage(){
    console.log("[drawing bg appstate]",appState.background)
    document.body.style.backgroundImage =  `url("${appState.background.image}")`
}

export class HomepageController{

    constructor(){
        this.getImages()
        console.log("home page up and running")
        // _drawHomeImage()
        appState.on('background', _drawHomeImage)
    }

    async getImages(){
        try {
            console.log("getting image")
            await zensService.getImages()
        } catch (error) {
            console.error(error)
        }
    }
}