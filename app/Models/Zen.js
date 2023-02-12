export class Zen {

    constructor(data) {
        this.id = data.id
        this.weather = data.weather
        this.image = data.image
        this.quotes = data.quotes
        this.description = data.description
        this.completed = data.completed
    }



    get ZenTodo() {
        return /*HTML */`
        <div class="row text-center">
        
        <div class="col-1"></div>
        <div class="col-1 mt-1">
        <input ${this.completed ? 'checked' : ''} onchange="app.zensController.UpdateTodo('${this.id}')"
        class="form-check-input" type="checkbox" name="completed" value="" id="todoCheck">
        </div>
        <div class="col-7">
        <h4>${this.description}</h4>
        </div>
        <div class="col-1 text-center align-items-center">
        <h3 class="mdi mdi-delete-circle " onclick="app.zensController.exileNote('${this.id}')"></h3>
        </div>
        <div class="col-2"></div>

        

        </div>
        `

    }


}