/// ## Eclair Select
/// An eclair Select object.
/// <br/>**args**:
/// - selectedValue: A binding for the selected value.
/// ```javascript
/// let selectedValue = eclair.State()
/// eclair.Select(selectedValue)
///     .addOptions(["apple", "orange", "banana"])
/// ```
class EclairSelect extends EclairComponent {
    constructor(_selectedValue) {
        super()
        
        this.options = []
        this._enabled = true
        
        // Bind if the state changes
        this.bindState(_selectedValue, "value", value => {
            for (let n = 0; n < this.options.length; n++) {
                this.options[n].selected = value == this.options[n].value;
            }
            
            this.getElement(elem => {
                elem.value = value
                if (this.stateBindings.hasOwnProperty("index")) {
                    this.stateBindings["index"].value(elem.selectedIndex)
                }
            })
        })
        
        // Add callback for when the user actively changes the selected value
        this.overrideOnChangeCallback = null
        this._updateCallback("onChange", e => {
            if (e._enabled) {
                this.getElement(select => {
                    if (_selectedValue instanceof EclairState) {
                        _selectedValue.value(select.value)
                    }
                    
                    if (this.stateBindings.hasOwnProperty("index")) {
                        this.stateBindings["index"].value(select.selectedIndex)
                    }
                })
                
                if (this.overrideOnChangeCallback != null) {
                    this.overrideOnChangeCallback(this)
                }
            }
        })
        
        this.addStyle(eclair.styles.Select)
    }
    
    // No need to doc, overriden method.
    onChange(callback) {
        this.overrideOnChangeCallback = callback
        return this;
    }
    
    /// ### .name
    /// Set the name attribute for this element (used in forms).
    /// <br/>**args**:
    /// - name: The name attribute name given to the element.
    /// ```javascript
    /// eclair.Select()
    ///     .name("fname")
    /// ```
    name(_name) {
        this.bindState(_name, "name", value => {
            this.setAttr("name", _name)
        })
        return this
    }
    
    /// ### .selectedIndex
    /// A value which represents the selected item of the select box.
    /// <br/>**args**:
    /// - index: The index to select.
    /// ```javascript
    /// eclair.Select()
    ///     .addOptions(["apple", "orange", "banana"])
    ///     .selectedIndex(1)
    /// ```
    selectedIndex(_index) {
        this.bindState(_index, "index", value => {
            for (let n = 0; n < this.options.length; n++) {
                this.options[n].selected = value == n;
            }
            
            this.getElement(elem => {elem.selectedIndex = `${value}`})  
            // TODO Set the value binding . need ths._value.value(elem.value...)
        }, state => {return state.int(0)})
        
        return this
    }
    
    /// ### .addOption
    /// Add a singular string value to the list.
    /// <br/>**args**:
    /// - value: The value of option as returned in the form.
    /// - text: (Optional) The text value displayed to the user. If not present the text will take on the value string.
    /// - selected: (Optional) If true, this option will be the default selected option.
    /// ```javascript
    /// eclair.Select()
    ///     .addOption("apple")
    ///     .addOption("orange", "Clementine")
    ///     .addOption("banana", "banana", true)
    /// ```
    addOption(value, text, selected) {
        if (typeof(text) == "boolean" && selected == null) {
            selected = text;
            text = null;
        }
        if (text == null) {text = value}
        if (selected == null) {selected = false}
        
        let newOption = {
            "value": value,
            "text": text,
            "selected": selected
        }
        
        this.options.push(newOption)
        
        let elem = this.getElement();
        if (elem != null) {
            elem.appendChild(this.buildOptionHTML(newOption))
        }
        
        return this;
    }
    
    /// ### .addOptions
    /// Add multiple values to the select box.
    /// <br/>**args**:
    /// - items: List of strings to display in the select box.
    /// ```javascript
    /// eclair.Select()
    ///     .addOptions(["apple", "orange", "banana"])
    /// ```
    addOptions(items) {
        for (let i = 0; i < items.length; i++) {
            this.addOption(items[i]);
        }
        return this;
    }
    
    /// ### .removeOption
    /// Removes a string option from the list of options.
    /// <br/>**args**:
    /// - value: The value to remove from the list of options.
    /// ```javascript
    /// eclair.Select()
    ///     .addOptions(["apple", "orange", "banana"])
    ///     .removeOptions("orange")
    /// ```
    removeOption(value) {
        let nonRemovedOptions = []
        for (let n = 0; n < this.options.length; n++) {
            if (this.options[n].value != value) {
                nonRemovedOptions.push(this.options[n]);
            }
        }
        this.options = nonRemovedOptions;
        
        // Remove HTML elements
        let elem = this.getElement()
        if (elem != null) {
            let ops = elem.children;
            let removes = [];
            
            for (let o = 0; o < ops.length; o++) {
                if (ops[o].value == value) {
                    removes.push(ops[o]);
                }
            }
            
            for (let r = 0; r < removes.length; r++) {
                elem.removeChild(removes[r]);
            }
        }
        
        return this;
    }
    
    _buildOptionHTML(_option) {
        return `<option value='${_option.value}'${_option.selected ? " selected": ""}>${_option.text}</option>`
    }
    
    build() {
        let options = ""
        for (let n = 0; n < this.options.length; n++) {
            options += this._buildOptionHTML(this.options[n]);
        }
        
        return `<select>${options}</select>`
    }
}
