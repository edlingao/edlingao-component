import insertVariables from './insert-variables.js'

export default class EdsComponent extends HTMLElement{
    constructor( style, template){
        super()
        this.styleRules = style
        this.template = template
        this.insertAttributes()
        this.render()
    }

    insertAttributes(){
        const args = {...this.dataset}
        this.template = insertVariables({htmlString: this.template, args})
    }

    render(){
        const styles = document.createElement('style')
        const div = document.createElement('div')
        styles.innerText = this.styleRules
        div.innerHTML = this.template
        this.innerHTML = ''
        this.appendChild(styles)
        this.appendChild(div.firstChild)
    }
}