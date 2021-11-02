# Eclair Syntax Highlighter [extends [EclairComponent](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/component.md)]
Source: [_elements.special.syntax-highlighter_](https://github.com/SamGarlick/Eclair/tree/main/src/elements/special/syntax-highlighter.js)<br/><br/>
An eclair syntax highlighter object - primarly for eclair coding. Future work will be done to expand the capabilities to other languages.
**
Eclair.styles.SyntaxHighlighter**  Syntax highlighter style.
**
Eclair.styles.SyntaxHighlighterCodeElement**  Syntax highlighter code element style.
**
Eclair.styles.SyntaxHighlighterTextAreaElement**  Syntax highlighter text area element style.
**
Eclair.styles.SyntaxHighlighterCommentStyle**  Style of a highlighted comment.
**
Eclair.styles.SyntaxHighlighterKeywordStyle**  Style of a highlighted keyword.
**
Eclair.styles.SyntaxHighlighterStringStyle**  Style of a highlighted string.
**
Eclair.styles.SyntaxHighlighterQuoteStyle**  Style of a highlighted quote.
**
Eclair.styles.SyntaxHighlighterEclairStyle**  Style of a highlighted eclair keyword.
```javascript
let code = Ø("alert('Test')")

Eclair.VStack([
    Eclair.SyntaxHighlighter(code),
    Eclair.TextBox(code),
])
```
### constructor
Construct an Eclair Syntax Highlighter with given code.

_code: The code to be highlighted by the object.
```javascript
Eclair.SyntaxHighlighter("Eclair.Button('testing').write()")
```