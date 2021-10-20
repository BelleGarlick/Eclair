/// ## Eclair Progress Bar
/// An eclair progress bar object.
/// ```javascript
/// eclair.RadioButtons(["Option A", "Option B", "Option C"])
///     .value("Option A")
///     .selectedIndex(0)
/// ```
// TODO Test trying to create a cycle with selected index and values.
class EclairRadioButtons extends EclairComponent {
    constructor(_options) {
        super("radio-button")
        
        // Internal states of values, options and selected index
        this._options = _options instanceof EclairState? _options : Ø(_options)
        this._selectedIndex = -1
        this._selectedValue = State("")
        
        // Custom styles for child elements
        this.customStyles = {
            "itemStyle": eclair.Style(),
            "radioStyle": eclair.Style(),
            "labelStyle": eclair.Style(),
            "selectedItemStyle": eclair.Style(),
            "selectedRadioStyle": eclair.Style(),
            "selectedLabelStyle": eclair.Style(),
        }
        
        // Create elements
        let self = this
        this._hidden = this._addChild(eclair.HiddenInput(this._selectedValue))
        this._view = this._addChild(eclair.VStack(_options, item => {
            return new EclairRatioItem(item, this.customStyles)
                .onClick(() => {
                    let newIndex = this._updateSelectedItemStyles(item)
                    
                    this._selectedValue.value(item, self)
                    this._selectedIndex = newIndex;
                
                    if (self.stateBindings.hasOwnProperty("index")) {self.stateBindings["index"].value(newIndex, self)}
                    if (self.stateBindings.hasOwnProperty("value")) {self.stateBindings["value"].value(item, self)}
                    if (self.getElement() != null) {self.performCallback("onChange")}
                })
        }))
        
        // Add custom style to object
        this.addStyle(eclair.styles.RadioButtons)
    }
    
    // Function to update the selected items from a given value.
    // This function will also return the index of the item with the given value.
    _updateSelectedItemStyles(selectedValue) {
        let newIndex = -1;
        for (let i = 0; i < this._options.length(); i++) {
            let match = this._options.get(i) == selectedValue

            this._view.children[i].selected(match)
            if (match) {newIndex = i;}
        }
        
        return newIndex;
    }
    
    /// ### .name
    /// Set the name attribute for this element. (used in forms).
    /// <br/>**args**:
    /// - value: Selected value of the options.
    /// ```javascript
    /// eclair.RadioButtons(["Option A", "Option B", "Option C"])
    ///     .name("value")
    /// ```  
    name(_name) {
        this._hidden.name(_name)
        return this;
    }
    
    /// ### .value
    /// Bind a state to the value of the radio buttons or to set the value.
    /// <br/>**args**:
    /// - value: Selected value of the options.
    /// ```javascript
    /// eclair.RadioButtons(["Option A", "Option B", "Option C"])
    ///     .value("Option A")
    /// ```   
    value(_value) {
        this.bindState(_value, "value", value => {
            if (value != this._selectedValue.value()) {
                let newIndex = this._updateSelectedItemStyles(item)
                
                this._selectedIndex = newIndex;
                this._selectedValue.value(value, self)
                
                if (this.stateBindings.hasOwnProperty("index")) {this.stateBindings["index"].value(newIndex, sethislf)}
                if (this.getElement() != null) {this.performCallback("onChange")}
            }
        })
        
        return this
    }
    
    /// ### .selectedIndex
    /// Bind a state to the selected index of the radio buttons or to set the selected index.
    /// <br/>**args**:
    /// - _index: Selected index of the options.
    /// ```javascript
    /// eclair.RadioButtons(["Option A", "Option B", "Option C"])
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
                
