export class HomePage{

    constructor(data){
        this.image = data.imgUrl
        this.author = data.author
        this.time = data.time || new Date().toLocaleTimeString('en-US')
        this.name = data.name
        this.quote = data.content
        this.author = data.author
    }

    get timeTemplate(){
        return`
        <div>${this.time}</div>
        `
    }

    get quoteTemplate(){
        return`
        <div>${this.quote}</div>
        <div class="text-center on-hover"><i class="mdi mdi-earth mdi-spin"></i> ${this.author}</div>
        `
    }
}