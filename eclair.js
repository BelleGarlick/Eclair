// /Users/samgarlick/Developer/GitHub/JS-Declare/src
// /Users/samgarlick/Developer/GitHub/JS-Declare/src/eclair.js


let eclair = {
    _ids: 0,
    _elements: {},
    _newID: function() {this._ids += 1; return this._ids - 1;},
    
    Style: function() {return new EclairStyleComponent();},
    State: function(_val) {return new EclairState(_val);},
    
    View: function(elements) {return new EclairView(elements);},
    ScrollView: function(elements) {return new EclairScrollView(elements);},
    VBox: function(elements) {return new EclairVBox(elements);},
    HBox: function(elements) {return new EclairHBox(elements);},
    
    Button: function(text) {return new EclairButton(text);},
    Form: function(elements) {return new EclairForm(elements);},
    Image: function() {return new EclairImage();},
    Text: function(text) {return new EclairText(text);},
    TextStyleState: function() {return new EclairTextStyleState();},
    
    TextBox: function(text) {return new EclairTextBox(text);},
    TextArea: function() {return new EclairTextArea();},
    IFrame: function() {return new EclairIFrame();},
    Select: function() {return new EclairSelect();},
    Link: function(text) {return new EclairLink(text);},
    Slider: function(_value) {return new EclairSlider(_value);},
    HiddenInput: function() {return new EclairHiddenInput();},
    Toggle: function(_value) {return new EclairToggle(_value);},
    HorizontalLine: function() {return new EclairHorizontalLine();},
    CustomTagComponent: function(tag) {return new EclairCustomTagComponent(tag);},
    SyntaxHighlighter: function() {return new EclairSyntaxHighlighter();},
    RadioButtons: function() {return new EclairRadioButtons();},
    CheckBox: function(text) {return new EclairCheckbox(text);},
    
    ProgressBar: function(_progress) {return new EclairProgressBar(_progress);},
    AlertState: function() {return new EclairAlertBoxState();},
    Alert: function(_value) {return new EclairAlertBox(_value);},
    
    Color: function(_col) {return new EclairColour(_col);},
    
    performCallback: function(eID, event, param1) {this._elements[eID].performCallback(event, param1);},
    
    theme: {
        "accent": "#ee8800",
        "font": '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"'
    }
}

// /Users/samgarlick/Developer/GitHub/JS-Declare/src/states
// /Users/samgarlick/Developer/GitHub/JS-Declare/src/states/state.js
class EclairState {
    constructor(newValue) {
        this._value = newValue
        this.callbacks = {}
    }
    
    value(_value) {
        if (_value == undefined) {
            return this._value
        } else {
            this._value = _value;
            
            let self = this
            Object.keys(self.callbacks).forEach(function(key) {
                self.callbacks[key](self)
            })
        }
        
        return this
    }
    
    addCallback(key, func) {
        this.callbacks[key] = func
    }
    
    bool() {
        return this._value == "true" || this._value == "True" || this._value == "TRUE" || 
            this._value == "yes" || this._value == "1" || this._value == "Yes" || 
            this._value == "YES" || this._value || this._value == 1
    }
    
    toggle() {
        this.value(!this.bool())
    }
}

// /Users/samgarlick/Developer/GitHub/JS-Declare/src/states/colours.js
class EclairColour extends EclairState {
    constructor(_col) {
        super()
        
        if (_col != null) {
            this.value(_col)
        }
    }
    
    hex(_hex) {
        this.value(_hex[0] == "#" ? _hex:`#${_hex}`)
        return this;
    }
    
    rgb(r, g, b) {
        this.value(`rgb(${r},${g},${b})`)
        return this;
    }
    
    rgba(r, g, b, a) {
        this.value(`rgb(${r},${g},${b}, ${a})`)
        return this;
    }   
}

// /Users/samgarlick/Developer/GitHub/JS-Declare/src/states/textStyles.js
class EclairTextStyleState extends EclairState {
    title() {this.value("title"); return this;}
    subtitle() {this.value("subtitle"); return this;}
    heading1() {this.value("heading1"); return this;}
    heading2() {this.value("heading2"); return this;}
    heading3() {this.value("heading3"); return this;}
    heading4() {this.value("heading4"); return this;}
}



