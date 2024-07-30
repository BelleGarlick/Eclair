/// TITLE Eclair Alert Box
/// EXTENDS elements.component:EclairComponent
/// DESC Create an alert box to display a message.

Eclair.AlertBox = function(_value) {
    return new EclairAlertBox(_value);
}

/// SHARED-STYLE Eclair.styles.AlertBox: Alert box style.
/// SHARED-STYLE Eclair.styles.AlertBoxTitle: Alert box title style.
/// SHARED-STYLE Eclair.styles.AlertBoxText: Alert box text style.
Eclair.styles.AlertBox = Eclair.Style("eclair-style-alert-box")
    .background(Eclair.theme.accent)
    .boxSizing("border-box")
    .borderRadius(".25rem")
    .padding(".75rem 1.25rem")
    .boxShadow("0px 0px 0px 2px rgba(0, 0, 0, 0.2) inset")
    .borderSize("1px 0px 0px 0px", " hr")
    .margin(".75rem 0px", " hr")
    .borderColor("rgba(0, 0, 0, 0.2)", " hr")
Eclair.styles.AlertBoxTitle = Eclair.Style("eclair-style-alert-title")
    .fontWeight(500)
    .fontSize("1.5rem")
    .fontColor("rgba(0, 0, 0, 0.6)")
    .width("100%")
    .marginBottom(".5rem")
Eclair.styles.AlertBoxText = Eclair.Style("eclair-style-alert-text")
    .fontColor("rgba(0, 0, 0, 0.6)")

/// ```javascript
/// let message = Ø("")
/// let alertBoxDisplay = Ø("none")
///
/// Eclair.VStack([
///     Eclair.AlertBox(message)
///         .theme("orange")
///         .title("Warning")
///         .display(alertBoxDisplay),
///
///     Eclair.Button("Click Me")
///         .onClick(() => {
///             message.value("You have been warned.")
///             alertBoxDisplay.value("block")
///         })
/// ])
/// ```
class EclairAlertBox extends EclairComponent {
    
    /// METHOD constructor
    /// DESC Construct an Eclair Alert Box with text. This text given can be an Eclair State object.
    /// ARG text: The text displayed.
    /// ```javascript
    /// Eclair.AlertBox("Invalid password")
    /// ```
    constructor(text) {
        super()
        
        // This acts as a placeholder which is pased to the title text. If the user
        // binds or sets some title text, then this state will be updated to update
        // the title
        this._titleText = Ø(null)
        
        // Add style to this object
        this.addStyle(Eclair.styles.AlertBox)
        
        // Create child objects
        this._text = null, this._title = null
        this.declareChildrenWithContext(_ => {
            this._text = Eclair.Text(text)
                .addStyle(Eclair.styles.AlertBoxText)
            
            this._title = Eclair.Text(this._titleText)
                .addStyle(Eclair.styles.AlertBoxTitle)
        })
    }
    
    /// METHOD .theme
    /// DESC Set the theme of the alert box using an Eclair Color.
    /// ARG color: An eclair color object.
    /// ```javascript
    /// Eclair.AlertBox("Invalid password")
    ///     .theme(Eclair.Color().red())
    /// ```
    theme(_color) {
        this.bindState(_color, "color", value => {
            this.background(value)
        })
        
        return this
    }
        
    /// METHOD .title
    /// DESC Set the title of the alert box.
    /// ARG text: A string or State representing the value.
    /// ```javascript
    /// Eclair.AlertBox("Invalid password")
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
        let elem = document.createElement("div")
        elem.appendChild(this._title.compile())
        elem.appendChild(this._text.compile())
        return elem
    }
}
    