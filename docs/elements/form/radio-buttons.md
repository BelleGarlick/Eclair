### .add
Add an item to the options the user can choose.
<br/>**args**:
- value: The value of the item.
- text: The text shown to the user.
```javascript
eclair.RadioButtons()
    .add("Apple")
    .add("Yellow Apple", "Banana")
```
### .addItems
Add a list of items as values to the list.
<br/>**args**:
- items: Add a list of items the user can select.
```javascript
eclair.RadioButtons()
    .addItems(["Apple", "Banana", "Orange"])
```
### .removeItem
Remove an item by value.
<br/>**args**:
- value: Remove a value with a given value.
```javascript
eclair.RadioButtons()
    .add("Apple")
    .add("Banana")
    .remove("Apple")
```
### .removeIndex
Remove an item at an index.
<br/>**args**:
- index: Remove an item at an index.
```javascript
eclair.RadioButtons()
    .add("Apple")
    .add("Banana")
    .removeIndex(0)
```

<br/>Source: [_elements.form.radio-buttons_](https://github.com/SamGarlick/Eclair/tree/main/src/elements/form/radio-buttons.js)