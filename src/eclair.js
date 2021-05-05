let eclair = {
    _ids: 0,
    _elements: {},
    
    newID: function() {this._ids += 1; return this._ids - 1;},
    
    VBox: function(elements) {return new JVBoxClass(elements);},
    HBox: function(elements) {return new JHBoxClass(elements);},
    Button: function(text) {return new JButtonClass(text);},
    Form: function(elements) {return new JFormClass(elements);},
    Image: function() {return new JImageClass();},
    Text: function(text) {return new JTextClass(text);},
    Textbox: function() {return new JTextboxClass();},
    
    // TODO Add events to callbacks
    // Event methods
    // Input Events
    onBlurCallback: function(eID) {this._elements[eID].performOnBlur();},
    onChangeCallback: function(eID) {this._elements[eID].performOnChange();},
    onFocusCallback: function(eID) {this._elements[eID].performOnFocus();},
    onSelectCallback: function(eID) {this._elements[eID].performOnSelect();},
    onSubmitCallback: function(eID) {this._elements[eID].performOnSubmit();},
    onResetCallback: function(eID) {this._elements[eID].performOnReset();},
    onKeyDownCallback: function(eID) {this._elements[eID].performOnKeyDown();},
    onKeyPressCallback: function(eID) {this._elements[eID].performOnKeyPress();},
    onKeyUpCallback: function(eID) {this._elements[eID].performOnKeyUp();},
    // Mouse Events
    onMouseDownCallback: function(eID) {this._elements[eID].performOnMouseDown();},
    onMouseUpCallback: function(eID) {this._elements[eID].performOnMouseUp();},
    onMouseOverCallback: function(eID) {this._elements[eID].performOnMouseOver();},
    onMouseOutCallback: function(eID) {this._elements[eID].performOnMouseOut();},
    onMouseMoveCallback: function(eID) {this._elements[eID].performOnMouseMove();},
    // Click Events
    onClickCallback: function(eID) {this._elements[eID].performOnClick();},
    onDblClickCallback: function(eID) {this._elements[eID].performOnDblClick();},
    // Load Events
    onLoadCallback: function(eID) {this._elements[eID].performOnLoad();},
    onErrorCallback: function(eID) {this._elements[eID].performOnError();},
    onUnloadCallback: function(eID) {this._elements[eID].performOnUnload();},
    onResizeCallback: function(eID) {this._elements[eID].performOnResize();},
}


class EclairStyleClass {
    constructor(selector) {
        if (selector == null) {
            selector = ""
        }
        
        this.selector = selector
        
        this.styles = {
            "css": null,
            "background": null,
            "border-width": null,
            "border-color": null,
            "border-style": null,
            "border-radius": null,
            "margin": null,
            "padding": null,
            "font-family": null,
            "font-size": null,
            "color": null,
            "font-weight": null
        }
    }
    
    build(objectID) {
        let styleCode = '';
        let self = this;
        Object.keys(self.styles).forEach(function(key) {
            let value = self.styles[key];
            if (value != null) {
                if (key == "css") {
                    styleCode += value + ";";
                } else {
                    styleCode += `${key}:${value};` 
                }
            }
        });
    
        if (styleCode.length == 0) {
            return ""
        }
        
        return `#${objectID}${this.selector}{${styleCode}}`
    }
}


class EclairObject {
    constructor() {
        this._id = eclair.newID();
        eclair._elements[this.id()] = this;
        
        this.styles = new EclairStyleClass();
        this.hoverStyles = new EclairStyleClass(":hover");
        this.activeStyles = new EclairStyleClass(":active");
        this.focusedStyles = new EclairStyleClass(":focused");
        
        // TODO Maybe store in a map
        this._onBlur = null;
        this._onChange = null;
        this._onFocus = null;
        this._onSelect = null;
        this._onSubmit = null;
        this._onReset = null;
        this._onKeyDown = null;
        this._onKeyPress = null;
        this._onKeyUp = null;
        this._onKeyUp = null;
        // Mouse Events
        this._onMouseDown = null;
        this._onMouseUp = null;
        this._onMouseOver = null;
        this._onMouseOut = null;
        this._onMouseMove = null;
        // Click Events
        this._onClick = null;
        this._onDblClick = null;
        // Load Events
        this._onLoad = null;
        this._onError = null;
        this._onUnload = null;
        this._onResize = null;
    }
    
