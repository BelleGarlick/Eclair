# Eclair TextBox [extends [EclairCustomTagComponent](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/custom-tag.md)]
Source: [_elements.form.textbox_](https://github.com/SamGarlick/Eclair/tree/main/src/elements/form/textbox.js)<br/><br/>
An eclair textbox element.
**
Eclair.styles.TextBox**  TextBox style.
```javascript
let username = Ø("")

Eclair.Textbox(username)
    .maxLength(16)
    .placeholder("Enter your username here...")
```
### constructor
Construct the TextBox element with a predefined text value.

text: The value of the text element.
```javascript
Eclair.TextBox("Sam")
```
### .name
Set the name attribute for a textbox (used in forms).

value: Set the name attribute of the element.
```javascript
Eclair.TextBox("Sam")
    .name("fname")
```
### .placeholder
Set a placeholder for a textbox.

value: Set the placeholder text to this value.
```javascript
Eclair.TextBox("")
    .placeholder("First name...")
```
### .password
Set input as a password textbox.

value: Set if the element to be of type password or not.
```javascript
Eclair.TextBox("Password123")
    .password(true)
```
### .maxLength
Set a textbox's maximum number of characters.

value: Set the max number of characters.
```javascript
Eclair.TextBox("This textbox is has a maximum length")
    .maxLength(280)
```
### .enabled
Enable / Disable the element.

enabled: If true, the user can modify this element.
```javascript
Eclair.TextBox("Hello World")
    .enabled(true)
```
### .required
Set whether the textbox is required in a form.

value: Set whether the element is required in a form
```javascript
Eclair.TextBox("This textbox is required")
    .required(true)
```
### .autofocus
Set whether the textbox is autofocused.

value: Set whether the element is automatically focused to.
```javascript
Eclair.TextBox("This textbox is autofocused")
    .autofocus(true)
```

### Inherits from: elements.custom-tag
 - [.innerHTML()](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/custom-tag.md#innerHTML)