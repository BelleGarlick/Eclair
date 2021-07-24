/// ## Eclair EclairTextBox
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
        
        this._updateCallback("onInput", e => {
            if (self.overrideOnCreate != null) {
                overrideOnCreate(self)
            }
        })
        
        this.setAttr("value", _text)
        if (_text instanceof EclairState) {
            _text.addCallback(this.id() + "-value", function(state) {
                let newState = state.value()
                self.setAttr("value", newState)
                self.getElement(elem => {elem.value = newState});
            }, true)
            
            this._updateCallback("onInput", e => {
                e.getElement(elem => {_text.value(elem.value)})
                
                if (self.overrideOnCreate != null) {
                    overrideOnCreate(self)
                }
            })
        }
    }
    
    /// ### .name
    /// Set the name attribute for a textbox (used in forms).
    /// ```javascript
    /// eclair.TextBox("Sam")
    ///     .name("fname")
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
    
    /// ### .placeholder
    /// Set a placeholder for a textbox.
    /// ```javascript
    /// eclair.TextBox("")
    ///     .placeholder("First name...")
    /// ```
    placeholder(_placeholder) {
        if (_placeholder instanceof EclairState) {
            let self = this
            _placeholder.addCallback(this.id() + "-placeholder", function(state) {
                self.setAttr("placeholder", state.value())
            }, true)
        } else {
            this.setAttr("placeholder", _placeholder)
        }
        
        return this
    }
    
    /// ### .password
    /// Set input as a password textbox.
    /// ```javascript
    /// eclair.TextBox("Password123")
    ///     .password(true)
    /// ```
    password(_password) {
        if (_password instanceof EclairState) {
            let self = this
            _password.addCallback(this.id() + "-password", function(state) {
                self.setAttr("type", _password.bool()? "password":'text')
            }, true)
        } else {
            this.setAttr("type", isPassword? "password":'text')
        }
        
        return this
    }
    
    /// ### .maxLength
    /// Set a textbox's maximum number of characters.
    /// ```javascript
    /// eclair.TextBox("This textbox is has a maximum length")
    ///     .maxLength(280)
    /// ```
    maxLength(_maxLength) {
        if (_maxLength instanceof EclairState) {
            let self = this
            _maxLength.addCallback(this.id() + "-maxLen", function(state) {
                this.setAttr("maxlength", _maxLength.value())
            }, true)
        } else {
            this.setAttr("maxlength", _maxLength)
        }
        return this
    } 
    
    /// ### .enabled
    /// Set whether the textbox is enabled.
    /// ```javascript
    /// eclair.TextBox("This textbox is enabled")
    ///     .enabled(false)
    /// ```
    enabled(_enabled) {
        if (_enabled instanceof EclairState) {
            let self = this
            _enabled.addCallback(this.id() + "-enabled", function(state) {
                if (state.bool()) {
                    self.setAttr("disabled", null)
                } else {
                    self.setAttr("disabled", "true")
                }
            }, true)
        } else {
            if (_enabled) {
                this.setAttr("disabled", null)
            } else {
                this.setAttr("disabled", "true")
            }
        }
        return this
    } 
    
    /// ### .required
    /// Set whether the textbox is required in a form.
    /// ```javascript
    /// eclair.TextBox("This textbox is required")
    ///     .required(true)
    /// ```
    required(_required) {
        if (_required instanceof EclairState) {
            let self = this
            _required.addCallback(this.id() + "-required", function(state) {
                if (state.bool()) {
                    self.setAttr("required", "true")
                } else {
                    self.setAttr("required", null)
                }
            }, true)
        } else {
            if (_required) 
                this.setAttr("required", "true")
            } else {{
                this.setAttr("required", null)
            }
        }
        return this
    } 
    
    /// ### .autofocus
    /// Set whether the textbox is autofocused.
    /// ```javascript
    /// eclair.TextBox("This textbox is autofocused")
    ///     .autofocus(true)
    /// ```
    autofocus(_autofocus) {
        if (_autofocus instanceof EclairState) {
            let self = this
            _autofocus.addCallback(this.id() + "-autofocus", function(state) {
                if (state.bool()) {
                    self.setAttr("autofocus", "true")
                } else {
                    self.setAttr("autofocus", null)
                }
            }, true)
        } else {
            if (_autofocus) 
                this.setAttr("autofocus", "true")
            } else {{
                this.setAttr("autofocus", null)
            }
        }
        return this
    } 
}

// PRINT EclairTextBox Needs datalist