    id() {
        return "eclairElements" + this._id;
    }
    
    write() {
        document.write(this.build())
    }
    
    to(elemID) {
        document.getElementById(elemID).innerHTML = this.build();
    }
    
    getElement() {
        return document.getElementById(this.id())
    }
    
    update() {}
    
    getStyleSheet(selector) {
        if (selector == "hover") {
            return this.hoverStyles;
        }
        if (selector == "active") {
            return this.activeStyles;
        }
        if (selector == "focused") {
            return this.focusedStyles;
        }
        
        return this.styles;
    }
    
    style() {
        let id = this.id()
        return `<style>${this.styles.build(id)}${this.hoverStyles.build(id)}${this.activeStyles.build(id)}${this.focusedStyles.build(id)}</style>`
    }
    
    setStyle(referenceObject) {
        let self = this;
        Object.keys(referenceObject.styles.styles).forEach(function(key) {
            let value = referenceObject.styles.styles[key];
            if (value != null) {
                self.styles.styles[key] = value;
            }
        });
        Object.keys(referenceObject.hoverStyles.styles).forEach(function(key) {
            let value = referenceObject.hoverStyles.styles[key];
            if (value != null) {
                self.hoverStyles.styles[key] = value;
            }
        });
        Object.keys(referenceObject.activeStyles.styles).forEach(function(key) {
            let value = referenceObject.activeStyles.styles[key];
            if (value != null) {
                self.activeStyles.styles[key] = value;
            }
        });
        Object.keys(referenceObject.focusedStyles.styles).forEach(function(key) {
            let value = referenceObject.focusedStyles.styles[key];
            if (value != null) {
                self.focusedStyles.styles[key] = value;
            }
        });
        
        return this
    }
    
    css(_style, selector) {
        let stylesheet = this.getStyleSheet(selector)
        stylesheet.styles["css"] = _style;
        return this
    }
    
    background(color, selector) {        
        let stylesheet = this.getStyleSheet(selector)
        stylesheet.styles["background"] = color;
        
        let elem = this.getElement()
        if (elem != null) {elem.style.background = color}
        return this
    }
    
    borderSize(size, selector) {
        let stylesheet = this.getStyleSheet(selector)
        stylesheet.styles["border-width"] = size;
        
        return this
    }
    
    borderColor(color, selector) {
        let stylesheet = this.getStyleSheet(selector)
        stylesheet.tyles["border-color"] = color;
        
        return this
    }
    
    borderStyle(style, selector) {
        let stylesheet = this.getStyleSheet(selector)
        stylesheet.styles["border-style"] = style;
        
        return this
    }
    
    borderRadius(radius, selector) {
        let stylesheet = this.getStyleSheet(selector)
        stylesheet.styles["border-radius"] = radius;
        
        return this
    }
    
    padding(size, selector) {
        let stylesheet = this.getStyleSheet(selector)
        stylesheet.styles["padding"] = size;
        
        return this
    }
    
    margin(size, selector) {
        let stylesheet = this.getStyleSheet(selector)
        stylesheet.styles["margin"] = size;
        
        return this
    }
    
    font(family, selector) {
        let stylesheet = this.getStyleSheet(selector)
        stylesheet.styles["font-family"] = family;
        return this
    }
    
    fontSize(size, selector) {
        let stylesheet = this.getStyleSheet(selector)
        stylesheet.styles["font-size"] = size;
        
        return this
    }
    
    fontColor(color, selector) {
        let stylesheet = this.getStyleSheet(selector)
        stylesheet.styles["color"] = color;
        
        return this
    }
    
    fontWeight(weight, selector) {
        let stylesheet = this.getStyleSheet(selector)
        stylesheet.styles["font-weight"] = weight;
        
        return this
    }
    