// /Users/samgarlick/Developer/GitHub/JS-Declare/src/style
// /Users/samgarlick/Developer/GitHub/JS-Declare/src/style/style.js
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
        
        if (cssOnly) {
            return styleCode
        }
        
        return `<style id='${objectID}-css'>${styleCode}</style>`;
    }
    
    updateCSSStyle() {
        let objectID = this.id() + "-css";
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
    position(_pos, selector) {this.getStyleSheet(selector)["position"] = _pos;return this.updateCSSStyle()}
    top(_top, selector) {this.getStyleSheet(selector)["top"] = _top;return this.updateCSSStyle()}
    bottom(_bottom, selector) {this.getStyleSheet(selector)["bottom"] = _bottom;return this.updateCSSStyle()}
    left(_left, selector) {this.getStyleSheet(selector)["left"] = _left;return this.updateCSSStyle()}
    right(_right, selector) {this.getStyleSheet(selector)["right"] = _right;return this.updateCSSStyle()}
    cursor(_value, selector) {this.getStyleSheet(selector)["cursor"] = _value; return this.updateCSSStyle()}
    textDecoration(_value, selector) {this.getStyleSheet(selector)["text-decoration"] = _value;return this.updateCSSStyle()}
    transition(_value, selector) {this.getStyleSheet(selector)["transition"] = _value;return this.updateCSSStyle()}
    userSelect(_value, selector) {this.getStyleSheet(selector)["user-select"] = _value;return this.updateCSSStyle()}
}

class EclairStyleComponent extends EclairStylableObject {
    constructor() {
        super()
        this._id = eclair._newID()
        
        this._stylePrefix = "."
        
        let node = document.createElement("style")
        node.innerHTML = this.buildStyleCode(true)
        node.setAttribute("id", this.id() + "-css")
        
        let headElements = document.head.children;
        if (headElements.length == 0) {
            document.head.appendChild(node)
        } else {
            document.head.insertBefore(node, headElements[0])
        }
    }
    
    id() {
        return "eclairStyle" + this._id;
    }
}

