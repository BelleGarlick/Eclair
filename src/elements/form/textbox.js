// PRINT EclairTextBox not complete.
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
            this.setAttr("value", _text.value())
            
            _text.addCallback(this.id() + "-value", function(state) {
                let newState = state.value()
                self.setAttr("value", newState)
                self.getElement(elem => {elem.value = newState});
            })
            
            this._updateCallback("onInput", e => {
                e.getElement(elem => {_text.value(elem.value)})
                
                if (self.overrideOnCreate != null) {
                    overrideOnCreate(self)
                }
            })
        }
    }
    
    name(_name) {
        if (_name instanceof EclairState) {
            let self = this
            this.setAttr("name", _text.value())
            _name.addCallback(this.id() + "-name", function(state) {
                self.setAttr("name", state.value())
            })
        } else {
            this.setAttr("name", _name)
        }
        
        return this
    }
    
    placeholder(_placeholder) {
        if (_placeholder instanceof EclairState) {
            let self = this
            this.setAttr("placeholder", _placeholder.value())
            _placeholder.addCallback(this.id() + "-placeholder", function(state) {
                self.setAttr("placeholder", state.value())
            })
        } else {
            this.setAttr("placeholder", _placeholder)
        }
        
        return this
    }
    
    password(_password) {
        if (_password instanceof EclairState) {
            let self = this
            this.setAttr("type", _password.bool()? "password":'text')
            _password.addCallback(this.id() + "-password", function(state) {
                self.setAttr("type", _password.bool()? "password":'text')
            })
        } else {
            this.setAttr("type", isPassword? "password":'text')
        }
        
        return this
    }
    
    maxLength(maxLength) {
        if (maxLength == null) {
            return this.getAttr("maxlength");
        } else {
            this.setAttr("maxlength", maxLength)
        }
        return this
    } 
    
    
//autocomplete	Sets or returns the value of the autocomplete attribute of a text field
//autofocus	Sets or returns whether a text field should automatically get focus when the page loads
//disabled	Sets or returns whether the text field is disabled, or not
//list	Returns a reference to the datalist that contains the text field
//pattern	Sets or returns the value of the pattern attribute of a text field
//readOnly	Sets or returns whether a text field is read-only, or not
//required	Sets or returns whether the text field must be filled out before submitting a form
//size	Sets or returns the value of the size attribute of a text field
}