    onBlur(callback) {this._onBlur = callback; return this;}
    onChange(callback) {this._onChange = callback; return this;}
    onFocus(callback) {this._onFocus = callback; return this;}
    onSelect(callback) {this._onSelect = callback; return this;}
    onSubmit(callback) {this._onSubmit = callback; return this;}
    onReset(callback) {this._onReset = callback; return this;}
    onKeyDown(callback) {this._onKeyDown = callback; return this;}
    onKeyPress(callback) {this._onKeyPress = callback; return this;}
    onKeyUp(callback) {this._onKeyUp = callback; return this;}
    onMouseDown(callback) {this._onMouseDown = callback; return this;}
    onMouseUp(callback) {this._onMouseUp = callback; return this;}
    onMouseOver(callback) {this._onMouseOver = callback; return this;}
    onMouseOut(callback) {this._onMouseOut = callback; return this;}
    onMouseMove(callback) {this._onMouseMove = callback; return this;}
    onClick(callback) {this._onClick = callback; return this;}
    onDblClick(callback) {this._onDblClick = callback; return this;}
    onLoad(callback) {this._onLoad = callback; return this;}
    onError(callback) {this._onError = callback; return this;}
    onUnload(callback) {this._onUnload = callback; return this;}
    onResize(callback) {this._onResize = callback; return this;}
    
    // TODO have check for if can run
    performOnBlur() {this.update(); this._onBlur(this)}
    performOnChange() {this.update(); this._onChange(this)}
    performOnFocus() {this.update(); this._onFocus(this)}
    performOnSelect() {this.update(); this._onSelect(this)}
    performOnSubmit() {this.update(); this._onSubmit(this)}
    performOnReset() {this.update(); this._onReset(this)}
    performOnKeyDown() {this.update(); this._onKeyDown(this)}
    performOnKeyPress() {this.update(); this._onKeyPress(this)}
    performOnKeyUp() {this.update(); this._onKeyUp(this)}
    performOnMouseDown() {this.update(); this._onMouseDown(this)}
    performOnMouseUp() {this.update(); this._onMouseUp(this)}
    performOnMouseOver() {this.update(); this._onMouseOver(this)}
    performOnMouseOut() {this.update(); this._onMouseOut(this)}
    performOnMouseMove() {this.update(); this._onMouseMove(this)}
    performOnClick() {this.update(); this._onClick(this)}
    performOnDblClick() {this.update(); this._onDblClick(this)}
    performOnLoad() {this.update(); this._onLoad(this)}
    performOnError() {this.update(); this._onError(this)}
    performOnUnload() {this.update(); this._onUnload(this)}
    performOnResize() {this.update(); this._onResize(this)}
    
    eventHandlerHTML() {
        let id = this.id()
        let code = "";
        if (this._onBlur != null) {code += ` onblur='eclair.onBlurCallback("${id}")'`}
        if (this._onChange != null) {code += ` onchange='eclair.onChangeCallback("${id}")'`}
        if (this._onFocus != null) {code +=  `onfocus='eclair.onFocusCallback("${id}")'`}
        if (this._onSelect != null) {code += ` onselect='eclair.onSelectCallback("${id}")'`}
        if (this._onSubmit != null) {code += ` onsubmit='eclair.onSubmitCallback("${id}")'`}
        if (this._onReset != null) {code += ` onreset='eclair.onResetCallback("${id}")'`}
        if (this._onKeyDown != null) {code += ` onkeydown='eclair.onKeyDownCallback("${id}")'`}
        if (this._onKeyPress != null) {code += ` onkeypress='eclair.onKeyPressCallback("${id}")'`}
        if (this._onKeyUp != null) {code += ` onkeyup='eclair.onKeyUpCallbackCallback("${id}")'`}
        if (this._onKeyUp != null) {code += ` onkeyup='eclair.onKeyUpCallbackCallback("${id}")'`}
        if (this._onMouseDown != null) {code += ` onmousedown='eclair.onMouseDownCallback("${id}")'`}
        if (this._onMouseUp != null) {code += ` onmouseup='eclair.onMouseUpCallback("${id}")'`}
        if (this._onMouseOver != null) {code += ` onmouseover='eclair.onMouseOverCallback("${id}")'`}
        if (this._onMouseOut != null) {code += ` onmouseout='eclair.onMouseOutCallback("${id}")'`}
        if (this._onMouseMove != null) {code += ` onmousemove='eclair.onMouseMoveCallback("${id}")'`}
        if (this._onClick != null) {code += ` onclick='eclair.onClickCallback("${id}")'`}
        if (this._onDblClick != null) {code += ` ondblclick='eclair.onDblClickCallback("${id}")'`}
        if (this._onLoad != null) {code += ` onload='eclair.onLoadCallback("${id}")'`}
        if (this._onError != null) {code += ` onerror='eclair.onErrorCallback("${id}")'`}
        if (this._onUnload != null) {code += ` onunload='eclair.onUnloadCallback("${id}")'`}
        if (this._onResize != null) {code += ` onresize='eclair.onResizeCallback("${id}")'`}
        return code;
    }
}


