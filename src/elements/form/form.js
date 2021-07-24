//
// Form Elements
//
class EclairForm extends EclairComponent {
    constructor(elements) {
        super()
        
        this.elements = elements;
        this._method = "POST"
        this._action = null;
    }
    
    method(_method) {
        this._method = _method;
        return this;
    }
    
    action(_action) {
        this._action = _action;
        return this;
    }
    
    submit() {
        alert("Submit called")
    }
    
    build() {
        let code = `<form>`
        for (let n = 0; n < this.elements.length; n++) {
            code += this.elements[n].build();
        }
        code += "</form>"
        
        return this.wrapHTML(code);
    }
}

class EclairSelect extends EclairComponent {
    constructor() {
        super()
        this.options = []
        this.addStyle(eclair.styles.Select)
    }
    
    name(_name) {
        return _name == null? this.getAttr("name") : this.setAttr("name", _name)
    }
    
    value(newValue) {
        if (newValue == null) {
            return this.getElement().value;
        } else {
            for (let n = 0; n < this.options.length; n++) {
                this.options[n].selected = newValue == this.options[n].value;
            }
            
            this.getElement(elem => {elem.value = newValue})

            return this;
        }
    }
    
    selectedIndex(index) {
        if (index == null) {
            return this.getElement().selectedIndex;
        } else {
            for (let n = 0; n < this.options.length; n++) {
                this.options[n].selected = index == n;
            }
            this.getElement(elem => {elem.selectedIndex = `${index}`})
            
            return this;
        }
    }
    
    addOptions(items) {
        for (let i = 0; i < items.length; i++) {
            this.addOption(items[i]);
        }
        return this;
    }
    
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
    
    buildOptionHTML(newOption) {
        return `<option value='${newOption.value}'${newOption.selected ? " selected": ""}>${newOption.text}</option>`
    }
    
    build() {
        let options = ""
        for (let n = 0; n < this.options.length; n++) {
            options += this.buildOptionHTML(this.options[n]);
        }
        
        return this.wrapHTML(`<select>${options}</select>`)
    }
}

class EclairButton extends EclairComponent {
    constructor(text) {
        super()
        
        this.text = text;
        this.setAttr("type", "button")
        this.addStyle(eclair.styles.Button)
    }
    
    value(newText) {
        this.text = newText;
        this.getElement(elem => {
            let html = newText;
            if (typeof(html) != "string") {
                html = html.build()
            }
            elem.innerHTML = html;
        });
        return this
    }
    
    build() {
        let text = this.text;
        if (text == null) {
            text = "Button"
        }
        if (typeof(text) != "string") {
            text = this.text.build()
        }
        return this.wrapHTML(`<button>${this.text}</button>`)
    }
}

class EclairSlider extends EclairCustomTagComponent {
    constructor(progressValue) {
        super("input")
        
        let overrideOnInput = null;
        
        this.setAttr("type", "range")
        this.addStyle(eclair.styles.Slider)
        
        let self = this
        this._updateCallback("onInput", e => {
            if (self.overrideOnCreate != null) {
                overrideOnCreate(self)
            }
        })
        
        // Attach slider value to the callback
        this.setAttr("value", progressValue)
        if (progressValue instanceof EclairState) {
            progressValue.addCallback(this.id() + "-value", function(state) {
                self.setAttr("value", state.value())
                self.getElement(elem => {elem.value = state.value()})
            }, true)
           
            this._updateCallback("onInput", e => {
                e.getElement(elem => {progressValue.value(elem.value)})
                
                if (self.overrideOnCreate != null) {
                    overrideOnCreate(self)
                }
            })
        }
        
//                        .onInput(e => {progressValue.value(e.value())})
//    
//                        value(_val) {
//                            if (_val == null) {
//                                let elem = this.getElement();
//                                if (elem != null) {
//                                    return elem.value;
//                                }
//                                return this.getAttr("value")
//                            } else {
//                                this.setAttr("value", _val)
//                                return this
//                            }
//                        }
//        
    }
    
    name(_name) {
        return _name == null? this.getAttr("name") : this.setAttr("name", _name)
    }
    
