/// TITLE Eclair Toggle component
/// EXTENDS elements.component:EclairComponent
/// DESC An eclair toggle component.

Eclair.Toggle = function(_value) {
    return new EclairToggle(_value);
}

/// SHARED-STYLE Eclair.styles.Toggle: Toggle style.
/// SHARED-STYLE Eclair.styles.ToggleTick: Tick style style.
/// SHARED-STYLE Eclair.styles.ToggleKnob: Knob style.
Eclair.styles.Toggle = Eclair.Style("eclair-style-toggle")    
    .display("flex")
    .flexDirection("row")
    .alignItems("center")
    .position("relative")
    .width("50px")
    .background("#dddddd")
    .padding("3px")
    .cursor("pointer")
    .userSelect("none")
    .borderRadius("20px")
    .transition("0.2s all")
    .boxSizing("border-box")
Eclair.styles.ToggleKnob = Eclair.Style("eclair-style-toggle-knob")
    .height("14px")
    .width("14px")
    .background("#ffffff")
    .transform("translateX(0%)")
    .transition("0.2s all")
    .userSelect("none")
    .borderRadius("20px")
Eclair.styles.ToggleTick = Eclair.Style("eclair-style-toggle-tick")
    .position("absolute")
    .fontColor("#ffffff")
    .left("35%")
    .transition("0.2s all")
    .transform("translateX(-50%)")
    .fontWeight(700)
    .userSelect("none")
    .opacity(0)

/// ```javascript
/// let on = Ø(true)
///
/// Eclair.Text(on)
/// Eclair.Toggle(on)
/// ```
class EclairToggle extends EclairComponent {
            
    /// METHOD constructor
    /// DESC Construct an Toggle object.
    /// ARG value: Boolean denoting whether the toggle is on or off.
    /// ```javascript
    /// Eclair.Toggle(true)
    /// ```
    constructor(value) {
        super()
        
        // If the user want's onclicks then they need to be stored here as 
        // this class has it's own methods. So we need this alternative place to 
        // store the callbacks.
        let overrideOnClick = null;
        
        // Create internal elements
        this._tickMark = null, this._knob = null;
        this.declareChildrenWithContext(_=>{
            this._tickMark = Eclair.Text("✓")
                .addStyle(Eclair.styles.ToggleTick)
            
            this._knob = Eclair.CustomTagComponent("div")
                .addStyle(Eclair.styles.ToggleKnob)
        })
        
        this._value = (value instanceof EclairState)? value : Ø(value)
        this._hiddenComponent = Eclair.HiddenInput(this._value)
    
        // Bind this object with the given eclair states
        this.bindState(value, "toggle", value => {
            // TODO If value changes reflec in this.bind state
            this._updateStyle() 
        }, state => {return state.bool()})
        
        // Manually update the callback map as onClick
        // is void to prevent the user altering it.
        let self = this;
        this._updateCallback("onClick", (e, ev) => {
            if (e._enabled) {
                this._value.value(!this._value.bool(), self)
                this._updateStyle()
            }
            if (self.overrideOnClick != null) {
                overrideOnClick(e, ev)
            }
        })
        
        // Set default states
        this._showCheckMark = false
        this._enabled = true
        
        // Add styles
        this.addStyle(Eclair.styles.Toggle)
        
        this.width("100%", " .wrapper")
            .transition("0.2s all", " .wrapper")
    }
    
    // No need for documentation as this is an overriden method.
    onClick(callback) {
        this.overrideOnClick = callback;
        return this;
    }
    
    /// METHOD .knob
    /// DESC This function allows you to access the toggle's knob as a means modify it.
    /// ARG callback: Function called with the knob element passed as an arg.
    /// ```javascript
    /// Eclair.Toggle(true)
    ///     .knob((element) => {
    ///         element.background("red")
    ///     })
    /// ```
    knob(callback) {
        callback(this._knob)
        return this
    }
        
    /// METHOD .name
    /// DESC Set the name attribute for a textbox (used in forms).
    /// ARG value: New name of the element.
    /// ```javascript
    /// Eclair.Toggle(true)
    ///     .name("fname")
    /// ```
    name(value) {
        this._hiddenComponent.name(value)
        return this;
    }
    
    /// METHOD .enabled
    /// DESC Enable / Disable the element.
    /// ARG enabled: If true, the user can modify this element.
    /// ```javascript
    /// Eclair.Toggle(true)
    ///     .enabled(true)
    /// ```
    enabled(_enabled) {
        this.bindState(_enabled, "enabled", value => {
            this._enabled = value
            this.opacity(value? 1 : 0.6)
        }, state => {return state.bool()})
        
        return this
    }
    
    
    /// METHOD .showTick
    /// DESC Set whether the tick is showing.    
    /// ARG enabled: If true, a tick marker will be shown.
    /// ```javascript
    /// Eclair.Toggle(true)
    ///     .showTick(true)
    /// ```
    showTick(value) {
        this.bindState(value, "showTick", v => {
            this._showCheckMark = v
            this._tickMark.opacity((v && (this._value.bool()))? 1:0)
        }, state => {return state.bool()})
        
        return this
    }
    
    // Doesn't need to be accessed externally as is managed internally.
    // TODO Use shared style in future
    _updateStyle() {
        if (this._value.bool()) {
            this._tickMark.opacity(this._showCheckMark ? 1 : 0)
            this.background(Eclair.theme.accent)
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
        let toggle = document.createElement("div")
        
        let wrapper = document.createElement("div")
        wrapper.setAttribute("class", "wrapper")
        wrapper.appendChild(this._knob.compile())
        
        toggle.appendChild(this._hiddenComponent.compile())
        toggle.appendChild(wrapper)
        
        return toggle
    }
}