class JView extends EclairObject {
    constructor(elements) {
        super()
        this.elements = elements;
    }
    
    build () {
        let code = ""
        for (let e = 0; e < this.elements.length; e++) {
             code += this.elements[e].build();
        }
        return code;
    }
}


class JVBoxClass extends EclairObject {
    constructor(elements) {
        super()
        
        this._spacing = 0
        this.elements = elements;
    }
    
    spacing(space) {
        this._spacing = space;
        return this;
    }
    
    build () {
        let code = this.style() + "<table border=0 cellpadding=0 cellspacing=0>"
        for (let e = 0; e < this.elements.length; e++) {
            if (e > 0) {
                code += "<tr><td height='"+ this._spacing +"px'></td></tr>"
            }
            code += "<tr><td>" + this.elements[e].build() + "</td></tr>";
        }
        return code + "</table>";
    }
}


class JHBoxClass extends EclairObject {
    constructor(elements) {
        super()
        
        this._spacing = 0
        this.elements = elements;
    }
    
    spacing(space) {
        this._spacing = space;
        return this;
    }
    
    build () {
        let code = this.style() + "<table id='"+this.id()+"' border=0 cellpadding=0 cellspacing=0>"
        for (let e = 0; e < this.elements.length; e++) {
            if (e > 0) {
                code += "<td width='"+ this._spacing +"px'></td>"
            }
            code += "<td>" + this.elements[e].build() + "</td>";
        }
        return code + "</table>";
    }
}


class JButtonClass extends EclairObject {
    constructor(text) {
        super()
        
        this.text = text;
        this._press = null;
        
        this.borderSize("0px")
        this.borderRadius("2px")
        this.padding("8px 16px")
        this.background("#eeeeee")
        this.font("arial")
        
        this.background("#dddddd", "hover")
        this.background("#cccccc", "active")
    }
    
    build() {
        let text = this.text;
        if (typeof(text) != "string") {
            text = this.text.build()
        }
        return `${this.style()}<button class='jsd-button' type='button' id='${this.id()}'  ${this.eventHandlerHTML()}>${this.text}</button>`
    }
}


class JFormClass extends EclairObject {
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
        
        return code;
    }
}



class JImageClass extends EclairObject {
    constructor() {
        super()
        
        this._src = null
    }
    
    src(_src) {
        this._src = _src;
        return this;
    }
    
    build() {
        return "<img src='" + this._src + "' ${this.eventHandlerHTML()}/>"
    }
}




class JTextClass extends EclairObject {
    constructor(text) {
        super()
        this._text = text;
    }
    
    type(newTtype) {
        if (newType == "title") {
            this.fontSize("20px")
            this.fontWeight(700)
            this.margin("30px 10px 10px 10px")
        }
    }
    
    type(newType) {
        if (newType == "title") {
            this.fontSize("40px")
            this.font("arial")
            this.fontWeight(700)
            this.margin("10px 50px 10px 10px")
        }
        
        return this
    }
    
    text(value) {
        if (value == null) {
            return this._text
        } else {
            this._text = value;
            
            let elem = this.getElement()
            if (elem != null) {
                elem.innerHTML = this._text
            }
            
            return this
        }
    }
    
    build() {
        return `${this.style()}<span id='${this.id()}' ${this.eventHandlerHTML()}>${this._text}</span>`
    }
}





class JTextboxClass extends EclairObject {
    constructor(placeholder) {
        super()
        
        this._onChange = null
        
        this._placeholder = placeholder;
        this._value = ""
        
        this.borderSize("0px")
        this.borderRadius("2px")
        this.padding("8px 16px")
        this.background("#eeeeee")
        this.font("arial")
        this.background("#dddddd", "hover")
        this.background("#cccccc", "active")
        this.background("#bbbbbb", "focus")
    }
    
    value(text) {
        if (text == null) {
            return this._value
        } else {
            this._value = text;
            
            let elem = this.getElement();
            if (elem != null) {
                this.elem = text;
            }
            
            return this
        }
    }
    
    update(func) {
        let elem = this.getElement();
        if (elem != null) {
            this._value = elem.value;
        }
    }
    
    build() {
        return `${this.style()}<input id='${this.id()}' type="text" placeholder="${this._placeholder}" value="${this._value}" ${this.eventHandlerHTML()}/>`
    }
}
