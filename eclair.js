// TODO Add events to callbacks
// TODO Prevent layered on click events
// TODO Hide show elements
// TODO Superscript/Subscript text
// TOD o AUTO update css rules
// TODO Implement these: https://getbootstrap.com/docs/4.0/components/progress/
let eclair = {
    _ids: 0,
    _styleIDs: 0,
    newID: function() {this._ids += 1; return this._ids - 1;},
    newStyleID: function() {this._ids += 1; return this._ids - 1;},
    _elements: {},
    
    Style: function() {return new EclairStyleComponent();},
    
    View: function(elements) {return new EclairView(elements);},
    ScrollView: function(elements) {return new EclairScrollView(elements);},
    VBox: function(elements) {return new EclairVBox(elements);},
    HBox: function(elements) {return new EclairHBox(elements);},
    
    Button: function(text) {return new EclairButton(text);},
    Form: function(elements) {return new EclairForm(elements);},
    Image: function() {return new EclairImage();},
    Text: function(text) {return new EclairText(text);},
    Textbox: function(placeholder) {return new EclairTextbox(placeholder);},
    Select: function() {return new EclairSelect();},
    Link: function(text) {return new EclairLink(text);},
    Slider: function() {return new EclairSlider();},
    HiddenInput: function() {return new EclairHiddenInput();},
    Toggle: function() {return new EclairToggle();},
    HorizontalLine: function() {return new EclairHorizontalLine();},
    
    ProgressBar: function() {return new EclairProgressBar();},
    Alert: function() {return new EclairAlertBox();},
    
    // Event methods
    // Input Events
    performCallback: function(eID, event) {this._elements[eID].performCallback(event);},
    
    theme: {
        "accent": "#ee8800",
        "font": '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"'
    }
}



// Class for storing specific styles and containing all selectors.
class EclairStylableObject {
    constructor() {
        this._styles = {}
        this._stylePrefix = "#"
    }
    
    getStyleSheet(selector) {
        if (selector == null) {
            selector = ""
        }
        
        if (!this._styles.hasOwnProperty(selector)) {
            this._styles[selector] = {}
        }
        
        return this._styles[selector];
    }
    
    buildStyleCode(cssOnly) {
        if (cssOnly == null) {cssOnly = false}
        let self = this;
        let objectID = this.id()
        
        let styleCode = ""
        
        
        Object.keys(self._styles).forEach(function(selector) {
            let styleSheet = self._styles[selector];
            let styleSheetCode = '';
            
            Object.keys(self._styles[selector]).forEach(function(key) {
                let value = self._styles[selector][key]
                if (value != null) {
                    styleSheetCode += (key == "css")? value + ";" : `${key}:${value};` 
                }
            });
            
            if (selector.length > 0) {
                if (selector[0] != " ") {
                    selector = ":" + selector;
                }
            }
            styleCode += `${self._stylePrefix}${objectID}${selector}{${styleSheetCode}}`;
        });
        
        if (styleCode.length == 0) {return "";}
        
        if (cssOnly) {
            return styleCode
        }
        
        return `<style id='${objectID}-css'>${styleCode}</style>`;
    }
    
    updateCSSStyle() {
        let objectID = this.id() + "-css"
        let cssElement = document.getElementById(objectID);
        if (cssElement != null) {
            cssElement.innerHTML = this.buildStyleCode(true)
        }
        console.log(objectID)
        
        return this;
    }
    
