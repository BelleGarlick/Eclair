/// ## Eclair Alert Box
/// Create an alert box to display a message.
/// <br/>**args**:
/// - text: Text message to display.
/// ```javascript
/// eclair.AlertBox("You have been signed out.")
///     .title("Warning")
///     .theme(eclair.Color().warning)
/// ```
class EclairAlertBox extends EclairComponent {
    constructor(text) {
        super()
        
        this._titleText = eclair.State(null)
        this._title = eclair.Text(this._titleText)
            .fontWeight(500)
            .fontSize("1.5rem")
            .display("none")
            .fontColor("rgba(0, 0, 0, 0.6)")
            .width("100%")
        
        // Add binding here for the text object
        this._text = eclair.Text(text)
            .fontColor("rgba(0, 0, 0, 0.6)")
        
        // Configure parent/children relation
        this._title.parent = this
        this._text.parent = this
        this.children = [this._title, this._text]
        
        this._title.getStyleSheet()["margin-bottom"] = ".5rem"
        
        this
            .background(eclair.theme.accent)
            .borderRadius(".25rem")
            .padding(".75rem 1.25rem")
        
        let styleSheet = this.getStyleSheet(" hr")
        styleSheet["border"] = "0px"
        styleSheet["margin-top"] = ".75rem"
        styleSheet["margin-bottom"] = ".75rem"
        styleSheet["border-top"] = "1px solid rgba(0, 0, 0, 0.2)"
        this.getStyleSheet()["box-shadow"] = "0px 0px 0px 2px rgba(0, 0, 0, 0.2) inset"
    }
    
    /// ### .theme
    /// Set the theme of the alert box using an Eclair Color.
    /// <br/>**args**:
    /// - color: An eclair color object.
    /// ```javascript
    /// eclair.AlertBox("Invalid password")
    ///     .theme(eclair.Color().red())
    /// ```
    theme(_color) {
        this.bindState(_color, "color", value => {
            this.background(value)
        })
        
        return this
    }
        
    /// ### .title
    /// Set the title of the alert box.
    /// <br/>**args**:
    /// - text: A string or State representing the value.
    /// ```javascript
    /// eclair.AlertBox("Invalid password")
    ///     .title("Error")
    /// ```
    title(_text) {        
        this.bindState(_text, "title", value => {
            this._titleText.value(state.value())
            
            let hideTitle = _text == null || _text.trim().length == 0
            this._title.display(hideTitle? "none": "block")
        })
        
        return this
    }
    
    build() {
        return `<div>${this._title.compile()}${this._text.compile()}</div>`
    }
}