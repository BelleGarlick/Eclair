// Class for storing specific styles and containing all selectors.
class EclairStylableObject {
    constructor() {
        this._styles = {}
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
        let objectID = this.eID()
        
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
                styleCode += `.${objectID}${selector}{${styleSheetCode}}`;
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
        styleObject.setAttribute("class", `${objectID}-css`)
        styleObject.innerHTML = fullStyleCode
        
        return styleObject;
    }
    
    updateCSSStyle() {
        let curCSSElements = document.getElementsByClassName(this.eID() + "-css");
        let newCSSElement = this.buildStyleObject();
        
        if (newCSSElement != null) {
            if (curCSSElements.length == 0) {
                if (!(this instanceof EclairSharedStyle)) {
                    // TODO Check if this should be body or head
                    document.body.appendChild(newCSSElement)
                }
            } else {
                curCSSElements[0].innerHTML = newCSSElement.innerHTML;
            }
        } else {
            if (curCSSElements.length > 0) {
                curCSSElements[0].parentElement.removeChild(curCSSElements[0]);
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
            _style.addCallback(this.eID() + `-style-{property}`, function(state) {
                self._getStyleSheet(rule, selector)[property] = _style.string(); 
                self.updateCSSStyle()
            }, true)
        }
        
        return this.updateCSSStyle()
    }
    
    css(_style, rule) {return this._set("css", _style, rule)}
    
    alignContent(_value, selector) {return this._set("align-content", _value, selector)}
    alignItems(_value, selector) {return this._set("align-items", _value, selector)}
    alignSelf(_value, selector) {return this._set("align-self", _value, selector)}
    animation(_value, selector) {return this._set("animation", _value, selector)}
    animationDelay(_value, selector) {return this._set("animation-delay", _value, selector)}
    animationDirection(_value, selector) {return this._set("animation-direction", _value, selector)}
    animationDuration(_value, selector) {return this._set("animation-duration", _value, selector)}
    animationFillMode(_value, selector) {return this._set("animation-fill-mode", _value, selector)}
    animationIterationCount(_value, selector) {return this._set("animation-iteration-count", _value, selector)}
    animationName(_value, selector) {return this._set("animation-name", _value, selector)}
    animationPlayState(_value, selector) {return this._set("animation-play-state", _value, selector)}
    animationTimingFunction(_value, selector) {return this._set("animation-timing-function", _value, selector)}
    appearance(_value, rule) {return this._set("-webkit-appearance", _value, rule)._set("appearance", _value, rule)}
    backfaceVisibility(_background, rule) {return this._set("backface-visibility", _background, rule)}
    background(_value, rule) {return this._set("background", _value, rule)}
    backgroundAttachment(_value, rule) {return this._set("background-attachment", _value, rule)}
    backgroundClip(_value, rule) {return this._set("background-clip", _value, rule)}
    backgroundColor(_value, rule) {return this._set("background-color", _value, rule)}
    backgroundImage(_value, rule) {return this._set("background-image", _value, rule)}
    backgroundOrigin(_value, rule) {return this._set("background-origin", _value, rule)}
    backgroundPosition(_value, rule) {return this._set("background-position", _value, rule)}
    backgroundRepeat(_value, rule) {return this._set("background-repeat", _value, rule)}
    backgroundSize(_value, rule) {return this._set("background-size", _value, rule)}
    border(_value, rule) {return this._set("border", _value, rule)}
    borderBottom(_value, rule) {return this._set("border-bottom", _value, rule)}
    borderBottomColor(_value, rule) {return this._set("border-bottom-color", _value, rule)}
    borderBottomLeftRadius(_value, rule) {return this._set("border-bottom-left-radius", _value, rule)}
    borderBottomRightRadius(_value, rule) {return this._set("border-bottom-right-radius", _value, rule)}
    borderBottomStyle(_value, rule) {return this._set("border-bottom-style", _value, rule)}
    borderBottomWidth(_value, rule) {return this._set("border-bottom-width", _value, rule)}
    borderCollapse(_value, rule) {return this._set("border-collapse", _value, rule)}
    borderColor(_color, rule) {return this._set("border-color", _color, rule)}
    borderImage(_value, rule) {return this._set("border-image", _value, rule)}
    borderImageOutset(_value, rule) {return this._set("border-image-outset", _value, rule)}
    borderImageRepeat(_value, rule) {return this._set("border-image-repeat", _value, rule)}
    borderImageSlice(_value, rule) {return this._set("border-image-slice", _value, rule)}
    borderImageSource(_value, rule) {return this._set("border-image-source", _value, rule)}
    borderLeft(_value, rule) {return this._set("border-left", _value, rule)}
    borderLeftColor(_value, rule) {return this._set("border-left-color", _value, rule)}
    borderLeftStyle(_value, rule) {return this._set("border-left-style", _value, rule)}
    borderLeftWidth(_value, rule) {return this._set("border-left-width", _value, rule)}
    borderRadius(_value, rule) {return this._set("border-radius", _value, rule)}
    borderRight(_value, rule) {return this._set("border-right", _value, rule)}
    borderRightColor(_value, rule) {return this._set("border-right-color", _value, rule)}
    borderRightStyle(_value, rule) {return this._set("border-right-style", _value, rule)}
    borderRightWidth(_value, rule) {return this._set("border-right-width", _value, rule)}
    borderSpacing(_value, rule) {return this._set("border-spacing", _value, rule)}
    borderStyle(_style, rule) {return this._set("border-style", _style, rule)}
    borderSize(value, rule) {return this._set("border-width", value, rule)}
    borderTop(_value, rule) {return this._set("border-top", _value, rule)}
    borderTopColor(_value, rule) {return this._set("border-top-color", _value, rule)}
    borderTopLeftRadius(_value, rule) {return this._set("border-top-left-radius", _value, rule)}
    borderTopRightRadius(_value, rule) {return this._set("border-top-right-radius", _value, rule)}
    borderTopStyle(_value, rule) {return this._set("border-top-style", _value, rule)}
    borderTopWidth(_value, rule) {return this._set("border-top-width", _value, rule)}
    borderWidth(_size, rule) {return this._set("border-width", _size, rule)}
    bottom(_bottom, rule) {return this._set("bottom", _bottom, rule)}
    boxShadow(_radius, rule) {return this._set("box-shadow", _radius, rule)}
    boxSizing(_value, rule) {return this._set("box-sizing", _value, rule)}
    captionSize(_value, rule) {return this._set("caption-side", _value, rule)}
    caretColor(_value, rule) {return this._set("caret-color", _value, rule)}
    clear(_value, rule) {return this._set("clear", _value, rule)}
    clip(_value, rule) {return this._set("clip", _value, rule)}
    color(_value, rule) {return this._set("color", _value, rule)}
    columnCount(_value, rule) {return this._set("column-count", _value, rule)}
    columnFill(_value, rule) {return this._set("column-fill", _value, rule)}
    columnGap(_value, rule) {return this._set("column-gap", _value, rule)}
    columnRule(_value, rule) {return this._set("column-rule", _value, rule)}
    columnRuleColor(_value, rule) {return this._set("column-rule-color", _value, rule)}
    columnRuleStyle(_value, rule) {return this._set("column-rule-style", _value, rule)}
    columnRuleWidth(_value, rule) {return this._set("column-rule-width", _value, rule)}
    columnSpan(_value, rule) {return this._set("column-span", _value, rule)}
    columnWidth(_value, rule) {return this._set("column-width", _value, rule)}
    columns(_value, rule) {return this._set("columns", _value, rule)}
    content(_value, rule) {return this._set("content", _value, rule)}
    counterIncrement(_value, rule) {return this._set("counter-increment", _value, rule)}
    counterReset(_value, rule) {return this._set("counter-reset", _value, rule)}
    cursor(_value, rule) {return this._set("cursor", _value, rule)}
    direction(_value, rule) {return this._set("direction", _value, rule)}
    display(_display, rule) {return this._set("display", _display, rule)}
    emptyCells(_value, rule) {return this._set("empty-cells", _value, rule)}
    flex(_value, rule) {return this._set("flex", _value, rule)}
    flexBasis(_value, rule) {return this._set("flex-basis", _value, rule)}
    flexDirection(_value, rule) {return this._set("flex-direction", _value, rule)}
    flexFlow(_value, rule) {return this._set("flex-flow", _value, rule)}
    flexGrow(_value, rule) {return this._set("flex-grow", _value, rule)}
    flexShrink(_value, rule) {return this._set("flex-shrink", _value, rule)}
    flexWrap(_value, rule) {return this._set("flex-wrap", _value, rule)}
    float(_value, rule) {return this._set("float", _value, rule)}
    font(_family, rule) {return this._set("font", _family, rule)}
    fontColor(_color, rule) {return this._set("color", _color, rule)}
    fontFamily(_family, rule) {return this._set("font-family", _family, rule)}
    fontSize(_size, rule) {return this._set("font-size", _size, rule)}
    fontSizeAdjust(_weight, rule) {return this._set("font-size-adjust", _weight, rule)}
    fontStretch(_weight, rule) {return this._set("font-stretch", _weight, rule)}
    fontStyle(_weight, rule) {return this._set("font-style", _weight, rule)}
    fontVariant(_weight, rule) {return this._set("font-variant", _weight, rule)}
    fontWeight(_weight, rule) {return this._set("font-weight", _weight, rule)}
    gap(_size, rule) {return this._set("gap", _size, rule)}
    height(_height, rule) {return this._set("height", _height, rule)}
    justifyContent(_value, rule) {return this._set("justify-content", _value, rule)}
    left(_left, rule) {return this._set("left", _left, rule)}
    letterSpacing(_value, rule) {return this._set("letter-spacing", _value, rule)}
    lineHeight(_value, rule) {return this._set("line-height", _value, rule)}
    listStyle(_value, rule) {return this._set("list-style", _value, rule)}
    listStyleImage(_value, rule) {return this._set("list-style-image", _value, rule)}
    listStylePosition(_value, rule) {return this._set("list-style-position", _value, rule)}
    listStyleType(_value, rule) {return this._set("list-style-type", _value, rule)}
    margin(_size, rule) {return this._set("margin", _size, rule)}
    marginBottom(_size, rule) {return this._set("margin-bottom", _size, rule)}
    marginLeft(_size, rule) {return this._set("margin-left", _size, rule)}
    marginTop(_size, rule) {return this._set("margin-top", _size, rule)}
    marginright(_size, rule) {return this._set("margin-right", _size, rule)}
    maxHeight(_height, rule) {return this._set("max-height", _height, rule)}
    maxWidth(_width, rule) {return this._set("max-width", _width, rule)}
    minHeight(_height, rule) {return this._set("min-height", _height, rule)}
    minWidth(_width, rule) {return this._set("min-width", _width, rule)}
    opacity(_value, rule) {return this._set("opacity", _value, rule)}
    order(_value, rule) {return this._set("order", _value, rule)}
    outline(_value, rule) {return this._set("outline", _value, rule)}
    outlineColor(_value, rule) {return this._set("outline-color", _value, rule)}
    outlineOffset(_value, rule) {return this._set("outline-offset", _value, rule)}
    outlineStyle(_value, rule) {return this._set("outline-style", _value, rule)}
    outlineWidth(_value, rule) {return this._set("outline-width", _value, rule)}
    overflow(_value, rule) {return this._set("overflow", _value, rule)}
    overflowWrap(_value, rule) {return this._set("overflow-wrap", _value, rule)}
    overflowX(_value, rule) {return this._set("overflow-x", _value, rule)}
    overflowY(_value, rule) {return this._set("overflow-y", _value, rule)}
    padding(_size, rule) {return this._set("padding", _size, rule)}
    paddingBottom(_size, rule) {return this._set("padding-bottom", _size, rule)}
    paddingLeft(_size, rule) {return this._set("padding-left", _size, rule)}
    paddingRight(_size, rule) {return this._set("padding-right", _size, rule)}
    paddingTop(_size, rule) {return this._set("padding-top", _size, rule)}
    pageBreak(value, rule) {return this._set("page-break", value, rule)}
    pageBreakAfter(value, rule) {return this._set("page-break-after", value, rule)}
    pageBreakBefore(value, rule) {return this._set("page-break-before", value, rule)}
    pageBreakInside(value, rule) {return this._set("page-break-inside", value, rule)}
    perspective(value, rule) {return this._set("perspective", value, rule)}
    perspectiveOrigin(value, rule) {return this._set("perspective-origin", value, rule)}
    position(_pos, rule) {return this._set("position", _pos, rule)}
    quotes(value, rule) {return this._set("quotes", value, rule)}
    resize(_value, rule) {return this._set("resize", _value, rule)}
    right(_right, rule) {return this._set("right", _right, rule)}
    tabSize(value, rule) {return this._set("tab-size", value, rule)}
    tableLayout(_value, rule) {return this._set("table-layout", _value, rule)}
    textAlign(_align, rule) {return this._set("text-align", _align, rule)}
    textAlignLast(_align, rule) {return this._set("text-align-last", _align, rule)}
    textDecoration(_value, rule) {return this._set("text-decoration", _value, rule)}
    textDecorationColor(_value, rule) {return this._set("text-decoration-color", _value, rule)}
    textDecorationLine(_value, rule) {return this._set("text-decoration-line", _value, rule)}
    textDecorationStyle(_value, rule) {return this._set("text-decoration-style", _value, rule)}
    textIndent(_value, rule) {return this._set("text-indent", _value, rule)}
    textJustify(_value, rule) {return this._set("text-justify", _value, rule)}
    textOverflow(_value, rule) {return this._set("text-overflow", _value, rule)}
    textShadow(_value, rule) {return this._set("text-shadow", _value, rule)}
    textTransform(_value, rule) {return this._set("text-transform", _value, rule)}
    top(_top, rule) {return this._set("top", _top, rule)}
    transform(_value, rule) {return this._set("transform", _value, rule)}
    transformOrigin(_value, rule) {return this._set("transform-origin", _value, rule)}
    transformStyle(_value, rule) {return this._set("transform-style", _value, rule)}
    transition(_value, rule) {return this._set("transition", _value, rule)}
    transitionDelay(_value, rule) {return this._set("transition-delay", _value, rule)}
    transitionDuration(_value, rule) {return this._set("transition-duration", _value, rule)}
    transitionProperty(_value, rule) {return this._set("transition-property", _value, rule)}
    transitionTimingFunction(_value, rule) {return this._set("transition-timing-function", _value, rule)}
    userSelect(_value, rule) {return this._set("user-select", _value, rule)}
    verticalAlign(_align, rule) {return this._set("vertical-align", _align, rule)}
    visibility(value, rule) {return this._set("visibility", value, rule)}
    whiteSpace(_value, rule) {return this._set("white-space", _value, rule)}
    width(_width, rule) {return this._set("width", _width, rule)}
    wordBreak(_width, rule) {return this._set("word-break", _width, rule)}
    wordSpacing(_width, rule) {return this._set("word-spacing", _width, rule)}
    wordWrap(_width, rule) {return this._set("word-wrap", _width, rule)}
    zIndex(value, rule) {return this._set("z-index", value, rule)}
}



