export class HomePage {

    constructor(data) {
        this.image = data.largeImgUrl
        this.author = data.author
        // this.time = data.time || new Date().toLocaleTimeString('en-US')
        this.name = data.name
        this.quote = data.content
        this.author = data.author
        this.main = data.main
        this.weather = data.description
        this.icon = data.icon
        this.boise = data.name
    }



    get quoteTemplate() {
        return `
        <div>${this.quote}</div>
        <div class="text-center on-hover"><i class="mdi mdi-earth mdi-spin"></i> ${this.author}</div>
        `
    }

    get tempTemplate() {
        return `
        <div>${this.boise}</div>
        <div>${this.main}</div>
        <div class="text-center on-hover"><i class="mdi mdi-earth mdi-spin"></i> ${this.weather}</div>
        `
    }

}