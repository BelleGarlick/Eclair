/// TITLE Eclair Check Box
/// EXTENDS elements.component:EclairComponent
/// DESC An eclair checkbox, similar to the toggle in the form of a traditional checkbox.

Eclair.CheckBox = function(text) {
    return new EclairCheckBox(text);
}

/// SHARED-STYLE Eclair.styles.CheckBox: Default Checkbox object style.
/// SHARED-STYLE Eclair.styles.CheckBoxLabel: Default Checkbox Label object style.
/// SHARED-STYLE Eclair.styles.CheckBoxIcon: Default Checkbox icon object style.
/// SHARED-STYLE Eclair.styles.CheckBoxActiveIcon: Default Active Checkbox style.
Eclair.styles.CheckBox = Eclair.Style("eclair-style-checkbox")    
    .cursor("pointer")
    .boxShadow("0px 0px 0px 100px rgba(0, 0, 0, 0.05) inset", "hover")
    .padding("2px")
    .borderRadius("4px")
    .width("100%")
    .transition("0.2s all")
    .userSelect("none")
    .font(Eclair.theme.font)
Eclair.styles.CheckBoxIcon = Eclair.Style("eclair-style-checkbox-icon")
    .borderSize("2px")
    .borderRadius("4px")
    .borderColor(Eclair.theme.accent)
    .borderStyle("solid")
    .width("16px")
    .height("16px")
    .fontSize("0.85rem")
    .userSelect("none")
    .textAlign("center")    
Eclair.styles.CheckBoxActiveIcon = Eclair.Style("eclair-style-checkbox-active-icon")
    .background(Eclair.theme.accent)
    .fontColor("white")
Eclair.styles.CheckBoxLabel = Eclair.Style("eclair-style-checkbox-label")

/// ```javascript
/// let checked = Ø(false)
///
/// Eclair.CheckBox(checked)
///     .name("Over 18?")
///     .onClick(_ => {
///         alert(checked.value())
///     })
/// ```
class EclairCheckBox extends EclairComponent {   
    
    /// METHOD constructor
    /// DESC Construct an eclair checkbox.
    /// ARG checked: State whether the checkbox is checked.
    /// ```javascript
    /// Eclair.CheckBox(true)
    /// ```
    constructor(checked) {
        super()
        
        this._enabled = true        
        
        // Handle the states
        this.checked = checked instanceof EclairState? checked : Ø(checked)  // Parent one given by user
        this._hiddenValue = Ø(false)  // Private one which is updated in the .checked callback
        this._textValue = Ø("")  // Text value which is the message displayed alongside
        
        // Build the hidden components
        this._label = this._addChild(Eclair.Text(this._textValue))
        this._checkbox = this._addChild(Eclair.CustomTagComponent("div"))
        this._hidden = this._addChild(Eclair.HiddenInput(this._hiddenValue))
        
        // Override on click function
        let self = this
        this.overrideOnClick = null
        this._updateCallback("onClick", (e, ev) => {
            if (this._enabled) {   
                this.checked.value(!this.checked.bool())
            }  
            if (this.overrideOnClick != null) {this.overrideOnClick(this, ev)}
        })
        
        // Add binding for check box
        this.bindState(this.checked, "checked", value => {
            this._hiddenValue.value(value)
            
            // Set styles
            if (value) {
                this._checkbox
                    .addStyle(Eclair.styles.CheckBoxActiveIcon)
                    .innerHTML("✓")
            } else {
                this._checkbox
                    .removeStyle(Eclair.styles.CheckBoxActiveIcon)
                    .innerHTML("")
            }
        }, state => {return state.bool()})
        
        // set styles
        this.setAttr("cellpadding", 6)   
        this.addStyle(Eclair.styles.CheckBox)  
        this._label.addStyle(Eclair.styles.CheckBoxLabel)
        this._checkbox.addStyle(Eclair.styles.CheckBoxIcon)
    }
    
    /// METHOD .checkbox
    /// DESC This function allows you to access this object's check box as a means modify it.
    /// ARG callback: Call back function which passes the checkbox element as a parameter.
    /// ```javascript
    /// Eclair.CheckBox(false)
    ///     .checkbox((element) => {
    ///         element.background("red")
    ///     })
    /// ```
    checkbox(callback) {
        callback(this._checkbox)
        return this;
    }
    
    /// METHOD .label
    /// DESC This function allows you to access this object's label as a means modify it.
    /// ARG callback: Call back function which passes the label element as a parameter.
    /// ```javascript
    /// Eclair.CheckBox(false)
    ///     .label((element) => {
    ///         element.opacity("0.5")
    ///     })
    /// ```
    label(callback) {
        callback(this._label)
        return this;
    }
    
    /// METHOD .text
    /// DESC Set the visible text shown with the check box.
    /// ARG callback: The text given to the checkbox.
    /// ```javascript
    /// Eclair.CheckBox(false)
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
    
    /// METHOD .name
    /// DESC Set the name attribute for this element (used in forms).
    /// ARG name: The name attribute name given to the element.
    /// ```javascript
    /// Eclair.CheckBox(false)
    ///     .name("fname")
    /// ```
    name(_name) {
        // Set the _hidden elements name to have the value/state given
        this._hidden.name(_name)
        return this;
    }
    
    /// METHOD .enabled
    /// DESC Enable / Disable the element.
    /// ARG enabled: If true, the user can modify this element.
    /// ```javascript
    /// Eclair.CheckBox(false)
    ///     .enabled(true)
    /// ```
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