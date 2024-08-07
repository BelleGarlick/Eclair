# Eclair Button [extends [EclairComponent](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/component.md)]
Source: [_elements.form.button_](https://github.com/SamGarlick/Eclair/tree/main/src/elements/form/button.js)<br/><br/>
An eclair button element.
**
Eclair.styles.Button**  Default button style.
```javascript
Eclair.Button("Hello there")
    .onClick(e => {
        alert("General Kenobi.")
    })
```
### constructor
Construct an eclair button with a given innerHTML.

text: The text shown on the button.
```javascript
Eclair.Button("foo")
```

### Inherits from: elements.component
 - [.id()](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/component.md#id)
 - [.eID()](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/component.md#eID)
 - [.addStyle()](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/component.md#addStyle)
 - [.removeStyle()](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/component.md#removeStyle)