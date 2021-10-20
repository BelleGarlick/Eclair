// TODO Testing radio buttons styles and fully test trying to create a cycle with selected index and values.



class EclairRadioButtons extends EclairComponent {
    constructor(_options) {
        super("radio-button")
        
        // Internal states of values, options and selected index
        this._options = _options instanceof EclairState? _options : eclair.State(_options)
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
    
    _updateSelectedItemStyles(selectedValue) {
        let newIndex = -1;
        for (let i = 0; i < this._options.length(); i++) {
            let match = this._options.get(i) == selectedValue

            this._view.children[i].selected(match)
            if (match) {newIndex = i;}
        }
        
        return newIndex;
    }
    
    name(_name) {
        this._hidden.name(_name)
        return this;
    }
    
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
    
    // TODO Add getting methods with callback for styles
    
    // Overriden method, no need to doc
    build() {         
        return `<div>${this._hidden.compile()}${this._view.compile()}</div>`
    }
}


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
