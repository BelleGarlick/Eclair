/// ## Eclair Button
/// An eclair Button.
/// <br/>**args**:
/// - text: The text value within the button.
/// ```javascript
/// eclair.Button("Foo")
///     .onClick(e => {
///         alert("Bar")
///     })
/// ```
class EclairButton extends EclairComponent {
    constructor(text) {
        super()
        
        this.bindState(text, "text", value => {
            this.text = value;
            this.getElement(elem => {elem.innerHTML = value;});
        })
        
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