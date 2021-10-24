
// eclair




let eclair = {
    version: "0.0.89",
    _ids: 0,
    _elements: {},
    _styles: {},
    _newID: function() {
        this._ids += 1; 
        return "eclair-element-" + (this._ids - 1);
    },
    
    performCallback: function(eclairID, eventID, event, param) {
        this._elements[eclairID].performCallback(eventID, event, param);
    },
    
    Style: function(_styleID) {return new EclairStyleComponent(_styleID);},
    
    post: function(_url) {return new EclairPost(_url);},
    
    State: function(_val) {return new EclairState(_val);},    
    Color: function(_col) {return new EclairColor(_col);},
    TextStyle: function() {return new EclairTextStyleState();},
    Alignment: function() {return new EclairAlignmentState();},
    
    View: function(_elements, _func) {return new EclairView(_elements, _func);},
    VStack: function(_elements, _func) {return new EclairVStack(_elements, _func);},
    HStack: function(_elements, _func) {return new EclairHStack(_elements, _func);},
    TabView: function(_tab, _elements) {return new EclairTabView(_tab, _elements);},
    
    CustomTagComponent: function(tag) {return new EclairCustomTagComponent(tag);},
    
    Button: function(text) {return new EclairButton(text);},
    TextBox: function(text) {return new EclairTextBox(text);},
    Form: function(elements) {return new EclairForm(elements);},
    Select: function(_value) {return new EclairSelect(_value);},
    Slider: function(_value) {return new EclairSlider(_value);},
    Toggle: function(_value) {return new EclairToggle(_value);},
    RadioButtons: function(_value) {return new EclairRadioButtons(_value);},
    CheckBox: function(text) {return new EclairCheckBox(text);},
    TextArea: function(_value) {return new EclairTextArea(_value);},
    HiddenInput: function(_value) {return new EclairHiddenInput(_value);},
    
    Image: function(_value) {return new EclairImage(_value);},
    IFrame: function() {return new EclairIFrame();},
    Text: function(text) {return new EclairText(text);},
    Link: function(text) {return new EclairLink(text);},
    HorizontalLine: function() {return new EclairHorizontalLine();},
    
    Alert: function(_value) {return new EclairAlertBox(_value);},
    ProgressBar: function(_progress) {return new EclairProgressBar(_progress);},
    SyntaxHighlighter: function(_value) {return new EclairSyntaxHighlighter(_value);},
    
    theme: {
        "accent": "#ee8800",
        "font": '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"'
    }
}

function ø(value) {
    return eclair.State(value)
}

function Ø(value) {
    return eclair.State(value)
}


// states.state
class EclairState {
    constructor(newValue) {
        this._value = newValue
        this.callbacks = {}
    }
    
    value(_value, component) {
        if (_value == undefined) {
            return this._value
        } else {
            if (_value != this._value){
                this._value = _value;
                
                let ignoreID = (component instanceof EclairComponent)? component.id() : ""

                let self = this
                Object.keys(self.callbacks).forEach(function(key) {
                    if (key != ignoreID) {
                        self.callbacks[key](self)
                        self.updateCallbacks()
                    }
                })
            }
        }
        
        return this
    }
    
    
    
    updateCallbacks() {
        let self = this
        Object.keys(self.callbacks).forEach(function(key) {
            self.callbacks[key](self)
        })
    }
    
    addCallback(key, func, perform) {
        this.callbacks[key] = func
        if (perform == true) {
            func(this)
        }
    }
    
    removeCallback(key) {
        delete this.callbacks[key]
    }
    
    
    string() {
        return `${this._value}`
    }
    
    number(_default) {
        try {
            if (this._value == null) { 
                return _default == null? 0 : _default
            }
            return parseFloat(this._value)
        } catch (error) {
            return _default == null? 0 : _default
        }
    }
    
    int(_default) {
        try {
            if (this._value == null) { 
                return _default == null? 0 : _default
            }
            return parseInt(this._value)
        } catch (error) {
            return _default == null? 0 : _default
        }
    }
    
    bool() {
        return this._value == "true" || this._value == "True" || this._value == "TRUE" || 
            this._value == "yes" || this._value == "1" || this._value == "Yes" || 
            this._value == "YES" || this._value == true || this._value == 1
    }

    toggle() {
        this.value(!this.bool())
    }


    isArray(_func) {
        let correntType = this._value instanceof Array
        
        if (_func != null) {
            if (correntType) {
                let retValue = _func()
                if (retValue != null) {
                    return retValue
                }
            } else {
                throw "State is not of type Array"
            }
            return this
        }
        
        return correntType
    }

    length() {
        return this.isArray(_ => {
            return this._value.length
        })
    }

    add(_item) {
        return this.isArray(_ => {
            this._value.push(_item)
            this.updateCallbacks()
        })
    }

    addAll(_items) {
        return this.isArray(_ => {
            for (let i = 0; i < _items.length; i++) {
                this._value.push(_items[i])
            }
            this.updateCallbacks()
        })
    }

    insert(_item, _index) {
        return this.isArray(_ => {
            for (let i = 0; i < _items.length; i++) {
                this._value.splice(_index, 0, _item)
            }
            this.updateCallbacks()
        })
    }

    remove(_value) {
        return this.isArray(_ => {
            let removedValue = this._value.splice(this._value.indexOf(_value), 1)
            this.updateCallbacks()
            return removedValue;
        })
    }

    removeAt(_index) {
        return this.isArray(_ => {
            let removedValue = this._value.splice(_index, 1)
            this.updateCallbacks()
            return removedValue;
        })
    }


    get(_index, _toIndex) {
        if (this.isArray() && this._value.length > 0) {
            if (_toIndex == null) {
                var start = _index
                while (start < 0) {
                    start += this._value.length;
                }
                return this._value[start]
            } else {
                if (_index < _toIndex) {
                    console.log("TODO")
                } else if (_index == _toIndex) {
                    console.log("TODO")
                } else {
                    console.log("TODO")
                }
                
            }
        }
        
        return null
    }
    
    
    true() {
        this.value(true)
        return this
    }

    false() {
        this.value(false)
        return this
    }
}


// states.alignment
class EclairAlignmentState extends EclairState {
    constructor() {
        super("center")
    }
    
    start() {this.value("start"); return this;}
    
    center() {this.value("center"); return this;}
    
    end() {this.value("end"); return this;}
}


// states.color

class EclairColor extends EclairState {
    constructor(_col) {
        super(_col)
        
        
        this._r = 0
        this._g = 0
        this._b = 0
        this._a = 0
    }
    
    hex(_hex) {
        let hex_map = {
            "0": 0, "1": 1, "2": 2, "3": 3, "4": 4, 
            "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, 
            "a": 10, "b": 11, "c": 12, "d": 13, "e": 14, "f": 15
        }
        
        var value = _hex
        if (value[0] == "#") {
            value = value.substring(1)
        }
        
        if (value.length == 3) {
            let r = hex_map[value[0].toLowerCase()]
            let g = hex_map[value[1].toLowerCase()]
            let b = hex_map[value[2].toLowerCase()]
            this.rgb(r * 17, g * 17, b * 17)
            
        } else if (value.length == 4) {
            let r = hex_map[value[0].toLowerCase()]
            let g = hex_map[value[1].toLowerCase()]
            let b = hex_map[value[2].toLowerCase()]
            let a = hex_map[value[3].toLowerCase()]
            this.rgb(r * 17, g * 17, b * 17, a / 15)
            
        } else if (value.length == 6) {
            let r1 = hex_map[value[0].toLowerCase()]
            let r2 = hex_map[value[1].toLowerCase()]
            let g1 = hex_map[value[2].toLowerCase()]
            let g2 = hex_map[value[3].toLowerCase()]
            let b1 = hex_map[value[4].toLowerCase()]
            let b2 = hex_map[value[5].toLowerCase()]
            this.rgb(r1 * 16 + r2, g1 * 16 + g2, b1 * 16 + b2)
         
        } else if (value.length == 8) {
            let r1 = hex_map[value[0].toLowerCase()]
            let r2 = hex_map[value[1].toLowerCase()]
            let g1 = hex_map[value[2].toLowerCase()]
            let g2 = hex_map[value[3].toLowerCase()]
            let b1 = hex_map[value[4].toLowerCase()]
            let b2 = hex_map[value[5].toLowerCase()]
            let a1 = hex_map[value[6].toLowerCase()]
            let a2 = hex_map[value[7].toLowerCase()]
            this.rgb(r1 * 16 + r2, g1 * 16 + g2, b1 * 16 + b2, (a1 * 16 + a1) / 255)
        }
        
        this.value(`#${value}`)
        return this;
    }
    
    rgb(r, g, b) {
        return this.rgba(r, g, b, 1)
    }
    
    rgba(r, g, b, a) {
        this.value(`rgb(${r}, ${g}, ${b}, ${a})`)
        
        this._r = r
        this._g = g
        this._b = b
        this._a = a
        
        return this;
    }   
    
    lighten(_val) {
        this._r = Math.min(255, this._r + _val)
        this._g = Math.min(255, this._g + _val)
        this._b = Math.min(255, this._b + _val)
        this.value(`rgb(${this._r}, ${this._g}, ${this._b}, ${this._a})`)
        
        return this;
    }
    
