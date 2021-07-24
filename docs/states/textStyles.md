## EclairTextStyleState
Text can have it's theme set using a string, this class allows you to do it programatically, and bind the theme of multiple strings together like a normal eclair state.

```javascript
let style = eclair.TextStyle().heading2()

eclair.VBox([
    eclair.Text('Hello').type(style),
    eclair.Text('Welcome').type(style),
    Button("Change")
        .onClick(() => {style.title()}),
]).write()

```
Available styles:
```javascript
title
subtitle
heading1
heading2
heading3
heading4
```
