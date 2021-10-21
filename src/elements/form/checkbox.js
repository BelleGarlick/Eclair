/// ## Eclair Check Box
/// An eclair checkbox, similar to the toggle in the form of a traditional checkbox.
/// ```javascript
/// let checked = Ø(false)
/// eclair.CheckBox(checked)
///     .name("Over 18?")
/// ```
class EclairCheckBox extends EclairComponent {
    constructor(checked) {
        super("checkbox")
        
        this._enabled = true        
        
        // Handle the states
        this.checked = checked instanceof EclairState? checked : Ø(checked)  // Parent one given by user
        this._hiddenValue = Ø(false)  // Private one which is updated in the .checked callback
        this._textValue = Ø("")  // Text value which is the message displayed alongside
        
        // Build the hidden components
        this._label = this._addChild(eclair.Text(this._textValue))
        this._checkbox = this._addChild(eclair.CustomTagComponent("div"))
        this._hidden = this._addChild(eclair.HiddenInput(this._hiddenValue))
        
        // Override on click function
        let self = this
        this.overrideOnClick = null
        this._updateCallback("onClick", () => {
            if (this.overrideOnClick != null) {
                this.overrideOnClick(this)
            }
            if (this._enabled) {   
                this.checked.value(!this.checked.bool())
                this.performCallback("onChange")
            }  
        })
        
        // Add binding for check box
        this.bindState(this.checked, "checked", value => {
            this._hiddenValue.value(value)
            
            // Call on change if available
            this.performCallback("onChange")    

            // Set styles
            if (value) {
                this._checkbox
                    .addStyle(eclair.styles.CheckBoxActiveIcon)
                    .removeStyle(eclair.styles.CheckBoxIcon)
                    .innerHTML("✓")
            } else {
                this._checkbox
                    .addStyle(eclair.styles.CheckBoxIcon)
                    .removeStyle(eclair.styles.CheckBoxActiveIcon)
                    .innerHTML("")
            }
        }, state => {return state.bool()})
        
        // set styles
        this.setAttr("cellpadding", 6)   
        this.addStyle(eclair.styles.CheckBox)  
        this._label.addStyle(eclair.styles.CheckBoxLabel)
        this._checkbox.addStyle(eclair.styles.CheckBoxIcon)
    }
    
    /// ### .checkbox
    /// This function allows you to access this object's check box as a means modify it.
    /// <br/>**args**:
    /// - callback: Call back function which passes the checkbox element as a parameter.
    /// ```javascript
    /// eclair.CheckBox(false)
    ///     .checkbox((element) => {
    ///         element.background("red")
    ///     })
    /// ```
    checkbox(callback) {
        callback(this._checkbox)
        return this;
    }
    
    /// ### .label
    /// This function allows you to access this object's label as a means modify it.
    /// <br/>**args**:
    /// - callback: Call back function which passes the label element as a parameter.
    /// ```javascript
    /// eclair.CheckBox(false)
    ///     .label((element) => {
    ///         element.opacity("0.5")
    ///     })
    /// ```
    label(callback) {
        callback(this._label)
        return this;
    }
    
    /// ### .text
    /// Set the visible text shown with the check box.
    /// <br/>**args**:
    /// - text: The text given to the checkbox.
    /// ```javascript
    /// eclair.CheckBox(false)
    ///     .text("Over 18?")
    /// ```
    text(_text) {
        this.bindState(_text, "text", value => {
            this._textValue.value(value)
        });
        return this;
    }
        
    // Standard function. No need to write doc.
    onClick(callback) {
        this.overrideOnClick = callback;
        return this;
    }
    
    /// ### .name
    /// Set the name attribute for this element (used in forms).
    /// <br/>**args**:
    /// - name: The name attribute name given to the element.
    /// ```javascript
    /// eclair.CheckBox(false)
    ///     .name("fname")
    /// ```
    name(_name) {
        // Set the _hidden elements name to have the value/state given
        this._hidden.name(_name)
        return this;
    }
        
    /// SHARED enabled eclair.CheckBox(false)
    /// ### .enabled
    /// Enable / Disable the element.
    /// <br/>**args**:
    /// - enabled: If true, the user can modify this element.
    /// ```javascript
    /// WILDCARD
    ///     .enabled(true)
    /// ```
    /// END-SHARED
    enabled(_enabled) {
        this.bindState(_enabled, "enabled", value => {
            this.opacity(value ? "1":"0.6")
            this._enabled = value
        }, state => {return state.bool()});
        
        return this
    }
    
    // Standard element. No need to write doc.
    build() {
        return `<table><tr><td width=1>${this._checkbox.compile()}</td><td>${this._label.compile()}</td></tr></table>${this._hidden.compile()}`
    }
}