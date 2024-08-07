/// TITLE Eclair Select
/// EXTENDS elements.layout.view:EclairView
/// DESC An eclair select element.

Eclair.Select = function(_value) {
    return new EclairSelect(_value);
}

/// SHARED-STYLE Eclair.styles.Select: Select style.
Eclair.styles.Select = Eclair.Style("eclair-style-select")
    .borderSize("0px")
    .borderRadius("2px")
    .padding("8px 16px")
    .backgroundColor("#eeeeee")
    .fontFamily(Eclair.theme.font)
    .backgroundColor("#dddddd", "hover")
    .backgroundColor("#cccccc", "active")

/// ```javascript
/// Eclair.Select(["apple", "orange", "banana"])
///     .selectedIndex(0)
/// ```
class EclairSelect extends EclairView {
    
    /// METHOD constructor
    /// DESC Construct an eclair Select object.
    /// ARG items: Text items listed in the element.
    /// ```javascript
    /// Eclair.Select(["apple", "orange", "banana"])
    /// ```
    constructor(items) {
        super(items, item => {
            return Eclair.CustomTagComponent("option").innerHTML(item)
        })
        
        this._selectedIndex = 0
        this._selectedValue = null
        
        // Add callback for when the user actively changes the selected value
        this.overrideOnChangeCallback = null
        this._updateCallback("onChange", (select, ev) => {
            select.getElement(e => {
                this._updateSelected(e.selectedIndex, e.value)
                if (this.overrideOnChangeCallback != null) {this.overrideOnChangeCallback(this, ev)}
            })
        })
        
        this.addStyle(Eclair.styles.Select)
            .removeStyle(Eclair.styles.View)
    }
    
    
    // Override onChange callback 
    onChange(callback) {
        this.overrideOnChangeCallback = callback
        return this;
    }
    
    /// METHOD .value
    /// DESC A value which represents the selected item of the select box.
    /// ARG value: The value to set the select to.
    /// ```javascript
    /// Eclair.Select(["apple", "orange", "banana"])
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
                if (newIndex != this._selectedIndex) {
                    this._selectedIndex = newIndex
                    if (this.stateBindings.hasOwnProperty("index")) {this.stateBindings["index"].value(i, this)}
                }
                
                this.getElement(elem => {elem.value = value})
                
                if (this.overrideOnChangeCallback != null) {this.overrideOnChangeCallback(this)}
            }
        })
        
        return this
    }
    
    /// METHOD .selectedIndex
    /// DESC A value which represents the selected item of the select box.
    /// ARG index: The index to select.
    /// ```javascript
    /// Eclair.Select(["apple", "orange", "banana"])
    ///     .selectedIndex(1)
    /// ```
    selectedIndex(_index) {
        this.bindState(_index, "index", value => {
            if (value != this._selectedIndex) {
                this._selectedIndex = value
                
                let newValue = ""
                if (value < this.items.length() && value >= 0) {
                    newValue = this.items.get(value)
                }
                
                if (newValue != this._selectedValue) {
                    this._selectedValue = newValue
                    if (this.stateBindings.hasOwnProperty("value")) {this.stateBindings["value"].value(i, this)}
                }
                
                this.getElement(elem => {elem.selectedIndex = value})
                
                if (this.overrideOnChangeCallback != null) {this.overrideOnChangeCallback(this)}
            }
        }, state => {return state.int()})
        
        return this
    }
    
    _updateSelected(_index, _value) {
        if (_index != this._selectedIndex) {
            this._selectedIndex = _index
            
            // If an index binding exists, update it
            if (this.stateBindings.hasOwnProperty("index")) {
                this.stateBindings["index"].value(this._selectedIndex, this)
            }
        }
        if (_value != this._selectedValue) {
            this._selectedValue = _value
            
            if (this.stateBindings.hasOwnProperty("value")) {
                this.stateBindings["value"].value(this._selectedValue, this)
            }
        }
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
                    if (i == e._selectedIndex) {
                        newIndex = i
                        newValue = this.items.get(i)
                    }
                }
            })
        } 
        
        this._updateSelected(newIndex, newValue)
        
        // Call the override on change function
        if (this.overrideOnChangeCallback != null) {this.overrideOnChangeCallback(this)}
    }
    
    build () {   
        let elem = document.createElement("select")
        for (let e = 0; e < this.children.length; e++) {
            let child = this.children[e]
            if (e == this._selectedIndex) {
                child.setAttr("selected", "true")
            }
                
            elem.appendChild(child.compile())
        }
        
        return elem;
    }
}