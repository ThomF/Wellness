import { appState } from "../AppState.js"
import { Zen } from "../Models/Zen.js"
import { sandboxApi } from "./AxiosService.js"

class ZensService{

    async getTodos() {
        let res = await sandboxApi.get('thomf/todos')
        console.log('[GETTING MY TODOS]', res.data)
        appState.zens = res.data.map(z => new Zen(z))
        console.log(appState.zens)
    }


    async updateTodo(todoId) {
        const todoIndex = appState.zens.findIndex(z => z.id == todoId)
        const foundTodo = appState.zens[todoIndex]

        const res = await sandboxApi.put(`thomf/todos/${todoId}`, {prepared : !foundTodo.prepared})
        console.log('[update todo]', res.data)
// TODO delete
        // appState.zens.splice

    }

    async handTodoSubmit(formData) {
        let newTodo = new Zen(formData)
        const res = await sandboxApi.post('thomf/todos/', newTodo)

        console.log('[New Todo ZensService]', res)
    }

    async getTodo(){
        let res = await sandboxApi.get('thomf/todos/')
        console.log('[my todos]',res)
    }


}

export const zensService = new ZensService()