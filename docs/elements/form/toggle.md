# Eclair Toggle component__extends [EclairComponent](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/component.md)__<br/>

Source: [_elements.form.toggle_](https://github.com/SamGarlick/Eclair/tree/main/src/elements/form/toggle.js)
An eclair toggle component.
**Eclair.styles.Toggle**  Toggle style.
**Eclair.styles.ToggleTick**  Tick style style.
**Eclair.styles.ToggleKnob**  Knob style.
```javascript
let on = Ø(true)

Eclair.Text(on)
Eclair.Toggle(on)
```
### constructor
Construct an Toggle object.
value: Boolean denoting whether the toggle is on or off.
```javascript
Eclair.Toggle(true)
```
### .knob
This function allows you to access the toggle's knob as a means modify it.
callback: Function called with the knob element passed as an arg.
```javascript
Eclair.Toggle(true)
    .knob((element) => {
        element.background("red")
    })
```
### .name
Set the name attribute for a textbox (used in forms).
value: New name of the element.
```javascript
Eclair.Toggle(true)
    .name("fname")
```
### .enabled
Enable / Disable the element.
enabled: If true, the user can modify this element.
```javascript
Eclair.Toggle(true)
    .enabled(true)
```
### .showTick
Set whether the tick is showing.    
enabled: If true, a tick marker will be shown.
```javascript
Eclair.Toggle(true)
    .showTick(true)
```