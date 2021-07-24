class EclairComponent extends EclairStylableObject {
    constructor() {
        super()
        
        this._id = eclair._newID();
        eclair._elements[this.id()] = this;
        
        this._callbacks = {}
        this.sharedStyles = []
        this.attributes = {
            id: this.id()
        }
    }
    
    id() {
        return "eclairElement" + this._id;
    }
    
    write() {
        document.write(this.build())
    }
    
    to(elemID) {
        document.getElementById(elemID).innerHTML = this.build();
    }
    
    getElement(callback) {
        let elem = document.getElementById(this.id());
        if (callback != null && elem != null) {
            callback(elem)
        }
        return elem;
    }
    
    getAttr(key) {
        let elem = this.getElement();
        if (elem != null) {return elem.getAttribute(key);}
        return this.attributes[key];
    }
    
    setAttr(key, value) {
        if (value == null) {
            delete this.attributes[key];
            this.getElement(elem => {elem.removeAttribute(key)})
        } else {
            this.attributes[key] = value;
            this.getElement(elem => {elem.setAttribute(key, value)})
        }
        return this;
    }
    
    addStyle(sharedClass) {
        if (sharedClass != null) {
            let className = typeof(sharedClass) == "string"? sharedClass:sharedClass.id();

            let found = false;
            for (let n = 0; n < this.sharedStyles.length; n++) {
                found = found || this.sharedStyles[n] == className;
            }

            if (!found) {
                this.sharedStyles.push(className);
            }

            let classesString = "";
            for (let n = 0; n < this.sharedStyles.length; n++) {
                if (n > 0) {classesString += " ";}
                classesString += this.sharedStyles[n];
            }
            this.setAttr("class", classesString)
        }
        return this;
    }
    
    removeStyle(sharedClass) {
        if (sharedClass != null) { 
            let className = typeof(sharedClass) == "string"? sharedClass:sharedClass.id();
            
            let newStyles = []
            for (let n = 0; n < this.sharedStyles.length; n++) {
                if (this.sharedStyles[n] != className) {
                    newStyles.push(this.sharedStyles[n])
                }
            }

            this.sharedStyles = newStyles;

            let classesString = "";
            for (let n = 0; n < this.sharedStyles.length; n++) {
                if (n > 0) {classesString += " ";}
                classesString += this.sharedStyles[n];
            }
            this.setAttr("class", classesString)
        }
        return this;
    }
    
    _updateCallback(callbackKey, callback) {
        this._callbacks[callbackKey] = callback;
        if (callback == null) {
            this.setAttr(callbackKey.toLowerCase(), null)
        } else {
            this.setAttr(callbackKey.toLowerCase(), `eclair.performCallback("${this.id()}", "${callbackKey}")`)
        }
        return this;
    }
    onBlur(callback) {return this._updateCallback("onBlur", callback);}
    onChange(callback) {return this._updateCallback("onChange", callback);}
    onFocus(callback) {return this._updateCallback("onFocus", callback);}
    onSelect(callback) {return this._updateCallback("onSelect", callback);}
    onSubmit(callback) {return this._updateCallback("onSubmit", callback);}
    onReset(callback) {return this._updateCallback("onReset", callback);}
    onKeyDown(callback) {return this._updateCallback("onKeyDown", callback);}
    onKeyPress(callback) {return this._updateCallback("onKeyPress", callback);}
    onKeyUp(callback) {return this._updateCallback("onKeyUp", callback);}
    onInput(callback) {return this._updateCallback("onInput", callback);}
    onMouseDown(callback) {return this._updateCallback("onMouseDown", callback);}
    onMouseUp(callback) {return this._updateCallback("onMouseUp", callback);}
    onMouseOver(callback) {return this._updateCallback("onMouseOver", callback);}
    onMouseOut(callback) {return this._updateCallback("onMouseOut", callback);}
    onMouseMove(callback) {return this._updateCallback("onMouseMove", callback);}
    onClick(callback) {return this._updateCallback("onClick", callback);}
    onDblClick(callback) {return this._updateCallback("onDblClick", callback);}
    onScroll(callback) {return this._updateCallback("onScroll", callback);}
    onLoad(callback) {return this._updateCallback("onLoad", callback);}
    onError(callback) {return this._updateCallback("onError", callback);}
    onUnload(callback) {return this._updateCallback("onUnload", callback);}
    onResize(callback) {return this._updateCallback("onResize", callback);}
    onCreate(callback) {return this._updateCallback("onCreate", callback);}
    onBuild(callback) {return this._updateCallback("onBuild", callback);}
    performCallback(event, param1) {this._callbacks[event](this, param1);}

    wrapHTML(_html) {        
        // Calling on build
        if (this._callbacks.hasOwnProperty("onBuild")) {
            this.performCallback("onBuild");
        }
        
        // Adding element attributes
        let wrapperElement = document.createElement("div")
        wrapperElement.innerHTML = _html;
        let element = wrapperElement.children[0]
        
        let self = this;
        Object.keys(this.attributes).forEach(function(key) {
            element.setAttribute(key, self.attributes[key])
        });
        
        // Adding the style code
        let html = this.buildStyleCode() + wrapperElement.innerHTML;
        
        // Adding the onCreateScript
        if (this._callbacks.hasOwnProperty("onCreate")) {
            let onCreateScript = document.createElement("script")
            onCreateScript.innerHTML = `eclair.performCallback("${this.id()}", "onCreate")`;
            
            html += onCreateScript.outerHTML;
        }
        
        return html
    }
}

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
        return this.wrapHTML(`<${this.tag}>${this._innerHTML}</${this.tag}>`)
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