    min(_min) {
        if (_min == null) {
            return this.getAttr("min");
        } else {
            this.setAttr("min", _min);
        }
        return this;
    }
    
    max(_max) {
        if (_max == null) {
            return this.getAttr("max");
        } else {
            this.setAttr("max", _max);
        }
        return this;
    }
    
    step(_step) {
        if (_step == null) {
            return this.getAttr("step");
        } else {
            this.setAttr("step", _step);
        }
        return this;
    }
    
    onInput(callback) {
        this.overrideOnInput = callback;
        return this;
    }
}

class EclairHiddenInput extends EclairCustomTagComponent {
    constructor() {
        super("input")
        this.setAttr("type", "hidden")
    }
    
    value(_text) {
        let elem = this.getElement();
        if (_text == null) {
            if (elem != null) {
                return elem.value;
            }
            return this.getAttr("value")
        } else {
            if (elem != null) {elem.value = _text;}
            this.setAttr("value", _text)
            return this
        }
    }
    
    name(_name) {
        return _name == null? this.getAttr("name") : this.setAttr("name", _name)
    }
}

    
class EclairRadioButtons extends EclairComponent {
    constructor() {
        super()
        
        this._enabled = true
        this._hidden = eclair.HiddenInput()
        
        this.itemStyle = eclair.Style()
        this.selectedItemStyle = eclair.Style()
        this.radioStyle = eclair.Style()
        this.selectedRadioStyle = eclair.Style()
        
        this.addStyle(eclair.styles.RadioButtons)
        
        this.items = []
        
        let self = this
        this._callbacks["selectRadioButton"] = function(object, selectedValue) {
            if (self._enabled) {   
                self.value(selectedValue)
                if (self._callbacks.hasOwnProperty("onChange")) 
                    self.performCallback("onChange")
            }
        }
    }
    
    buildItem(_item, index) {
        let style = `style='margin-top: 3px;'`
        if (index == 0) {style = ""}
        
        let radioClass = `${eclair.styles.RadioButtonsItem.id()} ${this.itemStyle.id()}`
        let divClass = `${eclair.styles.RadioButtonsRadio.id()} ${this.radioStyle.id()}`
        
        if (_item.value == this.value()) {
            radioClass = `${eclair.styles.RadioButtonsSelectedItem.id()} ${this.selectedItemStyle.id()}`
            divClass = `${eclair.styles.RadioButtonsSelectedRadio.id()} ${this.selectedRadioStyle.id()}`
        }
        
        return `<table onclick='eclair.performCallback("${this.id()}", "selectRadioButton", "${_item.value}")' cellpadding=6 class='${radioClass}' ${style}><tbody><tr><td width=1><div class='${divClass}'></div></td><td>${_item.text}</td></tr></tbody></table>`
    }
    
    addItem(value, text) {
        text = text == null ? value : text
        let item = {"value": value, "text": text}
        
        if (this.items.length == 0) {
            this._hidden.value(value)
        }
        
        this.items.push(item)
        
        let self = this;
        this.getElement(e => {
            // Create dummy element to set the inner html of, to get out the element as a child
            var div = document.createElement('div');
            div.innerHTML = self.buildItem(item, e.children.length)
            e.appendChild(div.firstChild);
        })
        
        return this;
    }
    
