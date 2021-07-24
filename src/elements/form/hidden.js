/// ## Eclair EclairHiddenInput
/// An eclair hidden input element. The hidden input element binds to a value. To alter the value of the hidden input you must alter the state. You can pass a direct value, however, this value cannot be changed.
/// ```javascript
/// let hiddenValue = eclair.State("secret-key")
/// eclair.EclairHiddenInput(hiddenValue)
///     .name("User secret key")
/// ```
class EclairHiddenInput extends EclairCustomTagComponent {
    constructor(_value) {
        super("input")
        this.setAttr("type", "hidden")

        if (_value instanceof EclairState) {
            let self = this
            _value.addCallback(this.id() + "-value", function(state) {
                let newState = state.value()
                
                self.setAttr("value", newState)
                self.getElement(e => {e.value = newState})
            }, true)
        } else {
            this.setAttr("value", _value)
            this.getElement(e => {e.value = _value})
        }
    }
    
    /// ### .name
    /// Set the name attribute for a element (used in forms).
    /// ```javascript
    /// eclair.EclairHiddenInput("Fixed")
    ///     .name("hiddenElement")
    /// ```
    name(_name) {
        if (_name instanceof EclairState) {
            let self = this
            _name.addCallback(this.id() + "-name", function(state) {
                self.setAttr("name", state.value())
            }, true)
        } else {
            this.setAttr("name", _name)
        }
        
        return this
    }
}