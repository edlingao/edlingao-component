import insertVariables from './insert-variables.js'

export default class EdsComponent extends HTMLElement{
    constructor( style, template){
        super()
        this.styleRules = style
        this.template = template
        this.insertVariables = insertVariables;
        this.insertAttributes()
        this.render()
    }

    insertAttributes(){
        const args = {...this.dataset}
        this.template = this.insertVariables({htmlString: this.template, args})
    }

    render(){
        const styles = document.createElement('style')
        const div = document.createElement('div')
        styles.innerText = this.styleRules
        div.innerHTML = this.template
        this.innerHTML = this.template
        this.prepend(styles)
    }
}