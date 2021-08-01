// WARN RADIO BUTTONS NOT DONE
class EclairRadioButtons extends EclairComponent {
    constructor(selectedValue) {
        super()
        
        this._enabled = true
        
        this._selectedValue = selectedValue instanceof EclairState? selectedValue : eclair.State(selectedValue) 
        this._hidden = eclair.HiddenInput(this._selectedValue)
        
        this.itemStyle = eclair.Style()
        this.selectedItemStyle = eclair.Style()
        this.radioStyle = eclair.Style()
        this.selectedRadioStyle = eclair.Style()
        
        this.bindState(this._selectedValue, "value", value => {
            this.performCallback("onChange")

            this.getElement(e => {
                var selectedIndex = 0
                for (let n = 0; n < this.items.length; n++) {
                    let buttons = e.children;
                    let radioButton = buttons[n].children[0].children[0].children[0].children[0]
                    
                    if (value == this.items[n].value) {
                        selectedIndex = n
                        buttons[n].setAttribute("class", eclair.styles.RadioButtonsSelectedItem.id() + " " + this.selectedItemStyle.id())
                        radioButton.setAttribute("class", eclair.styles.RadioButtonsSelectedRadio.id() + " " + this.selectedRadioStyle.id())
                    } else {
                        buttons[n].setAttribute("class", eclair.styles.RadioButtonsItem.id() + " " + this.itemStyle.id())
                        radioButton.setAttribute("class", eclair.styles.RadioButtonsRadio.id() + " " + this.radioStyle.id())
                    }
                }
                
                if (this.stateBindings.hasOwnProperty("index")) {
                    this.stateBindings["index"].value(selectedIndex)
                }
            })
        })
        
        this.addStyle(eclair.styles.RadioButtons)
        
        this.items = []
        
        let self = this
        this._callbacks["selectRadioButton"] = function(object, selectedValue) {
            if (self._enabled) {   
                self._selectedValue.value(selectedValue)
            }
        }
    }
    
    selectedIndex(_index) {
        this.bindState(_index, "index", value => {
            this._selectedValue.value(this.items[value].value)
        }, state => {return state.int(0)})
        
        return this
    }
    
    name(_name) {
        this._hidden.name(_name)
        return this;
    }
    
    /// ### .add
    /// Add an item to the options the user can choose.
    /// <br/>**args**:
    /// - value: The value of the item.
    /// - text: The text shown to the user.
    /// ```javascript
    /// eclair.RadioButtons()
    ///     .add("Apple")
    ///     .add("Yellow Apple", "Banana")
    /// ```
    add(value, text) {
        // Set text to the value if the text is null
        text = text == null ? value : text
        
        // Create the item and add items to the list
        let item = {"value": value, "text": text}
        this.items.push(item)
        
        this.getElement(e => {
            // Insert the built item
            e.insertAdjacentHTML('beforeend', this.buildItem(item, this.items.length - 1))
        })
        
        return this;
    }
    
    /// ### .addItems
    /// Add a list of items as values to the list.
    /// <br/>**args**:
    /// - items: Add a list of items the user can select.
    /// ```javascript
    /// eclair.RadioButtons()
    ///     .addItems(["Apple", "Banana", "Orange"])
    /// ```
    addItems(_items) { 
        for (let n = 0; n < _items.length; n++) {
            this.add(_items[n])
        }
        return this
    }
    
    /// ### .removeItem
    /// Remove an item by value.
    /// <br/>**args**:
    /// - value: Remove a value with a given value.
    /// ```javascript
    /// eclair.RadioButtons()
    ///     .add("Apple")
    ///     .add("Banana")
    ///     .remove("Apple")
    /// ```
    remove(_value) {
        let selectedIndex = -1;
        for (let n = 0; n < this.items.length; n++) {
            if (this.items[n].value == _value) {
                selectedIndex = n;
            }
        }
        if (selectedIndex == -1) {
            for (let n = 0; n < this.items.length; n++) {
                if (this.items[n].text == _value) {
                    selectedIndex = n;
                }
            }
        }
        this.removeIndex(selectedIndex);
        
        return this;
    }
    
    /// ### .removeIndex
    /// Remove an item at an index.
    /// <br/>**args**:
    /// - index: Remove an item at an index.
    /// ```javascript
    /// eclair.RadioButtons()
    ///     .add("Apple")
    ///     .add("Banana")
    ///     .removeIndex(0)
    /// ```
    removeIndex(_index) {
        if (this.value() == this.items[_index].value) {
            this.selectedIndex((this.selectedIndex() + 1) % this.items.length)
        }
        
        let newItems = []
        for (let n = 0; n < this.items.length; n++) {
            if (n != _index)
                newItems.push(this.items[n])
        }
        this.items = newItems;
        
        this.getElement(e => {
            e.removeChild(e.childNodes[_index]);  
        })
        
        return this;
    }
    
    enabled(_enabled) {
        this._enabled = _enabled;
        return this
    }
    
    // Used to build the html of the inner items.    
    buildItem(_item, index) {
        let style = `style='margin-top: 3px;'`
        if (index == 0) {style = ""}
        
        let radioClass = `${eclair.styles.RadioButtonsItem.id()} ${this.itemStyle.id()}`
        let divClass = `${eclair.styles.RadioButtonsRadio.id()} ${this.radioStyle.id()}`
        
        if (_item.value == this._selectedValue.value()) {
            radioClass = `${eclair.styles.RadioButtonsSelectedItem.id()} ${this.selectedItemStyle.id()}`
            divClass = `${eclair.styles.RadioButtonsSelectedRadio.id()} ${this.selectedRadioStyle.id()}`
        }
        
        return `<table onclick='eclair.performCallback("${this.id()}", "selectRadioButton", "${_item.value}", ${index})' cellpadding=6 class='${radioClass}' ${style}><tbody><tr><td width=1><div class='${divClass}'></div></td><td>${_item.text}</td></tr></tbody></table>`
    }
    
    // Overriden method, no need to doc
    build() {          
        let items = ""
        for (let i = 0; i < this.items.length; i++) {
            items += this.buildItem(this.items[i], i)
        }
        return `<div>${items}${this._hidden.compile()}</div>`
    }
}