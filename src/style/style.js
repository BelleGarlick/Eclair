// Class for storing specific styles and containing all selectors.
class EclairStylableObject {
    constructor() {
        this._styles = {}
        this._stylePrefix = "#"
    }
    
    getStyleSheet(selector) {
        selector = (selector == null)? "" : selector
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
    
    _set(selector, type, _style) {
        this.getStyleSheet(selector)[type] = _style; 
        
        // Support eclair states
        if (_style instanceof EclairState) {
            let self = this
            _style.addCallback(this.id() + `-style-{type}`, function(state) {
                self.getStyleSheet(selector)[type] = _style.string(); 
                self.updateCSSStyle()
            }, true)
        }
        
        return this.updateCSSStyle()
    }
    
    //PRINT Finish updateing styles to allow for State varibles
    css(_style, selector) {return this._set(selector, "css", _style)}
    display(_display, selector) {return this._set(selector, "display", _display)}
    background(_background, selector) {return this._set(selector, "background", _background)}
    backgroundColor(_color, selector) {return this._set(selector, "background-color", _color)}
    borderSize(_size, selector) {return this._set(selector, "border-width", _size)}
    borderColor(_color, selector) {return this._set(selector, "border-color", _color)}
    borderStyle(_style, selector) {return this._set(selector, "border-style", _style)}
    borderRadius(_radius, selector) {return this._set(selector, "border-radius", _radius)}
    padding(_size, selector) {return this._set(selector, "padding", _size)}
    margin(_size, selector) {return this._set(selector, "margin", _size)}
    font(_family, selector) {return this._set(selector, "font-family", _family)}
    fontSize(_size, selector) {return this._set(selector, "font-size", _size)}
    fontColor(_color, selector) {return this._set(selector, "color", _color)}
    fontWeight(_weight, selector) {return this._set(selector, "font-weight", _weight)}
    width(_width, selector) {return this._set(selector, "width", _width)}
    height(_height, selector) {return this._set(selector, "height", _height)}
    display(_display, selector) {return this._set(selector, "display", _display)}
    overflow(_overflow, selector) {return this._set(selector, "overflow", _overflow)}
    opacity(_opacity, selector) {return this._set(selector, "opacity", _opacity)}
    textAlign(_align, selector) {return this._set(selector, "text-align", _align)}
    verticalAlign(_align, selector) {return this._set(selector, "vertical-align", _align)}
    position(_pos, selector) {return this._set(selector, "position", _pos)}
    top(_top, selector) {return this._set(selector, "top", _top)}
    bottom(_bottom, selector) {return this._set(selector, "bottom", _bottom)}
    left(_left, selector) {return this._set(selector, "left", _left)}
    right(_right, selector) {return this._set(selector, "right", _right)}
    cursor(_value, selector) {return this._set(selector, "cursor", _value)}
    textDecoration(_value, selector) {return this._set(selector, "text-decoration", _value)}
    transition(_value, selector) {return this._set(selector, "transition", _value)}
    userSelect(_value, selector) {return this._set(selector, "user-select", _value)}
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