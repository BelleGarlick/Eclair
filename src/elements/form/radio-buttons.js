/// TITLE Eclair Progress Bar
/// EXTENDS elements.component:EclairComponent
/// DESC An eclair Radio Button object.

Eclair.RadioButtons = function(_value) {
    return new EclairRadioButtons(_value);
}

/// SHARED-STYLE Eclair.styles.RadioButtons: Shared Radio Button style.
/// SHARED-STYLE Eclair.styles.RadioButtonsRadio: Shared Radio Button Radio style.
/// SHARED-STYLE Eclair.styles.RadioButtonsLabel: Shared Radio Button Label style.
/// SHARED-STYLE Eclair.styles.RadioButtonsItem: Shared Radio Button Item style.
/// SHARED-STYLE Eclair.styles.RadioButtonsSelectedRadio: Shared Radio Button Selected Radio style.
/// SHARED-STYLE Eclair.styles.RadioButtonsSelectedLabel: Shared Radio Button Selected Label style.
/// SHARED-STYLE Eclair.styles.RadioButtonsSelectedItem: Shared Radio Button Selected Item style.
Eclair.styles.RadioButtons = Eclair.Style("eclair-style-radio-button"),
Eclair.styles.RadioButtonsItem = Eclair.Style("eclair-style-radio-buttons-item")
    .cursor("pointer")
    .boxShadow("0px 0px 0px 1000px rgba(0, 0, 0, 0.05) inset", "hover")
    .padding("12px")
    .borderRadius("4px")
    .width("100%")
    .userSelect("none")
    .justifyContent("flex-start")
    .gap("12px")
    .font(Eclair.theme.font)
Eclair.styles.RadioButtonsSelectedItem = Eclair.Style("eclair-style-radio-buttons-selected-item")
Eclair.styles.RadioButtonsRadio = Eclair.Style("eclair-style-radio-buttons-dot")
    .width("14px")
    .height("14px")
    .userSelect("none")
    .borderSize("2px")
    .borderStyle("solid")
    .borderColor(Eclair.theme.accent)
    .borderRadius("100%")
Eclair.styles.RadioButtonsSelectedRadio = Eclair.Style("eclair-style-radio-buttons-selected-dot")
    .background(Eclair.theme.accent)
Eclair.styles.RadioButtonsLabel = Eclair.Style("eclair-style-label")
Eclair.styles.RadioButtonsSelectedLabel = Eclair.Style("eclair-style-radio-buttons-selected-label")

/// ```javascript
/// Eclair.RadioButtons(["Option A", "Option B", "Option C"])
///     .value("Option A")
///     .selectedIndex(0)
/// ```
class EclairRadioButtons extends EclairComponent {
    
    /// METHOD constructor
    /// DESC Construct the Radio Buttons object.
    /// ARG options: List of string objects the user can select.
    /// ```javascript
    /// Eclair.RadioButtons(["Option A", "Option B", "Option C"])
    /// ```  
    constructor(_options) {
        super()
        
        // Internal states of values, options and selected index
        this._options = _options instanceof EclairState? _options : Ø(_options)
        this._selectedIndex = -1
        this._selectedValue = State("")
        
        // Custom styles for child elements
        this.customStyles = {
            "itemStyle": Eclair.Style(),
            "radioStyle": Eclair.Style(),
            "labelStyle": Eclair.Style(),
            "selectedItemStyle": Eclair.Style(),
            "selectedRadioStyle": Eclair.Style(),
            "selectedLabelStyle": Eclair.Style(),
        }
        
        // Create elements
        let self = this
        this._hidden = this._addChild(Eclair.HiddenInput(this._selectedValue))
        this._view = this._addChild(Eclair.VStack(_options, item => {
            return new EclairRatioItem(item, this.customStyles)
                .onClick((e, ev) => {
                    let newIndex = this._updateSelectedItemStyles(item)
                    
                    this._selectedValue.value(item, self)
                    this._selectedIndex = newIndex;
                
                    if (self.stateBindings.hasOwnProperty("index")) {self.stateBindings["index"].value(newIndex, self)}
                    if (self.stateBindings.hasOwnProperty("value")) {self.stateBindings["value"].value(item, self)}
                })
        }))
        
        // Add custom style to object
        this.addStyle(Eclair.styles.RadioButtons)
    }
    
