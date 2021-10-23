/// ## Eclair Text Area
/// An eclair text area object.
/// <br/>**args**:
/// - text: The text value within the text area.
/// ```javascript
/// eclair.TextArea("Foo")
/// ```
class EclairTextArea extends EclairCustomTagComponent {
    constructor(_value) {
        super("textarea")
        
        // Bind value
        this.bindState(_value, "value", value => {
            this.innerHTML(value)
            this.getElement(e => {e.value = value})
        })
        
        this._overrideOnInput = null
        this._updateCallback(keys[k], (e, ev) => {
            if (_value instanceof EclairState) {_value.value(e.getElement().value)}
            if (this._overrideOnInput != null) {this._overrideOnInput(e, ev)} 
        })
        
        this.addStyle(eclair.styles.TextArea)
    }
    
    onInput(callback) {
        this._overrideOnInput = callback
        return this
    }
}