    css(_style, selector) {this.getStyleSheet(selector)["css"] = _style; return this.updateCSSStyle()}
    display(_display, selector) {this.getStyleSheet(selector)["display"] = _display;return this.updateCSSStyle();}
    background(color, selector) {this.getStyleSheet(selector)["background"] = color;return this.updateCSSStyle();}
    borderSize(size, selector) {this.getStyleSheet(selector)["border-width"] = size; return this.updateCSSStyle()}
    borderColor(color, selector) {this.getStyleSheet(selector)["border-color"] = color; return this.updateCSSStyle()}
    borderStyle(style, selector) {this.getStyleSheet(selector)["border-style"] = style; return this.updateCSSStyle()}
    borderRadius(radius, selector) {this.getStyleSheet(selector)["border-radius"] = radius; return this.updateCSSStyle()}
    padding(size, selector) {this.getStyleSheet(selector)["padding"] = size; return this.updateCSSStyle()}
    margin(size, selector) {this.getStyleSheet(selector)["margin"] = size; return this.updateCSSStyle()}
    font(family, selector) {this.getStyleSheet(selector)["font-family"] = family; return this.updateCSSStyle()}
    fontSize(size, selector) {this.getStyleSheet(selector)["font-size"] = size; return this.updateCSSStyle()}
    fontColor(color, selector) {this.getStyleSheet(selector)["color"] = color; return this.updateCSSStyle()}
    fontWeight(weight, selector) {this.getStyleSheet(selector)["font-weight"] = weight; return this.updateCSSStyle()}
    width(_width, selector) {this.getStyleSheet(selector)["width"] = _width; return this.updateCSSStyle();}
    height(_height, selector) {this.getStyleSheet(selector)["height"] = _height; return this.updateCSSStyle();}
    display(_display, selector) {this.getStyleSheet(selector)["display"] = _display; return this.updateCSSStyle();}
    overflow(_overflow, selector) {this.getStyleSheet(selector)["overflow"] = _overflow; return this.updateCSSStyle();}
    opacity(_opacity, selector) {this.getStyleSheet(selector)["opacity"] = _opacity; return this.updateCSSStyle();}
    textAlign(_align, selector) {this.getStyleSheet(selector)["text-align"] = _align; return this.updateCSSStyle()}
    verticalAlign(_align, selector) {this.getStyleSheet(selector)["vertical-align"] = _align;return this.updateCSSStyle()}
    position(_pos, selector) {this.getStyleSheet(selector)["position"] = _pos;return this.updateCSSStyle()}
    top(_top, selector) {this.getStyleSheet(selector)["top"] = _top;return this.updateCSSStyle()}
    bottom(_bottom, selector) {this.getStyleSheet(selector)["bottom"] = _bottom;return this.updateCSSStyle()}
    left(_left, selector) {this.getStyleSheet(selector)["left"] = _left;return this.updateCSSStyle()}
    right(_right, selector) {this.getStyleSheet(selector)["right"] = _right;return this.updateCSSStyle()}
}


class EclairStyleComponent extends EclairStylableObject {
    constructor() {
        super()
        this._id = eclair.newStyleID()
        
        this._stylePrefix = "."
        
        let node = document.createElement("style")
        node.innerHTML = this.buildStyleCode(true)
        node.setAttribute("id", this.id() + "-css")
        document.head.appendChild(node)
    }
    
    id() {
        return "eclairStyle" + this._id;
    }
}


