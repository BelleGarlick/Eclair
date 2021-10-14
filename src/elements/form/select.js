/// ## Eclair Select
/// An eclair Select object.
/// <br/>**args**:
/// - options: A list of options that the user can select from
/// ```javascript
/// eclair.Select(["apple", "orange", "banana"])
/// ```
class EclairSelect extends EclairComponent {
    constructor(_options) {
        super("select")
        
        this._items = []
        this._selectedIndex = 0
        this._bindOptions(_options)
          
        // Add callback for when the user actively changes the selected value
        this.overrideOnChangeCallback = null
        this._updateCallback("onChange", e => {
            this.getElement(select => {
                // If a value binding exists, update it
                if (this.stateBindings.hasOwnProperty("value")) {
                    this.stateBindings["value"].value(select.value)
                }

                // If an index binding exists, update it
                if (this.stateBindings.hasOwnProperty("index")) {
                    this.stateBindings["index"].value(select.selectedIndex)
                }
            })

            // Call the override on change function
            if (this.overrideOnChangeCallback != null) {
                this.overrideOnChangeCallback(this)
            }
        })
        
        this.addStyle(eclair.styles.Select)
    }
    
    _bindOptions(_options) {
        if (_options instanceof Array) {
            for (let i = 0; i < _options.length; i++) {
                this._items.push(_options[i])
            }
        } else if (_options instanceof EclairState && _options.isArray()) {
            // Add binding for the options
            // TODO Insert at right position
            this.bindState(_options, "options", array => {
                let itemSet = new Set(this._items)
                for (let i = 0; i < array.length; i++) {
                    let newOption = array[i]
                    if (!itemSet.has(newOption)) {
                        this._items.push(newOption)
                        itemSet.add(newOption)
                        
                        // Add to ui if exists
                        this.getElement(e => {
                            let opt = document.createElement("option")
                            opt.innerHTML = newOption
                            e.appendChild(opt)
                        })
                    }
                } 
                
                // Removing items
                let stateItems = new Set(array)
                for (let i = this._items.length - 1; i >= 0; i--) {
                    let cOption = this._items[i]
                    if (!stateItems.has(cOption)) {
                        this._items.splice(i, 1)
                        stateItems.delete(cOption)
                        
                        // Add to ui if exists
                        this.getElement(e => {
                            e.removeChild(e.children[i])
                        })
                    }
                } 
                
                // TODO alert the selected item maybe
                // TODO On change items, set the value and index function 
            })
        } else {
            throw "Unknown select options type. Should be either a javascript Array or an EclairState Array"
        }
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
    /// eclair.Select(["apple", "orange", "banana"])
    ///     .name("fname")
    /// ```
    name(_name) {
        this.bindState(_name, "name", value => {
            this.setAttr("name", _name)
        })
        return this
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
            for (let i = 0; i < this._items.length; i++) {
                if (this._items[i] == value) {
                    // If value changes then call on change
                    if (this._selectedIndex != i) {
                        if (this.overrideOnChangeCallback != null) {
                            this.overrideOnChangeCallback(this)
                        }
                    
                        this._selectedIndex = i
                        this.getElement(elem => {elem.selectedIndex = i})
                        
                        // Update the selected index
                        if (this.stateBindings.hasOwnProperty("index")) {
                            this.stateBindings["index"].value(i)
                        }
                    }
                    
                    break
                }
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
            // If value changes then call on change
            if (this._selectedIndex != value) {
                if (this.overrideOnChangeCallback != null) {
                    this.overrideOnChangeCallback(this)
                }
            
                this._selectedIndex = value
                this.getElement(elem => {elem.selectedIndex = `${value}`}) 
                
                // Update the value to the current selected value
                if (this.stateBindings.hasOwnProperty("value")) {
                    this.stateBindings["value"].value(this._items[value])
                }
            }
        }, state => {return state.int(0)})
        
        return this
    }
    
    build() {
        let options = ""
        for (let n = 0; n < this._items.length; n++) {
            options += `<option${this._selectedIndex == n? " selected" : ""}>${this._items[n]}</option>`;
        }
        
        return `<select>${options}</select>`
    }
}
