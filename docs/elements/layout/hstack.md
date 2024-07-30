# Eclair HStack [extends [EclairView](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/layout/view.md)]
Source: [_elements.layout.hstack_](https://github.com/SamGarlick/Eclair/tree/main/src/elements/layout/hstack.js)<br/><br/>
Create a horizontally stacked view in Eclair.
**
Eclair.styles.HStack**  HStack style.
```javascript
Eclair.HStack([
   Eclair.Text("This is a view"),
   Eclair.Button("Views can have multiple elements")
])
    .gap("8px")
```
```javascript
Eclair.HStack([
    {'name': 'Joe Briggs', 'age': 28},
    {'name': 'Amy Wong', 'age': 24},
    {'name': 'Dustin James', 'age': 15}
], item => {
   return Eclair.Text(item.name + " " + item.age)
})
```
### constructor
Construct an eclair HStack object. 

elements: List child items.

itemFunction: A callback function called for each child object. For more details see elements.layout.view.
```javascript
Eclair.HStack([
    Eclair.Text('...'),
    Eclair.Button('...')
        .onClick(...)
])
```
### .alignment
Set the alignment of child items.

alignment: Takes in an eclair elignment state object and calls the 'this.alignItems' style.
```javascript
Eclair.HStack([...])
    .alignment(Eclair.Alignment().center())
```

### Inherits from: elements.component
 - [.id()](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/component.md#id)
 - [.eID()](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/component.md#eID)
 - [.addStyle()](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/component.md#addStyle)
 - [.removeStyle()](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/component.md#removeStyle)