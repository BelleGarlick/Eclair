## Eclair View
Create a generic eclair View.
<br/>**args**:
- elements: Elements within the view.
```javascript
eclair.View([
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
eclair.View()
    .addChild(eclair.Text("Add an eclair object"))
    .addChild("Add raw text")
    .addChild("<p>Or even HTML</p>")
```

<br/><br/>Source: [_elements.layout.view_](https://github.com/SamGarlick/Eclair/tree/main/src/elements/layout/view.js)