    // Function to update the selected items from a given value.
    // This function will also return the index of the item with the given value.
    _updateSelectedItemStyles(selectedValue) {
        let newIndex = -1;
        for (let i = 0; i < this._options.length(); i++) {
            let match = this._options.get(i) == selectedValue
            this._view.child(i, el => {
                el.selected(match)
            })
            if (match) {newIndex = i;}
        }
        
        return newIndex;
    }
    
    /// METHOD .name
    /// DESC Set the name attribute for this element. (used in forms).
    /// ARG value: Selected value of the options.
    /// ```javascript
    /// Eclair.RadioButtons(["Option A", "Option B", "Option C"])
    ///     .name("value")
    /// ```  
    name(_name) {
        this._hidden.name(_name)
        return this;
    }
    
    /// METHOD .value
    /// DESC Bind a state to the value of the radio buttons or to set the value.
    /// ARG value: Selected value of the options.
    /// ```javascript
    /// Eclair.RadioButtons(["Option A", "Option B", "Option C"])
    ///     .value("Option A")
    /// ```   
    value(_value) {
        this.bindState(_value, "value", value => {
            if (value != this._selectedValue.value()) {
                let newIndex = this._updateSelectedItemStyles(value)
                
                this._selectedIndex = newIndex;
                this._selectedValue.value(value, self)
                
                if (this.stateBindings.hasOwnProperty("index")) {this.stateBindings["index"].value(newIndex, this)}
            }
        })
        
        return this
    }
    
    /// METHOD .selectedIndex
    /// DESC Bind a state to the selected index of the radio buttons or to set the selected index.
    /// ARG index: Selected index of the options.
    /// ```javascript
    /// Eclair.RadioButtons(["Option A", "Option B", "Option C"])
    ///     .selectedIndex(2)
    /// ```   
    selectedIndex(_index) {
        this.bindState(_index, "index", value => {
            if (value != this._selectedIndex) {
                let newValue = ""
                for (let i = 0; i < this._options.length(); i++) {
                    let match = i == value

                    this._view.children[i].selected(match)
                    if (match) {newValue = this._options.get(i);}
                }
                
                this._selectedIndex = value;
                this._selectedValue.value(newValue, self)
                
                if (this.stateBindings.hasOwnProperty("value")) {this.stateBindings["value"].value(newValue, this)}
            }
        }, state => {return state.int(0)})
        
        return this
    }
    
    /// METHOD .itemStyle
    /// DESC Callback for modifying the item style.
    /// ARG callback: Callback function with arg of the style object.
    /// ```javascript
    /// Eclair.RadioButtons(["Option A", "Option B", "Option C"])
    ///     .itemStyle(style => {
    ///         style.background("red")
    ///              .background("green", "hover")
    ///     })
    /// ```   
    itemStyle(callback) {
        callback(this.customStyles.itemStyle)
        return this           
    }
    
    /// METHOD .radioStyle
    /// DESC Callback for modifying the radio style.
    /// ARG callback: Callback function with arg of the style object.
    /// ```javascript
    /// Eclair.RadioButtons(["Option A", "Option B", "Option C"])
    ///     .radioStyle(style => {
    ///         style.background("red")
    ///              .background("green", "hover")
    ///     })
    /// ```          
    radioStyle(callback) {
        callback(this.customStyles.radioStyle)
        return this           
    }
    
    /// METHOD .labelStyle
    /// DESC Callback for modifying the label style.
    /// ARG callback: Callback function with arg of the style object.
    /// ```javascript
    /// Eclair.RadioButtons(["Option A", "Option B", "Option C"])
    ///     .labelStyle(style => {
    ///         style.background("red")
    ///              .background("green", "hover")
    ///     })
    /// ```               
    labelStyle(callback) {
        callback(this.customStyles.labelStyle)
        return this           
    }
    
