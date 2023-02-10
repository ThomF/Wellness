import { appState } from "../AppState.js";
import { zensService } from "../Services/ZensService.js";
import { getFormData } from "../Utils/FormHandler.js";
import { Pop } from "../Utils/Pop.js";
import { setHTML } from "../Utils/Writer.js";


function _drawTodos(){
    let template = ''
    appState.zens.forEach(z => template += z.ZenTodo)
    setHTML('todo-list', template)
}

export class ZensController{

    constructor(){
        console.log("zenscontroller")

        this.getTodos()
        appState.on('zens', _drawTodos)
        
    }

    async handleTodoSubmit(){
        
    try {
        console.log("handle the submit")
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

    async UpdateTodo(todoId){
        try {
            console.log("updating")
            await zensService.updateTodo(todoId)
        } catch (error) {
            console.error(error)
            Pop.error(error)
        }
    }

    async getTodos(){
        try {
            await zensService.getTodos()
        } catch (error) {
            console.error(error)
            Pop.error(error)
        }
    }
    


}