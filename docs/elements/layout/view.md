## Eclair View
Create a generic eclair View.
<br/>**args**:
- elements: Elements within the view.
```javascript
eclair.View([
   eclair.Text("This is a view"),
   eclair.Button("Views can have multiple elements")
])
```

<br/>**args**:
- elements: Elements within the view.
- objectFunction: A function which returns the constructed object.
```javascript
eclair.View([
    {'name': 'Joe Briggs', 'age': 28},
    {'name': 'Amy Wong', 'age': 24},
    {'name': 'Dustin James', 'age': 15}
], item => {
   return eclair.HStack([
       eclair.Text(item.name),
       eclair.Text(item.age)
   ])
})
```

<br/>Source: [_elements.layout.view_](https://github.com/SamGarlick/Eclair/tree/main/src/elements/layout/view.js)