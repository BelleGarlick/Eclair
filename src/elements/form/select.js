
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
        
        return `<select>${options}</select>`
    }
}