eclair.styles = {
    Text: eclair.Style()
        .font(eclair.theme.font),
    
    IFrame: eclair.Style()
        .borderColor("#333333")
        .borderSize("1px")
        .width("100%")
        .height("100%"),
    
    Button: eclair.Style()
        .borderSize("0px")
        .borderRadius("2px")
        .padding("8px 16px")
        .background("#eeeeee")
        .font(eclair.theme.font)
        .background("#dddddd", "hover")
        .background("#cccccc", "active"),
    
    Select: eclair.Style()
        .font(eclair.theme.font),
    
    Slider: eclair.Style()
        .transition("0.2s all")
        .css("-webkit-appearance: none; box-sizing: border-box; outline: none;")
        .css("-webkit-appearance: none; appearance: none;", ":-webkit-slider-thumb")
        .css("-webkit-appearance: none; appearance: none;", ":-moz-slider-thumb")
        .cursor("pointer", ":-webkit-slider-thumb")
        .cursor("pointer", ":-moz-slider-thumb")
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
    
    Link: eclair.Style()
        .font(eclair.theme.font)   
        .fontColor(eclair.theme.accent)
        .textDecoration("none")
        .textDecoration("underline", "hover"),
    
    Image: eclair.Style()
        .display("block"),
    
    TextBox: eclair.Style()
        .width("100%")
        .borderSize("0px")
        .borderRadius("3px")
        .padding("8px 16px")
        .background("#eeeeee")
        .font(eclair.theme.font)
        .background("#dddddd", "hover")
        .background("#cccccc", "active")
        .background("#bbbbbb", "focused"),
    
    HorizontalLine: eclair.Style()
        .borderSize("0px")
        .css("border-top: 1px solid #999999"),
    
    RadioButtons: eclair.Style(),  // No default style
    RadioButtonsItem: eclair.Style()
        .cursor("pointer")
        .css("box-shadow: 0px 0px 0px 100px rgba(0, 0, 0, 0.05) inset", "hover")
        .padding("2px")
        .borderRadius("4px")
        .width("100%")
        .userSelect("none")
        .font(eclair.theme.font),
    RadioButtonsSelectedItem: eclair.Style()
        .cursor("pointer")
        .css("box-shadow: 0px 0px 0px 100px rgba(0, 0, 0, 0.05) inset", "hover")
        .padding("2px")
        .borderRadius("4px")
        .userSelect("none")
        .width("100%")
        .font(eclair.theme.font),
    RadioButtonsRadio: eclair.Style()
        .width("14px")
        .height("14px")
        .userSelect("none")
        .borderSize("2px")
        .borderStyle("solid")
        .borderColor(eclair.theme.accent)
        .borderRadius("100%"),
    RadioButtonsSelectedRadio: eclair.Style()
        .width("14px")
        .height("14px")
        .userSelect("none")
        .borderSize("2px")
        .borderStyle("solid")
        .borderColor(eclair.theme.accent)
        .borderRadius("100%")
        .background(eclair.theme.accent),
    
    CheckBox: eclair.Style()    
        .cursor("pointer")
        .css("box-shadow: 0px 0px 0px 100px rgba(0, 0, 0, 0.05) inset", "hover")
        .padding("2px")
        .borderRadius("4px")
        .width("100%")
        .userSelect("none")
        .font(eclair.theme.font),
    CheckBoxIcon: eclair.Style()
        .borderSize("2px")
        .borderRadius("4px")
        .borderColor(eclair.theme.accent)
        .borderStyle("solid")
        .width("16px")
        .height("16px")
        .fontSize("0.85rem")
        .userSelect("none")
        .textAlign("center"),        
    CheckBoxActiveIcon: eclair.Style()
        .borderSize("2px")
        .borderRadius("4px")
        .borderColor(eclair.theme.accent)
        .borderStyle("solid")
        .width("16px")
        .height("16px")
        .userSelect("none")
        .background(eclair.theme.accent)
        .fontColor("white")
        .fontSize("0.85rem")
        .textAlign("center"),
    CheckBoxLabel: eclair.Style(),
    
    ProgressBar: eclair.Style()
        .background("#d3d3d3")
        .borderRadius("3px")
        .height("16px")
        .userSelect("none")
        .overflow("hidden"),
    ProgressBarIndicator: eclair.Style()
        .background(eclair.theme.accent)
        .height("100%")
        .transition("0.3s all")
        .userSelect("none")
        .margin("0px auto 0px 0px"),
    ProgressBarLabel: eclair.Style()
        .fontColor("white")
        .fontWeight(700)
        .userSelect("none")
        .fontSize("11px"),
    
    Toggle: eclair.Style()    
        .position("relative")
        .height("20px")
        .display("inline-block")
        .borderRadius("20px")
        .width("50px")
        .background("#dddddd")
        .cursor("pointer")
        .transition("0.2s all")
        .userSelect("none"),
    ToggleTick: eclair.Style()
        .position("absolute")
        .fontWeight(700)
        .left("10px")
        .fontColor("#ffffff")
        .transition("0.2s all")
        .userSelect("none")
        .opacity(0),
    ToggleKnob: eclair.Style()
        .transition("0.2s all")
        .userSelect("none")
        .css("box-sizing: border-box;")
        .position("absolute")
        .top("0px")
        .left("0px")
        .margin("3px")
        .background("#ffffff")
        .borderRadius("20px")
        .height("14px")
        .width("14px")
}


// /Users/samgarlick/Developer/GitHub/JS-Declare/src/elements
// /Users/samgarlick/Developer/GitHub/JS-Declare/src/elements/base.js
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
        if (this._callbacks.hasOwnProperty("onBuild")) {
            this.performCallback("onBuild");
        }
        
        let wrapperElement = document.createElement("div")
        wrapperElement.innerHTML = _html;
        let element = wrapperElement.children[0]
        
        let self = this;
        Object.keys(this.attributes).forEach(function(key) {
            element.setAttribute(key, self.attributes[key])
        });
        
        let html = this.buildStyleCode() + wrapperElement.innerHTML;
        
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

// /Users/samgarlick/Developer/GitHub/JS-Declare/src/elements/custom
// /Users/samgarlick/Developer/GitHub/JS-Declare/src/elements/custom/custom.js


class EclairAlertBoxState extends EclairState {
    success() {this.value("success"); return this;}
    danger() {this.value("danger"); return this;}
    warning() {this.value("warning"); return this;}
    info() {this.value("info"); return this;}
    light() {this.value("light"); return this;}
    dark() {this.value("dark"); return this;}
}
class EclairAlertBox extends EclairComponent {
    constructor(alert) {
        super()
        
        this._title = eclair.Text(this.titleStateText)
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
        
        this.getStyleSheet(" hr")["border"] = "0px"
        this.getStyleSheet(" hr")["margin-top"] = ".75rem"
        this.getStyleSheet(" hr")["margin-bottom"] = ".75rem"
        this.getStyleSheet(" hr")["border-top"] = "1px solid rgba(0, 0, 0, 0.2)"
        this.getStyleSheet()["box-shadow"] = "0px 0px 0px 2px rgba(0, 0, 0, 0.2) inset"
    }
    
