/// ## Eclair Progress Bar
/// Create a eclair progress bar object.
/// ```javascript
/// eclair.EclairProgressBar(0.5)
///     .striped(true)
///     .background("blue")
/// ```
class EclairProgressBar extends EclairComponent {
    constructor(_progress) {
        super("progress")
        
        this._labelText = eclair.State("0%")
        this._label = eclair.Text(this._labelText)
        this._indicator = this._addChild(eclair.HStack([this._label]))
        
        // Add callback for progress changing state
        this.bindState(_progress, "progress", value => {
            _progress = Math.max(Math.min(value, 1), 0)
            this._progress = value;
            this._labelText.value(Math.round(value * 100) + "%")
            this._indicator.width((value * 100 + 0.0001) + "%")
        }, state => {return state.number(0.5)})
        
        
        // Set styles
        this._label.addStyle(eclair.styles.ProgressBarLabel)
        this._indicator.addStyle(eclair.styles.ProgressBarIndicator)
        this.addStyle(eclair.styles.ProgressBar)
    }
    
    /// ### .striped
    /// Enable or disable a stripey background.
    /// <br/>**args**:
    /// - on: If true, stripe the background
    /// ```javascript
    /// eclair.ProgressBar(0.5)
    ///     .stiped(true)
    /// ```
    striped(_on) {
        this.bindState(_on, "color", value => {
            if (value) {
                this._indicator.getStyleSheet()["background-image"] = "linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)";
                this._indicator.getStyleSheet()["background-size"] = "1rem 1rem;";
            } else {
                this._indicator.getStyleSheet()["background-image"] = "";
                this._indicator.getStyleSheet()["background-size"] = "1rem 1rem;";
            }
            this._indicator.updateCSSStyle()
        }, state => {return state.bool()})
        
        return this;
    }
    
    /// ### .indicator
    /// Callback function to access the indicator component.
    /// <br/>**args**:
    /// - callback: The callback function to be executed with the indicator component as a parameter.
    /// ```javascript
    /// eclair.ProgressBar(0.5)
    ///     .indicator(e => {
    ///         indicator.background("blue")
    ///     })
    /// ```
    indicator(callback) {
        callback(this._indicator)
        return this;
    }
    
    /// ### .label
    /// Callback function to access the label component.
    /// <br/>**args**:
    /// - callback: The callback function to be executed with the label component as a parameter.
    /// ```javascript
    /// eclair.ProgressBar(0.5)
    ///     .label(e => {
    ///         e.fontColor("black")
    ///     })
    /// ```
    label(callback) {
        callback(this._label)
        return this;
    }
        
    /// ### .color
    /// Sets the color of the progress bar.  
    /// <br/>**args**:
    /// - _color: Can be either a string, an eclair State or eclair Color. 
    /// ```javascript
    /// eclair.ProgressBar(0.5)
    ///     .color("red")
    /// ```
    color(_color) {
        this._indicator.backgroundColor(_color)
        return this
    }
    
    /// ### .showLabel
    /// Sets whether the progress label should show on the progress bar.  
    /// <br/>**args**:
    /// - _show: Can be either a bool or an eclair State.
    /// ```javascript
    /// eclair.ProgressBar(0.5)
    ///     .showLabel(true)
    /// ```
    showLabel(_show) {
        this.bindState(_show, "label", value => {
            this._label.opacity(value? "1":"0")
        }, state => {return state.bool()});
        
        return this
    }
    
    // Standard element. No documentation needed.
    build() {
        return `<div>${this._indicator.compile()}</div>`
    }
}