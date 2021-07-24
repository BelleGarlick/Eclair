class EclairToggle extends EclairComponent {
    constructor(_value) {
        super()
        
        let overrideOnClick = null;
        let overrideOnCreate = null;
        
        this.addStyle(eclair.styles.Toggle)
        this._tickMark = eclair.Text("✓").addStyle(eclair.styles.ToggleTick)
        this._knob = new EclairView([]).addStyle(eclair.styles.ToggleKnob)
        
        this._hiddenComponent = new EclairHiddenInput()
        this._hiddenComponent.value(_value)
    
        if (_value instanceof EclairState) {
            this._hiddenComponent.value(_value.bool())
            
            let self = this
            _value.addCallback(this.id() + "-toggle", function(state) {
                let value = state.bool()
                let cValue = self._hiddenComponent.value(value)
                
                self._hiddenComponent.value(value)
                self.updateStyle()
                
                if (value != cValue && self._callbacks.hasOwnProperty("onChange")) {
                    self.performCallback("onChange")  
                }
            })
        }
        
        // Manually update the callback map as onClick
        // is void to prevent the user altering it.
        let self = this;
        this._updateCallback("onClick", e => {
            if (e._enabled) {
                // Toggle the option and 
                let cVal = this._hiddenComponent.value() == "true"
                this._hiddenComponent.value(!cVal)
                if (_value instanceof EclairState) {_value.value(!cVal)} else {this.performCallback("onChange")}
                this.updateStyle()
            }
            if (self.overrideOnClick != null) {
                overrideOnClick(self)
            }
        })
        this._updateCallback("onCreate", e => {
            this.updateStyle();
            if (self.overrideOnCreate != null) {
                overrideOnCreate(self)
            }
        })
        
        this._showCheckMark = false
        this._enabled = true
    }
    
    // Prevent on click override
    onClick(callback) {
        this.overrideOnClick = callback;
        return this;
    }
    
    onCreate(callback) {
        this.overrideOnCreate = callback;
        return this;
    }
    
    knob(callback) {
        callback(this._knob)
        return this
    }
    
    name(_name) {
        if (_name == null) {
            return this._hiddenComponent.name()
        } else {
            this._hiddenComponent.name(_name)
            return this;
        }
    }
    
    enabled(_enabled) {
        if (_enabled instanceof EclairState) {
            let self = this
            this._enabled = _enabled.bool()
            this.opacity(this._enabled? 1 : 0.6)
            _enabled.addCallback(this.id() + "-enabled", function(state) {
                self._enabled = state.bool()
                self.opacity(self._enabled? 1 : 0.6)
            })
        } else {
            this._enabled = _enabled
            self.opacity(_enabled? 1 : 0.6)
        }
        
        return this
    }
    
    updateStyle() {
        if (this._hiddenComponent.value() == "true") {
            this.background(eclair.theme.accent)
            if (this._showCheckMark) {
                this._tickMark.opacity(1)
            }

            let elem = this.getElement()
            if (elem != null) {
                this._knob.left((this.getElement().clientWidth - this._knob.getElement().clientWidth - 6) + "px")
            }
        } else {
            this._tickMark.opacity(0)
            this.background("#dddddd")
            this._knob.left("0px")
        }
    }
    
    showTick(_bool) {
        if (_bool instanceof EclairState) {
            let self = this
            this._showCheckMark = _bool.bool()
            this._tickMark.opacity((this._showCheckMark && (this._hiddenComponent.value() == "true"))? 1:0)
            _bool.addCallback(this.id() + "-showTick", function(state) {
                self._showCheckMark = state.bool()
                self._tickMark.opacity((self._showCheckMark && (self._hiddenComponent.value() == "true"))? 1:0)
            })
        } else {
            this._showCheckMark = _bool
            this._tickMark.opacity((_bool && (this._hiddenComponent.value() == "true"))? 1:0)
        }
        
        return this
    }
    
    build() {
        return this.wrapHTML(`<div>`+this._tickMark.build()+this._knob.build()+this._hiddenComponent.build()+"</div>")
    }
}