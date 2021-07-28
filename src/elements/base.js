// TODO Remove this whole file
class EclairCustomTagComponent extends EclairComponent {
    constructor(tag) {
        super()
        this.tag = tag;
        this._innerHTML = "";
    }
    
    innerHTML(_html) {
        let elem = this.getElement();
        if (_html == null) {
            if (elem != null) {
                return elem.innerHTML;
            }
            return this._innerHTML;
        } else {
            this._innerHTML = _html;
            if (elem != null) {
                elem.innerHTML = _html;
            }
        }
        return this;
    }
    
    build() {
        return `<${this.tag}>${this._innerHTML}</${this.tag}>`
    }
}

class EclairTextArea extends EclairCustomTagComponent {
    constructor() {
        super("textarea")
        this._value = ""
    }
    
    value(_val) {
        let elem = this.getElement();
        if (_val == null) {
            if (elem != null) {
                return elem.value;
            }
            return this._value
        } else {
            this._value = _val
            if (elem != null) {
                elem.value = _val
            }
            return this
        }
    }
}
