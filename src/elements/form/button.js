class EclairButton extends EclairComponent {
    constructor(text) {
        super()
        
        this.text = text;
        this.setAttr("type", "button")
        this.addStyle(eclair.styles.Button)
    }
    
    value(newText) {
        this.text = newText;
        this.getElement(elem => {
            let html = newText;
            if (typeof(html) != "string") {
                html = html.compile()
            }
            elem.innerHTML = html;
        });
        return this
    }
    
    // overriden, no need to document.
    build() {
        // Build the element
        let text = this.text;
        if (text == null) {
            text = "Button"
        }
        return `<button>${this.text}</button>`
    }
}