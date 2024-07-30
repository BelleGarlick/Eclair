/// TITLE Eclair Syntax Highlighter
/// EXTENDS elements.component:EclairComponent
/// DESC An eclair syntax highlighter object - primarly for eclair coding. Future work will be done to expand the capabilities to other languages.

Eclair.SyntaxHighlighter = function(_value) {
    return new EclairSyntaxHighlighter(_value);
}

/// SHARED-STYLE Eclair.styles.SyntaxHighlighter: Syntax highlighter style.
/// SHARED-STYLE Eclair.styles.SyntaxHighlighterCodeElement: Syntax highlighter code element style.
/// SHARED-STYLE Eclair.styles.SyntaxHighlighterTextAreaElement: Syntax highlighter text area element style.
/// SHARED-STYLE Eclair.styles.SyntaxHighlighterCommentStyle: Style of a highlighted comment.
/// SHARED-STYLE Eclair.styles.SyntaxHighlighterKeywordStyle: Style of a highlighted keyword.
/// SHARED-STYLE Eclair.styles.SyntaxHighlighterStringStyle: Style of a highlighted string.
/// SHARED-STYLE Eclair.styles.SyntaxHighlighterQuoteStyle: Style of a highlighted quote.
/// SHARED-STYLE Eclair.styles.SyntaxHighlighterEclairStyle: Style of a highlighted eclair keyword.
Eclair.styles.SyntaxHighlighter = Eclair.Style("eclair-syntax-highlighter")
    .position("relative")
    .width("420px")
    .height("360px")
    .borderSize("1px")
    .borderStyle("solid")
    .borderColor("#999999")
    .borderRadius("3px")
Eclair.styles.SyntaxHighlighterCodeElement = Eclair.Style("eclair-syntax-highlighter-code")
    .position("absolute")
    .top("0px")
    .left("0px")
    .width("100%")
    .height("100%")
    .fontSize("14px")
    .fontFamily("monospace")
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
    .overflowX("scroll")
Eclair.styles.SyntaxHighlighterTextAreaElement = Eclair.Style("eclair-syntax-highlighter-text-area")
    .position("absolute")
    .top("0px")
    .left("0px")
    .width("100%")
    .height("100%")
    .fontSize("14px")
    .fontFamily("monospace")
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
    .overflowX("scroll")
Eclair.styles.SyntaxHighlighterCommentStyle = Eclair.Style("eclair-syntax-highlighter-comment").fontColor("grey")
Eclair.styles.SyntaxHighlighterKeywordStyle = Eclair.Style("eclair-syntax-highlighter-keyword").fontColor("#0066ee")
Eclair.styles.SyntaxHighlighterStringStyle = Eclair.Style("eclair-syntax-highlighter-string").fontColor("#dd9900")
Eclair.styles.SyntaxHighlighterQuoteStyle = Eclair.Style("eclair-syntax-highlighter-quote").fontColor("#dd9900")
Eclair.styles.SyntaxHighlighterEclairStyle = Eclair.Style("eclair-syntax-highlighter-eclair").fontColor("#009900")

/// ```javascript
/// let code = Ø("alert('Test')")
/// 
/// Eclair.VStack([
///     Eclair.SyntaxHighlighter(code),
///     Eclair.TextBox(code),
/// ])
/// ```
class EclairSyntaxHighlighter extends EclairComponent {    
    /// METHOD constructor
    /// DESC Construct an Eclair Syntax Highlighter with given code.
    /// ARG _code: The code to be highlighted by the object.
    /// ```javascript
    /// Eclair.SyntaxHighlighter("Eclair.Button('testing').write()")
    /// ```
    constructor(_code) {
        super()
        
        this.tokenSeperators = new Set([
            "{", "(", " ", "}", ")", "[", "]", "\n", "\t", ".", ","
        ])
        this.eclairKeywords = new Set([
            "VStack", "HStack", "State", "Toggle", "Text", "HorizontalLine", "Alignment", "Eclair", 
            "Ø", "Style", "Color", "TextStyle", "View", "TabPage", "TabView", "CustomTagComponent", "Button", 
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
            "comment": Eclair.styles.SyntaxHighlighterCommentStyle,
            "keyword": Eclair.styles.SyntaxHighlighterKeywordStyle,
            "eclair": Eclair.styles.SyntaxHighlighterEclairStyle,
            "string": Eclair.styles.SyntaxHighlighterStringStyle, 
            "quote": Eclair.styles.SyntaxHighlighterQuoteStyle, 
            "number": Eclair.styles.SyntaxHighlighterKeywordStyle, 
        }
        
        this._cachedLines = {}
        this._codeState = (_code instanceof EclairState)? _code : Ø(_code)
        
        this.codeElement = null, this.textArea = null;
        this.declareChildrenWithContext(_ => {
            this.codeElement = Eclair.CustomTagComponent("code")
                .addStyle(Eclair.styles.SyntaxHighlighterCodeElement)

            this.textArea = Eclair.TextArea(this._codeState)
                .removeStyle(Eclair.styles.TextArea)
                .addStyle(Eclair.styles.SyntaxHighlighterTextAreaElement)
                .setAttr("spellcheck", "false")
                .onScroll((e, ev) => {
                    let textarea = e.getElement()
                    this.codeElement.getElement().scroll(textarea.scrollLeft, textarea.scrollTop)
                })
        })
        
        this.addStyle(Eclair.styles.SyntaxHighlighter)
        
        this.bindState(this._codeState, "code", value => {
            this._update()
        })
    }
    
    _update() {
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
                formattedCode += `<span class='${(cline[t].type != '')? this.theme[cline[t].type].eID():""}'>${cline[t].text}</span>`
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

            // If state is quote and char in ' then end the token state.
            else if (state == "quote" && line[c] == "'") {pushTokenState(token + "'", state)} 

            // If state is string and char in " then end the token state.
            else if (state == "string" && line[c] == '"') {pushTokenState(token + '"', state)} 

            // If not a string or quote, and the " is this then end the current token and start a string
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
        // Build all syntax highlighter rules
        let classes = Object.keys(this.theme);
        for (let i = 0; i < classes.length; i++) {
            this.theme[classes[i]].create()
        }
        
        let elem = document.createElement("div")
        elem.appendChild(this.codeElement.compile())
        elem.appendChild(this.textArea.compile())
        return elem
    }
}