    darken(_val) {
        this._r = Math.max(0, this._r - _val)
        this._g = Math.max(0, this._g - _val)
        this._b = Math.max(0, this._b - _val)
        this.value(`rgb(${this._r}, ${this._g}, ${this._b}, ${this._a})`)
        
        return this;
    }
    

    
    aliceBlue() {return this.rgb(240, 248, 255)}
    antiqueWhite() {return this.rgb(250, 235, 215)}
    aqua() {return this.rgb(0, 255, 255)}
    aquamarine() {return this.rgb(127, 255, 212)}
    azure() {return this.rgb(240, 255, 255)}
    beige() {return this.rgb(245, 245, 220)}
    bisque() {return this.rgb(255, 228, 196)}
    black() {return this.rgb(0, 0, 0)}
    blanchedAlmond() {return this.rgb(255, 235, 205)}
    blue() {return this.rgb(0, 0, 255)}
    blueViolet() {return this.rgb(138, 43, 226)}
    brown() {return this.rgb(165, 42, 42)}
    burlyWood() {return this.rgb(222, 184, 135)}
    cadetBlue() {return this.rgb(95, 158, 160)}
    chartreuse() {return this.rgb(127, 255, 0)}
    chocolate() {return this.rgb(210, 105, 30)}
    coral() {return this.rgb(255, 127, 80)}
    cornflowerBlue() {return this.rgb(100, 149, 237)}
    cornsilk() {return this.rgb(255, 248, 220)}
    crimson() {return this.rgb(220, 20, 60)}
    cyan() {return this.rgb(0, 255, 255)}
    darkBlue() {return this.rgb(0, 0, 139)}
    darkCyan() {return this.rgb(0, 139, 139)}
    darkGoldenRod() {return this.rgb(184, 134, 11)}
    darkGray() {return this.rgb(169, 169, 169)}
    darkGrey() {return this.rgb(169, 169, 169)}
    darkGreen() {return this.rgb(0, 100, 0)}
    darkKhaki() {return this.rgb(189, 183, 107)}
    darkMagenta() {return this.rgb(139, 0, 139)}
    darkOliveGreen() {return this.rgb(85, 107, 47)}
    darkOrange() {return this.rgb(255, 140, 0)}
    darkOrchid() {return this.rgb(153, 50, 204)}
    darkRed() {return this.rgb(139, 0, 0)}
    darkSalmon() {return this.rgb(233, 150, 122)}
    darkSeaGreen() {return this.rgb(143, 188, 143)}
    darkSlateBlue() {return this.rgb(72, 61, 139)}
    darkSlateGray() {return this.rgb(47, 79, 79)}
    darkSlateGrey() {return this.rgb(47, 79, 79)}
    darkTurquoise() {return this.rgb(0, 206, 209)}
    darkViolet() {return this.rgb(148, 0, 211)}
    deepPink() {return this.rgb(255, 20, 147)}
    deepSkyBlue() {return this.rgb(0, 191, 255)}
    dimGray() {return this.rgb(105, 105, 105)}
    dimGrey() {return this.rgb(105, 105, 105)}
    dodgerBlue() {return this.rgb(30, 144, 255)}
    fireBrick() {return this.rgb(178, 34, 34)}
    floralWhite() {return this.rgb(255, 250, 240)}
    forestGreen() {return this.rgb(34, 139, 34)}
    fuchsia() {return this.rgb(255, 0, 255)}
    gainsboro() {return this.rgb(220, 220, 220)}
    ghostWhite() {return this.rgb(248, 248, 255)}
    gold() {return this.rgb(255, 215, 0)}
    goldenRod() {return this.rgb(218, 165, 32)}
    gray() {return this.rgb(128, 128, 128)}
    grey() {return this.rgb(128, 128, 128)}
    green() {return this.rgb(0, 128, 0)}
    greenYellow() {return this.rgb(173, 255, 47)}
    honeyDew() {return this.rgb(240, 255, 240)}
    hotPink() {return this.rgb(255, 105, 180)}
    indianRed () {return this.rgb(205, 92, 92)}
    indigo () {return this.rgb(75, 0, 130)}
    ivory() {return this.rgb(255, 255, 240)}
    khaki() {return this.rgb(240, 230, 140)}
    lavender() {return this.rgb(230, 230, 250)}
    lavenderBlush() {return this.rgb(255, 240, 245)}
    lawnGreen() {return this.rgb(124, 252, 0)}
    lemonChiffon() {return this.rgb(255, 250, 205)}
    lightBlue() {return this.rgb(173, 216, 230)}
    lightCoral() {return this.rgb(240, 128, 128)}
    lightCyan() {return this.rgb(224, 255, 255)}
    lightGoldenRodYellow() {return this.rgb(250, 250, 210)}
    lightGray() {return this.rgb(211, 211, 211)}
    lightGrey() {return this.rgb(211, 211, 211)}
    lightGreen() {return this.rgb(144, 238, 144)}
    lightPink() {return this.rgb(255, 182, 193)}
    lightSalmon() {return this.rgb(255, 160, 122)}
    lightSeaGreen() {return this.rgb(32, 178, 170)}
    lightSkyBlue() {return this.rgb(135, 206, 250)}
    lightSlateGray() {return this.rgb(119, 136, 153)}
    lightSlateGrey() {return this.rgb(119, 136, 153)}
    lightSteelBlue() {return this.rgb(176, 196, 222)}
    lightYellow() {return this.rgb(255, 255, 224)}
    lime() {return this.rgb(0, 255, 0)}
    limeGreen() {return this.rgb(50, 205, 50)}
    linen() {return this.rgb(250, 240, 230)}
    magenta() {return this.rgb(255, 0, 255)}
    maroon() {return this.rgb(128, 0, 0)}
    mediumAquaMarine() {return this.rgb(102, 205, 170)}
    mediumBlue() {return this.rgb(0, 0, 205)}
    mediumOrchid() {return this.rgb(186, 85, 211)}
    mediumPurple() {return this.rgb(147, 112, 219)}
    mediumSeaGreen() {return this.rgb(60, 179, 113)}
    mediumSlateBlue() {return this.rgb(123, 104, 238)}
    mediumSpringGreen() {return this.rgb(0, 250, 154)}
    mediumTurquoise() {return this.rgb(72, 209, 204)}
    mediumVioletRed() {return this.rgb(199, 21, 133)}
    midnightBlue() {return this.rgb(25, 25, 112)}
    mintCream() {return this.rgb(245, 255, 250)}
    mistyRose() {return this.rgb(255, 228, 225)}
    moccasin() {return this.rgb(255, 228, 181)}
    navajoWhite() {return this.rgb(255, 222, 173)}
    navy() {return this.rgb(0, 0, 128)}
    oldLace() {return this.rgb(253, 245, 230)}
    olive() {return this.rgb(128, 128, 0)}
    oliveDrab() {return this.rgb(107, 142, 35)}
    orange() {return this.rgb(255, 165, 0)}
    orangeRed() {return this.rgb(255, 69, 0)}
    orchid() {return this.rgb(218, 112, 214)}
    paleGoldenRod() {return this.rgb(238, 232, 170)}
    paleGreen() {return this.rgb(152, 251, 152)}
    paleTurquoise() {return this.rgb(175, 238, 238)}
    paleVioletRed() {return this.rgb(219, 112, 147)}
    papayaWhip() {return this.rgb(255, 239, 213)}
    peachPuff() {return this.rgb(255, 218, 185)}
    peru() {return this.rgb(205, 133, 63)}
    pink() {return this.rgb(255, 192, 203)}
    plum() {return this.rgb(221, 160, 221)}
    powderBlue() {return this.rgb(176, 224, 230)}
    purple() {return this.rgb(128, 0, 128)}
    rebeccaPurple() {return this.rgb(102, 51, 153)}
    red() {return this.rgb(255, 0, 0)}
    rosyBrown() {return this.rgb(188, 143, 143)}
    royalBlue() {return this.rgb(65, 105, 225)}
    saddleBrown() {return this.rgb(139, 69, 19)}
    salmon() {return this.rgb(250, 128, 114)}
    sandyBrown() {return this.rgb(244, 164, 96)}
    seaGreen() {return this.rgb(46, 139, 87)}
    seaShell() {return this.rgb(255, 245, 238)}
    sienna() {return this.rgb(160, 82, 45)}
    silver() {return this.rgb(192, 192, 192)}
    skyBlue() {return this.rgb(135, 206, 235)}
    slateBlue() {return this.rgb(106, 90, 205)}
    slateGray() {return this.rgb(112, 128, 144)}
    slateGrey() {return this.rgb(112, 128, 144)}
    snow() {return this.rgb(255, 250, 250)}
    springGreen() {return this.rgb(0, 255, 127)}
    steelBlue() {return this.rgb(70, 130, 180)}
    tan() {return this.rgb(210, 180, 140)}
    teal() {return this.rgb(0, 128, 128)}
    thistle() {return this.rgb(216, 191, 216)}
    tomato() {return this.rgb(255, 99, 71)}
    turquoise() {return this.rgb(64, 224, 208)}
    violet() {return this.rgb(238, 130, 238)}
    wheat() {return this.rgb(245, 222, 179)}
    white() {return this.rgb(255, 255, 255)}
    whiteSmoke() {return this.rgb(245, 245, 245)}
    yellow() {return this.rgb(255, 255, 0)}
    yellowGreen() {return this.rgb(154, 205, 50)}

    
    success() {return this.hex("d4edd9")}
    danger() {return this.hex("f8d7d9")}
    warning() {return this.hex("fff3cd")}
    info() {return this.hex("d1ecf1")}
    light() {return this.hex("efefef")}
    dark() {return this.hex("d5d8d9")}
}

// states.text-styles
class EclairTextStyleState extends EclairState {
    title() {this.value("title"); return this;}
    subtitle() {this.value("subtitle"); return this;}
    heading1() {this.value("heading1"); return this;}
    heading2() {this.value("heading2"); return this;}
    heading3() {this.value("heading3"); return this;}
    heading4() {this.value("heading4"); return this;}
}



// style.style
class EclairStylableObject {
    constructor() {
        this._styles = {}
        this._stylePrefix = "#"
    }
    