class EclairComponent extends EclairStylableObject {
    constructor() {
        super()
        
        this._callbacks = {}
        this.sharedStyles = []
        this.attributes = {}
        
        this._id = eclair.newID();
        eclair._elements[this.id()] = this;
        
        this.position("relative")
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
    
    addStyle(sharedStyleObject) {
        let sharedID = sharedStyleObject.id()
        let found = false;
        for (let n = 0; n < this.sharedStyles.length; n++) {
            found = found || this.sharedStyles[n] == sharedID;
        }
        
        if (!found) {
            this.sharedStyles.push(sharedID);
        }
        
        let classesString = "";
        for (let n = 0; n < this.sharedStyles.length; n++) {
            if (n > 0) {classesString += " ";}
            classesString += this.sharedStyles[n];
        }
        this.setAttr("class", classesString)
        
        return this;
    }
    
    removeStyle(sharedStyleObject) {
        let sharedID = sharedStyleObject.id()
        
        let newStyles = []
        for (let n = 0; n < this.sharedStyles.length; n++) {
            if (this.sharedStyles[n] != sharedID) {
                newStyles.push(sharedID)
            }
        }
        
        this.sharedStyles = newStyles;
        
        let classesString = "";
        for (let n = 0; n < this.sharedStyles.length; n++) {
            if (n > 0) {classesString += " ";}
            classesString += this.sharedStyles[n];
        }
        this.setAttr("class", classesString)
        
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
    onLoad(callback) {return this._updateCallback("onLoad", callback);}
    onError(callback) {return this._updateCallback("onError", callback);}
    onUnload(callback) {return this._updateCallback("onUnload", callback);}
    onResize(callback) {return this._updateCallback("onResize", callback);}
    performCallback(event) {this._callbacks[event](this);}
    
    buildAttributeHTML() {
        let self = this;
        let attrHTML = `id='${this.id()}'`;
        
        Object.keys(this.attributes).forEach(function(key) {
            attrHTML += ` ${key}='${self.attributes[key]}'`;
        });
        
        return attrHTML;
    }
}


eclair.styles = {
    Button: new EclairStyleComponent()
        .borderSize("0px")
        .borderRadius("2px")
        .padding("8px 16px")
        .background("#eeeeee")
        .font(eclair.theme.font)
        .background("#dddddd", "hover")
        .background("#cccccc", "active"),
    
    Slider: new EclairStyleComponent()
        .css("-webkit-appearance: none; box-sizing: border-box; outline: none; -webkit-transition: .2s; transition: opacity .2s;")
        .css("-webkit-appearance: none; appearance: none; cursor: pointer;", ":-webkit-slider-thumb")
        .css("-webkit-appearance: none; appearance: none; cursor: pointer;", ":-moz-slider-thumb")
        .background("#d3d3d3")
        .background(eclair.theme.accent, ":-webkit-slider-thumb")
        .background(eclair.theme.accent, ":-moz-slider-thumb")
        .borderRadius("50%", ":-webkit-slider-thumb")
        .borderRadius("50%", ":-moz-slider-thumb")
        .height("25px", ":-webkit-slider-thumb")
        .height("25px", ":-moz-slider-thumb")
        .width("25px", ":-webkit-slider-thumb")
        .width("25px", ":-moz-slider-thumb")
        .width("100%")
        .height("15px")
        .borderRadius("5px")
        .opacity(0.7)
        .opacity(1, "hover"),
    
    Link: new EclairStyleComponent()
        .font(eclair.theme.font)   
        .fontColor(eclair.theme.accent)
        .css("text-decoration: none")
        .css("text-decoration: underline", "hover"),
    
    Textbox: new EclairStyleComponent()
        .width("100%")
        .borderSize("0px")
        .borderRadius("3px")
        .padding("8px 16px")
        .background("#eeeeee")
        .font(eclair.theme.font)
        .background("#dddddd", "hover")
        .background("#cccccc", "active")
        .background("#bbbbbb", "focused"),
    
    HorizontalLine: new EclairStyleComponent()
        .borderSize("0px")
        .css("border-top: 1px solid #999999")
}


class EclairView extends EclairComponent {
    constructor(elements) {
        super()
        this.elements = elements;
    }
    
    build () {
        let code = ""
        for (let e = 0; e < this.elements.length; e++) {
             code += this.elements[e].build();
        }
        return `${this.buildStyleCode()}<div ${this.buildAttributeHTML()}>` + code + "</div>";
    }
}

class EclairScrollView extends EclairComponent {
    constructor(elements) {
        super()
        this.elements = elements;
        this.overflow("auto")
        this.width("100%")
        this.height("100%")
    }
    
    build () {
        let code = ""
        for (let e = 0; e < this.elements.length; e++) {
             code += this.elements[e].build();
        }
        return "<div "+this.buildAttributeHTML()+">" + code + "</div>";
    }
}

class EclairVBox extends EclairComponent {
    constructor(elements) {
        super()
        
        this._spacing = 0
        this.elements = elements;
        this.getStyleSheet()["table-layout"] = "fixed"
        this.getStyleSheet()["max-width"] = "100%"
        this.setAttr("border", 0)
            .setAttr("cellspacing", 0)
            .setAttr("cellpadding", 0)
            .textAlign("center")
            .margin("0px auto")
            .width("100%")
    }
    
    spacing(space) {
        this._spacing = space;
        return this;
    }
    
    align(_align) {
        this.textAlign(_align)
        return this
    }
    
    build () {
        let code = this.buildStyleCode() + "<table "+this.buildAttributeHTML()+">"
        for (let e = 0; e < this.elements.length; e++) {
            if (e > 0) {
                code += "<tr><td height='"+ this._spacing +"px'></td></tr>"
            }
            code += "<tr><td>" + this.elements[e].build() + "</td></tr>";
        }
        return code + "</table>";
    }
}

class EclairHBox extends EclairComponent {
    constructor(elements) {
        super()
        
        this._spacing = 0
        this.elements = elements;
        this.getStyleSheet()["table-layout"] = "fixed"
        this.setAttr("border", 0)
        this.setAttr("cellspacing", 0)
        this.setAttr("cellpadding", 0)
        this.textAlign("center")
        this.width("100%")
            .margin("0px auto")
    }
    
    spacing(space) {
        this._spacing = space;
        return this;
    }
    
    build () {
        let code = this.buildStyleCode() + "<table "+this.buildAttributeHTML()+">"
        for (let e = 0; e < this.elements.length; e++) {
            if (e > 0) {
                code += "<td width='"+ this._spacing +"px'></td>"
            }
            code += "<td>" + this.elements[e].build() + "</td>";
        }
        return code + "</table>";
    }
}

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
        
        return code;
    }
}