    removeItem(_value) {
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
    
    addItems(_items) { 
        for (let n = 0; n < _items.length; n++) {
            this.addItem(_items[n])
        }
        return this
    }
    
    value(_val) {
        if (_val == null) {
            return this._hidden.value()
        }
        this._hidden.value(_val)
        this.selectedIndex(this.selectedIndex())
        return this;
    }
    
    name(_name) {
        this._hidden.name(_name)
        return this;
    }
    
    enabled(_enabled) {
        if (_enabled == null) {
            return this._enabled;
        } else {
            this._enabled = _enabled;
            return this
        }
    }
    
    selectedIndex(_index) {
        if (_index == null) {
            let selectedIndex = -1;
            let _val = this._hidden.value()
            for (let n = 0; n < this.items.length; n++) {
                if (this.items[n].value == _val) {
                    selectedIndex = n;
                }
            }
            if (selectedIndex == -1) {
                for (let n = 0; n < this.items.length; n++) {
                    if (this.items[n].text == _val) {
                        selectedIndex = n;
                    }
                }
            }
            return selectedIndex;
        }
        
        this._hidden.value(this.items[_index].value)

        let self = this
        this.getElement(e => {
            for (let n = 0; n < self.items.length; n++) {
                let buttons = e.children;
                if (n == _index) {
                    buttons[n].setAttribute("class", eclair.styles.RadioButtonsSelectedItem.id() + " " + self.selectedItemStyle.id())
                } else {
                    buttons[n].setAttribute("class", eclair.styles.RadioButtonsItem.id() + " " + self.itemStyle.id())
                }

                let radioButton = buttons[n].children[0].children[0].children[0].children[0]
                if (n == _index) {
                    radioButton.setAttribute("class", eclair.styles.RadioButtonsSelectedRadio.id() + " " + self.selectedRadioStyle.id())
                } else {
                    radioButton.setAttribute("class", eclair.styles.RadioButtonsRadio.id() + " " + self.radioStyle.id())
                }
            }
        })
    }
    
    build() {          
        let items = ""
        for (let i = 0; i < this.items.length; i++) {
            items += this.buildItem(this.items[i], i)
        }
        return this.wrapHTML(`<div>${items}</div>${this._hidden.build()}`)
    }
}

class EclairCheckbox extends EclairComponent {
    constructor(text) {
        super()
        
        this._enabled = true     
        
        this.setAttr("cellpadding", 6)     
            .addStyle(eclair.styles.CheckBox)   
        
        this._label = eclair.Text(text)
            .addStyle(eclair.styles.CheckBoxLabel)
        this._checkbox = eclair.CustomTagComponent("div")
            .addStyle(eclair.styles.CheckBoxIcon)
        this._hidden = eclair.HiddenInput()
            .value("false")
        
        this.items = []
        
        let self = this
        this._updateCallback("onClick", () => {
            if (this.overrideOnClick != null) {
                this.overrideOnClick(this)
            }
            if (self._enabled) {   
                this.toggle()
                if (self._callbacks.hasOwnProperty("onChange")) 
                    self.performCallback("onChange")
            }  
        })
        
        this.overrideOnClick = null
    }
    
    label(callback) {
        callback(this._label)
        return this;
    }
    
    checkbox(callback) {
        callback(this._checkbox)
        return this;
    }
        
    onClick(callback) {
        this.overrideOnClick = callback;
        return this;
    }
    
    value(_val) {
        if (_val == null) {
            return this._hidden.value() == "true"
        }
        
        if (this._callbacks.hasOwnProperty("onChange")) {
            this.performCallback("onChange")    
        }
        
        if (_val == true) {
            this._hidden.value("true")
            this._checkbox
                .addStyle(eclair.styles.CheckBoxActiveIcon)
                .removeStyle(eclair.styles.CheckBoxIcon)
                .innerHTML("✓")
        } else {
            this._hidden.value("false")
            this._checkbox
                .addStyle(eclair.styles.CheckBoxIcon)
                .removeStyle(eclair.styles.CheckBoxActiveIcon)
                .innerHTML("")
        }
        return this        
    }
    
    toggle() {
        this.value(!this.value())
        return this;
    }
    
    name(_name) {
        if (_name == null) {
            return this._hidden.name()
        } else {
            this._hidden.name(_name)
        }
        return this;
    }
    
    enabled(_enabled) {
        if (_enabled == null) {
            return this._enabled;
        } else {
            this._enabled = _enabled;
            return this
        }
    }
    
    build() {
        let items = ""
        for (let i = 0; i < this.items.length; i++) {
            items += this.buildItem(this.items[i], i)
        }
        return this.wrapHTML(`<table><tr><td width=1>${this._checkbox.build()}</td><td>${this._label.build()}</td></tr></table>${this._hidden.build()}`)
    }
}