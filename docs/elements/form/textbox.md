## Eclair TextBox
An eclair textbox element.
<br/>**args**:
- _text: The value of the text element.
```javascript
eclair.Textbox(Ø(""))
    .placeholder("Enter your name here...")
```
### .name
Set the name attribute for a textbox (used in forms).
<br/>**args**:
- _name: Set the name attribute of the element.
```javascript
eclair.TextBox("Sam")
    .name("fname")
```
### .placeholder
Set a placeholder for a textbox.
<br/>**args**:
- _placeholder: Set the placeholder text to this value.
```javascript
eclair.TextBox("")
    .placeholder("First name...")
```
### .password
Set input as a password textbox.
<br/>**args**:
- _password: Set if the element to be of type password or not.
```javascript
eclair.TextBox("Password123")
    .password(true)
```
### .maxLength
Set a textbox's maximum number of characters.
<br/>**args**:
- _maxLength: Set the max number of characters.
```javascript
eclair.TextBox("This textbox is has a maximum length")
    .maxLength(280)
```
### .enabled
Enable / Disable the element.
<br/>**args**:
- enabled: If true, the user can modify this element.
```javascript
eclair.TextBox("Hello World")
    .enabled(true)
```
### .required
Set whether the textbox is required in a form.
<br/>**args**:
- _required: Set whether the element is required in a form.
```javascript
eclair.TextBox("This textbox is required")
    .required(true)
```
### .autofocus
Set whether the textbox is autofocused.
<br/>**args**:
- _autofocus: Set whether the element is automatically focused to.
```javascript
eclair.TextBox("This textbox is autofocused")
    .autofocus(true)
```

<br/>Source: [_elements.form.textbox_](https://github.com/SamGarlick/Eclair/tree/main/src/elements/form/textbox.js)