class EclairTextbox extends EclairComponent {
    constructor(_placeholder) {
        super()
        this.setAttr("type", "text")
            .addStyle(eclair.styles.Textbox)
            .placeholder(_placeholder)
    }
    
    name(_name) {
        return _name == null? this.getAttr("name") : this.setAttr("name", _name)
    }
    
    text(_text) {
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
    
    placeholder(_placeholder) {
        if (_placeholder == null) {
            return this.getAttr("placeholder")
        } else {
            this.setAttr("placeholder", _placeholder)
            return this
        }
    }
    
    password(isPassword) {
        if (isPassword == null) {
            return this.getAttr("type") == "password"
        } else {
            this.setAttr("type", isPassword? "password":'text')
            return this
        }
    }
    
    maxLength(maxLength) {
        if (maxLength == null) {
            return this.getAttr("maxlength");
        } else {
            this.setAttr("maxlength", maxLength)
        }
        return this
    } 
    
    build() {
        return `${this.buildStyleCode()}<input ${this.buildAttributeHTML()}/>`
    }
    
//autocomplete	Sets or returns the value of the autocomplete attribute of a text field
//autofocus	Sets or returns whether a text field should automatically get focus when the page loads
//disabled	Sets or returns whether the text field is disabled, or not
//list	Returns a reference to the datalist that contains the text field
//pattern	Sets or returns the value of the pattern attribute of a text field
//readOnly	Sets or returns whether a text field is read-only, or not
//required	Sets or returns whether the text field must be filled out before submitting a form
//size	Sets or returns the value of the size attribute of a text field

}





/*
    Standard Elements
*/
class EclairImage extends EclairComponent {
    constructor() {
        super()
        this.display("block")
    }
    
    src(_src) {
        this.setAttr("src", _src)
        return this;
    }
    
    altText(_alt) {
        if (_alt == null) {
            return this.getAttr("alt");
        } else {
            this.setAttr("alt", _alt)
            return this
        }
    }
    
    build() {
        return `<img ${this.buildAttributeHTML()}/>`
    }
}

class EclairLink extends EclairComponent {
    constructor(text) {
        super()
        this._text = text;
        
        this.addStyle(eclair.styles.Link)
    }
    
    text(_text) {
        if (_text == null) {
            return this._text;
        } else {
            this._text = _text;
            this.getElement(elem => {elem.innerHTML = _text})
            return this;
        }
    }
    
    target(_target) {
        if (_target == null) {
            return this.getAttr("target")
        } else {
            this.setAttr("target", _target)
        }
        return this
    }
    
    href(_href) {
        if (_href == null) {
            return this.getAttr("href")
        } else {
            this.setAttr("href", _href)
        }
        return this
    }
    
    build() {
        return `${this.buildStyleCode()}<a ${this.buildAttributeHTML()}>${this._text}</a>`
    }
}

class EclairText extends EclairComponent {
    constructor(text) {
        super()
        this._text = text;
        this._subscript = false;
        this._superscript = false;
        
        this.font(eclair.theme.font)
    }
    
    type(newType) {
        if (newType == "title") {
            this.fontSize("40px").fontWeight(700).margin("50px 10px 10px 10px")
        }
        
        if (newType == "subtitle") {
            this.fontSize("25px").margin("50px 10px 10px 10px")
        }
        
        if (newType == "heading1") {
            this.fontSize("30px")
            this.fontWeight(700)
            this.margin("50px 10px 10px 10px")
        }
        
        if (newType == "heading2") {
            this.fontSize("25px")
            this.fontWeight(700)
            this.margin("50px 10px 10px 10px")
        }
        
        if (newType == "heading3") {
            this.fontSize("20px")
            this.fontWeight(700)
            this.margin("50px 10px 10px 10px")
        }
        
        if (newType == "heading4") {
            this.fontSize("15px")
            this.fontWeight(700)
            this.margin("50px 10px 10px 10px")
        }
        
        return this
    }
    
    text(value) {
        if (value == null) {
            return this._text
        } else {
            this._text = value;
            this.getElement(elem => {elem.innerHTML = value});
            return this
        }
    }
    
//    subscript() {
//        this._subscript = true; return this;
//    }
    
//    superscript() {
//        .css("vertical-align: sub;font-size: smaller;")
//        this._superscript = true; return this;
//    }
    
