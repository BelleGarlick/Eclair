/// TITLE Eclair TextBox
/// EXTENDS elements.custom-tag:EclairCustomTagComponent
/// DESC An eclair textbox element.

Eclair.TextBox = function(text) {
    return new EclairTextBox(text);
}

/// SHARED-STYLE Eclair.styles.TextBox: TextBox style.
Eclair.styles.TextBox = Eclair.Style("eclair-style-text-box")
    .fontSize("14px")
    .padding("12px 16px")
    .width("100%")
    .borderSize("0px")
    .borderRadius("3px")
    .background("#eeeeee")
    .font(Eclair.theme.font)
    .background("#dddddd", "hover")
    .background("#cccccc", "active")
    .background("#bbbbbb", "focused")

/// ```javascript
/// let username = Ø("")
///
/// Eclair.Textbox(username)
///     .maxLength(16)
///     .placeholder("Enter your username here...")
/// ```
class EclairTextBox extends EclairCustomTagComponent {
    
    /// METHOD constructor
    /// DESC Construct the TextBox element with a predefined text value.
    /// ARG text: The value of the text element.
    /// ```javascript
    /// Eclair.TextBox("Sam")
    /// ```
    constructor(_text) {
        super("input")
        this.setAttr("type", "text")
            .addStyle(Eclair.styles.TextBox)
        
        let self = this
        
        this.valueBinding = _text instanceof EclairState? _text : Ø(_text == null? "": _text)
        
        // Binding
        this.bindState(this.valueBinding, "value", value => {
            this.setAttr("value", value)
            this.getElement(elem => {elem.value = value});
        })
        
        // Override on input to adapt the state to changes made to the text
        this.overrideOnInput = null
        this._updateCallback("onInput", (e, ev) => {
            if (self.valueBinding instanceof EclairState) {e.getElement(elem => {self.valueBinding.value(elem.value)})}
            if (this.overrideOnInput != null) {this.overrideOnInput(this, ev)}
        })
    }
    
    // Override method, no need for doc.
    onInput(callback) {
        this.overrideOnInput = callback
        return this
    }
    
    /// METHOD .name
    /// DESC Set the name attribute for a textbox (used in forms).
    /// ARG value: Set the name attribute of the element.
    /// ```javascript
    /// Eclair.TextBox("Sam")
    ///     .name("fname")
    /// ```
    name(value) {
        this.bindState(value, "name", v => {
            this.setAttr("name", v)
        })
        
        return this
    }
    
    /// METHOD .placeholder
    /// DESC Set a placeholder for a textbox.
    /// ARG value: Set the placeholder text to this value.
    /// ```javascript
    /// Eclair.TextBox("")
    ///     .placeholder("First name...")
    /// ```
    placeholder(value) {
        this.bindState(value, "placeholder", v => {
            this.setAttr("placeholder", v)
        })
        
        return this
    }
    
    /// METHOD .password
    /// DESC Set input as a password textbox.
    /// ARG value: Set if the element to be of type password or not.
    /// ```javascript
    /// Eclair.TextBox("Password123")
    ///     .password(true)
    /// ```
    password(value) {
        this.bindState(value, "password", v => {
            this.setAttr("type", v? "password":'text')
        }, state => {return state.bool()})
        
        return this
    }
    
    /// METHOD .maxLength
    /// DESC Set a textbox's maximum number of characters.
    /// ARG value: Set the max number of characters.
    /// ```javascript
    /// Eclair.TextBox("This textbox is has a maximum length")
    ///     .maxLength(280)
    /// ```
    maxLength(value) {
        this.bindState(value, "maxlength", v => {
            this.setAttr("maxlength", v)
        })
        
        return this
    } 
    
    /// METHOD .enabled
    /// DESC Enable / Disable the element.
    /// ARG enabled: If true, the user can modify this element.
    /// ```javascript
    /// Eclair.TextBox("Hello World")
    ///     .enabled(true)
    /// ```
    enabled(_enabled) {
        this.bindState(_enabled, "enabled", value => {
            this.setAttr("enabled", value ? "true" : "null")
        }, state => {return state.bool()})
        
        return this
    } 
        
    /// METHOD .required
    /// DESC Set whether the textbox is required in a form.
    /// ARG value: Set whether the element is required in a form
    /// ```javascript
    /// Eclair.TextBox("This textbox is required")
    ///     .required(true)
    /// ```
    required(value) {
        this.bindState(value, "required", v => {
            this.setAttr("required", v ? "true" : "null")
        }, state => {return state.bool()})
        
        return this
    } 
        
    /// METHOD .autofocus
    /// DESC Set whether the textbox is autofocused.
    /// ARG value: Set whether the element is automatically focused to.
    /// ```javascript
    /// Eclair.TextBox("This textbox is autofocused")
    ///     .autofocus(true)
    /// ```
    autofocus(value) {
        this.bindState(value, "autofocus", v => {
            this.setAttr("autofocus", v ? "true" : "null")
        }, state => {return state.bool()})
        
        return this
    } 
}

// PRINT EclairTextBox Needs datalist
