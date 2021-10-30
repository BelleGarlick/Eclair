/// TITLE Eclair Hidden Input
/// EXTENDS elements.custom-tag:EclairCustomTagComponent
/// DESC An eclair hidden input element. The hidden input element binds to a value. To alter the value of the hidden input you must alter the state. You can pass a direct value, however, this value cannot be changed.

Eclair.HiddenInput = function(_value) {
    return new EclairHiddenInput(_value);
}

/// ```javascript
/// Eclair.Form([
///     Eclair.HiddenInput("secret-input")
///         .name("User secret key")
/// ])
/// ```
class EclairHiddenInput extends EclairCustomTagComponent {
    
    /// METHOD constructor
    /// DESC Construct an eclair hidden input.
    /// ARG value: Value of the hidden input. 
    /// ```javascript
    /// Eclair.HiddenInput("secret-input")
    /// ```
    constructor(value) {
        super("input")
        
        this.setAttr("type", "hidden")
        
        this._buildStyle = false

        this.bindState(value, "value", v => {
            this.setAttr("value", v)
            this.getElement(e => {e.value = v})
        })
    }
    
    /// METHOD .name
    /// DESC Set the name attribute for a element (used in forms).
    /// ARG value: Value of the name attribute. 
    /// ```javascript
    //  Eclair.HiddenInput("Foo")
    ///     .name("Bar")
    /// ```
    name(value) {
        this.bindState(value, "name", v => {
            this.setAttr("name", v)
        })
        
        return this
    }
}