    theme(_theme) {
        if (_theme instanceof EclairAlertBoxState) {
            this._setTheme(_theme)
            
            let self = this
            _theme.addCallback(this.id() + "-theme", function(state) {
                self._setTheme(state)
            })
        }
        
        return this
    }
    
    _setTheme(_state) {
        let stateValue = _state.value()
        if (stateValue == "success") {this.background("#d4edd9")}
        if (stateValue == "danger") {this.background("#f8d7d9")}
        if (stateValue == "warning") {this.background("#fff3cd")}
        if (stateValue == "info") {this.background("#d1ecf1")}
        if (stateValue == "light") {this.background("#white")}
        if (stateValue == "dark") {this.background("#d5d8d9")}
    }
    
    title(_text) {
        if (_text == null) {
            this._title.display("none")
        } else {
            this._title.display("block")
            return this;
        }
    }
    
    build() {
        return this.wrapHTML(`<div>${this._title.build()}${this._text.build()}</div>`)
    }
}

class EclairSyntaxHighlighter extends EclairComponent {
    constructor() {
        super()

        try {
            if (hljs) {}
        } catch {
            console.log("HLJS Not imported. Go to 'https://highlightjs.org/usage/' to import the stylesheet and the .js file.")
        }

        this._value = "";

        let self = this;
        this
            .position("relative")
            .width("400px")
            .height("400px")

        this._pre = eclair.CustomTagComponent("pre")
            .position("absolute")
            .padding("0px")
            .margin("0px")
            .height("100%")
            .width("100%")
            .top("0px")
            .left("0px")
            .background("white")
            .css("box-sizing: border-box;line-height: 1.05")

        this._code = eclair.CustomTagComponent("code")
            .position("absolute")
            .top("0px")
            .left("0px")
            .background("white")
            .width("100%")
            .height("100%")
            .margin("0px")
            .padding("10px 10px 10px 15px")
            .fontColor("black")
            .setAttr("class", "javascript")
            .textAlign("left")
            .css("box-sizing: border-box;")

        this._textarea = eclair.TextArea()
            .setAttr("spellcheck", false)
            .display("inline")
            .position("absolute")
            .top("0px")
            .left("0px")
            .width("100%")
            .height("100%")
            .background("transparent")
            .fontColor("transparent")
            .font("monospace")
            .margin("0px")
            .padding("10px 10px 10px 15px")
            .css("box-sizing: border-box;line-height: 1.05; caret-color: black;resize:none;white-space: pre;letter-spacing: -0.2px;")
            .onKeyUp(e => {
                var escape = document.createElement('textarea');
                escape.textContent = e.value();
                self._code.innerHTML(escape.innerHTML);
                hljs.highlightAll();
            })
            .onKeyDown(e => {
                var escape = document.createElement('textarea');
                escape.textContent = e.value();
                self._code.innerHTML(escape.innerHTML);
                hljs.highlightAll();
            }) 
            .onScroll(e => {
                let textarea = e.getElement()
                self._code.getElement().scroll(textarea.scrollLeft, textarea.scrollTop)
            })
    }

    value(_value) {
        if (_value == null) {
            let elem = this._textarea.getElement();
            if (elem != null) { 
                return this._textarea.value()
            }
            return this._value;
        } else {
            this._value = _value;
            this._textarea.value(_value);
            var escape = document.createElement('textarea');
            escape.textContent = this._textarea.value();
            this._code.innerHTML(escape.innerHTML);
            hljs.highlightAll();
            return this;
        }
    }

    build() {
        let postBuildScript = document.createElement("script")
        postBuildScript.innerHTML += "hljs.highlightAll();"
        
        this._pre.innerHTML(this._code.build())
        return this.wrapHTML(`<div>${this._pre.build()}${this._textarea.build()}</div>${postBuildScript.outerHTML}`)
    }
}


