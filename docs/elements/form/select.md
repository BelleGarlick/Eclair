## Eclair Select
An eclair Select object.
<br/>**args**:
- options: A list of options that the user can select from
```javascript
eclair.Select(["apple", "orange", "banana"])
```
### .value
A value which represents the selected item of the select box.
<br/>**args**:
- value: The value to set the select to.
```javascript
eclair.Select(["apple", "orange", "banana"])
    .value("banana")
```
### .selectedIndex
A value which represents the selected item of the select box.
<br/>**args**:
- index: The index to select.
```javascript
eclair.Select(["apple", "orange", "banana"])
    .selectedIndex(1)
```

<br/>Source: [_elements.form.select_](https://github.com/SamGarlick/Eclair/tree/main/src/elements/form/select.js)