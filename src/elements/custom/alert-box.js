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
        super("alert-box")
        
        // This acts as a placeholder which is pased to the title text. If the user
        // binds or sets some title text, then this state will be updated to update
        // the title
        this._titleText = eclair.State(null)
        
        // Create child objects
        this._text = eclair.Text(text)
        this._title = eclair.Text(this._titleText)
            
        // Configure parent/children relation
        this._title.parent = this
        this._text.parent = this
        this.children = [this._title, this._text]
        
        // Add styles to the objects
        this.addStyle(eclair.styles.AlertBox)
        this._title.addStyle(eclair.styles.AlertBoxTitle)
        this._text.addStyle(eclair.styles.AlertBoxText)
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
            this._titleText.value(value)
            
            let hideTitle = value == null || value.trim().length == 0
            this._title.display(hideTitle? "none": "block")
        })
        
        return this
    }
    
    build() {
        return `<div>${this._title.compile()}${this._text.compile()}</div>`
    }
}