    build() {
        let tagName = "span";
        if (this._superscript) {tagName = "sup"}
        if (this._subscript) {tagName = "sub"}
        
        return `${this.buildStyleCode()}<${tagName} ${this.buildAttributeHTML()}>${this._text}</${tagName}>`
    }
}

class EclairHorizontalLine extends EclairComponent {
    constructor() {
        super()
        
        this.addStyle(eclair.styles.HorizontalLine)
    }
    build() {
        return `${this.buildStyleCode()}<hr ${this.buildAttributeHTML()}/>`
    }
}


/***
    Form Elements
***/
class EclairSelect extends EclairComponent {
    constructor() {
        super()
        this.options = []
        
        this.font(eclair.theme.font)
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
        
        return `${this.buildStyleCode()}<select ${this.buildAttributeHTML()}>${options}</select>`
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
        if (typeof(text) != "string") {
            text = this.text.build()
        }
        return `${this.buildStyleCode()}<button ${this.buildAttributeHTML()}>${this.text}</button>`
    }
}

class EclairSlider extends EclairComponent {
    constructor() {
        super()
        this.setAttr("type", "range")
        this.addStyle(eclair.styles.Slider)
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
    
    value(_val) {
        if (_val == null) {
            let elem = this.getElement();
            if (elem != null) {
                return elem.value;
            }
            return this.getAttr("value")
        } else {
            this.setAttr("value", _val)
            return this
        }
    }
    
    build() {
        return `${this.buildStyleCode()}<input ${this.buildAttributeHTML()}/>`
    }
}

class EclairHiddenInput extends EclairComponent {
    constructor() {
        super()
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
    
    build() {
        return `<input ${this.buildAttributeHTML()}/>`
    }
}

class EclairToggle extends EclairComponent {
    constructor() {
        super()
        
        this._hiddenComponent = new EclairHiddenInput().value("false")
        this._tickMark = new EclairText("✓")
            .position("absolute")
            .fontWeight(700)
            .left("10px")
            .fontColor("#ffffff")
            .css("transition: 0.2s all;user-select:none;")
            .opacity(0)
        
        this.knob = new EclairView([])
            .css("transition: 0.2s all;box-sizing: border-box;user-select:none;")
            .position("absolute")
            .top("0px")
            .left("0px")
            .margin("3px")
            .background("#ffffff")
            .borderRadius("20px")
            .height("14px")
            .width("14px")
            
        
        this.height("20px")
            .display("inline-block")
            .borderRadius("20px")
            .width("50px")
            .background("#dddddd")
            .css("cursor:pointer;transition: 0.2s all;user-select:none;")
        
        // Manually update the callback map as onClick
        // is void to prevent the user altering it.
        this._updateCallback("onClick", e => {
            if (this._enabled) {
                this.toggle()
            }
        })
        let self = this
        this._updateCallback("onResize", e => {
            alert("value")
            self.value(self.value())
        })
        
        this._showCheckMark = false
        this._enabled = true
    }
    
    // Prevent on click override
    onClick(callback) {return this;}
    onLoad(callback) {return this;}
    
    name(_name) {
        return this._hiddenComponent.name(_name)
    }
    
    enabled(_enabled) {
        if (_enabled == null) {
            return this._enabled
        } else {
            this._enabled = _enabled
            return this.opacity(_enabled? 1 : 0.6)
        }
    }
    
    toggle() {
        this.value(this._hiddenComponent.value() != "true")
        return this;
    }
    
    value(_bool) {
        let cValue = this._hiddenComponent.value()
        if  (_bool == null) {
            return cValue == "true"
        } else {
            if (_bool) {
                this._hiddenComponent.value("true")
                this.background(eclair.theme.accent)
                if (this._showCheckMark) {
                    this._tickMark.opacity(1)
                }
                
                let elem = this.getElement()
                if (elem != null) {
                    this.knob.right(null)
                    this.knob.left((this.getElement().clientWidth - this.knob.getElement().clientWidth - 6) + "px")
                } else {
                    this.knob.right("0px")
                    this.knob.left(null)
                }
            } else {
                this._tickMark.opacity(0)
                this._hiddenComponent.value("false")
                this.background("#dddddd")
                this.knob.left("0px")
                this.knob.right(null)
//                this.knob.right("0px")
//                this.knob.css("float:left;")
            }

            if (this._hiddenComponent.value() != cValue) {
                this.performCallback("onChange")    
            }
        }
        
        return this;
    } 
    
