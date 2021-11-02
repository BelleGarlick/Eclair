# Eclair Hidden Input [extends [EclairCustomTagComponent](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/custom-tag.md)]
Source: [_elements.form.hidden_](https://github.com/SamGarlick/Eclair/tree/main/src/elements/form/hidden.js)<br/><br/>
An eclair hidden input element. The hidden input element binds to a value. To alter the value of the hidden input you must alter the state. You can pass a direct value, however, this value cannot be changed.
```javascript
Eclair.Form([
    Eclair.HiddenInput("secret-input")
        .name("User secret key")
])
```
### constructor
Construct an eclair hidden input.

value: Value of the hidden input. 
```javascript
Eclair.HiddenInput("secret-input")
```
### .name
Set the name attribute for a element (used in forms).

value: Value of the name attribute. 
```javascript
    .name("Bar")
```

### Inherits from: elements.custom-tag
 - [.innerHTML()](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/custom-tag.md#innerHTML)