    _getStyleSheet(rule, selector) {
        if (rule == null) {rule = ""}
        if (selector == null) {selector = ""}
        
        if (!this._styles.hasOwnProperty(rule)) {this._styles[rule] = {}}
        if (!this._styles[rule].hasOwnProperty(selector)) {this._styles[rule][selector] = {}}
        
        return this._styles[rule][selector];
    }
    
    buildStyleObject(cssOnly) {
        if (cssOnly == null) {cssOnly = false}
        let self = this;
        let objectID = this.id()
        
        function jsonToCss(_json) {
            let styleCode = ""
            Object.keys(_json).forEach(function(selector) {
                let styleSheet = _json[selector];
                let styleSheetCode = '';

                Object.keys(_json[selector]).forEach(function(key) {
                    if (key != "css") {
                        let value = _json[selector][key]
                        styleSheetCode += `${key}:${value};` 
                    }
                });
                if (_json[selector].hasOwnProperty("css")) {
                    styleSheetCode += _json[selector]['css']
                }

                if (selector.length > 0) {
                    if (selector[0] != " ") {
                        selector = ":" + selector;
                    }
                }
                styleCode += `${self._stylePrefix}${objectID}${selector}{${styleSheetCode}}`;
            });
            
            return styleCode
        }
        
        let fullStyleCode = ""
        Object.keys(this._styles).forEach(function(rule) {
            if (rule == "") {
                fullStyleCode += jsonToCss(self._styles[rule])
            } else {
                fullStyleCode += rule + "{" + jsonToCss(self._styles[rule]) + "}"
            }
        });
        
        if (cssOnly) {
            return fullStyleCode
        }
        
        if (fullStyleCode.length == 0) {return null}
        
        let styleObject = document.createElement("style");
        styleObject.setAttribute("id", `${objectID}-css`)
        styleObject.innerHTML = fullStyleCode
        
        return styleObject;
    }
    
    updateCSSStyle() {
        let cssElement = document.getElementById(this.id() + "-css");
        let css = this.buildStyleObject(true);
        
        if (css.length > 0) {
            if (cssElement == null) {
                if (!(this instanceof EclairStyleComponent)) {
                    let newStyleObject = this.buildStyleObject()
                    if (newStyleObject != null) {
                        document.head.appendChild(newStyleObject)
                    }
                }
            } else {
                cssElement.innerHTML = css;
            }
        } else {
            if (cssElement != null) {
                cssElement.parentElement.removeChild(cssElement);
            }
        }
        
        return this;
    }
    
    _set(property, _style, _rule) {
        let selector = null
        let rule = null
        
        if (_rule != null) {
            if (_rule.hasOwnProperty("selector") || _rule.hasOwnProperty("rule")) {
                if (_rule.hasOwnProperty("selector")) {selector = _rule["selector"]}
                if (_rule.hasOwnProperty("rule")) {
                    rule = _rule["rule"]
                    if (rule == "darkmode") {rule = "@media (prefers-color-scheme: dark)"}
                }
            } else {
                selector = _rule
            }
        }
        
        this._getStyleSheet(rule, selector)[property] = _style; 
        
        if (_style instanceof EclairState) {
            let self = this
            _style.addCallback(this.id() + `-style-{property}`, function(state) {
                self._getStyleSheet(rule, selector)[property] = _style.string(); 
                self.updateCSSStyle()
            }, true)
        }
        
        return this.updateCSSStyle()
    }
    
    css(_style, rule) {return this._set("css", _style, rule)}
    display(_display, rule) {return this._set("display", _display, rule)}
    background(_background, rule) {return this._set("background", _background, rule)}
    backgroundColor(_color, rule) {return this._set("background-color", _color, rule)}
    backgroundSize(_color, rule) {return this._set("background-size", _color, rule)}
    borderSize(_size, rule) {return this._set("border-width", _size, rule)}
    borderColor(_color, rule) {return this._set("border-color", _color, rule)}
    borderStyle(_style, rule) {return this._set("border-style", _style, rule)}
    borderRadius(_radius, rule) {return this._set("border-radius", _radius, rule)}
    boxShadow(_radius, rule) {return this._set("box-shadow", _radius, rule)}
    padding(_size, rule) {return this._set("padding", _size, rule)}
    margin(_size, rule) {return this._set("margin", _size, rule)}
    marginTop(_size, rule) {return this._set("margin-top", _size, rule)}
    marginLeft(_size, rule) {return this._set("margin-left", _size, rule)}
    marginBottom(_size, rule) {return this._set("margin-bottom", _size, rule)}
    marginright(_size, rule) {return this._set("margin-right", _size, rule)}
    gap(_size, rule) {return this._set("gap", _size, rule)}
    font(_family, rule) {return this._set("font-family", _family, rule)}
    fontSize(_size, rule) {return this._set("font-size", _size, rule)}
    fontColor(_color, rule) {return this._set("color", _color, rule)}
    fontWeight(_weight, rule) {return this._set("font-weight", _weight, rule)}
    width(_width, rule) {return this._set("width", _width, rule)}
    maxWidth(_width, rule) {return this._set("max-width", _width, rule)}
    minWidth(_width, rule) {return this._set("min-width", _width, rule)}
    height(_height, rule) {return this._set("height", _height, rule)}
    maxHeight(_height, rule) {return this._set("max-height", _height, rule)}
    minHeight(_height, rule) {return this._set("min-height", _height, rule)}
    opacity(_opacity, rule) {return this._set("opacity", _opacity, rule)}
    textAlign(_align, rule) {return this._set("text-align", _align, rule)}
    verticalAlign(_align, rule) {return this._set("vertical-align", _align, rule)}
    position(_pos, rule) {return this._set("position", _pos, rule)}
    top(_top, rule) {return this._set("top", _top, rule)}
    bottom(_bottom, rule) {return this._set("bottom", _bottom, rule)}
    left(_left, rule) {return this._set("left", _left, rule)}
    right(_right, rule) {return this._set("right", _right, rule)}
    cursor(_value, rule) {return this._set("cursor", _value, rule)}
    textDecoration(_value, rule) {return this._set("text-decoration", _value, rule)}
    transition(_value, rule) {return this._set("transition", _value, rule)}
    userSelect(_value, rule) {return this._set("user-select", _value, rule)}
    boxSizing(_value, rule) {return this._set("box-sizing", _value, rule)}
    transform(_value, rule) {return this._set("transform", _value, rule)}
    justifyContent(_value, rule) {return this._set("justify-content", _value, rule)}
    outline(_value, rule) {return this._set("outline", _value, rule)}
    caretColor(_value, rule) {return this._set("caret-color", _value, rule)}
    resize(_value, rule) {return this._set("resize", _value, rule)}
    whiteSpace(_value, rule) {return this._set("white-space", _value, rule)}
    overflowWrap(_value, rule) {return this._set("overflow-wrap", _value, rule)}
    overflow(_value, rule) {return this._set("overflow", _value, rule)}
    overflowX(_value, rule) {return this._set("overflow-x", _value, rule)}
    overflowY(_value, rule) {return this._set("overflow-y", _value, rule)}
    lineHeight(_value, rule) {return this._set("line-height", _value, rule)}
    appearance(_value, rule) {return this._set("-webkit-appearance", _value, rule)._set("appearance", _value, rule)}
    
    flexDirection(_value, selector) {return this._set("flex-direction", _value, selector)}
    alignItems(_value, selector) {return this._set("align-items", _value, selector)}
}


class EclairStyleComponent extends EclairStylableObject {
    constructor(styleClassID) {
        super()
        this._id = styleClassID != null? styleClassID : eclair._newID()
        eclair._styles[this._id] = this
        
        this._stylePrefix = "."  // Use class not default id 
    }
    
    id() {
        return this._id;
    }
    
    create() {
        let elem = document.getElementById(this.id() + "-css")
        if (elem == null) {
            let newStyleObject = this.buildStyleObject()
            if (newStyleObject != null) {
                document.head.appendChild(newStyleObject)
            }
        }
    }
}


