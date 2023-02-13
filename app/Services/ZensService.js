import { appState } from "../AppState.js"
import { HomePage } from "../Models/HomePage.js"
import { Weather } from "../Models/Weather.js"
import { Zen } from "../Models/Zen.js"
import { setHTML, setText } from "../Utils/Writer.js"
import { sandboxApi } from "./AxiosService.js"

class ZensService {


    // STUB TODO SECTION 


    todoCounter() {
        // console.log("counting")
        let myTodo = appState.zens
        let completedCount = myTodo.filter(zens => zens.completed).length
        let todoCount = myTodo.length - completedCount
        setText('todo-count', todoCount)
    }

    async exileNote(noteId) {
        const res = await sandboxApi.delete(`thomf/todos/${noteId}`)
        console.log('[EXILE TODO]', res.data)

        let todoIndex = appState.zens.findIndex(todo => todo.id == noteId)

        appState.zens.splice(todoIndex, 1)
        appState.emit('zens')

    }

    async getTodos() {
        let res = await sandboxApi.get('thomf/todos')
        // console.log('[GETTING MY TODOS]', res.data)
        appState.zens = res.data.map(z => new Zen(z))
        console.log(appState.zens)
    }


    async updateTodo(todoId) {
        const todoIndex = appState.zens.findIndex(z => z.id == todoId)
        const foundTodo = appState.zens[todoIndex]

        const res = await sandboxApi.put(`thomf/todos/${todoId}`, { completed: !foundTodo.completed })
        // console.log('[update todo]', res.data)

        appState.zens.splice(todoIndex, 1, new Zen(res.data))
        appState.emit('zens')

    }

    async handTodoSubmit(formData) {
        let newTodo = new Zen(formData)
        const res = await sandboxApi.post('thomf/todos/', newTodo)

        // console.log('[New Todo ZensService]', res)
        let getTodo = new Zen(res.data)
        appState.zens.push(getTodo)
        appState.emit('zens')
        appState.zen = getTodo
    }

    async getTodo() {
        let res = await sandboxApi.get('thomf/todos/', appState.zens)
        // console.log('[my todos]', res.data)

    }



    // STUB Home Page Things

    //NOTE - background image
    async getImages() {
        const res = await sandboxApi.get('images/')
        appState.background = new HomePage(res.data)
        // console.log(res.data)
    }
    //NOTE - quotes
    async getQuote() {
        let res = await sandboxApi.get('quotes', appState.quote)
        // console.log('[GETTING QUOTE]', res.data)
        appState.quote = new HomePage(res.data)
    }
    //NOTE - temperature
    async getTemp() {
        let res = await sandboxApi.get('weather')
        // appState.temp = res.data
        console.log('[getting the Weather]', res.data)
        appState.temp = new Weather(res.data)
        // let temp = res.formData
        // let c = temp.timezone

        // setText('note', c)
        // res.data.results
    }

    async kelvin() {
        let weather = await sandboxApi.get('weather')
        let kelvin = weather.data.main.temp
        let c = kelvin - 273.15
        let f = c * (9 / 5) + 32

        let celsius = c.toFixed(0)
        let fahrenheit = f.toFixed(0)
        // console.log('[Showing data in async kelvin]', kelvin)
        console.log('[Kelvin]', kelvin)
        console.log('[Celsius]', celsius)
        console.log('[Fahrenheit]', fahrenheit)

        if (appState.weatherToggle == 'celsius') {
            appState.weatherToggle = 'fahrenheit'
            setText('currentTempF', fahrenheit)

        }
        else if (appState.weatherToggle == 'fahrenheit') {
            appState.weatherToggle = 'celsius'
            setText('currentTempC', celsius)

        }

        // setText('currentC', celsius)
    }

    toggleWeather() {
        if (appState.weatherToggle == 'fahrenheit') {
            appState.weatherToggle = 'celsius'
        }
        else if (appState.weatherToggle == 'celsius') {
            appState.weatherToggle = 'fahrenheit'
        }
    }

    //NOTE - TIME
    displayTime() {
        let time = new Date().toLocaleTimeString('en-US')
        setText('currentTime', time)
    }

    autoSecond() {
        setInterval(this.displayTime, 1000)
    }
}

export const zensService = new ZensService()