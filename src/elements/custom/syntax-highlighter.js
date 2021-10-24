/// ## Eclair Syntax Highlighter
/// An eclair syntax highlighter object - primarly for eclair coding. Future work will be done to expand the capabilities to other languages.
/// <br/>**args**:
/// - code: The code to be highlighted by the object.
/// ```javascript
/// eclair.SyntaxHighlighter("eclair.Button('testing').write()")
/// ```
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
        return `<div>${this.codeElement.compile()}${this.textArea.compile()}</div>`
    }
}

