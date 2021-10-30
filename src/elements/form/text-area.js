/// TITLE Eclair Text Area
/// EXTENDS elements.custom-tag:EclairCustomTagComponent
/// DESC An eclair text area object.

Eclair.TextArea = function(_value) {
    return new EclairTextArea(_value);
}

/// SHARED-STYLE Eclair.styles.TextArea: Text area style.
Eclair.styles.TextArea = Eclair.Style("eclair-style-text-area")

/// ```javascript
/// Eclair.Form([
///     Eclair.TextArea("Foo")
/// ])
/// ```
class EclairTextArea extends EclairCustomTagComponent { 
    
    /// METHOD constructor
    /// DESC Construct an Eclair Text Area element with a predefined value.
    /// ARG value: Text within the text area.
    /// ```javascript
    /// Eclair.TextArea("Foo")
    /// ```
    constructor(value) {
        super("textarea")
        
        // Bind value
        this.bindState(value, "value", v => {
            this.innerHTML(v)
            this.getElement(e => {e.value = v})
        })
        
        this._overrideOnInput = null
        this._updateCallback("onInput", (e, ev) => {
            if (value instanceof EclairState) {value.value(e.getElement().value)}
            if (this._overrideOnInput != null) {this._overrideOnInput(e, ev)} 
        })
        
        this.addStyle(Eclair.styles.TextArea)
    }
    
    // Override on input to allow for binding on input to the state.
    onInput(callback) {
        this._overrideOnInput = callback
        return this
    }
}