    showTick(_bool) {
        if  (_bool == null) {
            return this._showCheckMark
        } else {
            this._showCheckMark = _bool
            if (this._showCheckMark && this.value()) {
                this._tickMark.opacity(1)
            } else {
                this._tickMark.opacity(0)
            }
        }
        return this;
    }
    
    build() {
        return `${this.buildStyleCode()}<div ${this.buildAttributeHTML()}>`+this._tickMark.build()+this.knob.build()+this._hiddenComponent.build()+"</div>"
    }
}


/* 
    Eclair Custom Elements
*/
class EclairProgressBar extends EclairComponent {
    constructor() {
        super()
        
        this._progress = 0
        this._striped = false
        
        this.label = eclair.Text("0%")
            .font(eclair.theme.font)
            .fontColor("white")
            .fontWeight(700)
            .fontSize("11px")    
        
        this.indicator = eclair.HBox([this.label])
            .background(eclair.theme.accent)
            .height("100%")
            .css("transition: 0.3s all")
            .margin("none")
        
        this.progress(0)
            .background("#d3d3d3")
            .displayLabel(false)
            .borderRadius("3px")
            .height("16px")
            .overflow("hidden")
    }
    
    striped(_on) {
        if (_on == null) {
            return this._striped;
        } else {
            if (_on) {
                this.indicator.getStyleSheet()["background-image"] = "linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)";
                this.indicator.getStyleSheet()["background-size"] = "1rem 1rem;";
            } else {
                this.indicator.getStyleSheet()["background-image"] = "";
                this.indicator.getStyleSheet()["background-size"] = "1rem 1rem;";
            }
            this.indicator.updateCSSStyle()
        }
        
        return this;
    }
    
    progress(_progress) {
        if (_progress == null) {
            return this._progress;
        } else {
            _progress = Math.max(Math.min(_progress, 1), 0)
            this._progress = _progress;
            this.label.text(Math.round(_progress * 100) + "%")
            this.indicator.width((_progress * 100 + 0.0001) + "%")
            return this
        }
    }
    
    displayLabel(_show) {
        if (_show == null) {
            return this.label.getStyleSheet()["opacity"] != "0";
        } else {
            this.label.opacity(_show? "1":"0")
            return this;
        }
    }
    
    build() {
        return `${this.buildStyleCode()}<div ${this.buildAttributeHTML()}>${this.indicator.build()}</div>`
    }
}

class EclairAlertBox extends EclairComponent {
    constructor(alert) {
        super()
        this._title = eclair.Text(null)
            .fontWeight(500)
            .fontSize("1.5rem")
            .display("none")
            .fontColor("rgba(0, 0, 0, 0.6)")
            .width("100%")
        
        this._title.getStyleSheet()["margin-bottom"] = ".5rem"
        
        this._text = eclair.Text(alert)
            .fontColor("rgba(0, 0, 0, 0.6)")
        
        this
            .background(eclair.theme.accent)
            .borderRadius(".25rem")
            .padding(".75rem 1.25rem")
            .font(eclair.theme.font)
        
        this.getStyleSheet(" hr")["border"] = "0px"
        this.getStyleSheet(" hr")["margin-top"] = ".75rem"
        this.getStyleSheet(" hr")["margin-bottom"] = ".75rem"
        this.getStyleSheet(" hr")["border-top"] = "1px solid rgba(0, 0, 0, 0.2)"
        this.getStyleSheet()["box-shadow"] = "0px 0px 0px 2px rgba(0, 0, 0, 0.2) inset"
    }
    
    success() {return this.background("#d4edd9")}
    danger() {return this.background("#f8d7d9")}
    warning() {return this.background("#fff3cd")}
    info() {return this.background("#d1ecf1")}
    light() {return this.background("white")}
    dark() {return this.backgorund("#d5d8d9")}
    
    title(_text) {
        if (_text == null) {
            this._title.display("none")
        } else {
            this._title.display("block")
            this._title.text(_text)
            return this;
        }
    }
    
    text(_text) {
        this._text.text(_text);
        return this;
    }
    
    build() {
        return `${this.buildStyleCode()}<div ${this.buildAttributeHTML()}>${this._title.build()}${this._text.build()}</div>`
    }
}