    /// METHOD .selectedItemStyle
    /// DESC Callback for modifying the selected item style.
    /// ARG callback: Callback function with arg of the style object.
    /// ```javascript
    /// Eclair.RadioButtons(["Option A", "Option B", "Option C"])
    ///     .selectedItemStyle(style => {
    ///         style.background("red")
    ///              .background("green", "hover")
    ///     })
    /// ```           
    selectedItemStyle(callback) {
        callback(this.customStyles.selectedItemStyle)
        return this           
    }
    
    /// METHOD .selectedRadioStyle
    /// DESC Callback for modifying the selected radio style.
    /// ARG callback: Callback function with arg of the style object.
    /// ```javascript
    /// Eclair.RadioButtons(["Option A", "Option B", "Option C"])
    ///     .selectedRadioStyle(style => {
    ///         style.background("red")
    ///              .background("green", "hover")
    ///     })
    /// ```               
    selectedRadioStyle(callback) {
        callback(this.customStyles.selectedRadioStyle)
        return this           
    }
    
    /// METHOD .selectedLabelStyle
    /// DESC Callback for modifying the selected label style.
    /// ARG callback: Callback function with arg of the style object.
    /// ```javascript
    /// Eclair.RadioButtons(["Option A", "Option B", "Option C"])
    ///     .selectedLabelStyle(style => {
    ///         style.background("red")
    ///              .background("green", "hover")
    ///     })
    /// ```            
    selectedLabelStyle(callback) {
        callback(this.customStyles.selectedLabelStyle)
        return this           
    }
    
    build() {         
        return `<div>${this._hidden.compile()}${this._view.compile()}</div>`
    }
}


// ## Eclair Radio Item
// This object is used internally by the radio button object only.
// Args:
//  - _text. The text to show next to the radio button dot.
//  - customStyles. A dictionary of styles to give to the items for being selected or not.
//        {itemStyle, radioStyle, labelStyle, selectedItemStyle, selectedRadioStyle, selectedLabelStyle}
class EclairRatioItem extends EclairHStack {
    constructor(_text, customStyles) {
        super([
            Eclair.CustomTagComponent("div")
                .addStyle(Eclair.styles.RadioButtonsRadio)
                .addStyle(customStyles.radioStyle),
            Eclair.Text(_text)
                .addStyle(Eclair.styles.RadioButtonsLabel)
                .addStyle(customStyles.labelStyle)
        ])
        
        this.value = _text
        this.addStyle(Eclair.styles.RadioButtonsItem)
            .addStyle(customStyles.itemStyle)
        
        this.customStyles = customStyles
    }
    
    // This function should only be used by the parent radio item object which calls this function with a 
    // boolean. If true then all the selected styles should be applied, however, if false is called, then 
    // all selected styles are removed.
    selected(value) {
        if (value) {
            this.addStyle(Eclair.styles.RadioButtonsSelectedItem)
                .addStyle(this.customStyles.selectedItemStyle)
                .child(0, radio => {
                    radio.addStyle(Eclair.styles.RadioButtonsSelectedRadio)
                        .addStyle(this.customStyles.selectedRadioStyle)
                })
                .child(1, label => {
                    label.addStyle(Eclair.styles.RadioButtonsSelectedLabel)
                        .addStyle(this.customStyles.selectedLabelStyle)
                })
        } else {
            this.removeStyle(Eclair.styles.RadioButtonsSelectedItem)
                .removeStyle(this.customStyles.selectedItemStyle)
                .child(0, radio => {
                    radio.removeStyle(Eclair.styles.RadioButtonsSelectedRadio)
                        .removeStyle(this.customStyles.selectedRadioStyle)
                })
                .child(1, label => {
                    label.removeStyle(Eclair.styles.RadioButtonsSelectedLabel)
                        .removeStyle(this.customStyles.selectedLabelStyle)
                })
        }
    }
}
