# Eclair Button__extends [EclairComponent](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/component.md)__<br/>

Source: [_elements.form.button_](https://github.com/SamGarlick/Eclair/tree/main/src/elements/form/button.js)
An eclair button element.
**Eclair.styles.Button**  Default button style.
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