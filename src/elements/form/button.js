/// TITLE Eclair Button
/// EXTENDS elements.component:EclairComponent
/// DESC An eclair button element.

Eclair.Button = function(text) {
    return new EclairButton(text);
}

/// SHARED-STYLE Eclair.styles.Button: Default button style.
Eclair.styles.Button = Eclair.Style("eclair-style-button")
    .borderSize("0px")
    .borderRadius("2px")
    .padding("8px 16px")
    .background("#eeeeee")
    .font(Eclair.theme.font)
    .background("#dddddd", "hover")
    .background("#cccccc", "active")

/// ```javascript
/// Eclair.Button("Hello there")
///     .onClick(e => {
///         alert("General Kenobi.")
///     })
/// ```
class EclairButton extends EclairComponent {
    
    /// METHOD constructor
    /// DESC Construct an eclair button with a given innerHTML.
    /// ARG text: The text shown on the button.
    /// ```javascript
    /// Eclair.Button("foo")
    /// ```
    constructor(text) {
        super()
        
        this.bindState(text, "text", value => {
            this.text = value;
            this.getElement(elem => {elem.innerHTML = value;});
        })
        
        this.setAttr("type", "button")
        this.addStyle(Eclair.styles.Button)
    }
    
    build() {
        // Build the element
        let text = this.text;
        if (text == null) {
            text = "Button"
        }
        
        if (text instanceof EclairComponent) {
            text = text.compile()
        } 
        
        return `<button>${this.text}</button>`
    }
}