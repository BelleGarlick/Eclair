## Eclair VStack
Create a vertically stacked view in eclair.
<br/>**args**:
- elements: Elements within the view.
```javascript
eclair.VStack([
   eclair.Text("This is a view"),
   eclair.Button("Views can have multiple elements"),
   "Or even just html"
])
    .gap("8px")
```
### .addChild
Add a child element to this object.
<br/>**args**:
- child: Can be either raw html or an eclair element. 
```javascript
eclair.VStack()
    .addChild(eclair.Text("Add an eclair object"))
    .addChild("Add raw text")
    .addChild("<p>Or even HTML</p>")
```
### .alignment
Set the alignment of child items.
<br/>**args**:
- alignment: Takes in an eclair elignment state object.
```javascript
eclair.VStack()
    .alignment(eclair.Alignment().center())
```

<br/><br/>Source: [_elements.layout.vstack_](https://github.com/SamGarlick/Eclair/tree/main/src/elements/layout/vstack.js)