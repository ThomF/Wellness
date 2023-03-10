import { appState } from "../AppState.js";
import { zensService } from "../Services/ZensService.js";
import { getFormData } from "../Utils/FormHandler.js";
import { Pop } from "../Utils/Pop.js";
import { setHTML, setText } from "../Utils/Writer.js";

function displayTime() {
    zensService.displayTime()

    zensService.autoSecond()

}

function _drawTodos() {
    let template = ''
    appState.zens.forEach(z => template += z.ZenTodo)
    setHTML('todo-list', template)

    // NOTE counts the checked
    zensService.todoCounter()
}

function _weatherToggle() {
    let weatherToggle = appState.weatherToggle == 'fahrenheit' ? '<span class="mdi mdi-temperature-fahrenheit"></span><div class="text-center text-light" id="currentTempF">F</div>' : '<span class="mdi mdi-temperature-celsius"></span><div class="text-center text-light" id="currentTempC">C</div>'

    document.body.className = appState.weatherToggle

    setHTML('currentTemp', weatherToggle)
}

export class ZensController {

    constructor() {
        // console.log("zenscontroller")
        displayTime()
        this.getTodos()
        appState.on('zens', _drawTodos)

        appState.on('weatherToggle', _weatherToggle)
        _weatherToggle()
    }


    async exileNote(noteId) {
        try {
            if (await Pop.confirm('Are you sure you want to Exile this Todo?')) {
                await zensService.exileNote(noteId)
            }
        } catch (error) {
            console.error(error)
            Pop.error(error)
        }
    }

    async handleTodoSubmit() {

        try {
            // console.log("handle the submit")
            // @ts-ignore
            event.preventDefault()
            // @ts-ignore
            let form = event.target
            let formData = getFormData(form)
            await zensService.handTodoSubmit(formData)
            // @ts-ignore
            form.reset()
        } catch (error) {
            console.error(error)
            Pop.error(error)
        }
    }

    async UpdateTodo(todoId) {
        try {

            await zensService.updateTodo(todoId)
        } catch (error) {
            console.error(error)
            Pop.error(error)
        }
    }

    async getTodos() {
        try {
            await zensService.getTodos()
        } catch (error) {
            console.error(error)
            Pop.error(error)
        }
    }

    toggleWeather() {
        console.log("[toggling the weather]")
        // zensService.toggleWeather()
        zensService.kelvin()
    }

}