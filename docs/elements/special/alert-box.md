# Eclair Alert Box [extends [EclairComponent](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/component.md)]
Source: [_elements.special.alert-box_](https://github.com/SamGarlick/Eclair/tree/main/src/elements/special/alert-box.js)<br/><br/>
Create an alert box to display a message.
**
Eclair.styles.AlertBox**  Alert box style.
**
Eclair.styles.AlertBoxTitle**  Alert box title style.
**
Eclair.styles.AlertBoxText**  Alert box text style.
```javascript
let message = Ø("")
let alertBoxDisplay = Ø("none")

Eclair.VStack([
    Eclair.AlertBox(message)
        .theme("orange")
        .title("Warning")
        .display(alertBoxDisplay),

    Eclair.Button("Click Me")
        .onClick(() => {
            message.value("You have been warned.")
            alertBoxDisplay.value("block")
        })
])
```
### constructor
Construct an Eclair Alert Box with text. This text given can be an Eclair State object.

text: The text displayed.
```javascript
Eclair.AlertBox("Invalid password")
```
### .theme
Set the theme of the alert box using an Eclair Color.

color: An eclair color object.
```javascript
Eclair.AlertBox("Invalid password")
    .theme(Eclair.Color().red())
```
### .title
Set the title of the alert box.

text: A string or State representing the value.
```javascript
Eclair.AlertBox("Invalid password")
    .title("Error")
```