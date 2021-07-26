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
        
        this._pre.parent = this
        this._code.parent = this
        this._textarea.parent = this
        this.children = [this._pre, this._code, this._textarea]
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
        
        this._pre.innerHTML(this._code.compile())
        return `<div>${this._pre.compile()}${this._textarea.compile()}</div>${postBuildScript.outerHTML}`
    }
}