// /Users/samgarlick/Developer/GitHub/JS-Declare/src/elements/custom/progress.js
class EclairProgressBar extends EclairComponent {
    constructor(_progress) {
        super()
        
        this._striped = false
        
        this._labelText = eclair.State("0%")
        this._label = eclair.Text(this._labelText)
            .addStyle(eclair.styles.ProgressBarLabel)
        
        this._indicator = eclair.HBox([this._label])
            .margin(null)  // Overrides default HBox Margin
            .addStyle(eclair.styles.ProgressBarIndicator)
        
        this.progress = _progress
        if (_progress instanceof EclairState) {
            this.progress = _progress.value()
            this._labelText.value(Math.round(this.progress * 100) + "%")
            this._indicator.width((this.progress * 100 + 0.0001) + "%")
            
            let self = this
            _progress.addCallback(this.id() + "-progress", function(state) {
                _progress = Math.max(Math.min(state.value(), 1), 0)
                self._progress = _progress;
                self._labelText.value(Math.round(_progress * 100) + "%")
                self._indicator.width((_progress * 100 + 0.0001) + "%")
            })
        }
        
        this.addStyle(eclair.styles.ProgressBar)
            .displayLabel(false)
    }
    
    striped(_on) {
        if (_on == null) {
            return this._striped;
        } else {
            if (_on) {
                this._indicator.getStyleSheet()["background-image"] = "linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)";
                this._indicator.getStyleSheet()["background-size"] = "1rem 1rem;";
            } else {
                this._indicator.getStyleSheet()["background-image"] = "";
                this._indicator.getStyleSheet()["background-size"] = "1rem 1rem;";
            }
            this._indicator.updateCSSStyle()
        }
        
        return this;
    }
    
    indicator(callback) {
        callback(this._indicator)
        return this;
    }
    
    label(callback) {
        callback(this._label)
        return this;
    }
    
    color(_color) {
        this._indicator.background(_color)
        return this
    }
    
    displayLabel(_show) {
        if (_show instanceof EclairState) {
            let self = this
            self._label.opacity(_show.bool()? "1":"0")
            
            _show.addCallback(this.id() + "-password", function(state) {
                self._label.opacity(state.bool()? "1":"0")
            })
        } else {
            this._label.opacity(_show? "1":"0")
        }
        
        return this
    }
    
    build() {
        return this.wrapHTML(`<div>${this._indicator.build()}</div>`)
    }
}


// /Users/samgarlick/Developer/GitHub/JS-Declare/src/elements/form
// /Users/samgarlick/Developer/GitHub/JS-Declare/src/elements/form/form.js
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
        
        this.setAttr("value", progressValue)
        if (progressValue instanceof EclairState) {
            this.setAttr("value", progressValue.value())
            
            progressValue.addCallback(this.id() + "-value", function(state) {
                self.setAttr("value", state.value())
                self.getElement(elem => {elem.value = state.value()})
            })
           
            this._updateCallback("onInput", e => {
                e.getElement(elem => {progressValue.value(elem.value)})
                
                if (self.overrideOnCreate != null) {
                    overrideOnCreate(self)
                }
            })
        }
        
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
// /Users/samgarlick/Developer/GitHub/JS-Declare/src/elements/form/textbox.js
class EclairTextBox extends EclairCustomTagComponent {
    constructor(_text) {
        super("input")
        this.setAttr("type", "text")
            .addStyle(eclair.styles.TextBox)
        
        let self = this
        
        this._updateCallback("onInput", e => {
            if (self.overrideOnCreate != null) {
                overrideOnCreate(self)
            }
        })
        
        this.setAttr("value", _text)
        if (_text instanceof EclairState) {
            this.setAttr("value", _text.value())
            
            _text.addCallback(this.id() + "-value", function(state) {
                let newState = state.value()
                self.setAttr("value", newState)
                self.getElement(elem => {elem.value = newState});
            })
            
            this._updateCallback("onInput", e => {
                e.getElement(elem => {_text.value(elem.value)})
                
                if (self.overrideOnCreate != null) {
                    overrideOnCreate(self)
                }
            })
        }
    }
    
    name(_name) {
        if (_name instanceof EclairState) {
            let self = this
            this.setAttr("name", _text.value())
            _name.addCallback(this.id() + "-name", function(state) {
                self.setAttr("name", state.value())
            })
        } else {
            this.setAttr("name", _name)
        }
        
        return this
    }
    
    placeholder(_placeholder) {
        if (_placeholder instanceof EclairState) {
            let self = this
            this.setAttr("placeholder", _placeholder.value())
            _placeholder.addCallback(this.id() + "-placeholder", function(state) {
                self.setAttr("placeholder", state.value())
            })
        } else {
            this.setAttr("placeholder", _placeholder)
        }
        
        return this
    }
    
