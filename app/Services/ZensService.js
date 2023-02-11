import { appState } from "../AppState.js"
import { HomePage } from "../Models/HomePage.js"
import { Zen } from "../Models/Zen.js"
import { setText } from "../Utils/Writer.js"
import { sandboxApi } from "./AxiosService.js"

class ZensService{
    todoCounter() {
        console.log("counting")
        let myTodo = appState.zens
    let todoCount = myTodo.filter(zens => zens.completed).length
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
        console.log('[GETTING MY TODOS]', res.data)
        appState.zens = res.data.map(z => new Zen(z))
        console.log(appState.zens)
    }


    async updateTodo(todoId) {
        const todoIndex = appState.zens.findIndex(z => z.id == todoId)
        const foundTodo = appState.zens[todoIndex]

        const res = await sandboxApi.put(`thomf/todos/${todoId}`, {completed: !foundTodo.completed})
        console.log('[update todo]', res.data)

        appState.zens.splice(todoIndex, 1, new Zen(res.data))
        appState.emit('zens')

    }

    async handTodoSubmit(formData) {
        let newTodo = new Zen(formData)
        const res = await sandboxApi.post('thomf/todos/', newTodo)

        console.log('[New Todo ZensService]', res)
        let getTodo = new Zen(res.data)
        appState.zens.push(getTodo)
        appState.emit('zens')
        appState.zen = getTodo
    }

    async getTodo(){
        let res = await sandboxApi.get('thomf/todos/', appState.zens)
        console.log('[my todos]',res.data)
        
    }

    

    // STUB Home Page Background

    async getImages() {
        const res = await sandboxApi.get('images/')
        appState.background = new HomePage(res.data)
        // console.log(res.data)
    }

    // getTime(){
    //     console.log('timetimetime')
    //     let activeTime = appState.time

    //     // @ts-ignore
    //     activeTime.time = new Date().toLocaleTimeString('en-US') 
    // }

    async getQuote() {
        let res = await sandboxApi.get('quotes', appState.quote)
        console.log('[GETTING QUOTE]',res.data)
        appState.quote = new HomePage(res.data)
    }

}

export const zensService = new ZensService()