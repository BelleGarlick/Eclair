# Eclair Check Box__extends [EclairComponent](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/component.md)__<br/>

Source: [_elements.form.checkbox_](https://github.com/SamGarlick/Eclair/tree/main/src/elements/form/checkbox.js)
An eclair checkbox, similar to the toggle in the form of a traditional checkbox.
**Eclair.styles.CheckBox**  Default Checkbox object style.
**Eclair.styles.CheckBoxLabel**  Default Checkbox Label object style.
**Eclair.styles.CheckBoxIcon**  Default Checkbox icon object style.
**Eclair.styles.CheckBoxActiveIcon**  Default Active Checkbox style.
```javascript
let checked = Ø(false)

Eclair.CheckBox(checked)
    .name("Over 18?")
    .onClick(_ => {
        alert(checked.value())
    })
```
### constructor
Construct an eclair checkbox.
checked: State whether the checkbox is checked.
```javascript
Eclair.CheckBox(true)
```
### .checkbox
This function allows you to access this object's check box as a means modify it.
callback: Call back function which passes the checkbox element as a parameter.
```javascript
Eclair.CheckBox(false)
    .checkbox((element) => {
        element.background("red")
    })
```
### .label
This function allows you to access this object's label as a means modify it.
callback: Call back function which passes the label element as a parameter.
```javascript
Eclair.CheckBox(false)
    .label((element) => {
        element.opacity("0.5")
    })
```
### .text
Set the visible text shown with the check box.
callback: The text given to the checkbox.
```javascript
Eclair.CheckBox(false)
    .text("Over 18?")
```
### .name
Set the name attribute for this element (used in forms).
name: The name attribute name given to the element.
```javascript
Eclair.CheckBox(false)
    .name("fname")
```
### .enabled
Enable / Disable the element.
enabled: If true, the user can modify this element.
```javascript
Eclair.CheckBox(false)
    .enabled(true)
```