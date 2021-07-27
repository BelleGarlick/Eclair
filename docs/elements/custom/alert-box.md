## Eclair Alert Box
Create an alert box to display a message.
<br/>**args**:
- text: Text message to display.
```javascript
eclair.AlertBox("You have been signed out.")
    .title("Warning")
    .theme(eclair.Color().warning)
```
### .theme
Set the theme of the alert box using an Eclair Color.
<br/>**args**:
- color: An eclair color object.
```javascript
eclair.AlertBox("Invalid password")
    .theme(eclair.Color().red())
```
### .title
Set the title of the alert box.
<br/>**args**:
- text: A string or State representing the value.
```javascript
eclair.AlertBox("Invalid password")
    .title("Error")
```

<br/><br/>Source: [_elements.custom.alert-box_](https://github.com/SamGarlick/Eclair/tree/main/src/elements/custom/alert-box.js)