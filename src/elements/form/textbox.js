/// ## Eclair TextBox
/// An eclair textbox element.
/// <br/>**args**:
/// - _text: The value of the text element.
/// ```javascript
/// eclair.Textbox(Ø(""))
///     .placeholder("Enter your name here...")
/// ```
class EclairTextBox extends EclairCustomTagComponent {
    constructor(_text) {
        super("input")
        this.setAttr("type", "text")
            .addStyle(eclair.styles.TextBox)
        
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
    
    /// ### .name
    /// Set the name attribute for a textbox (used in forms).
    /// <br/>**args**:
    /// - _name: Set the name attribute of the element.
    /// ```javascript
    /// eclair.TextBox("Sam")
    ///     .name("fname")
    /// ```
    name(_name) {
        this.bindState(_name, "name", value => {
            this.setAttr("name", value)
        })
        
        return this
    }
    
    /// ### .placeholder
    /// Set a placeholder for a textbox.
    /// <br/>**args**:
    /// - _placeholder: Set the placeholder text to this value.
    /// ```javascript
    /// eclair.TextBox("")
    ///     .placeholder("First name...")
    /// ```
    placeholder(_placeholder) {
        this.bindState(_placeholder, "placeholder", value => {
            this.setAttr("placeholder", value)
        })
        
        return this
    }
    
    /// ### .password
    /// Set input as a password textbox.
    /// <br/>**args**:
    /// - _password: Set if the element to be of type password or not.
    /// ```javascript
    /// eclair.TextBox("Password123")
    ///     .password(true)
    /// ```
    password(_password) {
        this.bindState(_password, "password", value => {
            this.setAttr("type", value? "password":'text')
        }, state => {return state.bool()})
        
        return this
    }
    
    /// ### .maxLength
    /// Set a textbox's maximum number of characters.
    /// <br/>**args**:
    /// - _maxLength: Set the max number of characters.
    /// ```javascript
    /// eclair.TextBox("This textbox is has a maximum length")
    ///     .maxLength(280)
    /// ```
    maxLength(_maxLength) {
        this.bindState(_maxLength, "maxlength", value => {
            this.setAttr("maxlength", value)
        })
        
        return this
    } 
    
    /// INCLUDE elements.form.checkbox.enabled eclair.TextBox("Hello World")
    enabled(_enabled) {
        this.bindState(_enabled, "enabled", value => {
            this.setAttr("enabled", value ? "true" : "null")
        }, state => {return state.bool()})
        
        return this
    } 
    
    /// ### .required
    /// Set whether the textbox is required in a form.
    /// <br/>**args**:
    /// - _required: Set whether the element is required in a form.
    /// ```javascript
    /// eclair.TextBox("This textbox is required")
    ///     .required(true)
    /// ```
    required(_required) {
        this.bindState(_required, "required", value => {
            this.setAttr("required", value ? "true" : "null")
        }, state => {return state.bool()})
        
        return this
    } 
    
    /// ### .autofocus
    /// Set whether the textbox is autofocused.
    /// <br/>**args**:
    /// - _autofocus: Set whether the element is automatically focused to.
    /// ```javascript
    /// eclair.TextBox("This textbox is autofocused")
    ///     .autofocus(true)
    /// ```
    autofocus(_autofocus) {
        this.bindState(_autofocus, "autofocus", value => {
            this.setAttr("autofocus", value ? "true" : "null")
        }, state => {return state.bool()})
        
        return this
    } 
}

// PRINT EclairTextBox Needs datalist
