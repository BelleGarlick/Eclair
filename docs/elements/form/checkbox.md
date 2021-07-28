## Eclair Check Box
An eclair checkbox, similar to the toggle in the form of a traditional checkbox.
```javascript
let checked = eclair.State(false)
eclair.CheckBox(checked)
    .name("Over 18?")
```
### .checkbox
This function allows you to access this object's check box as a means modify it.
<br/>**args**:
- callback: Call back function which passes the checkbox element as a parameter.
```javascript
eclair.CheckBox(false)
    .checkbox((element) => {
        element.background("red")
    })
```
### .label
This function allows you to access this object's label as a means modify it.
<br/>**args**:
- callback: Call back function which passes the label element as a parameter.
```javascript
eclair.CheckBox(false)
    .label((element) => {
        element.opacity("0.5")
    })
```
### .text
Set the visible text shown with the check box.
<br/>**args**:
- text: The text given to the checkbox.
```javascript
eclair.CheckBox(false)
    .text("Over 18?")
```
### .name
Set the name attribute for this element (used in forms).
<br/>**args**:
- name: The name attribute name given to the element.
```javascript
eclair.CheckBox(false)
    .name("fname")
```
### .enabled
Enable / Disable the element.
<br/>**args**:
- enabled: If true, the user can modify this element.
```javascript
eclair.CheckBox(false)
    .enabled(true)
```

<br/>Source: [_elements.form.checkbox_](https://github.com/SamGarlick/Eclair/tree/main/src/elements/form/checkbox.js)