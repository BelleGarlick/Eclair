/// ## Eclair Slider
/// An eclair slider allowing a user to scrub to a numeric value..
/// <br/>**args**:
/// - value: Value of the slider.
/// ```javascript
/// let value = eclair.State(0.5)
/// eclair.Slider(value)
/// ```
class EclairSlider extends EclairCustomTagComponent {
    constructor(value) {
        super("input")
        
        // Bind callback
        this.bindState(value, "value", value => {
            this.setAttr("value", value)
            this.getElement(elem => {elem.value = value})
        }, state => {return state.number()})
        
        // Override onInput callback
        let overrideOnInput = null;
        this._updateCallback("onInput", e => {
            if (value instanceof EclairState) {
                e.getElement(elem => {value.value(elem.value)})
            }
            
            if (this.overrideOnInput != null) {
                this.overrideOnInput(this)
            }
        })
        
        // Set attributes
        this.setAttr("type", "range")
        this.addStyle(eclair.styles.Slider)
    }
    
    // Override method no need for doc
    onInput(callback) {
        console.log("on input called")
        this.overrideOnInput = callback;
        return this;
    }
    
    /// ### .name
    /// Set the name attribute for this element. (used in forms).
    /// ```javascript
    /// eclair.Slider(0.5)
    ///     .name("value")
    /// ```
    name(_name) {
        this.bindState(_name, "name", value => {
            this.setAttr("name", value)
        })
        return this;
    }
    
    /// ### .min
    /// The minimum value the slider can be.
    /// <br/>**args**:
    /// - min: The slider's smallest value will be set to this value given.
    /// ```javascript
    /// eclair.Slider(0.5)
    ///     .min(0)
    /// ```
    min(_min) {
        this.bindState(_min, "min", value => {
            this.setAttr("min", value);
        }, state => {return state.number()})
        
        return this;
    }
    
    /// ### .max
    /// The maximum value the slider can be.
    /// <br/>**args**:
    /// - max: The slider's largest value will be set to this value given.
    /// ```javascript
    /// eclair.Slider(0.5)
    ///     .max(1)
    /// ```
    max(_max) {
        this.bindState(_max, "max", value => {
            this.setAttr("max", value);
        }, state => {return state.number()})
        
        return this;
    }
    
    /// ### .step
    /// Set the step between points along the slider.
    /// <br/>**args**:
    /// - step: The value between steps, e.g. min(0), max(1), step(0.1) would have 11 steps, 0, 0.1, 0.2, ... 0.9, 1.
    /// ```javascript
    /// eclair.Slider(0.5)
    ///     .step(0.1)
    /// ```
    step(_step) {
        this.bindState(_step, "step", value => {
            this.setAttr("step", value);
        }, state => {return state.number()})
        
        return this;
    }
}
   