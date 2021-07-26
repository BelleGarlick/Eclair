_elements.layout.vstack_
## Eclair VStack
Create a vertically stacked view in eclair.
**args**:
- elements: Elements within the view.
```javascript
eclair.EclairVStack([
   eclair.Text("This is a view"),
   eclair.Button("Views can have multiple elements"),
   "Or even just html"
])
```
### .addChild
Add a child element to this object.
**args**:
- child: Can be either raw html or an eclair element. 
```javascript
eclair.VStack()
    .addChild(eclair.Text("Add an eclair object"))
    .addChild("Add raw text")
    .addChild("<p>Or even HTML</p>")
```
### .alignment
Set the alignment of child items.
**args**:
- alignment: Takes in an eclair elignment state object.
```javascript
eclair.VStack()
    .alignment(eclair.Alignment().center())
```
