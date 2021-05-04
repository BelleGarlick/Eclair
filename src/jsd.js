let jIDs = 0
let jsdElements = {}

// Factory methods
function JVBox(text) {return new JVBoxClass(text);}
function JHBox(text) {return new JHBoxClass(text);}
function JButton(text) {return new JButtonClass(text);}
function JForm(text) {return new JFormClass(text);}
function JImage(text) {return new JImageClass(text);}
function JText(text) {return new JTextClass(text);}
function JTextbox(text) {return new JTextboxClass(text);}

// Event methods
// Input Events
function jsdOnBlur(jID) {jsdElements[jID].performOnBlur();}
function jsdOnChange(jID) {jsdElements[jID].performOnChange();}
function jsdOnFocus(jID) {jsdElements[jID].performOnFocus();}
function jsdOnSelect(jID) {jsdElements[jID].performOnSelect();}
function jsdOnSubmit(jID) {jsdElements[jID].performOnSubmit();}
function jsdOnReset(jID) {jsdElements[jID].performOnReset();}
function jsdOnKeyDown(jID) {jsdElements[jID].performOnKeyDown();}
function jsdOnKeyPress(jID) {jsdElements[jID].performOnKeyPress();}
function jsdOnKeyUp(jID) {jsdElements[jID].performOnKeyUp();}
function jsdOnKeyUp(jID) {jsdElements[jID].performOnKeyUp();}

class JSDStyleClass {
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


class JSDObject {
    constructor() {
        this._id = jIDs;
        jIDs += 1
         
        jsdElements[this.id()] = this;
        
        this.styles = new JSDStyleClass();
        this.hoverStyles = new JSDStyleClass(":hover");
        this.activeStyles = new JSDStyleClass(":active");
        this.focusedStyles = new JSDStyleClass(":focused");
        
        this._onBlur = null
        this._onChange = null
        this._onFocus = null
        this._onSelect = null
        this._onSubmit = null
        this._onReset = null
        this._onKeyDown = null
        this._onKeyPress = null
        this._onKeyUp = null
        this._onKeyUp = null
    }
    
    id() {
        return "jsdObject" + this._id;
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
    onKeyUp(callback) {this._onKeyUp = callback; return this;}
    
    // TODO have check for if can run
    performOnBlur() {this._onBlur(this)}
    performOnChange() {this._onChange(this)}
    performOnFocus() {this._onFocus(this)}
    performOnSelect() {this._onSelect(this)}
    performOnSubmit() {this._onSubmit(this)}
    performOnReset() {this._onReset(this)}
    performOnKeyDown() {this._onKeyDown(this)}
    performOnKeyPress() {this._onKeyPress(this)}
    performOnKeyUp() {this._onKeyUp(this)}
    performOnKeyUp() {this._onKeyUp(this)}
    
    eventHandlerHTML() {
        let id = this.id()
        let code = "";
        if (this._onBlur != null) {code += `onblur='jsdOnBlur("${id}")'`}
        if (this._onChange != null) {code += `onchange='jsdOnChange("${id}")'`}
        if (this._onFocus != null) {code += `onfocus='jsdOnFocus("${id}")'`}
        if (this._onSelect != null) {code += `onselect='jsdOnSelect("${id}")'`}
        if (this._onSubmit != null) {code += `onsubmit='jsdOnSubmit("${id}")'`}
        if (this._onReset != null) {code += `onreset='jsdOnReset("${id}")'`}
        if (this._onKeyDown != null) {code += `onkeydown='jsdOnKeyDown("${id}")'`}
        if (this._onKeyPress != null) {code += `onkeypress='jsdOnKeyPress("${id}")'`}
        if (this._onKeyUp != null) {code += `onkeyup='jsdOnKeyUp("${id}")'`}
        if (this._onKeyUp != null) {code += `onkeyup='jsdOnKeyUp("${id}")'`}
        return code;
    }
}


class JView extends JSDObject {
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


class JVBoxClass extends JSDObject {
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


class JHBoxClass extends JSDObject {
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


class JButtonClass extends JSDObject {
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
    
    press(action) {
        this._press = action;
        return this;
    }
    
    performPress() {
        this._press(this)
    }
    
    build() {
        let text = this.text;
        if (typeof(text) != "string") {
            text = this.text.build()
        }
        return `${this.style()}<button class='jsd-button' type='button' id='${this.id()}' onclick="jPress('${this.id()}')" ontap="dPress('${this.id()}')">${this.text}</button>`
    }
}


class JFormClass extends JSDObject {
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



class JImageClass extends JSDObject {
    constructor() {
        super()
        
        this._src = null
    }
    
    src(_src) {
        this._src = _src;
        return this;
    }
    
    build() {
        return "<img src='" + this._src + "'/>"
    }
}




class JTextClass extends JSDObject {
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
        return `${this.style()}<span id='${this.id()}'>${this._text}</span>`
    }
}





class JTextboxClass extends JSDObject {
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
            return this
        }
    }
    
    onChange(func) {
        this._onChange = func;
        return this;
    }
    
    performOnChange() {
        let elem = this.getElement();
        if (elem != null) {
            this._value = elem.value;
        }
        
        if (this._onChange != null) {
            this._onChange(this)
        }
    }
    
    // TODO Override to update value
    performOnBlur() {this._onBlur(this)}
    performOnChange() {this._onChange(this)}
    performOnFocus() {this._onFocus(this)}
    performOnSelect() {this._onSelect(this)}
    performOnSubmit() {this._onSubmit(this)}
    performOnReset() {this._onReset(this)}
    performOnKeyDown() {this._onKeyDown(this)}
    performOnKeyPress() {this._onKeyPress(this)}
    performOnKeyUp() {this._onKeyUp(this)}
    performOnKeyUp() {this._onKeyUp(this)}
    
    build() {
        return `${this.style()}<input id='${this.id()}' class='jsd-textbox' type="text" placeholder="${this._placeholder}" value="${this._value}" ${this.eventHandlerHTML()}/>`
    }
}