// style.defaults
eclair.styles = {
    View: eclair.Style("eclair-style-view")
        .boxSizing("border-box"),
    
    VStack: eclair.Style("eclair-style-vstack")
        .boxSizing("border-box")
        .display("flex")
        .flexDirection("column")
        .alignItems("center")
        .justifyContent("space-around"),
    
    HStack: eclair.Style("eclair-style-hstack")
        .boxSizing("border-box")
        .display("flex")
        .flexDirection("row")
        .alignItems("center")
        .justifyContent("space-around"),
    
    Form: eclair.Style("eclair-style-form")
        .boxSizing("border-box"),
    
    TabView: eclair.Style("eclair-style-tab-view")
        .display("flex")
        .boxSizing("border-box")
        .alignItems("center"),
    
    Text: eclair.Style("eclair-style-text")
        .font(eclair.theme.font),
    
    IFrame: eclair.Style("eclair-style-iframe")
        .borderColor("#333333")
        .borderSize("1px")
        .width("100%")
        .height("100%"),
    
    Button: eclair.Style("eclair-style-button")
        .borderSize("0px")
        .borderRadius("2px")
        .padding("8px 16px")
        .background("#eeeeee")
        .font(eclair.theme.font)
        .background("#dddddd", "hover")
        .background("#cccccc", "active"),
    
    Select: eclair.Style("eclair-style-select")
        .borderSize("0px")
        .borderRadius("2px")
        .padding("8px 16px")
        .background("#eeeeee")
        .font(eclair.theme.font)
        .background("#dddddd", "hover")
        .background("#cccccc", "active"),
    
    Slider: eclair.Style("eclair-style-slider")
        .transition("0.2s all")
        .css("-webkit-appearance: none; box-sizing: border-box; outline: none;")
        .appearance("none", ":-webkit-slider-thumb")
        .appearance("none", ":-moz-slider-thumb")
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
    
    Link: eclair.Style("eclair-style-link")
        .font(eclair.theme.font)   
        .fontColor(eclair.theme.accent)
        .textDecoration("none")
        .textDecoration("underline", "hover"),
    
    Image: eclair.Style("eclair-style-image")
        .display("block"),
    
    TextBox: eclair.Style("eclair-style-text-box")
        .fontSize("14px")
        .padding("12px 16px")
        .width("100%")
        .borderSize("0px")
        .borderRadius("3px")
        .background("#eeeeee")
        .font(eclair.theme.font)
        .background("#dddddd", "hover")
        .background("#cccccc", "active")
        .background("#bbbbbb", "focused"),
    
    TextArea: eclair.Style("eclair-style-text-area"),
    
    HorizontalLine: eclair.Style("eclair-style-horz-line")
        .borderSize("0px")
        .width("100%")
        .css("border-top: 1px solid #999999"),
    
    RadioButtons: eclair.Style("eclair-style-radio-button"), 
    RadioButtonsItem: eclair.Style("eclair-style-radio-buttons-item")
        .cursor("pointer")
        .boxShadow("0px 0px 0px 1000px rgba(0, 0, 0, 0.05) inset", "hover")
        .padding("12px")
        .borderRadius("4px")
        .width("100%")
        .userSelect("none")
        .justifyContent("flex-start")
        .gap("12px")
        .font(eclair.theme.font),
    RadioButtonsSelectedItem: eclair.Style("eclair-style-radio-buttons-selected-item"),
    RadioButtonsRadio: eclair.Style("eclair-style-radio-buttons-dot")
        .width("14px")
        .height("14px")
        .userSelect("none")
        .borderSize("2px")
        .borderStyle("solid")
        .borderColor(eclair.theme.accent)
        .borderRadius("100%"),
    RadioButtonsSelectedRadio: eclair.Style("eclair-style-radio-buttons-selected-dot")
        .background(eclair.theme.accent),
    RadioButtonsLabel: eclair.Style("eclair-style-label"),
    RadioButtonsSelectedLabel: eclair.Style("eclair-style-radio-buttons-selected-label"),
    
    CheckBox: eclair.Style("eclair-style-checkbox")    
        .cursor("pointer")
        .boxShadow("0px 0px 0px 100px rgba(0, 0, 0, 0.05) inset", "hover")
        .padding("2px")
        .borderRadius("4px")
        .width("100%")
        .transition("0.2s all")
        .userSelect("none")
        .font(eclair.theme.font),
    CheckBoxIcon: eclair.Style("eclair-style-checkbox-icon")
        .borderSize("2px")
        .borderRadius("4px")
        .borderColor(eclair.theme.accent)
        .borderStyle("solid")
        .width("16px")
        .height("16px")
        .fontSize("0.85rem")
        .userSelect("none")
        .textAlign("center"),        
    CheckBoxActiveIcon: eclair.Style("eclair-style-checkbox-active-icon")
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
    CheckBoxLabel: eclair.Style("eclair-style-checkbox-label"),
    
    ProgressBar: eclair.Style("eclair-style-progress-bar")
        .background("#d3d3d3")
        .borderRadius("3px")
        .height("16px")
        .userSelect("none")
        .overflow("hidden"),
    ProgressBarIndicator: eclair.Style("eclair-style-progress-bar")
        .display("flex")
        .flexDirection("row")
        .alignItems("center")
        .background(eclair.theme.accent)
        .height("100%")
        .transition("0.3s all")
        .userSelect("none")
        .margin("0px auto 0px 0px"),
    ProgressBarLabel: eclair.Style("eclair-style-progress-bar-label")
        .fontColor("white")
        .fontWeight(700)
        .userSelect("none")
        .fontSize("11px"),
    
    Toggle: eclair.Style("eclair-style-toggle")    
        .display("flex")
        .flexDirection("row")
        .alignItems("center")
        .position("relative")
        .width("50px")
        .background("#dddddd")
        .padding("3px")
        .cursor("pointer")
        .userSelect("none")
        .borderRadius("20px")
        .transition("0.2s all")
        .boxSizing("border-box"),
    ToggleKnob: eclair.Style("eclair-style-toggle-knob")
        .height("14px")
        .width("14px")
        .background("#ffffff")
        .transform("translateX(0%)")
        .transition("0.2s all")
        .userSelect("none")
        .borderRadius("20px"),
    ToggleTick: eclair.Style("eclair-style-toggle-tick")
        .position("absolute")
        .fontColor("#ffffff")
        .left("35%")
        .transition("0.2s all")
        .transform("translateX(-50%)")
        .fontWeight(700)
        .userSelect("none")
        .opacity(0),
    
    SyntaxHighlighter: eclair.Style("eclair-syntax-highlighter")
        .position("relative")
        .width("420px")
        .height("360px")
        .borderSize("1px")
        .borderStyle("solid")
        .borderColor("#999999")
        .borderRadius("3px"),
    SyntaxHighlighterCodeElement: eclair.Style("eclair-syntax-highlighter-code")
        .position("absolute")
        .top("0px")
        .left("0px")
        .width("100%")
        .height("100%")
        .fontSize("14px")
        .font("monospace")
        .borderSize("0px")
        .outline("none")
        .caretColor("black")
        .resize("none")
        .whiteSpace("pre")
        .boxSizing("border-box")
        .padding("10px")
        .overflowWrap("normal")
        .display("none", ":-webkit-scrollbar")
        .css("-ms-overflow-style: none; scrollbar-width: none;")
        .overflowX("scroll"),
    SyntaxHighlighterTextAreaElement: eclair.Style("eclair-syntax-highlighter-text-area")
        .position("absolute")
        .top("0px")
        .left("0px")
        .width("100%")
        .height("100%")
        .fontSize("14px")
        .font("monospace")
        .borderSize("0px")
        .outline("none")
        .caretColor("black")
        .resize("none")
        .whiteSpace("pre")
        .boxSizing("border-box")
        .background("transparent")
        .fontColor("rgb(1, 1, 1, 0)")
        .padding("10px")
        .overflowWrap("normal")
        .overflowX("scroll"),
    SyntaxHighlighterCommentStyle: eclair.Style("eclair-syntax-highlighter-comment").fontColor("grey"),
    SyntaxHighlighterKeywordStyle: eclair.Style("eclair-syntax-highlighter-keyword").fontColor("#0066ee"),
    SyntaxHighlighterStringStyle: eclair.Style("eclair-syntax-highlighter-string").fontColor("#dd9900"),
    SyntaxHighlighterQuoteStyle: eclair.Style("eclair-syntax-highlighter-quote").fontColor("#dd9900"),
    SyntaxHighlighterEclairStyle: eclair.Style("eclair-syntax-highlighter-eclair").fontColor("#009900"),
    
    AlertBox: eclair.Style("eclair-style-alert-box")
        .background(eclair.theme.accent)
        .boxSizing("border-box")
        .borderRadius(".25rem")
        .padding(".75rem 1.25rem")
        .boxShadow("0px 0px 0px 2px rgba(0, 0, 0, 0.2) inset")
        .borderSize("1px 0px 0px 0px", " hr")
        .margin(".75rem 0px", " hr")
        .borderColor("rgba(0, 0, 0, 0.2)", " hr"),
    AlertBoxTitle: eclair.Style("eclair-style-alert-title")
        .fontWeight(500)
        .fontSize("1.5rem")
        .display("none")
        .fontColor("rgba(0, 0, 0, 0.6)")
        .width("100%")
        .marginBottom(".5rem"),
    AlertBoxText: eclair.Style("eclair-style-alert-text")
        .fontColor("rgba(0, 0, 0, 0.6)"),
}



// elements.component
class EclairComponent extends EclairStylableObject {
    constructor() {
        super()
        
        this._id = eclair._newID();
        eclair._elements[this.id()] = this;
        
        this.parent = null
        this.children = []
        
        this._callbacks = {}
        this.sharedStyles = []
        this.attributes = {id: this.id()}
        this.stateBindings = {}
        
        this._hidden = false
        this._hiddenStyle = "inline"
        
        this._buildStyle = true
    }
    
    
    id() {return this._id;}
    
    write() {
        document.write(this.compile())
        return this
    }
    