    password(_password) {
        if (_password instanceof EclairState) {
            let self = this
            this.setAttr("type", _password.bool()? "password":'text')
            _password.addCallback(this.id() + "-password", function(state) {
                self.setAttr("type", _password.bool()? "password":'text')
            })
        } else {
            this.setAttr("type", isPassword? "password":'text')
        }
        
        return this
    }
    
    maxLength(maxLength) {
        if (maxLength == null) {
            return this.getAttr("maxlength");
        } else {
            this.setAttr("maxlength", maxLength)
        }
        return this
    } 
    
    
}
// /Users/samgarlick/Developer/GitHub/JS-Declare/src/elements/form/toggle.js
class EclairToggle extends EclairComponent {
    constructor(_value) {
        super()
        
        let overrideOnClick = null;
        let overrideOnCreate = null;
        
        this.addStyle(eclair.styles.Toggle)
        this._tickMark = eclair.Text("✓").addStyle(eclair.styles.ToggleTick)
        this._knob = new EclairView([]).addStyle(eclair.styles.ToggleKnob)
        
        this._hiddenComponent = new EclairHiddenInput()
        this._hiddenComponent.value(_value)
    
        if (_value instanceof EclairState) {
            this._hiddenComponent.value(_value.bool())
            
            let self = this
            _value.addCallback(this.id() + "-toggle", function(state) {
                let value = state.bool()
                let cValue = self._hiddenComponent.value(value)
                
                self._hiddenComponent.value(value)
                self.updateStyle()
                
                if (value != cValue && self._callbacks.hasOwnProperty("onChange")) {
                    self.performCallback("onChange")  
                }
            })
        }
        
        let self = this;
        this._updateCallback("onClick", e => {
            if (e._enabled) {
                let cVal = this._hiddenComponent.value() == "true"
                this._hiddenComponent.value(!cVal)
                if (_value instanceof EclairState) {_value.value(!cVal)} else {this.performCallback("onChange")}
                this.updateStyle()
            }
            if (self.overrideOnClick != null) {
                overrideOnClick(self)
            }
        })
        this._updateCallback("onCreate", e => {
            this.updateStyle();
            if (self.overrideOnCreate != null) {
                overrideOnCreate(self)
            }
        })
        
        this._showCheckMark = false
        this._enabled = true
    }
    
    onClick(callback) {
        this.overrideOnClick = callback;
        return this;
    }
    
    onCreate(callback) {
        this.overrideOnCreate = callback;
        return this;
    }
    
    knob(callback) {
        callback(this._knob)
        return this
    }
    
    name(_name) {
        if (_name == null) {
            return this._hiddenComponent.name()
        } else {
            this._hiddenComponent.name(_name)
            return this;
        }
    }
    
    enabled(_enabled) {
        if (_enabled instanceof EclairState) {
            let self = this
            this._enabled = _enabled.bool()
            this.opacity(this._enabled? 1 : 0.6)
            _enabled.addCallback(this.id() + "-enabled", function(state) {
                self._enabled = state.bool()
                self.opacity(self._enabled? 1 : 0.6)
            })
        } else {
            this._enabled = _enabled
            self.opacity(_enabled? 1 : 0.6)
        }
        
        return this
    }
    
    updateStyle() {
        if (this._hiddenComponent.value() == "true") {
            this.background(eclair.theme.accent)
            if (this._showCheckMark) {
                this._tickMark.opacity(1)
            }

            let elem = this.getElement()
            if (elem != null) {
                this._knob.left((this.getElement().clientWidth - this._knob.getElement().clientWidth - 6) + "px")
            }
        } else {
            this._tickMark.opacity(0)
            this.background("#dddddd")
            this._knob.left("0px")
        }
    }
    
    showTick(_bool) {
        if (_bool instanceof EclairState) {
            let self = this
            this._showCheckMark = _bool.bool()
            this._tickMark.opacity((this._showCheckMark && (this._hiddenComponent.value() == "true"))? 1:0)
            _bool.addCallback(this.id() + "-showTick", function(state) {
                self._showCheckMark = state.bool()
                self._tickMark.opacity((self._showCheckMark && (self._hiddenComponent.value() == "true"))? 1:0)
            })
        } else {
            this._showCheckMark = _bool
            this._tickMark.opacity((_bool && (this._hiddenComponent.value() == "true"))? 1:0)
        }
        
        return this
    }
    
