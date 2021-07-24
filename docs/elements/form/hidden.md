## Eclair Hidden Input
An eclair hidden input element. The hidden input element binds to a value. To alter the value of the hidden input you must alter the state. You can pass a direct value, however, this value cannot be changed.
```javascript
let hiddenValue = eclair.State("secret-input")
eclair.EclairHiddenInput(hiddenValue)
    .name("User secret key")
```
### .name
Set the name attribute for a element (used in forms).
```javascript
eclair.EclairHiddenInput("Fixed")
    .name("hiddenElement")
```
