## Eclair Progress Bar
An eclair progress bar object.
```javascript
eclair.RadioButtons(["Option A", "Option B", "Option C"])
    .value("Option A")
    .selectedIndex(0)
```
### .name
Set the name attribute for this element. (used in forms).
<br/>**args**:
- value: Selected value of the options.
```javascript
eclair.RadioButtons(["Option A", "Option B", "Option C"])
    .name("value")
```  
### .value
Bind a state to the value of the radio buttons or to set the value.
<br/>**args**:
- value: Selected value of the options.
```javascript
eclair.RadioButtons(["Option A", "Option B", "Option C"])
    .value("Option A")
```   
### .selectedIndex
Bind a state to the selected index of the radio buttons or to set the selected index.
<br/>**args**:
- _index: Selected index of the options.
```javascript
eclair.RadioButtons(["Option A", "Option B", "Option C"])
    .selectedIndex(2)
```   
### .itemStyle
Callback for modifying the item style.
<br/>**args**:
- callback: Callback function with arg of the style object.
```javascript
eclair.RadioButtons(["Option A", "Option B", "Option C"])
    .itemStyle(style => {
        style.background("red")
             .background("green", "hover")
    })
```   
### .radioStyle
Callback for modifying the radio style.
<br/>**args**:
- callback: Callback function with arg of the style object.
```javascript
eclair.RadioButtons(["Option A", "Option B", "Option C"])
    .radioStyle(style => {
        style.background("red")
             .background("green", "hover")
    })
```          
### .labelStyle
Callback for modifying the label style.
<br/>**args**:
- callback: Callback function with arg of the style object.
```javascript
eclair.RadioButtons(["Option A", "Option B", "Option C"])
    .labelStyle(style => {
        style.background("red")
             .background("green", "hover")
    })
```               
### .selectedItemStyle
Callback for modifying the selected item style.
<br/>**args**:
- callback: Callback function with arg of the style object.
```javascript
eclair.RadioButtons(["Option A", "Option B", "Option C"])
    .selectedItemStyle(style => {
        style.background("red")
             .background("green", "hover")
    })
```           
### .selectedRadioStyle
Callback for modifying the selected radio style.
<br/>**args**:
- callback: Callback function with arg of the style object.
```javascript
eclair.RadioButtons(["Option A", "Option B", "Option C"])
    .selectedRadioStyle(style => {
        style.background("red")
             .background("green", "hover")
    })
```               
### .selectedLabelStyle
Callback for modifying the selected label style.
<br/>**args**:
- callback: Callback function with arg of the style object.
```javascript
eclair.RadioButtons(["Option A", "Option B", "Option C"])
    .selectedLabelStyle(style => {
        style.background("red")
             .background("green", "hover")
    })
```            

<br/>Source: [_elements.form.radio-buttons_](https://github.com/SamGarlick/Eclair/tree/main/src/elements/form/radio-buttons.js)