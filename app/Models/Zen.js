export class Zen{

    constructor(data){
        this.id = data.id
        this.weather = data.weather
        this.image = data.image
        this.quotes = data.quotes
        this.description = data.description
        this.prepared = data.completed || false
    }



    get ZenTodo(){
        return /*HTML */`
        <div class="col-12 text-center">
        <input ${this.prepared ? 'checked' : '' } onchange="app.ZensController.UpdateTodo('${this.id}')"
        class="form-check-input" type="checkbox" value="" id="todoCheck">
            <span>${this.description}</span>
        </div>
        
        `

    }


}