// WARN RADIO BUTTONS NOT DONE
class EclairRadioButtons extends EclairComponent {
    constructor(_options) {
        super()
        
        this._items = []
        this._selectedIndex = 0
        
        this._selectedValue = State("")
        this._hidden = eclair.HiddenInput(this._selectedValue)
        
        this.bindOptions(_options)
        
        // TODO Make this easy to access
        this.itemStyle = eclair.Style()
        this.selectedItemStyle = eclair.Style()
        this.radioStyle = eclair.Style()
        this.selectedRadioStyle = eclair.Style()
        
        // Update callbacks on item selected
        let self = this
        this._callbacks["selectRadioButton"] = function(object, selectedElement) {
            self.getElement(e => {
                for (let i = 0; i < e.children.length; i++) {
                    if (e.children[i] == selectedElement) {
                        // Subtract 1 as first item is the hidden input
                        self._selectedIndex = i - 1
                        
                        // Update the hidden input
                        self._selectedValue.value(self._items[self._selectedIndex])
                        
                        // If a value binding exists, update it
                        if (self.stateBindings.hasOwnProperty("value")) {
                            self.stateBindings["value"].value(self._items[self._selectedIndex])
                        }

                        // If an index binding exists, update it
                        if (self.stateBindings.hasOwnProperty("index")) {
                            self.stateBindings["index"].value(self._selectedIndex)
                        }
                    }
                }
            })
        }
        
        this._hidden.parent = this
        this.children = [this._hidden]
        
        this.addStyle(eclair.styles.RadioButtons)
    }
    
    bindOptions(_options) {
        if (_options instanceof Array) {
            let itemSet = new Set()
            for (let i = 0; i < _options.length; i++) {
                let newOption = _options[i]
                if (!itemSet.has(newOption)) {
                    this._items.push(newOption)
                    itemSet.add(newOption)
                }
            }
        } else if (_options instanceof EclairState && _options.isArray()) {
            // Add binding for the topions
            this.bindState(_options, "options", array => {
                // TODO Insert at right position
                let itemSet = new Set(this._items)
                for (let i = 0; i < array.length; i++) {
                    let newOption = array[i]
                    if (!itemSet.has(newOption)) {
                        this._items.push(newOption)
                        itemSet.add(newOption)
                        
                        // Add to ui if exists
                        this.getElement(e => {
                            e.insertAdjacentHTML('beforeend', this.buildItem(newOption))
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
                            console.log(e.children)
                            console.log(e.children[i + 1])
                            e.removeChild(e.children[i + 1])
                        })
                    }
                } 
                
                // TODO alert the selected item maybe
                // TODO On change items, set the value and index function 
            })
        } else {
            throw "Unknown radio button options type. Should be either a javascript Array or an EclairState Array"
        }
    }
    
    name(_name) {
        this._hidden.name(_name)
        return this;
    }
    
    // TODO .value needs rewriting
    value(value) {
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
    }
    
    selectedIndex(_index) {
        this.bindState(_index, "index", value => {
            this._selectedIndex = value
            this._selectedValue.value(this._items[value])
            
            this.getElement(e => {
                let buttons = e.children;
                for (let n = 0; n < this._items.length; n++) {
                    // Add 1 to n as child 1 is the hidden input box
                    let radioButton = buttons[n + 1].children[0].children[0].children[0].children[0]

                    if (value == n) {
                        buttons[n].setAttribute("class", eclair.styles.RadioButtonsSelectedItem.id() + " " + this.selectedItemStyle.id())
                        radioButton.setAttribute("class", eclair.styles.RadioButtonsSelectedRadio.id() + " " + this.selectedRadioStyle.id())
                    } else {
                        buttons[n].setAttribute("class", eclair.styles.RadioButtonsItem.id() + " " + this.itemStyle.id())
                        radioButton.setAttribute("class", eclair.styles.RadioButtonsRadio.id() + " " + this.radioStyle.id())
                    }
                }
            })
        }, state => {return state.int(0)})
        
        return this
    }
    
    // Used to build the html of the inner items.    
    buildItem(_item, isSelected) {        
        let radioClass = `${eclair.styles.RadioButtonsItem.id()} ${this.itemStyle.id()}`
        let divClass = `${eclair.styles.RadioButtonsRadio.id()} ${this.radioStyle.id()}`
        
        if (isSelected == true) {
            radioClass = `${eclair.styles.RadioButtonsSelectedItem.id()} ${this.selectedItemStyle.id()}`
            divClass = `${eclair.styles.RadioButtonsSelectedRadio.id()} ${this.selectedRadioStyle.id()}`
        }
        
        return `<table onclick='eclair.performCallback("${this.id()}", "selectRadioButton", event, this)' cellpadding=6 class='${radioClass}'><tbody><tr><td width=1><div class='${divClass}'></div></td><td>${_item}</td></tr></tbody></table>`
    }
    
    // Overriden method, no need to doc
    build() {          
        let items = ""
        for (let i = 0; i < this._items.length; i++) {
            items += this.buildItem(this._items[i], i==this._selectedIndex)
        }
        return `<div>${this._hidden.compile()}${items}</div>`
    }
}