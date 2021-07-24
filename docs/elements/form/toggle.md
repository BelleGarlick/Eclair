## Eclair EclairToggle
An eclair toggle element.
```javascript
let on = eclair.State(true)
eclair.Toggle(on)
```
### .knob
This function allows you to access the toggle's knob as a means modify it.
```javascript
eclair.TextBox("Sam")
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
Set whether the toggle button is enabled.    
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