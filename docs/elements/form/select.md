# Eclair Select [extends [EclairView](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/layout/view.md)]
Source: [_elements.form.select_](https://github.com/SamGarlick/Eclair/tree/main/src/elements/form/select.js)<br/><br/>
An eclair select element.
**
Eclair.styles.Select**  Select style.
```javascript
Eclair.Select(["apple", "orange", "banana"])
    .selectedIndex(0)
```
### constructor
Construct an eclair Select object.

items: Text items listed in the element.
```javascript
Eclair.Select(["apple", "orange", "banana"])
```
### .value
A value which represents the selected item of the select box.

value: The value to set the select to.
```javascript
Eclair.Select(["apple", "orange", "banana"])
    .value("banana")
```
### .selectedIndex
A value which represents the selected item of the select box.

index: The index to select.
```javascript
Eclair.Select(["apple", "orange", "banana"])
    .selectedIndex(1)
```

### Inherits from: elements.component
 - [.id()](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/component.md#id)
 - [.eID()](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/component.md#eID)
 - [.addStyle()](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/component.md#addStyle)
 - [.removeStyle()](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/component.md#removeStyle)