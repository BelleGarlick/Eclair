//
// Custom Ecalir Elements
//


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
            let self = this
            _theme.addCallback(this.id() + "-theme", function(state) {
                self._setTheme(state)
            }, true)
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

        // Check if HLJS is imported, if not then let player know that it's not
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

