let jIDs = 0
let jElements = {}


function jPress(jID) {
    jElements[jID].performPress()
}

function jsdOnchange(jID) {
    jElements[jID].performOnChange()
}


class JSDObject {
    constructor() {
        this._id = jIDs;
        jIDs += 1
        
        jElements[this.id()] = this;
        
        this.styleCustom = ""
        this.styleBackground = ""
        this.styleBorderSize = ""
        this.styleBorderColor = ""
        this.styleBorderStyle = ""
        this.styleBorderRadius = ""
        this.styleMargin = ""
        this.stylePadding = ""
        this.styleFontFamily = ""
        this.styleFontSize = ""
        this.styleFontColor = ""
        this.styleFontWeight = ""
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
        return `style='${this.styleCustom};background:${this.styleBackground};border-size:${this.styleBorderSize};border-style: ${this.styleBorderStyle};border-width: ${this.styleBorderSize};border-color:${this.styleBorderColor};border-radius:${this.styleBorderRadius};padding:${this.stylePadding};margin:${this.styleMargin};font-family:${this.styleFontFamily};font-size:${this.styleFontSize};color:${this.styleFontColor};font-weight:${this.styleFontWeight};'`
    }
    
    setStyle(referenceObject) {
        this.styleCustom = referenceObject.styleCustom
        this.styleBackground = referenceObject.styleBackground
        this.styleBorderSize = referenceObject.styleBorderSize
        this.styleBorderColor = referenceObject.styleBorderColor
        this.styleBorderStyle = referenceObject.styleBorderStyle
        this.styleBorderRadius = referenceObject.styleBorderRadius
        this.styleMargin = referenceObject.styleMargin
        this.stylePadding = referenceObject.stylePadding
        this.styleFontFamily = referenceObject.styleFontFamily
        this.styleFontSize = referenceObject.styleFontSize
        this.styleFontColor = referenceObject.styleFontColor
        this.styleFontWeight = referenceObject.styleFontWeight
        
        return this
    }
    
    css(_style) {
        this.styleCustom = _style;
        return this
    }
    
    background(color) {
        this.styleBackground = color;
        let elem = this.getElement()
        if (elem != null) {elem.style.background = color}
        return this
    }
    
    borderSize(size) {
        this.styleBorderSize = size;
        return this
    }
    
    borderColor(color) {
        this.styleBorderColor = color;
        return this
    }
    
    borderStyle(style) {
        this.styleBorderStyle = typstylee;
        return this
    }
    
    borderRadius(radius) {
        this.styleBorderRadius = radius;
        return this
    }
    
    padding(size) {
        this.stylePadding = size;
        return this
    }
    
    margin(size) {
        this.styleMargin = size;
        return this
    }
    
    font(family) {
        this.styleFontFamily = family;
        return this
    }
    
    fontSize(size) {
        this.styleFontSize = size;
        return this
    }
    
    fontColor(color) {
        this.styleFontColor = color;
        return this
    }
    
    fontWeight(weight) {
        this.styleFontWeight = weight;
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
    
    text(value) {
        if (value == null) {
            return this._text
        } else {
            this._text = value;
            
            let elem = this.getElement()
            if (elem != null) {
                elem.innerHTML = this._text
            }
            
            return self
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
    
    type(newTtype) {
        if (newType == "title") {
            this.fontSize("20px")
            this.fontWeight(700)
            this.margin("30px 10px 10px 10px")
        }
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