    to(elemID) {
        document.getElementById(elemID).innerHTML = this.compile();
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
        if (elem != null) {
            return elem.getAttribute(key);
        }
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
            let className = sharedClass instanceof EclairStyleComponent? sharedClass.id() : sharedClass;
  
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
            
            let elem = this.getElement()
            if (elem != null) {
                if (eclair._styles.hasOwnProperty(className)) {
                    eclair._styles[className].create()
                }
            }
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
    
    hide() {
        if (!this._hidden) {
            this._hidden = true
            this.getElement(e => {
                this._hiddenStyle = window.getComputedStyle(e, null).display
            })
            this.display("none")
        }
    }
    
    show() {
        this.display(this._hiddenStyle)
    }
    
    bindState(state, stateBindingID, onCallback, valueCallback) {
        if (state instanceof EclairState) {
            if (this.stateBindings.hasOwnProperty(stateBindingID)) {
                this.stateBindings[stateBindingID].removeCallback(this.id())
            }
            
            this.stateBindings[stateBindingID] = state
            
            state.addCallback(this.id(), function(state) {
                let value = (valueCallback == null)? state.value() : valueCallback(state)
                onCallback(value)
            }, true)
        } else {
            onCallback(state)
        }
    }
    
    build() {
        throw "Build function not implemented"
    }
    
    compile() {       
        let wrapperElement = document.createElement("div")
        wrapperElement.innerHTML = this.build();
        let element = wrapperElement.children[0]
        
        
        let classes = this.getAttr("class")
        if (classes != null) {
            classes = classes.split(" ")
            for (let c = 0; c < classes.length; c++) {
                if (eclair._styles.hasOwnProperty(classes[c])) {
                    eclair._styles[classes[c]].create()
                }
            }
        }
        
        let self = this;
        Object.keys(this.attributes).forEach(function(key) {
            element.setAttribute(key, self.attributes[key])
        });
                
        if (this._buildStyle) {
            let buildStyle = this.buildStyleObject();
            if (buildStyle != null && document.getElementById(buildStyle.getAttribute("id")) == null) {
                document.head.appendChild(buildStyle)
            }
        }
        
        return wrapperElement.innerHTML
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
    
    performCallback(eventID, event, param) {
        if (this._callbacks.hasOwnProperty(eventID)) {
            this._callbacks[eventID](this, event, param);
        }
    }
    
    _addChild(item) {
        this.children.push(item)
        item.parent = this
        return item
    }
    
    child(n, callback) {
        let item = n < this.children.length && n >= 0? this.children[n] : null
        callback(item)
        return this
    }
    
    _updateCallback(callbackKey, callback) {
        this._callbacks[callbackKey] = callback;
        
        if (callback == null) {
            this.setAttr(callbackKey.toLowerCase(), null)
        } else {
            this.setAttr(callbackKey.toLowerCase(), `eclair.performCallback("${this.id()}", "${callbackKey}", event)`)
        }
        return this;
    }
}

// elements.custom-tag
class EclairCustomTagComponent extends EclairComponent {
    constructor(tag) {
        super(tag)
        
        this.tag = tag;
        this._innerHTML = "";
    }
    
    innerHTML(_html) {
        this.bindState(_html, "html", value => {
            this._innerHTML = value;
            this.getElement(e => {
                e.innerHTML = value
            })
        })
        return this;
    }
    
    build() {
        return `<${this.tag}>${this._innerHTML}</${this.tag}>`
    }
}


// elements.layout.view
class EclairView extends EclairComponent {
    constructor(elements, creatorFunc) {
        super("view")
        
        this._elementTag = "div"
        
        this.creatorFunc = (creatorFunc != null)? creatorFunc : (e) => {return e}
        
        let self = this;
        this.items = elements instanceof Array? Ø(elements) : elements
        
        let knownItems = []
        
        if (this.items instanceof EclairState && this.items.isArray()) {
            this.bindState(elements, "element", array => {
                var itemChanges = self._itemChanges(knownItems, array)
                
                let dummyParent = document.createElement("div")
                
                for (let i = 0; i < itemChanges.length; i++) {
                    if (itemChanges[i] == -1) {
                        let newItem = self._addChild(self.creatorFunc(array[i]))
                        
                        let dummychild = document.createElement("div")
                        dummychild.innerHTML = newItem.compile()
                        dummyParent.appendChild(dummychild.childNodes[0])
                    } else {
                        let itemIndexValue = itemChanges[i]
                        
                        dummyParent.appendChild(
                            self.getElement().childNodes[itemIndexValue]
                        );
                        itemChanges[i] = -1
                        
                        for (let j = 0; j < itemChanges.length; j++) {
                            if (itemChanges[j] >= itemIndexValue) {
                                itemChanges[j] -= 1
                            }
                        }
                    }
                }
                
                
                self.getElement(e => {
                    while (dummyParent.firstChild) {
                        e.appendChild(dummyParent.childNodes[0])
                    }
                })
                
                knownItems = []
                for (let i = 0; i < array.length; i++) {knownItems.push(array[i])}
                
                this._onItemsChanged()
            })
        }
        
        this.addStyle(eclair.styles.View)
    }
    
    
    _itemChanges(oldItems, newItems) {
        var resultantMap = []

        for (let i = 0; i < newItems.length; i++) {
            var positionChange = -1
            for (let j = 0; j < oldItems.length; j++) {
                if (oldItems[j] == newItems[i]) {
                    positionChange = j
                    break
                }
            }
            resultantMap.push(positionChange)
        }

        return resultantMap
    }
    
    _onItemsChanged() {}
    
    
    build () {                
        let code = ""
        for (let e = 0; e < this.children.length; e++) {
            let child = this.children[e];
            
            if (child instanceof EclairComponent) {
                code += child.compile();
            }

            else if (typeof(child) == "string") { 
                code += child
            } 
            
            else {
                throw `Unable to compile object type: ${typeof(child)}`
            }
        }
        
        return `<${this._elementTag}>` + code + `</${this._elementTag}>`;
    }
}

// elements.layout.vstack
class EclairVStack extends EclairView {
    constructor(elems, creatorFunc) {
        super(elems, creatorFunc)
        
        this.removeStyle(eclair.styles.View)
        this.addStyle(eclair.styles.VStack)
    }
    
    alignment(_alignment) {
        this.bindState(_alignment, "alignment", value => {
            if (value == "start") {
                this.alignItems("flex-start")
            } 
            else if (value == "center") {
                this.alignItems("center")
            }
            else if (value == "end") {
                this.alignItems("flex-end")
            }
            else if (value == "stretch") {
                this.alignItems("stretch")
            } else {
                throw "Unknown alignment"
            }
        })  
        
        return this
    }
}

// elements.layout.hstack
class EclairHStack extends EclairView {
    constructor(elements, creatorFunc) {
        super(elements, creatorFunc)
        
        this.removeStyle(eclair.styles.View)
        this.addStyle(eclair.styles.HStack)
    }
    
    alignment(_alignment) {
        this.bindState(_alignment, "alignment", value => {
            if (value == "start") {
                this.alignItems("flex-start")
            } 
            else if (value == "center") {
                this.alignItems("center")
            }
            else if (value == "end") {
                this.alignItems("flex-end")
            }
            else if (value == "stretch") {
                this.alignItems("stretch")
            } else {
                throw "Unknown alignment"
            }
        })  
        
        return this
    }
}

// elements.layout.tabs
class EclairTabView extends EclairView {
    constructor(_selectedView, elements) {
        super(elements)
        
        if (_selectedView instanceof EclairState) {
            this.bindState(_selectedView, "tab", value => {
                for (let e = 0; e < this.children.length; e++) {
                    this.children[e].display(value == e? "flex": "none")
                }
            }, state => {return state.int(0)})
        } else {
            throw "First parameter of Eclair TabView's must be an Eclair State"
        }
        
        
        this.removeStyle(eclair.styles.View)
        this.addStyle(eclair.styles.TabView)
    }
}







// elements.custom.alert-box
class EclairAlertBox extends EclairComponent {
    constructor(text) {
        super()
        
        this._titleText = Ø(null)
        
        this._text = this._addChild(eclair.Text(text))
        this._title = this._addChild(eclair.Text(this._titleText))
        
        this.addStyle(eclair.styles.AlertBox)
        this._title.addStyle(eclair.styles.AlertBoxTitle)
        this._text.addStyle(eclair.styles.AlertBoxText)
    }
    
    theme(_color) {
        this.bindState(_color, "color", value => {
            this.background(value)
        })
        
        return this
    }
        
    title(_text) {        
        this.bindState(_text, "title", value => {
            this._titleText.value(value)
            
            let hideTitle = value == null || value.trim().length == 0
            this._title.display(hideTitle? "none": "block")
        })
        
        return this
    }
    
    build() {
        return `<div>${this._title.compile()}${this._text.compile()}</div>`
    }
}

// elements.custom.progress
class EclairProgressBar extends EclairComponent {
    constructor(_progress) {
        super()
        
        this._labelText = Ø("0%")
        this._label = eclair.Text(this._labelText)
        this._indicator = this._addChild(eclair.HStack([this._label]))
        
        this.bindState(_progress, "progress", value => {
            _progress = Math.max(Math.min(value, 1), 0)
            this._progress = value;
            this._labelText.value(Math.round(value * 100) + "%")
            this._indicator.width((value * 100 + 0.0001) + "%")
        }, state => {return state.number(0.5)})
        
        this._label.addStyle(eclair.styles.ProgressBarLabel)
        this._indicator.addStyle(eclair.styles.ProgressBarIndicator)
        this.addStyle(eclair.styles.ProgressBar)
    }
    
    striped(_on) {
        this.bindState(_on, "color", value => {
            if (value) {
                this._indicator
                    .backgroundSize("1rem 1rem")
                    .css("background-image: linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)");
            } else {
                this._indicator
                    .backgroundSize("1rem 1rem")
                    .css("background-image: ;");
            }
            this._indicator.updateCSSStyle()
        }, state => {return state.bool()})
        
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
        this._indicator.backgroundColor(_color)
        return this
    }
    
    showLabel(_show) {
        this.bindState(_show, "label", value => {
            this._label.opacity(value? "1":"0")
        }, state => {return state.bool()});
        
        return this
    }
    
    build() {
        return `<div>${this._indicator.compile()}</div>`
    }
}

// elements.custom.syntax-highlighter
class EclairSyntaxHighlighter extends EclairComponent {
    constructor(_code) {
        super()
        
        this.tokenSeperators = new Set([
            "{", "(", " ", "}", ")", "[", "]", "\n", "\t", ".", ","
        ])
        this.eclairKeywords = new Set([
            "VStack", "HStack", "State", "Toggle", "Text", "HorizontalLine", "Alignment", "eclair", 
            "Ø", "Style", "Color", "TextStyle", "View", "TabView", "CustomTagComponent", "Button", 
            "TextBox", "Form", "Select", "Slider", "RadioButtons", "CheckBox", "TextArea", 
            "HiddenInput", "Image", "IFrame", "Text", "Link", "HorizontalLine", "Alert", 
            "ProgressBar", "SyntaxHighlighter"
        ])
        this.jsKeywords = new Set([
            "let", "var", "if", "else", "true", "false", "const", "for", "while", "await", "break", 
            "case", "catch", "class", "continue", "debugger", "default", "delete", "do", "enum", 
            "export", "extends", "finally", "function", "implements", "import", "in", "instanceof", 
            "interface", "new", "null", "package", "private", "protected", "public", "return", 
            "super", "switch", "static", "this", "throw", "try", "typeof", "void", "while", 
            "with", "yield"
        ])
         	 	 	
        this.theme = {
            "comment": eclair.styles.SyntaxHighlighterCommentStyle,
            "keyword": eclair.styles.SyntaxHighlighterKeywordStyle,
            "eclair": eclair.styles.SyntaxHighlighterEclairStyle,
            "string": eclair.styles.SyntaxHighlighterStringStyle, 
            "quote": eclair.styles.SyntaxHighlighterQuoteStyle, 
            "number": eclair.styles.SyntaxHighlighterKeywordStyle, 
        }
        
        this._cachedLines = {}
        this._codeState = (_code instanceof EclairState)? _code : Ø(_code)
        
        this.codeElement = this._addChild(eclair.CustomTagComponent("code")
            .addStyle(eclair.styles.SyntaxHighlighterCodeElement)
         )
        
        this.textArea = this._addChild(eclair.TextArea(this._codeState)
            .addStyle(eclair.styles.SyntaxHighlighterTextAreaElement)
            .setAttr("spellcheck", "false")
            .onScroll((e, ev) => {
                let textarea = e.getElement()
                this.codeElement.getElement().scroll(textarea.scrollLeft, textarea.scrollTop)
            })
        )
        
        this.addStyle(eclair.styles.SyntaxHighlighter)
        
        this.bindState(this._codeState, "code", value => {
            this.update()
        })
    }
    
    update() {
        let code = this._codeState.value();
        
        let output = "";
        let tokenisedLines = []

        let lines = code.split("\n")
        let allLines = new Set(lines)
        for (let l = 0; l < lines.length; l++) {
            if (!this._cachedLines.hasOwnProperty(lines[l])) {
                this._cachedLines[lines[l]] = this._tokeniseLine(lines[l])
            }
            tokenisedLines.push(this._cachedLines[lines[l]])
        }
        
        let cachedKeys = Object.keys(this._cachedLines)
        for (let i = 0; i < cachedKeys.length; i++) {
            if (!allLines.has(cachedKeys[i])) {
                delete this._cachedLines[cachedKeys[i]]
            }
        }

        let formattedCode = ""
        for (let l = 0; l < tokenisedLines.length; l++) {
            let cline = tokenisedLines[l];
            for (let t = 0; t < cline.length; t++) {
                formattedCode += `<span class='${(cline[t].type != '')? this.theme[cline[t].type].id():""}'>${cline[t].text}</span>`
            }
            formattedCode += "<br/>"
        }

        
        this.codeElement.innerHTML(`<pre style="margin: 0px; padding: 0px;">${formattedCode}</pre>`)
        
        return this
    }
    
    _tokeniseLine(line) {
        let tokens = [], token = "", state = ""

        let self = this;
        function pushTokenState(_text, _state) {
            if (state == "") {
                if (self.jsKeywords.has(_text)) {_state = "keyword"}
                if (self.eclairKeywords.has(_text)) {_state = "eclair"}
                if (!isNaN(parseFloat(_text))) {_state = "number"}
            }

            tokens.push({"text": _text, "type": _state})
            state = "", token = ""
        }

        for (let c = 0; c < line.length; c++) {
            if (state == "comment") {token += line[c]} 

            else if (state != "comment" && c < line.length - 1 && line[c] == "/" && line[c + 1] == "/") {
                pushTokenState(token, state); state = "comment"; token = line[c]
            } 

            else if (state != "quote" && state != "string" && line[c] == "'") {
                pushTokenState(token, state)
                state = "quote"; token = line[c]
            } 

            else if (state == "quote" && line[c] == "'") {pushTokenState(token + "'", state)} 

            else if (state == "string" && line[c] == '"') {pushTokenState(token + '"', state)} 

            else if (state != "string" && state != "quote" && line[c] == '"') {pushTokenState(token, state); state = "string"; token = line[c]} 

            else if (state != "string" && state != "quote" && this.tokenSeperators.has(line[c])) {
                pushTokenState(token, state)
                token = line[c]
            }

            else {
                if (this.tokenSeperators.has(token)) {
                    pushTokenState(token, state)
                }
                token += line[c]
            }
        }
        
        pushTokenState(token, state)

        return tokens
    }
    
    build() {
        let classes = Object.keys(this.theme);
        for (let i = 0; i < classes.length; i++) {
            this.theme[classes[i]].create()
        }
        return `<div>${this.codeElement.compile()}${this.textArea.compile()}</div>`
    }
}





// elements.form.button
class EclairButton extends EclairComponent {
    constructor(text) {
        super()
        
        this.bindState(text, "text", value => {
            this.text = value;
            this.getElement(elem => {elem.innerHTML = value;});
        })
        
        this.setAttr("type", "button")
        this.addStyle(eclair.styles.Button)
    }
    
    build() {
        let text = this.text;
        if (text == null) {
            text = "Button"
        }
        
        if (text instanceof EclairComponent) {
            text = text.compile()
        } 
        return `<button>${this.text}</button>`
    }
}

// elements.form.checkbox
class EclairCheckBox extends EclairComponent {
    constructor(checked) {
        super()
        
        this._enabled = true        
        
        this.checked = checked instanceof EclairState? checked : Ø(checked)  // Parent one given by user
        this._hiddenValue = Ø(false)  // Private one which is updated in the .checked callback
        this._textValue = Ø("")  // Text value which is the message displayed alongside
        
        this._label = this._addChild(eclair.Text(this._textValue))
        this._checkbox = this._addChild(eclair.CustomTagComponent("div"))
        this._hidden = this._addChild(eclair.HiddenInput(this._hiddenValue))
        
        let self = this
        this.overrideOnClick = null
        this._updateCallback("onClick", (e, ev) => {
            if (this._enabled) {   
                this.checked.value(!this.checked.bool())
            }  
            if (this.overrideOnClick != null) {this.overrideOnClick(this, ev)}
        })
        
        this.bindState(this.checked, "checked", value => {
            this._hiddenValue.value(value)
            
            if (value) {
                this._checkbox
                    .addStyle(eclair.styles.CheckBoxActiveIcon)
                    .removeStyle(eclair.styles.CheckBoxIcon)
                    .innerHTML("✓")
            } else {
                this._checkbox
                    .addStyle(eclair.styles.CheckBoxIcon)
                    .removeStyle(eclair.styles.CheckBoxActiveIcon)
                    .innerHTML("")
            }
        }, state => {return state.bool()})
        
        this.setAttr("cellpadding", 6)   
        this.addStyle(eclair.styles.CheckBox)  
        this._label.addStyle(eclair.styles.CheckBoxLabel)
        this._checkbox.addStyle(eclair.styles.CheckBoxIcon)
    }
    
    checkbox(callback) {
        callback(this._checkbox)
        return this;
    }
    
    label(callback) {
        callback(this._label)
        return this;
    }
    
    text(_text) {
        this.bindState(_text, "text", value => {
            this._textValue.value(value)
        });
        return this;
    }
        
    onClick(callback) {
        this.overrideOnClick = callback;
        return this;
    }
    
    name(_name) {
        this._hidden.name(_name)
        return this;
    }
        
    enabled(_enabled) {
        this.bindState(_enabled, "enabled", value => {
            this.opacity(value ? "1":"0.6")
            this._enabled = value
        }, state => {return state.bool()});
        
        return this
    }
    
    build() {
        return `<table><tr><td width=1>${this._checkbox.compile()}</td><td>${this._label.compile()}</td></tr></table>${this._hidden.compile()}`
    }
}

// elements.form.form
class EclairForm extends EclairView {
    constructor(elements, objectFunc) {
        super(elements, objectFunc)
        
        this._elementTag = "form"
        
        this.addStyle(eclair.styles.Form)
            .removeStyle(eclair.styles.View)
            .setAttr("method", "POST")
            .setAttr("action", null)
    }
    
    method(_method) {
        this.bindState(_method, "method", value => {
            this.setAttr("method", value)
        })
        return this;
    }
    
    action(_action) {
        this.bindState(_action, "action", value => {
            this.setAttr("action", value)
        })
        return this;
    }
    
    submit(state) {
        this.bindState(state, "submit", value => {
            this.getElement(e => {
                e.submit();
            })
        }, state => {return state.bool()})
    }
}


// elements.form.hidden
class EclairHiddenInput extends EclairCustomTagComponent {
    constructor(_value) {
        super("input")
        this.setAttr("type", "hidden")
        
        this._buildStyle = false

        this.bindState(_value, "value", value => {
            this.setAttr("value", value)
            this.getElement(e => {e.value = value})
        })
    }
    
    name(_name) {
        this.bindState(_name, "name", value => {
            this.setAttr("name", value)
        })
        
        return this
    }
}

// elements.form.radio-buttons
class EclairRadioButtons extends EclairComponent {
    constructor(_options) {
        super()
        
        this._options = _options instanceof EclairState? _options : Ø(_options)
        this._selectedIndex = -1
        this._selectedValue = State("")
        
        this.customStyles = {
            "itemStyle": eclair.Style(),
            "radioStyle": eclair.Style(),
            "labelStyle": eclair.Style(),
            "selectedItemStyle": eclair.Style(),
            "selectedRadioStyle": eclair.Style(),
            "selectedLabelStyle": eclair.Style(),
        }
        
        let self = this
        this._hidden = this._addChild(eclair.HiddenInput(this._selectedValue))
        this._view = this._addChild(eclair.VStack(_options, item => {
            return new EclairRatioItem(item, this.customStyles)
                .onClick((e, ev) => {
                    let newIndex = this._updateSelectedItemStyles(item)
                    
                    this._selectedValue.value(item, self)
                    this._selectedIndex = newIndex;
                
                    if (self.stateBindings.hasOwnProperty("index")) {self.stateBindings["index"].value(newIndex, self)}
                    if (self.stateBindings.hasOwnProperty("value")) {self.stateBindings["value"].value(item, self)}
                })
        }))
        
        this.addStyle(eclair.styles.RadioButtons)
    }
    
    _updateSelectedItemStyles(selectedValue) {
        let newIndex = -1;
        for (let i = 0; i < this._options.length(); i++) {
            let match = this._options.get(i) == selectedValue
            this._view.child(i, el => {
                el.selected(match)
            })
            if (match) {newIndex = i;}
        }
        
        return newIndex;
    }
    
    name(_name) {
        this._hidden.name(_name)
        return this;
    }
    
    value(_value) {
        this.bindState(_value, "value", value => {
            if (value != this._selectedValue.value()) {
                let newIndex = this._updateSelectedItemStyles(value)
                
                this._selectedIndex = newIndex;
                this._selectedValue.value(value, self)
                
                if (this.stateBindings.hasOwnProperty("index")) {this.stateBindings["index"].value(newIndex, this)}
            }
        })
        
        return this
    }
    
    selectedIndex(_index) {
        this.bindState(_index, "index", value => {
            if (value != this._selectedIndex) {
                let newValue = ""
                for (let i = 0; i < this._options.length(); i++) {
                    let match = i == value

                    this._view.children[i].selected(match)
                    if (match) {newValue = this._options.get(i);}
                }
                
                this._selectedIndex = value;
                this._selectedValue.value(newValue, self)
                
                if (this.stateBindings.hasOwnProperty("value")) {this.stateBindings["value"].value(newValue, this)}
            }
        }, state => {return state.int(0)})
        
        return this
    }
    
    itemStyle(callback) {
        callback(this.customStyles.itemStyle)
        return this           
    }
         
    radioStyle(callback) {
        callback(this.customStyles.radioStyle)
        return this           
    }
     
    labelStyle(callback) {
        callback(this.customStyles.labelStyle)
        return this           
    }
          
    selectedItemStyle(callback) {
        callback(this.customStyles.selectedItemStyle)
        return this           
    }
    
    selectedRadioStyle(callback) {
        callback(this.customStyles.selectedRadioStyle)
        return this           
    }
    
    selectedLabelStyle(callback) {
        callback(this.customStyles.selectedLabelStyle)
        return this           
    }
    
    build() {         
        return `<div>${this._hidden.compile()}${this._view.compile()}</div>`
    }
}


class EclairRatioItem extends EclairHStack {
    constructor(_text, customStyles) {
        super([
            eclair.CustomTagComponent("div")
                .addStyle(eclair.styles.RadioButtonsRadio)
                .addStyle(customStyles.radioStyle),
            eclair.Text(_text)
                .addStyle(eclair.styles.RadioButtonsLabel)
                .addStyle(customStyles.labelStyle)
        ])
        
        this.value = _text
        this.addStyle(eclair.styles.RadioButtonsItem)
            .addStyle(customStyles.itemStyle)
        
        this.customStyles = customStyles
    }
    
    selected(value) {
        if (value) {
            this.addStyle(eclair.styles.RadioButtonsSelectedItem)
                .addStyle(this.customStyles.selectedItemStyle)
                .child(0, radio => {
                    radio.addStyle(eclair.styles.RadioButtonsSelectedRadio)
                        .addStyle(this.customStyles.selectedRadioStyle)
                })
                .child(1, label => {
                    label.addStyle(eclair.styles.RadioButtonsSelectedLabel)
                        .addStyle(this.customStyles.selectedLabelStyle)
                })
        } else {
            this.removeStyle(eclair.styles.RadioButtonsSelectedItem)
                .removeStyle(this.customStyles.selectedItemStyle)
                .child(0, radio => {
                    radio.removeStyle(eclair.styles.RadioButtonsSelectedRadio)
                        .removeStyle(this.customStyles.selectedRadioStyle)
                })
                .child(1, label => {
                    label.removeStyle(eclair.styles.RadioButtonsSelectedLabel)
                        .removeStyle(this.customStyles.selectedLabelStyle)
                })
        }
    }
}


// elements.form.select
class EclairSelect extends EclairView {
    constructor(elements) {
        super(elements, item => {
            return eclair.CustomTagComponent("option").innerHTML(item)
        })
        
        this._selectedIndex = 0
        this._selectedValue = null
        
        this.overrideOnChangeCallback = null
        this._updateCallback("onChange", (select, ev) => {
            this._updateSelected(select.selectedIndex, select.value)
            if (this.overrideOnChangeCallback != null) {this.overrideOnChangeCallback(this, ev)}
        })
        
        this.addStyle(eclair.styles.Select)
            .removeStyle(eclair.styles.View)
    }
    
    
    onChange(callback) {
        this.overrideOnChangeCallback = callback
        return this;
    }
    
    value(_value) {
        this.bindState(_value, "value", value => {
            if (value != this._selectedValue) {
                this._selectedValue = value
                
                let newIndex = -1
                for (let i = 0; i < this.items.length(); i++) {
                    if (this.items.get(i) == value) {
                        newIndex = i; break
                    }
                }
                if (newIndex != this.selectedIndex) {
                    this.selectedIndex = newIndex
                    if (this.stateBindings.hasOwnProperty("index")) {this.stateBindings["index"].value(i, this)}
                }
                
                this.getElement(elem => {elem.value = value})
                
                if (this.overrideOnChangeCallback != null) {this.overrideOnChangeCallback(this)}
            }
        })
        
        return this
    }
    
    selectedIndex(_index) {
        this.bindState(_index, "index", value => {
            if (value != this._selectedIndex) {
                this._selectedIndex = value
                
                let newValue = ""
                if (value < this.items.length() && value >= 0) {
                    newValue = this.itens.get(value)
                }
                
                if (newValue != this._selectedValue) {
                    this._selectedValue = newValue
                    if (this.stateBindings.hasOwnProperty("value")) {this.stateBindings["value"].value(i, this)}
                }
                
                this.getElement(elem => {elem.selectedIndex = value})
                
                if (this.overrideOnChangeCallback != null) {this.overrideOnChangeCallback(this)}
            }
        }, state => {return state.int()})
        
        return this
    }
    
    _updateSelected(_index, _value) {
        if (_index != this._selectedIndex) {
            this._selectedIndex = _index
            
            if (this.stateBindings.hasOwnProperty("index")) {
                this.stateBindings["index"].value(select.selectedIndex, this)
            }
        }
        if (_value != this._selectedValue) {
            this._selectedValue= _value
            
            if (this.stateBindings.hasOwnProperty("value")) {
                this.stateBindings["value"].value(select.value, this)
            }
        }
    }
    
    _onItemsChanged() {
        let newIndex = 0
        let newValue = null
        
        if (this.items.length() > 0) {
            newIndex = 0
            newValue = this.items.get(0)
            
            this.getElement(e => {
                for (let i = 1; i < this.items.length(); i++) {
                    if (i == e.selectedIndex) {
                        newIndex = i
                        newValue = this.items.get(i)
                    }
                }
            })
        } 
        
        this._updateSelected(newIndex, newValue)
        
        if (this.overrideOnChangeCallback != null) {this.overrideOnChangeCallback(this)}
    }
    
    build () {                
        let code = ""
        for (let e = 0; e < this.children.length; e++) {
            let child = this.children[e]
            if (e == this._selectedIndex) {
                child.setAttr("selected", "true")
            }
                
            code += child.compile()
        }
        
        return `<select>` + code + `</select>`;
    }
}


// elements.form.slider
class EclairSlider extends EclairCustomTagComponent {
    constructor(value) {
        super("input")
        
        this.bindState(value, "value", value => {
            this.setAttr("value", value)
            this.getElement(elem => {elem.value = value})
        }, state => {return state.number()})
        
        let overrideOnInput = null;
        this._updateCallback("onInput", (e, ev) => {
            if (value instanceof EclairState) {e.getElement(elem => {value.value(elem.value)})}
            if (this.overrideOnInput != null) {this.overrideOnInput(this, ev)}
        })
        
        this.setAttr("type", "range")
        this.addStyle(eclair.styles.Slider)
    }
    
    onInput(callback) {
        this.overrideOnInput = callback;
        return this;
    }
    
    name(_name) {
        this.bindState(_name, "name", value => {
            this.setAttr("name", value)
        })
        return this;
    }
    
    min(_min) {
        this.bindState(_min, "min", value => {
            this.setAttr("min", value);
        }, state => {return state.number()})
        
        return this;
    }
    
    max(_max) {
        this.bindState(_max, "max", value => {
            this.setAttr("max", value);
        }, state => {return state.number()})
        
        return this;
    }
    
    step(_step) {
        this.bindState(_step, "step", value => {
            this.setAttr("step", value);
        }, state => {return state.number()})
        
        return this;
    }
}
   

// elements.form.text-area
class EclairTextArea extends EclairCustomTagComponent {
    constructor(_value) {
        super("textarea")
        
        this.bindState(_value, "value", value => {
            this.innerHTML(value)
            this.getElement(e => {e.value = value})
        })
        
        this._overrideOnInput = null
        this._updateCallback("onInput", (e, ev) => {
            if (_value instanceof EclairState) {_value.value(e.getElement().value)}
            if (this._overrideOnInput != null) {this._overrideOnInput(e, ev)} 
        })
        
        this.addStyle(eclair.styles.TextArea)
    }
    
    onInput(callback) {
        this._overrideOnInput = callback
        return this
    }
}

// elements.form.textbox
class EclairTextBox extends EclairCustomTagComponent {
    constructor(_text) {
        super("input")
        this.setAttr("type", "text")
            .addStyle(eclair.styles.TextBox)
        
        let self = this
        
        this.valueBinding = _text instanceof EclairState? _text : Ø(_text == null? "": _text)
        
        this.bindState(this.valueBinding, "value", value => {
            this.setAttr("value", value)
            this.getElement(elem => {elem.value = value});
        })
        
        this.overrideOnInput = null
        this._updateCallback("onInput", (e, ev) => {
            if (self.valueBinding instanceof EclairState) {e.getElement(elem => {self.valueBinding.value(elem.value)})}
            if (this.overrideOnInput != null) {this.overrideOnInput(this, ev)}
        })
    }
    
    onInput(callback) {
        this.overrideOnInput = callback
        return this
    }
    
    name(_name) {
        this.bindState(_name, "name", value => {
            this.setAttr("name", value)
        })
        
        return this
    }
    
    placeholder(_placeholder) {
        this.bindState(_placeholder, "placeholder", value => {
            this.setAttr("placeholder", value)
        })
        
        return this
    }
    
    password(_password) {
        this.bindState(_password, "password", value => {
            this.setAttr("type", value? "password":'text')
        }, state => {return state.bool()})
        
        return this
    }
    
    maxLength(_maxLength) {
        this.bindState(_maxLength, "maxlength", value => {
            this.setAttr("maxlength", value)
        })
        
        return this
    } 
    
    enabled(_enabled) {
        this.bindState(_enabled, "enabled", value => {
            this.setAttr("enabled", value ? "true" : "null")
        }, state => {return state.bool()})
        
        return this
    } 
    
    required(_required) {
        this.bindState(_required, "required", value => {
            this.setAttr("required", value ? "true" : "null")
        }, state => {return state.bool()})
        
        return this
    } 
    
    autofocus(_autofocus) {
        this.bindState(_autofocus, "autofocus", value => {
            this.setAttr("autofocus", value ? "true" : "null")
        }, state => {return state.bool()})
        
        return this
    } 
}



// elements.form.toggle
class EclairToggle extends EclairComponent {
    constructor(_value) {
        super()
        
        let overrideOnClick = null;
        
        this._tickMark = this._addChild(eclair.Text("✓"))
        this._knob = this._addChild(eclair.View())
        
        this._value = (_value instanceof EclairState)? _value : Ø(_value)
        this._hiddenComponent = eclair.HiddenInput(this._value)
    
        this.bindState(_value, "toggle", value => {
            this._updateStyle() 
        }, state => {return state.bool()})
        
        let self = this;
        this._updateCallback("onClick", (e, ev) => {
            if (e._enabled) {
                this._value.value(!this._value.bool(), self)
                this._updateStyle()
            }
            if (self.overrideOnClick != null) {
                overrideOnClick(e, ev)
            }
        })
        
        this._showCheckMark = false
        this._enabled = true
        
        this.addStyle(eclair.styles.Toggle)
        this._tickMark.addStyle(eclair.styles.ToggleTick)
        this._knob.addStyle(eclair.styles.ToggleKnob)
        
        this.width("100%", " .wrapper")
            .transition("0.2s all", " .wrapper")
    }
    
    onClick(callback) {
        this.overrideOnClick = callback;
        return this;
    }
    
    knob(callback) {
        callback(this._knob)
        return this
    }
    
    name(_name) {
        this._hiddenComponent.name(_name)
        return this;
    }
    
    enabled(_enabled) {
        this.bindState(_enabled, "enabled", value => {
            this._enabled = value
            this.opacity(value? 1 : 0.6)
        }, state => {return state.bool()})
        
        return this
    }
    
    showTick(_bool) {
        this.bindState(_bool, "showTick", value => {
            this._showCheckMark = value
            this._tickMark.opacity((value && (this._value.bool()))? 1:0)
        }, state => {return state.bool()})
        
        return this
    }
    
    _updateStyle() {
        if (this._value.bool()) {
            this._tickMark.opacity(this._showCheckMark ? 1 : 0)
            this.background(eclair.theme.accent)
                .transform("translateX(100%)", " .wrapper")
            this._knob
                .transform("translateX(-100%)")
        } else {
            this._tickMark.opacity(0)
            this.background("#dddddd")
                .transform("translateX(0%)", " .wrapper")
            
            this._knob
                .transform("translateX(0%)")
        }
    }
    
    build() {
        return `<toggle>${this._tickMark.compile()}<div class='wrapper'>${this._knob.compile()}</div>${this._hiddenComponent.compile()}</toggle>`
    }
}



// elements.standard.hr
class EclairHorizontalLine extends EclairCustomTagComponent {
    constructor() {
        super("hr")        
        this.addStyle(eclair.styles.HorizontalLine)
    }
}

// elements.standard.iframe
class EclairIFrame extends EclairCustomTagComponent {
    constructor() {
        super("iframe")
        this.innerHTML("Your client does not support iframes.")
        this.addStyle(eclair.styles.IFrame)
    }
    
    url(_source) {
        this.bindState(_source, "src", value => {
            this.setAttr("src", value)
        })  
        return this
    }
    
    source(_source) {
        this.bindState(_source, "srcdoc", value => {
            this.setAttr("srcdoc", value)
        })  
        return this
    }
    
    allowFullScren(_allow) {
        this.bindState(_allow, "allowfullscreen", value => {
            this.setAttr("allowfullscreen", value)
        })  
        return this
    }
    
    allowPaymentRequest(_allow) {
        this.bindState(_allow, "allowpaymentrequest", value => {
            this.setAttr("allowpaymentrequest", value)
        })  
        return this
    }
    
    loading(_loading) {
        this.bindState(_loading, "loading", value => {
            this.setAttr("loading", value)
        })  
        return this
    }
    
    name(_name) {
        this.bindState(_name, "name", value => {
            this.setAttr("name", value)
        })  
        return this
    }
    
    referrerPolicy(_policy) {
        this.bindState(_policy, "referrerpolicy", value => {
            this.setAttr("referrerpolicy", value)
        })  
        return this
    }
    
    sandbox(_sandbox) {
        this.bindState(_sandbox, "sandbox", value => {
            this.setAttr("sandbox", value)
        })  
        return this
    }
}

// elements.standard.image
class EclairImage extends EclairCustomTagComponent {
    constructor(_src) {
        super("img")
        
        this.bindState(_src, "src", value => {
            this.setAttr("src", value)
        })  
        
        this.addStyle(eclair.styles.Image)
    }
    
    altText(_alt) {
        this.bindState(_alt, "alt", value => {
            this.setAttr("alt", value)
        })  
    }
}


// elements.standard.link
class EclairLink extends EclairCustomTagComponent {
    constructor(_text) {
        super("a")
        
        this.bindState(_text, "html", value => {
            this.innerHTML(value)
        })  
        
        this.addStyle(eclair.styles.Link)
    }
    
    url(_location) {
        this.bindState(_location, "href", value => {
            this.setAttr("href", value)
        })  
        
        return this
    }
    
    target(_target) {
        this.bindState(_target, "target", value => {
            this.setAttr("target", value)
        })  
        
        return this
    }
}



// elements.standard.text
class EclairText extends EclairComponent {
    constructor(text) {
        super()
        
        this.bindState(text, "text", value => {
            this._text = value;
            this.getElement(elem => {elem.innerHTML = value});
        })  
        
        this.addStyle(eclair.styles.Text)
    }
    
    type(_state) {
        this.bindState(_state, "type", newType => {
            if (newType == "title") {
                this.fontSize("40px")
                    .fontWeight(700)
                    .margin("20px 10px 10px 10px")
            }

            if (newType == "subtitle") {
                this.fontSize("25px")
                    .margin("20px 10px 10px 10px")
            }

            if (newType == "heading1") {
                this.fontSize("30px")
                    .fontWeight(700)
                    .margin("20px 10px 10px 10px")
            }

            if (newType == "heading2") {
                this.fontSize("25px")
                    .fontWeight(700)
                    .margin("20px 10px 10px 10px")
            }

            if (newType == "heading3") {
                this.fontSize("20px")
                    .fontWeight(700)
                    .margin("20px 10px 10px 10px")
            }

            if (newType == "heading4") {
                this.fontSize("15px")
                    .fontWeight(700)
                    .margin("20px 10px 10px 10px")
            }
        })  
        
        return this
    }
    
    build() {
        return `<span>${this._text}</span>`
    }
}






// functional.post
class EclairPost {
    constructor(url) {
        this.url = url

        this._onLoad = function() {}
<!--            this._onAbort = null-->
<!--            this._onLoadEnd = null-->
<!--            this._onLoadStart = null-->
        this._onProgress = null
<!--            this._onTimeOut = null-->
    }

    onSuccess(callback) {
        this._onLoad = callback
        return this
    }

    onProgress(callback) {
        this._onProgress = callback
        return this
    }

    send(_form) {
        var xhttp = new XMLHttpRequest();

        let self = this
        xhttp.onload = function() {if (self._onLoad != null) {self._onLoad(xhttp.responseText)}}
        xhttp.onprogress = function(evt) {
            if (self._onProgress != null){self._onProgress(evt.loaded / evt.total)}
        }

        xhttp.open("POST", this.url, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        var formString = ""
        Object.keys(_form).forEach(function(key) {
            let value = _form[key]
            if (value instanceof EclairState) {
                value = value.value()
            }
            formString += escape(key) + "="
            formString += escape(value) + "&"
        })

        xhttp.send(formString);

        return this
    }
}



