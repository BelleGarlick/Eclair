/// ## Eclair Select
/// An eclair Select object.
/// <br/>**args**:
/// - options: A list of options that the user can select from
/// ```javascript
/// eclair.Select(["apple", "orange", "banana"])
/// ```
class EclairNewSelect extends EclairView {
    constructor(elements) {
        super(elements, item => {
            return eclair.CustomTagComponent("option").innerHTML(item)
        })
        
        this._selectedIndex = 0
        this._selectedValue = null
        
        // Add callback for when the user actively changes the selected value
        this.overrideOnChangeCallback = null
        this._updateCallback("onChange", (select, ev) => {
            this._updateSelected(select.selectedIndex, select.value)
        })
        
        this.addStyle(eclair.styles.Select)
            .removeStyle(eclair.styles.View)
    }
    
    
    // Override onChange callback 
    onChange(callback) {
        this.overrideOnChangeCallback = callback
        return this;
    }
    
    /// ### .value
    /// A value which represents the selected item of the select box.
    /// <br/>**args**:
    /// - value: The value to set the select to.
    /// ```javascript
    /// eclair.Select(["apple", "orange", "banana"])
    ///     .value("banana")
    /// ```
    value(_value) {
        this.bindState(_value, "value", value => {
            if (value != this._selectedValue) {
                this._selectedValue = value
                
                let newIndex = -1
                for (let i = 0; i < this.items.length(); i++) {
                    if (this.items.get(i) == value) {
                        newIndex = i; break
                    }
                }
                if (newIndex != this.selectedIndex) {
                    this.selectedIndex = newIndex
                    if (this.stateBindings.hasOwnProperty("index")) {this.stateBindings["index"].value(i, this)}
                }
                
                this.getElement(elem => {elem.value = value})
                
                if (this.overrideOnChangeCallback != null) {this.overrideOnChangeCallback(this, ev)}
            }
        })
        
        return this
    }
    
    /// ### .selectedIndex
    /// A value which represents the selected item of the select box.
    /// <br/>**args**:
    /// - index: The index to select.
    /// ```javascript
    /// eclair.Select(["apple", "orange", "banana"])
    ///     .selectedIndex(1)
    /// ```
    selectedIndex(_index) {
        this.bindState(_index, "index", value => {
            if (value != this._selectedIndex) {
                this._selectedIndex = value
                
                let newValue = ""
                if (value < this.items.length() && value >= 0) {
                    newValue = this.itens.get(value)
                }
                
                if (newValue != this._selectedValue) {
                    this._selectedValue = newValue
                    if (this.stateBindings.hasOwnProperty("value")) {this.stateBindings["value"].value(i, this)}
                }
                
                this.getElement(elem => {elem.selectedIndex = value})
                
                if (this.overrideOnChangeCallback != null) {this.overrideOnChangeCallback(this, ev)}
            }
        }, state => {return state.int()})
        
        return this
    }
    
    _updateSelected(_index, _value) {
        if (_index != this._selectedIndex) {
            this._selectedIndex = _index
            
            // If an index binding exists, update it
            if (this.stateBindings.hasOwnProperty("index")) {
                this.stateBindings["index"].value(select.selectedIndex, this)
            }
        }
        if (_value != this._selectedValue) {
            this._selectedValue= _value
            
            if (this.stateBindings.hasOwnProperty("value")) {
                this.stateBindings["value"].value(select.value, this)
            }
        }
        
        // Call the override on change function
        if (this.overrideOnChangeCallback != null) {this.overrideOnChangeCallback(this, ev)}
    }
    
    // Override parent so that when items change we can reset the selected items and value
    _onItemsChanged() {
        let newIndex = 0
        let newValue = null
        
        if (this.items.length() > 0) {
            newIndex = 0
            newValue = this.items.get(0)
            
            this.getElement(e => {
                for (let i = 1; i < this.items.length(); i++) {
                    if (i == e.selectedIndex) {
                        newIndex = i
                        newValue = this.items.get(i)
                    }
                }
            })
        } 
        
        this._updateSelected(newIndex, newValue)
    }
    
    build () {                
        let code = ""
        for (let e = 0; e < this.children.length; e++) {
            let child = this.children[e]
            if (e == this._selectedIndex) {
                child.setAttr("selected", "true")
            }
                
            code += child.compile()
        }
        
        return `<select>` + code + `</select>`;
    }
}
