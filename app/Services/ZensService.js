import { appState } from "../AppState.js"
import { Zen } from "../Models/Zen.js"
import { sandboxApi } from "./AxiosService.js"

class ZensService{
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

        const res = await sandboxApi.put(`thomf/todos/${todoId}`, {completed : !foundTodo.completed})
        console.log('[update todo]', res.data)



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


}

export const zensService = new ZensService()