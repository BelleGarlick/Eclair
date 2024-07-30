# Eclair Progress Bar [extends [EclairComponent](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/component.md)]
Source: [_elements.form.radio-buttons_](https://github.com/SamGarlick/Eclair/tree/main/src/elements/form/radio-buttons.js)<br/><br/>
An eclair Radio Button object.
**
Eclair.styles.RadioButtons**  Shared Radio Button style.
**
Eclair.styles.RadioButtonsRadio**  Shared Radio Button Radio style.
**
Eclair.styles.RadioButtonsLabel**  Shared Radio Button Label style.
**
Eclair.styles.RadioButtonsItem**  Shared Radio Button Item style.
**
Eclair.styles.RadioButtonsSelectedRadio**  Shared Radio Button Selected Radio style.
**
Eclair.styles.RadioButtonsSelectedLabel**  Shared Radio Button Selected Label style.
**
Eclair.styles.RadioButtonsSelectedItem**  Shared Radio Button Selected Item style.
```javascript
Eclair.RadioButtons(["Option A", "Option B", "Option C"])
    .value("Option A")
    .selectedIndex(0)
```
### constructor
Construct the Radio Buttons object.

options: List of string objects the user can select.
```javascript
Eclair.RadioButtons(["Option A", "Option B", "Option C"])
```  
### .name
Set the name attribute for this element. (used in forms).

value: Selected value of the options.
```javascript
Eclair.RadioButtons(["Option A", "Option B", "Option C"])
    .name("value")
```  
### .value
Bind a state to the value of the radio buttons or to set the value.

value: Selected value of the options.
```javascript
Eclair.RadioButtons(["Option A", "Option B", "Option C"])
    .value("Option A")
```   
### .selectedIndex
Bind a state to the selected index of the radio buttons or to set the selected index.

index: Selected index of the options.
```javascript
Eclair.RadioButtons(["Option A", "Option B", "Option C"])
    .selectedIndex(2)
```   
### .itemStyle
Callback for modifying the item style.

callback: Callback function with arg of the style object.
```javascript
Eclair.RadioButtons(["Option A", "Option B", "Option C"])
    .itemStyle(style => {
        style.background("red")
             .background("green", "hover")
    })
```   
### .radioStyle
Callback for modifying the radio style.

callback: Callback function with arg of the style object.
```javascript
Eclair.RadioButtons(["Option A", "Option B", "Option C"])
    .radioStyle(style => {
        style.background("red")
             .background("green", "hover")
    })
```          
### .labelStyle
Callback for modifying the label style.

callback: Callback function with arg of the style object.
```javascript
Eclair.RadioButtons(["Option A", "Option B", "Option C"])
    .labelStyle(style => {
        style.background("red")
             .background("green", "hover")
    })
```               
### .selectedItemStyle
Callback for modifying the selected item style.

callback: Callback function with arg of the style object.
```javascript
Eclair.RadioButtons(["Option A", "Option B", "Option C"])
    .selectedItemStyle(style => {
        style.background("red")
             .background("green", "hover")
    })
```           
### .selectedRadioStyle
Callback for modifying the selected radio style.

callback: Callback function with arg of the style object.
```javascript
Eclair.RadioButtons(["Option A", "Option B", "Option C"])
    .selectedRadioStyle(style => {
        style.background("red")
             .background("green", "hover")
    })
```               
### .selectedLabelStyle
Callback for modifying the selected label style.

callback: Callback function with arg of the style object.
```javascript
Eclair.RadioButtons(["Option A", "Option B", "Option C"])
    .selectedLabelStyle(style => {
        style.background("red")
             .background("green", "hover")
    })
```            

### Inherits from: elements.component
 - [.id()](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/component.md#id)
 - [.eID()](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/component.md#eID)
 - [.addStyle()](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/component.md#addStyle)
 - [.removeStyle()](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/component.md#removeStyle)