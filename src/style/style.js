// Class for storing specific styles and containing all selectors.
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
        
        // Support eclair states
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
    
    // Flex model relations
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
    
    // Create is used to signal a difference between compile/build etc
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
