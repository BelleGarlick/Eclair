// TODO Add events to callbacks
// TODO Prevent layered on click events
// TODO Hide show elements
// TODO Superscript/Subscript text
// TODO Theme 
// TODO Implement these: https://getbootstrap.com/docs/4.0/components/progress/


let eclair = {
    _ids: 0,
    _elements: {},
    
    _styleIDs: 0,
    
    newID: function() {this._ids += 1; return this._ids - 1;},
    newStyleID: function() {this._ids += 1; return this._ids - 1;},
    
    Style: function() {return new EclairSharedStyleObject();},
    
    View: function(elements) {return new EclairView(elements);},
    VBox: function(elements) {return new EclairVBox(elements);},
    HBox: function(elements) {return new EclairHBox(elements);},
    Button: function(text) {return new EclairButton(text);},
    Form: function(elements) {return new EclairForm(elements);},
    Image: function() {return new EclairImage();},
    Text: function(text) {return new EclairText(text);},
    Textbox: function() {return new EclairTextbox();},
    
    Select: function() {return new EclairSelect();},
    Link: function(text) {return new EclairLink(text);},
    Slider: function() {return new EclairSlider();},
    ProgressBar: function() {return new EclairProgressBar();},
    
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
    onInputCallback: function(eID) {this._elements[eID].performOnInput();},
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
    
    theme: {
        "accent": "#dd6600"
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
            
            if (selector.length > 0) {selector = ":" + selector}
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
}


class EclairSharedStyleObject extends EclairStylableObject {
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


class EclairObject extends EclairStylableObject {
    constructor() {
        super()
        
        this.sharedStyles = []
        this.attributes = {}
        
        this._id = eclair.newID();
        eclair._elements[this.id()] = this;
        
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
        this._onInput = null;
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
        if (callback == null) {
            this.setAttr(callbackKey.toLowerCase(), null)
        } else {
            this.setAttr(callbackKey.toLowerCase(), `eclair.${callbackKey}Callback("${this.id()}")`)
        }
    }
    onBlur(callback) {this._updateCallback("onBlur", callback); this._onBlur = callback;  return this;}
    onChange(callback) {this._updateCallback("onChange", callback); this._onChange = callback; return this;}
    onFocus(callback) {this._updateCallback("onFocus", callback); this._onFocus = callback; return this;}
    onSelect(callback) {this._updateCallback("onSelect", callback); this._onSelect = callback; return this;}
    onSubmit(callback) {this._updateCallback("onSubmit", callback); this._onSubmit = callback; return this;}
    onReset(callback) {this._updateCallback("onReset", callback); this._onReset = callback; return this;}
    onKeyDown(callback) {this._updateCallback("onKeyDown", callback); this._onKeyDown = callback; return this;}
    onKeyPress(callback) {this._updateCallback("onKeyPress", callback); this._onKeyPress = callback; return this;}
    onKeyUp(callback) {this._updateCallback("onKeyUp", callback); this._onKeyUp = callback; return this;}
    onInput(callback) {this._updateCallback("onInput", callback); this._onInput = callback; return this;}
    onMouseDown(callback) {this._updateCallback("onMouseDown", callback); this._onMouseDown = callback; return this;}
    onMouseUp(callback) {this._updateCallback("onMouseUp", callback); this._onMouseUp = callback; return this;}
    onMouseOver(callback) {this._updateCallback("onMouseOver", callback); this._onMouseOver = callback; return this;}
    onMouseOut(callback) {this._updateCallback("onMouseOut", callback); this._onMouseOut = callback; return this;}
    onMouseMove(callback) {this._updateCallback("onMouseMove", callback); this._onMouseMove = callback; return this;}
    onClick(callback) {this._updateCallback("onClick", callback); this._onClick = callback; return this;}
    onDblClick(callback) {this._updateCallback("onDblClick", callback); this._onDblClick = callback; return this;}
    onLoad(callback) {this._updateCallback("onLoad", callback); this._onLoad = callback; return this;}
    onError(callback) {this._updateCallback("onError", callback); this._onError = callback; return this;}
    onUnload(callback) {this._updateCallback("onUnload", callback); this._onUnload = callback; return this;}
    onResize(callback) {this._updateCallback("onResize", callback); this._onResize = callback; return this;}
    
    performOnBlur() {this._onBlur(this)}
    performOnChange() {this._onChange(this)}
    performOnFocus() {this._onFocus(this)}
    performOnSelect() {this._onSelect(this)}
    performOnSubmit() {this._onSubmit(this)}
    performOnReset() {this._onReset(this)}
    performOnKeyDown() {this._onKeyDown(this)}
    performOnKeyPress() {this._onKeyPress(this)}
    performOnKeyUp() {this._onKeyUp(this)}
    performOnInput() {this._onInput(this)}
    performOnMouseDown() {this._onMouseDown(this)}
    performOnMouseUp() {this._onMouseUp(this)}
    performOnMouseOver() {this._onMouseOver(this)}
    performOnMouseOut() {this._onMouseOut(this)}
    performOnMouseMove() {this._onMouseMove(this)}
    performOnClick() {this._onClick(this)}
    performOnDblClick() {this._onDblClick(this)}
    performOnLoad() {this._onLoad(this)}
    performOnError() {this._onError(this)}
    performOnUnload() {this._onUnload(this)}
    performOnResize() {this._onResize(this)}
    
    buildAttributeHTML() {
        let self = this;
        let attrHTML = "";
        
        Object.keys(this.attributes).forEach(function(key) {
            attrHTML += ` ${key}='${self.attributes[key]}'`;
        });
        
        return attrHTML;
    }
}


class EclairView extends EclairObject {
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

class EclairVBox extends EclairObject {
    constructor(elements) {
        super()
        
        this._spacing = 0
        this.elements = elements;
        this.getStyleSheet()["table-layout"] = "fixed"
        this.setAttr("border", 0)
        this.setAttr("cellspacing", 0)
        this.setAttr("cellpadding", 0)
        this.textAlign("center")
    }
    
    spacing(space) {
        this._spacing = space;
        return this;
    }
    
    build () {
        let code = this.buildStyleCode() + "<table id='"+this.id()+"' "+this.buildAttributeHTML()+">"
        for (let e = 0; e < this.elements.length; e++) {
            if (e > 0) {
                code += "<tr><td height='"+ this._spacing +"px'></td></tr>"
            }
            code += "<tr><td>" + this.elements[e].build() + "</td></tr>";
        }
        return code + "</table>";
    }
}

class EclairHBox extends EclairObject {
    constructor(elements) {
        super()
        
        this._spacing = 0
        this.elements = elements;
        this.getStyleSheet()["table-layout"] = "fixed"
        this.setAttr("border", 0)
        this.setAttr("cellspacing", 0)
        this.setAttr("cellpadding", 0)
        this.textAlign("center")
    }
    
    spacing(space) {
        this._spacing = space;
        return this;
    }
    
    build () {
        let code = this.buildStyleCode() + "<table id='"+this.id()+"' "+this.buildAttributeHTML()+">"
        for (let e = 0; e < this.elements.length; e++) {
            if (e > 0) {
                code += "<td width='"+ this._spacing +"px'></td>"
            }
            code += "<td>" + this.elements[e].build() + "</td>";
        }
        return code + "</table>";
    }
}

class EclairForm extends EclairObject {
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





class EclairTextbox extends EclairObject {
    constructor() {
        super()
        this.setAttr("type", "text")
        
        this.borderSize("0px")
        this.borderRadius("2px")
        this.padding("8px 16px")
        this.background("#eeeeee")
        this.font("arial")
        this.background("#dddddd", "hover")
        this.background("#cccccc", "active")
        this.background("#bbbbbb", "focused")
    }
    
    name(_name) {
        if (_name == null) {
            return this.getAttr("name")
        } else {
            this.setAttr("name", _name)
            return this
        }
    }
    
    value(text) {
        let elem = this.getElement();
        if (text == null) {
            if (elem != null) {
                return elem.value;
            }
            return this.getAttr("value")
        } else {
            if (elem != null) {elem.value = text;}
            this.setAttr("value", text)
            return this
        }
    }
    
    placeholder(_placeholder) {
        if (text == null) {
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
        return `${this.buildStyleCode()}<input id='${this.id()}' ${this.buildAttributeHTML()}/>`
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






/***
    Form Elements
***/
class EclairSelect extends EclairObject {
    constructor() {
        super()
        this.options = []
    }
    
    name(newName) {
        if (newName == null) {
            return this.getAttr("name");
        } else {
            this.setAttr("name", newName);
            return this;
        }
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
        
        return `${this.buildStyleCode()}<select id='${this.id()}' name='${this.name}' ${this.buildAttributeHTML()}>${options}</select>`
    }
}

class EclairButton extends EclairObject {
    constructor(text) {
        super()
        
        this.text = text;
        
        this.borderSize("0px")
        this.borderRadius("2px")
        this.padding("8px 16px")
        this.background("#eeeeee")
        this.font("arial")
        
        this.background("#dddddd", "hover")
        this.background("#cccccc", "active")
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
        return `${this.buildStyleCode()}<button type='button' id='${this.id()}'  ${this.buildAttributeHTML()}>${this.text}</button>`
    }
}

class EclairSlider extends EclairObject {
    constructor() {
        super()
    
        this.css("-webkit-appearance: none; box-sizing: border-box; outline: none; -webkit-transition: .2s; transition: opacity .2s;")
        this.css("-webkit-appearance: none; appearance: none; width: 25px; height: 25px; border-radius: 50%; cursor: pointer;", ":-webkit-slider-thumb")
        this.css("-webkit-appearance: none; appearance: none; width: 25px; height: 25px; border-radius: 50%; cursor: pointer;", ":-moz-slider-thumb")

        
        this.setAttr("type", "range")
        this.background("#d3d3d3")
        this.background(eclair.theme.accent, ":-webkit-slider-thumb")
        this.background(eclair.theme.accent, ":-moz-slider-thumb")
        
        this.width("100%")
        this.height("15px")
        this.borderRadius("5px")
        this.opacity(0.7)
        this.opacity(1, "hover")
        
    }
    
    name(newName) {
        if (newName == null) {
            return this.getAttr("name");
        } else {
            this.setAttr("name", newName);
            return this;
        }
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
        return `${this.buildStyleCode()}<input id='${this.id()}' ${this.buildAttributeHTML()}/>`
    }
}

class EclairProgressBar extends EclairObject {
    constructor() {
        super()
        
        this._progress = 0
        this._striped = false
        
        this.label = eclair.Text("0%")
            .font("arial")
            .fontColor("white")
            .fontWeight(700)
            .fontSize("11px")    
        
        this.indicator = eclair.HBox([this.label])
            .background(eclair.theme.accent)
            .borderRadius("3px")
            .height("100%")
            .css("transition: 0.3s all")
        
        this.progress(0)
        this.background("#d3d3d3")
        this.displayLabel(false)
        this.borderRadius("3px")
        this.height("16px")
        this.overflow("hidden")
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
            this.indicator.setAttr("width", (_progress * 100 + 0.0001) + "%")
            return this
        }
    }
    
    displayLabel(_show) {
        if (_show == null) {
            return this.label.getStyleSheet()["opacity"] != "0";
        } else {
            if (_show) {
                this.label.getStyleSheet()["opacity"] = "1";
            } else {
                this.label.getStyleSheet()["opacity"] = "0";
            }
            return this;
        }
    }
    
    build() {
        return `${this.buildStyleCode()}<div id='${this.id()}' ${this.buildAttributeHTML()}>${this.indicator.build()}</div>`
    }
}


/*
    Standard Elements
*/
class EclairImage extends EclairObject {
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
        return `<img${this.buildAttributeHTML()}/>`
    }
}

class EclairLink extends EclairObject {
    constructor(text) {
        super()
        this._text = text;
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
        return `${this.buildStyleCode()}<a id='${this.id()}' ${this.buildAttributeHTML()}>${this._text}</a>`
    }
}

class EclairText extends EclairObject {
    constructor(text) {
        super()
        this._text = text;
        this._subscript = false;
        this._superscript = false;
    }
    
    type(newType) {
        if (newType == "title") {
            this.fontSize("40px")
            this.font("arial")
            this.fontWeight(700)
            this.margin("50px 10px 10px 10px")
        }
        
        if (newType == "subtitle") {
            this.fontSize("25px")
            this.font("arial")
            this.margin("50px 10px 10px 10px")
        }
        
        if (newType == "heading1") {
            this.fontSize("30px")
            this.font("arial")
            this.fontWeight(700)
            this.margin("50px 10px 10px 10px")
        }
        
        if (newType == "heading2") {
            this.fontSize("25px")
            this.font("arial")
            this.fontWeight(700)
            this.margin("50px 10px 10px 10px")
        }
        
        if (newType == "heading3") {
            this.fontSize("20px")
            this.font("arial")
            this.fontWeight(700)
            this.margin("50px 10px 10px 10px")
        }
        
        if (newType == "heading4") {
            this.fontSize("15px")
            this.font("arial")
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
        
        return `${this.buildStyleCode()}<${tagName} id='${this.id()}' ${this.buildAttributeHTML()}>${this._text}</${tagName}>`
    }
}
