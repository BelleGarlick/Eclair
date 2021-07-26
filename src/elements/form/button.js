class EclairButton extends EclairComponent {
    constructor(text) {
        super()
        
        // Bind state
        if (text instanceof EclairState) {
            let self = this
            text.addCallback(this.id() + "-text", function(state) {
                let newText = state.value()
                self.text = newText;
                self.getElement(elem => {elem.innerHTML = newText;});
            }, true)
        } else {
            this.text = text;
        }
        
        this.setAttr("type", "button")
        this.addStyle(eclair.styles.Button)
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