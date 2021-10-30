/// TITLE Eclair Progress Bar
/// EXTENDS elements.component:EclairComponent
/// DESC Create a eclair progress bar object.

Eclair.ProgressBar = function(_progress) {
    return new EclairProgressBar(_progress);
}

/// SHARED-STYLE Eclair.styles.ProgressBar: Progress bar style.
/// SHARED-STYLE Eclair.styles.ProgressBarLabel: Progress label style.
/// SHARED-STYLE Eclair.styles.ProgressBarIndicator: Progress indicator style.
Eclair.styles.ProgressBar = Eclair.Style("eclair-style-progress-bar")
    .background("#d3d3d3")
    .borderRadius("3px")
    .height("16px")
    .userSelect("none")
    .overflow("hidden")
Eclair.styles.ProgressBarIndicator = Eclair.Style("eclair-style-progress-bar")
    .display("flex")
    .flexDirection("row")
    .alignItems("center")
    .background(Eclair.theme.accent)
    .height("100%")
    .transition("0.3s all")
    .userSelect("none")
    .margin("0px auto 0px 0px")
Eclair.styles.ProgressBarLabel = Eclair.Style("eclair-style-progress-bar-label")
    .fontColor("white")
    .fontWeight(700)
    .userSelect("none")
    .fontSize("11px")

/// ```javascript
/// let progress = Ø(0)
/// 
/// Eclair.EclairProgressBar(progress)
///     .striped(true)
///     .background("blue")
///     .onClick(() => {
///         progress.value(progress.value() += 0.05)
///     })
/// ```
class EclairProgressBar extends EclairComponent {
    
    /// METHOD constructor
    /// DESC Construct an Eclair Progress Bar element with a given progression level.
    /// ARG progress: The progress of the element. 
    /// ```javascript
    /// Eclair.ProgressBar(0.5)
    /// ```
    constructor(progress) {
        super()
        
        this._labelText = Ø("0%")
        this._label = Eclair.Text(this._labelText)
        this._indicator = this._addChild(Eclair.HStack([this._label]))
        
        // Add callback for progress changing state
        this.bindState(progress, "progress", value => {
            progress = Math.max(Math.min(value, 1), 0)
            this.progress = value;
            this._labelText.value(Math.round(value * 100) + "%")
            this._indicator.width((value * 100 + 0.0001) + "%")
        }, state => {return state.number(0.5)})
        
        // Set styles
        this.addStyle(Eclair.styles.ProgressBar)
        this._label.addStyle(Eclair.styles.ProgressBarLabel)
        this._indicator.addStyle(Eclair.styles.ProgressBarIndicator)
    }
    
    /// METHOD .striped
    /// DESC Enable or disable a stripey background.
    /// ARG _on:  If true, the background will be striped. 
    /// ```javascript
    /// Eclair.ProgressBar(0.5)
    ///     .stiped(true)
    /// ```
    striped(_on) {
        this.bindState(_on, "color", value => {
            if (value) {
                this._indicator
                    .backgroundSize("1rem 1rem")
                    .css("background-image: linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)");
            } else {
                this._indicator
                    .backgroundSize("1rem 1rem")
                    .css("background-image: ;");
            }
            this._indicator.updateCSSStyle()
        }, state => {return state.bool()})
        
        return this;
    }
    
    /// METHOD .indicator
    /// DESC Callback function to access the indicator component.
    /// ARG callback: The callback function to be executed with the indicator component as a parameter.
    /// ```javascript
    /// Eclair.ProgressBar(0.5)
    ///     .indicator(e => {
    ///         indicator.background("blue")
    ///     })
    /// ```
    indicator(callback) {
        callback(this._indicator)
        return this;
    }
    
    /// METHOD .label
    /// DESC Callback function to access the label component.
    /// ARG callback: The callback function to be executed with the label component as a parameter.
    /// ```javascript
    /// Eclair.ProgressBar(0.5)
    ///     .label(e => {
    ///         e.fontColor("black")
    ///     })
    /// ```
    label(callback) {
        callback(this._label)
        return this;
    }
    
    /// METHOD .color
    /// DESC Sets the color of the progress bar.  
    /// ARG value: Can be either a string, an eclair State or eclair Color. 
    /// ```javascript
    /// Eclair.ProgressBar(0.5)
    ///     .label(e => {
    ///         e.fontColor("black")
    ///     })
    /// ```
    color(value) {
        this._indicator.backgroundColor(value)
        return this
    }
    
    /// METHOD .showLabel
    /// DESC Sets whether the progress label should show on the progress bar.   
    /// ARG show: Can be either a bool or an eclair State.
    /// ```javascript
    /// Eclair.ProgressBar(0.5)
    ///     .showLabel(true)
    /// ```
    showLabel(show) {
        this.bindState(show, "label", value => {
            this._label.opacity(value? "1":"0")
        }, state => {return state.bool()});
        
        return this
    }
    
    build() {
        return `<div>${this._indicator.compile()}</div>`
    }
}