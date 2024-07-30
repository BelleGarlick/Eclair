/// TITLE Eclair Slider
/// EXTENDS elements.custom-tag:EclairCustomTagComponent
/// DESC An eclair slider allowing a user to scrub to a numeric value.

Eclair.Slider = function(_value) {
    return new EclairSlider(_value);
}

/// SHARED-STYLE Eclair.styles.Slider: Default slider style.
Eclair.styles.Slider = Eclair.Style("eclair-style-slider")
    .transition("0.2s all")
    .css("-webkit-appearance: none; box-sizing: border-box; outline: none;")
    .appearance("none", ":-webkit-slider-thumb")
    .appearance("none", ":-moz-slider-thumb")
    .cursor("pointer", ":-webkit-slider-thumb")
    .cursor("pointer", ":-moz-slider-thumb")
    .background("#d3d3d3")
    .background(Eclair.theme.accent, ":-webkit-slider-thumb")
    .background(Eclair.theme.accent, ":-moz-slider-thumb")
    .borderRadius("50%", ":-webkit-slider-thumb")
    .borderRadius("50%", ":-moz-slider-thumb")
    .height("25px", ":-webkit-slider-thumb")
    .height("25px", ":-moz-slider-thumb")
    .width("25px", ":-webkit-slider-thumb")
    .width("25px", ":-moz-slider-thumb")
    .width("100%")
    .height("15px")
    .borderRadius("5px")
    .opacity(0.7)
    .opacity(1, "hover")

/// ```javascript
/// Eclair.Form([
///     Eclair.Slider(0.5)
/// ])
/// ```
class EclairSlider extends EclairCustomTagComponent {    
    
    /// METHOD constructor
    /// DESC Construct an Eclair Slider element with a predefined value.
    /// ARG value: Value of the slider.
    /// ```javascript
    /// Eclair.Slider(0.5)
    /// ```
    constructor(value) {
        super("input")
        
        this.step(0.001)
        
        // Bind callback
        this.bindState(value, "value", value => {
            this.setAttr("value", value)
            this.getElement(elem => {elem.value = value})
        }, state => {return state.number()})
        
        // Override onInput callback
        let overrideOnInput = null;
        this._updateCallback("onInput", (e, ev) => {
            if (value instanceof EclairState) {e.getElement(elem => {value.value(elem.value)})}
            if (this.overrideOnInput != null) {this.overrideOnInput(this, ev)}
        })
        
        // Set attributes
        this.setAttr("type", "range")
        this.addStyle(Eclair.styles.Slider)
    }
    
    // Override method no need for doc
    onInput(callback) {
        this.overrideOnInput = callback;
        return this;
    }
        
    /// METHOD .name
    /// DESC Set the name attribute for this element. (used in forms).
    /// ARG value: Value to set the name to.
    /// ```javascript
    /// Eclair.Slider(0.5)
    ///     .name("weight")
    /// ```
    name(value) {
        this.bindState(value, "name", v => {
            this.setAttr("name", v)
        })
        return this;
    }
        
    /// METHOD .min
    /// DESC The minimum value the slider can be.
    /// ARG value: The slider's smallest value will be set to this value given.
    /// ```javascript
    /// Eclair.Slider(0.5)
    ///     .min(0)
    /// ```
    min(value) {
        this.bindState(value, "min", v => {
            this.setAttr("min", v);
        }, state => {return state.number()})
        
        return this;
    }
        
    /// METHOD .max
    /// DESC The maximum value the slider can be.
    /// ARG value: The slider's largest value will be set to this value given.
    /// ```javascript
    /// Eclair.Slider(0.5)
    ///     .max(1)
    /// ```
    max(value) {
        this.bindState(value, "max", v => {
            this.setAttr("max", v);
        }, state => {return state.number()})
        
        return this;
    }
        
    /// METHOD .step
    /// DESC Set the step between points along the slider.
    /// ARG value: The value between steps, e.g. min(0), max(1), step(0.1) would have 11 steps, 0, 0.1, 0.2, ... 0.9, 1.
    /// ```javascript
    /// Eclair.Slider(0.5)
    ///     .step(0.1)
    /// ```
    step(value) {
        this.bindState(value, "step", v => {
            this.setAttr("step", v);
        }, state => {return state.number()})
        
        return this;
    }
}   