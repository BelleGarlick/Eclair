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