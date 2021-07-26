[_elements.form.textbox_](https://github.com/SamGarlick/Eclair/tree/main/src/elements/form/textbox.js)
## Eclair TextBox
An eclair textbox element.
```javascript
let userInput = eclair.State("")
eclair.Textbox(userInput)
    .placeholder("Enter your name here...")
```
### .name
Set the name attribute for a textbox (used in forms).
```javascript
eclair.TextBox("Sam")
    .name("fname")
```
### .placeholder
Set a placeholder for a textbox.
```javascript
eclair.TextBox("")
    .placeholder("First name...")
```
### .password
Set input as a password textbox.
```javascript
eclair.TextBox("Password123")
    .password(true)
```
### .maxLength
Set a textbox's maximum number of characters.
```javascript
eclair.TextBox("This textbox is has a maximum length")
    .maxLength(280)
```
### .enabled
Set whether the textbox is enabled.
```javascript
eclair.TextBox("This textbox is enabled")
    .enabled(false)
```
### .required
Set whether the textbox is required in a form.
```javascript
eclair.TextBox("This textbox is required")
    .required(true)
```
### .autofocus
Set whether the textbox is autofocused.
```javascript
eclair.TextBox("This textbox is autofocused")
    .autofocus(true)
```
