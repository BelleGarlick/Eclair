/// ## Eclair TextBox
/// An eclair textbox element.
/// ```javascript
/// let userInput = eclair.State("")
/// eclair.Textbox(userInput)
///     .placeholder("Enter your name here...")
/// ```
class EclairTextBox extends EclairCustomTagComponent {
    constructor(_text) {
        super("input")
        this.setAttr("type", "text")
            .addStyle(eclair.styles.TextBox)
        
        let self = this
        
        // Binding
        this.bindState(_text, "value", value => {
            this.setAttr("value", value)
            this.getElement(elem => {elem.value = value});
        })
        
        // Override on input to adapt the state to changes made to the text
        this.overrideOnInput = null
        this._updateCallback("onInput", e => {
            if (_text instanceof EclairState) {
                e.getElement(elem => {_text.value(elem.value)})
            }

            if (this.overrideOnInput != null) {
                this.overrideOnInput(this)
            }
        })
    }
    
    // Override method, no need for doc.
    onInput(callback) {
        this.overrideOnInput = callback
        return this
    }
    
    /// ### .name
    /// Set the name attribute for a textbox (used in forms).
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