                if (this.stateBindings.hasOwnProperty("value")) {this.stateBindings["value"].value(newValue, sethislf)}
                if (this.getElement() != null) {this.performCallback("onChange")}
            }
        })
        
        return this
    }
    
    /// ### .itemStyle
    /// Callback for modifying the item style.
    /// <br/>**args**:
    /// - callback: Callback function with arg of the style object.
    /// ```javascript
    /// eclair.RadioButtons(["Option A", "Option B", "Option C"])
    ///     .itemStyle(style => {
    ///         style.background("red")
    ///              .background("green", "hover")
    ///     })
    /// ```   
    itemStyle(callback) {
        callback(this.customStyles.itemStyle)
        return this           
    }
         
    /// ### .radioStyle
    /// Callback for modifying the radio style.
    /// <br/>**args**:
    /// - callback: Callback function with arg of the style object.
    /// ```javascript
    /// eclair.RadioButtons(["Option A", "Option B", "Option C"])
    ///     .radioStyle(style => {
    ///         style.background("red")
    ///              .background("green", "hover")
    ///     })
    /// ```          
    radioStyle(callback) {
        callback(this.customStyles.radioStyle)
        return this           
    }
     
    /// ### .labelStyle
    /// Callback for modifying the label style.
    /// <br/>**args**:
    /// - callback: Callback function with arg of the style object.
    /// ```javascript
    /// eclair.RadioButtons(["Option A", "Option B", "Option C"])
    ///     .labelStyle(style => {
    ///         style.background("red")
    ///              .background("green", "hover")
    ///     })
    /// ```               
    labelStyle(callback) {
        callback(this.customStyles.labelStyle)
        return this           
    }
          
    /// ### .selectedItemStyle
    /// Callback for modifying the selected item style.
    /// <br/>**args**:
    /// - callback: Callback function with arg of the style object.
    /// ```javascript
    /// eclair.RadioButtons(["Option A", "Option B", "Option C"])
    ///     .selectedItemStyle(style => {
    ///         style.background("red")
    ///              .background("green", "hover")
    ///     })
    /// ```           
    selectedItemStyle(callback) {
        callback(this.customStyles.selectedItemStyle)
        return this           
    }
    
    /// ### .selectedRadioStyle
    /// Callback for modifying the selected radio style.
    /// <br/>**args**:
    /// - callback: Callback function with arg of the style object.
    /// ```javascript
    /// eclair.RadioButtons(["Option A", "Option B", "Option C"])
    ///     .selectedRadioStyle(style => {
    ///         style.background("red")
    ///              .background("green", "hover")
    ///     })
    /// ```               
    selectedRadioStyle(callback) {
        callback(this.customStyles.selectedRadioStyle)
        return this           
    }
    
    /// ### .selectedLabelStyle
    /// Callback for modifying the selected label style.
    /// <br/>**args**:
    /// - callback: Callback function with arg of the style object.
    /// ```javascript
    /// eclair.RadioButtons(["Option A", "Option B", "Option C"])
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
            eclair.CustomTagComponent("div")
                .addStyle(eclair.styles.RadioButtonsRadio)
                .addStyle(customStyles.radioStyle),
            eclair.Text(_text)
                .addStyle(eclair.styles.RadioButtonsLabel)
                .addStyle(customStyles.labelStyle)
        ])
        
        this.value = _text
        this.addStyle(eclair.styles.RadioButtonsItem)
            .addStyle(customStyles.itemStyle)
        
        this.customStyles = customStyles
    }
    
    // This function should only be used by the parent radio item object which calls this function with a 
    // boolean. If true then all the selected styles should be applied, however, if false is called, then 
    // all selected styles are removed.
    selected(value) {
        if (value) {
            this.addStyle(eclair.styles.RadioButtonsSelectedItem)
                .addStyle(this.customStyles.selectedItemStyle)
            
            this.children[0]
                .addStyle(eclair.styles.RadioButtonsSelectedRadio)
                .addStyle(this.customStyles.selectedRadioStyle)
            
            this.children[1]
                .addStyle(eclair.styles.RadioButtonsSelectedLabel)
                .addStyle(this.customStyles.selectedLabelStyle)
        } else {
            this.removeStyle(eclair.styles.RadioButtonsSelectedItem)
                .removeStyle(this.customStyles.selectedItemStyle)
            
            this.children[0]
                .removeStyle(eclair.styles.RadioButtonsSelectedRadio)
                .removeStyle(this.customStyles.selectedRadioStyle)
            
            this.children[1]
                .removeStyle(eclair.styles.RadioButtonsSelectedLabel)
                .removeStyle(this.customStyles.selectedLabelStyle)
        }
    }
}
