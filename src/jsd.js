let jIDs = 0
let jsdElements = {}


function jPress(jID) {
    jsdElements[jID].performPress()
}

function jsdOnchange(jID) {
    jsdElements[jID].performOnChange()
}


class JSDObject {
    constructor() {
        this._id = jIDs;
        jIDs += 1
         
        jsdElements[this.id()] = this;
        
        this.styles = {
            "css": null,
            "background": null,
            "border-size": null,
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
    
    style() {
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
    
        return "style='" + styleCode + "'"
    }
    
    setStyle(referenceObject) {
        let self = this;
        Object.keys(referenceObject.styles).forEach(function(key) {
            let value = referenceObject.styles[key];
            if (value != null) {
                self.styles[key] = value;
            }
        });
        
        return this
    }
    
    css(_style) {
        this.styles["css"] = _style;
        return this
    }
    
    background(color) {
        this.styles["background"] = color;
        let elem = this.getElement()
        if (elem != null) {elem.style.background = color}
        return this
    }
    
    borderSize(size) {
        this.styles["border-size"] = size;
        return this
    }
    
    borderColor(color) {
        this.styles["border-color"] = color;
        return this
    }
    
    borderStyle(style) {
        this.styles["border-style"] = style;
        return this
    }
    
    borderRadius(radius) {
        this.styles["border-radius"] = radius;
        return this
    }
    
    padding(size) {
        this.styles["padding"] = size;
        return this
    }
    
    margin(size) {
        this.styles["margin"] = size;
        return this
    }
    
    font(family) {
        this.styles["font-family"] = family;
        return this
    }
    
    fontSize(size) {
        this.styles["font-size"] = size;
        return this
    }
    
    fontColor(color) {
        this.styles["color"] = color;
        return this
    }
    
    fontWeight(weight) {
        this.styles["font-weight"] = weight;
        return this
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
        let code = "<table "+this.style()+" border=0 cellpadding=0 cellspacing=0>"
        for (let e = 0; e < this.elements.length; e++) {
            if (e > 0) {
                code += "<tr><td height='"+ this._spacing +"px'></td></tr>"
            }
            code += "<tr><td>" + this.elements[e].build() + "</td></tr>";
        }
        return code + "</table>";
    }
}


function JVBox(text) {
    return new JVBoxClass(text)
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
        let code = "<table "+this.style()+" border=0 cellpadding=0 cellspacing=0>"
        for (let e = 0; e < this.elements.length; e++) {
            if (e > 0) {
                code += "<td width='"+ this._spacing +"px'></td>"
            }
            code += "<td>" + this.elements[e].build() + "</td>";
        }
        return code + "</table>";
    }
}


function JHBox(text) {
    return new JHBoxClass(text)
}


class JButtonClass extends JSDObject {
    constructor(text) {
        super()
        
        this.text = text;
        this._press = null;
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
        return `<button type='button' id='${this.id()}' ${this.style()} onclick="jPress('${this.id()}')" ontap="dPress('${this.id()}')">${this.text}</button>`
    }
}


function JButton(text) {
    return new JButtonClass(text)
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


function JForm(text) {
    return new JFormClass(text)
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


function JImage(text) {
    return new JImageClass(text)
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
        return `<span id='${this.id()}' ${this.style()}>${this._text}</span>`
    }
}


function JText(text) {
    return new JTextClass(text)
}




class JTextboxClass extends JSDObject {
    constructor(placeholder) {
        super()
        
        this._onChange = null
        
        this._placeholder = placeholder;
        this._value = ""
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
    
    build() {
        return `<input id='${this.id()}' type="text" ${this.style()} placeholder="${this._placeholder}" value="${this._value}" onchange='jsdOnchange("${this.id()}")'/>`
    }
}


function JTextbox(text) {
    return new JTextboxClass(text)
}
