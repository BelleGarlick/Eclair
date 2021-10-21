## Eclair Toggle
An eclair toggle element.
```javascript
let on = Ø(true)
eclair.Toggle(on)
```
### .knob
This function allows you to access the toggle's knob as a means modify it.
```javascript
eclair.Toggle(true)
    .knob((element) => {
        element.background("red")
    })
```
### .name
Set the name attribute for a textbox (used in forms).
```javascript
eclair.Toggle(true)
    .name("fname")
```
### .enabled
Enable / Disable the element.
<br/>**args**:
- enabled: If true, the user can modify this element.
```javascript
eclair.Toggle(false)
    .enabled(true)
```
### .showTick
Set whether the tick is showing.    
```javascript
eclair.Toggle(false)
    .showTick(true)
```

<br/>Source: [_elements.form.toggle_](https://github.com/SamGarlick/Eclair/tree/main/src/elements/form/toggle.js)