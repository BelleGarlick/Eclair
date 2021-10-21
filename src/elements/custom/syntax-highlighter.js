/// EXCLUDE
// This class is experimental and should not be considered part of the library
class EclairSyntaxHighlighter extends EclairComponent {
    constructor(_html) {
        super("syntax-highlighter")

        // Check if HLJS is imported, if not then let user know that it's not
        try {
            if (hljs) {}
        } catch (error) {
            console.log("HLJS Not imported. Go to 'https://highlightjs.org/usage/' to import the stylesheet and the .js file.")
        }
        
        this._writtenCode = Ø()

        let self = this;
        this
            .position("relative")
            .width("400px")
            .height("400px")
        
        this._html = _html == null? Ø() : _html

        this._pre = this._addChild(eclair.CustomTagComponent("pre")
            .position("absolute")
            .padding("0px")
            .margin("0px")
            .height("100%")
            .width("100%")
            .top("0px")
            .left("0px")
            .background("white")
            .css("box-sizing: border-box;line-height: 1.05"))

        this._code = this._addChild(eclair.CustomTagComponent("code")
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
            .innerHTML(this._writtenCode))

        this._textarea = this._addChild(eclair.TextArea(this._html)
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
            .onScroll(e => {
                let textarea = e.getElement()
                self._code.getElement().scroll(textarea.scrollLeft, textarea.scrollTop)
            }))
        
        this.bindState(this._html, "html", value => {
            var escape = document.createElement('textarea');
            escape.textContent = value;
            this._writtenCode.value(escape.innerHTML)

            hljs.highlightAll()
        })
    }

    build() {
        let postBuildScript = document.createElement("script")
        postBuildScript.innerHTML += "hljs.highlightAll();"
        
        this._pre.innerHTML(this._code.compile())
        return `<div>${this._pre.compile()}${this._textarea.compile()}</div>${postBuildScript.outerHTML}`
    }
}

