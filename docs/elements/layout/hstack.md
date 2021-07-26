[_elements.layout.hstack_](https://github.com/SamGarlick/Eclair/tree/main/src/elements/layout/hstack.js)
## Eclair EclairHStack
Create a horizontally stacked view in eclair.
<br/>**args**:
- elements: Elements within the view.
```javascript
eclair.HStack([
   eclair.Text("This is a view"),
   eclair.Button("Views can have multiple elements"),
   "Or even just html"
])
```
### .addChild
Add a child element to this object.
<br/>**args**:
- child: Can be either raw html or an eclair element. 
```javascript
eclair.HStack()
    .addChild(eclair.Text("Add an eclair object"))
    .addChild("Add raw text")
    .addChild("<p>Or even HTML</p>")
```
### .alignment
Set the alignment of child items.
<br/>**args**:
- alignment: Takes in an eclair elignment state object.
```javascript
eclair.HStack()
    .alignment(eclair.Alignment().center())
```
