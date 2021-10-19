## Eclair HStack
Create a horizontally stacked view in eclair.
<br/>**args**:
- elements: Elements within the view.
```javascript
eclair.HStack([
   eclair.Text("This is a view"),
   eclair.Button("Views can have multiple elements")
])
    .gap("8px")
```

<br/>**args**:
- elements: Elements within the view.
- objectFunction: A function which returns the constructed object.
```javascript
eclair.HStack([
    {'name': 'Joe Briggs', 'age': 28},
    {'name': 'Amy Wong', 'age': 24},
    {'name': 'Dustin James', 'age': 15}
], item => {
   return eclair.VStack([
       eclair.Text(item.name),
       eclair.Text(item.age)
   ])
})
```
### .alignment
Set the alignment of child items.
<br/>**args**:
- alignment: Takes in an eclair elignment state object.
```javascript
eclair.HStack()
    .alignment(eclair.Alignment().center())
```

<br/>Source: [_elements.layout.hstack_](https://github.com/SamGarlick/Eclair/tree/main/src/elements/layout/hstack.js)