    build() {
        return this.wrapHTML(`<div>`+this._tickMark.build()+this._knob.build()+this._hiddenComponent.build()+"</div>")
    }
}


// /Users/samgarlick/Developer/GitHub/JS-Declare/src/elements/layout
// /Users/samgarlick/Developer/GitHub/JS-Declare/src/elements/layout/layout.js


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
        
        return this.wrapHTML(`<div>` + code + "</div>");
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
        return this.wrapHTML("<div>" + code + "</div>");
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
        let code = "<table>"
        for (let e = 0; e < this.elements.length; e++) {
            if (e > 0 && this._spacing > 0) {
                code += "<tr><td style='height:"+ this._spacing +"px'></td></tr>"
            }
            code += "<tr><td>" + this.elements[e].build() + "</td></tr>";
        }
        return this.wrapHTML(code + "</table>");
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
        let code = "<table>"
        for (let e = 0; e < this.elements.length; e++) {
            if (e > 0 && this._spacing > 0) {
                code += "<td style='width:"+ this._spacing +"px'></td>"
            }
            code += "<td>" + this.elements[e].build() + "</td>";
        }
        return this.wrapHTML(code + "</table>");
    }
}





// /Users/samgarlick/Developer/GitHub/JS-Declare/src/elements/standard
// /Users/samgarlick/Developer/GitHub/JS-Declare/src/elements/standard/standard.js

class EclairImage extends EclairCustomTagComponent {
    constructor() {
        super("img")
        this.addStyle(eclair.styles.Image)
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
}

class EclairLink extends EclairCustomTagComponent {
    constructor(text) {
        super("a")
        this._text = text;
        
        this.addStyle(eclair.styles.Link)
    }
    
    text(_text) {
        return this.innerHTML(_text)
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
}

class EclairHorizontalLine extends EclairCustomTagComponent {
    constructor() {
        super("hr")        
        this.addStyle(eclair.styles.HorizontalLine)
    }
}

class EclairIFrame extends EclairCustomTagComponent {
    constructor() {
        super("iframe")
        this.innerHTML("Your client does not support iframes.")
        this.addStyle(eclair.styles.IFrame)
    }
    
    url(_source) {
        return _source == null? this.getAttr("src") : this.setAttr("src", _source)
    }
    
    source(_source) {
        return _source == null? this.getAttr("srcdoc") : this.setAttr("srcdoc", _source)
    }
    
    allowFullScren(_allow) {
        return _allow == null? this.getAttr("allowfullscreen") : this.setAttr("allowfullscreen", _allow)
    }
    
    allowPaymentRequest(_allow) {
        return _allow == null? this.getAttr("allowpaymentrequest") : this.setAttr("allowpaymentrequest", _allow)
    }
    
    loading(_loading) {
        return _loading == null? this.getAttr("loading") : this.setAttr("loading", _loading)
    }
    
    name(_name) {
        return _name == null? this.getAttr("name") : this.setAttr("name", _name)
    }
    
    referrerPolicy(_policy) {
        return _policy == null? this.getAttr("referrerpolicy") : this.setAttr("referrerpolicy", _policy)
    }
    
    sandbox(_sandbox) {
        return _sandbox == null? this.getAttr("sandbox") : this.setAttr("sandbox", _sandbox)
    }
}


// /Users/samgarlick/Developer/GitHub/JS-Declare/src/elements/standard/text.js
class EclairText extends EclairComponent {
    constructor(text) {
        super()
        
        this._text = text;
        if (text instanceof EclairState) {
            this._text = text.value()
            
            let self = this
            text.addCallback(this.id() + "-text", function(state) {
                let newState = state.value()
                self._text = newState;
                self.getElement(elem => {elem.innerHTML = newState});
            })
        }
        
        this.addStyle(eclair.styles.Text)
    }
    
    type(_state) {
        if (_state instanceof EclairTextStyleState) {
            this._setType(_state.value());
            
            let self = this
            _state.addCallback(this.id() + "-type", function(state) {
                self._setType(state.value())
            })
        } else {
            this._setType(_state);
        }
        
        return this
    }
    
    _setType(newType) {
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
    }
    
    build() {
        return this.wrapHTML(`<span>${this._text}</span>`)
    }
}






