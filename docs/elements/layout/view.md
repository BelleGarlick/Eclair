_elements.layout.view_
## Eclair View
Create a generic eclair View.
**args**:
- elements: Elements within the view.
```javascript
eclair.EclairView([
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
eclair.View()
    .addChild(eclair.Text("Add an eclair object"))
    .addChild("Add raw text")
    .addChild("<p>Or even HTML</p>")
```
