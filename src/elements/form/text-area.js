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
        
        // Bind on key up
        this._overrideOnKeyUp = null
        this._updateCallback("onKeyUp", e => {
            if (_value instanceof EclairState) {
                _value.value(e.getElement().value)
            }
            
            if (this._overrideOnKeyUp != null) {
                this._overrideOnKeyUp(e)
            } 
        })
        
        // Bind on key down
        this._overrideOnKeyDown = null
        this._updateCallback("onKeyDown", e => {
            if (_value instanceof EclairState) {
                _value.value(e.getElement().value)
            }
            
            if (this._overrideOnKeyDown != null) {
                this._overrideOnKeyDown(e)
            } 
        })
        
        this.addStyle(eclair.styles.TextArea)
    }
    
    onKeyUp(callback) {
        this._overrideOnKeyUp = callback
        return this
    }
    
    onKeyDown(callback) {
        this._overrideOnKeyDown = callback
        return this
    }
}