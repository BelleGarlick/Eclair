## Eclair Select
An eclair Select object.
<br/>**args**:
- selectedValue: A binding for the selected value.
```javascript
let selectedValue = eclair.State()
eclair.Select(selectedValue)
    .addOptions(["apple", "orange", "banana"])
```
### .name
Set the name attribute for this element (used in forms).
<br/>**args**:
- name: The name attribute name given to the element.
```javascript
eclair.Select()
    .name("fname")
```
### .selectedIndex
A value which represents the selected item of the select box.
<br/>**args**:
- index: The index to select.
```javascript
eclair.Select()
    .addOptions(["apple", "orange", "banana"])
    .selectedIndex(1)
```
### .addOption
Add a singular string value to the list.
<br/>**args**:
- value: The value of option as returned in the form.
- text: (Optional) The text value displayed to the user. If not present the text will take on the value string.
- selected: (Optional) If true, this option will be the default selected option.
```javascript
eclair.Select()
    .addOption("apple")
    .addOption("orange", "Clementine")
    .addOption("banana", "banana", true)
```
### .addOptions
Add multiple values to the select box.
<br/>**args**:
- items: List of strings to display in the select box.
```javascript
eclair.Select()
    .addOptions(["apple", "orange", "banana"])
```
### .removeOption
Removes a string option from the list of options.
<br/>**args**:
- value: The value to remove from the list of options.
```javascript
eclair.Select()
    .addOptions(["apple", "orange", "banana"])
    .removeOptions("orange")
```

<br/>Source: [_elements.form.select_](https://github.com/SamGarlick/Eclair/tree/main/src/elements/form/select.js)