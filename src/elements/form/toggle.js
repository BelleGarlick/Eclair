/// ## Eclair Toggle
/// An eclair toggle element.
/// ```javascript
/// let on = eclair.State(true)
/// eclair.Toggle(on)
/// ```
class EclairToggle extends EclairComponent {
    constructor(_value) {
        super()
        
        // If the user want's onclicks then they need to be stored here as 
        // this class has it's own methods. So we need this alternative place to 
        // store the callbacks.
        let overrideOnClick = null;
        
        // Create internal elements
        this._tickMark = eclair.Text("✓")
        this._knob = eclair.View()
        
        this._value = eclair.State((_value instanceof EclairState)? _value.bool() : _value)
        this._hiddenComponent = eclair.HiddenInput(this._value)
    
        // Bind this object with the given eclair states
        this.bindState(_value, "toggle", value => {
            let cVal = this._value.bool()
            
            this._value.value(value)
            this._updateStyle()
            
            if (value != cVal) {
                this.performCallback("onChange")  
            }
        }, state => {return state.bool()})
        
        // Manually update the callback map as onClick
        // is void to prevent the user altering it.
        let self = this;
        this._updateCallback("onClick", e => {
            if (e._enabled) {
                // Toggle the option and 
                let cVal = this._value.bool()
                if (_value instanceof EclairState) {
                    _value.value(!cVal)
                } else {
                    this._value.value(!cVal)
                }
                this._updateStyle()
                this.performCallback("onChange")  
            }
            if (self.overrideOnClick != null) {
                overrideOnClick(self)
            }
        })
        
        // Set default states
        this._showCheckMark = false
        this._enabled = true
        
        // Configure parent/children relation
        this._tickMark.parent = this
        this._knob.parent = this
        this.children = [this._tickMark, this._knob]
        
        // Add styles
        this.addStyle(eclair.styles.Toggle)
        this._tickMark.addStyle(eclair.styles.ToggleTick)
        this._knob.addStyle(eclair.styles.ToggleKnob)
        
        this.width("100%", " .wrapper")
            .transition("0.2s all", " .wrapper")
    }
    
    // No need for documentation as this is an overriden method.
    onClick(callback) {
        this.overrideOnClick = callback;
        return this;
    }
    
    /// ### .knob
    /// This function allows you to access the toggle's knob as a means modify it.
    /// ```javascript
    /// eclair.Toggle(true)
    ///     .knob((element) => {
    ///         element.background("red")
    ///     })
    /// ```
    knob(callback) {
        callback(this._knob)
        return this
    }
    
    /// ### .name
    /// Set the name attribute for a textbox (used in forms).
    /// ```javascript
    /// eclair.Toggle(true)
    ///     .name("fname")
    /// ```
    name(_name) {
        this._hiddenComponent.name(_name)
        return this;
    }
    
    /// INCLUDE elements.form.checkbox.enabled eclair.Toggle(false)
    enabled(_enabled) {
        this.bindState(_enabled, "enabled", value => {
            this._enabled = value
            this.opacity(value? 1 : 0.6)
        }, state => {return state.bool()})
        
        return this
    }
    
    /// ### .showTick
    /// Set whether the tick is showing.    
    /// ```javascript
    /// eclair.Toggle(false)
    ///     .showTick(true)
    /// ```
    showTick(_bool) {
        this.bindState(_bool, "showTick", value => {
            this._showCheckMark = value
            this._tickMark.opacity((value && (this._value.bool()))? 1:0)
        }, state => {return state.bool()})
        
        return this
    }
    
    // Doesn't need to be accessed externally as is managed internally.
    _updateStyle() {
        if (this._value.bool()) {
            this._tickMark.opacity(this._showCheckMark ? 1 : 0)
            this.background(eclair.theme.accent)
                .transform("translateX(100%)", " .wrapper")
            this._knob
                .transform("translateX(-100%)")
        } else {
            this._tickMark.opacity(0)
            this.background("#dddddd")
                .transform("translateX(0%)", " .wrapper")
            
            this._knob
                .transform("translateX(0%)")
        }
    }
    
    // Implement the build function. No doc needed as this is a standard function.
    build() {
        return `<toggle>${this._tickMark.compile()}<div class='wrapper'>${this._knob.compile()}</div>${this._hiddenComponent.compile()}</toggle>`
    }
}