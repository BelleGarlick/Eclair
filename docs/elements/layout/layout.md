_elements.layout.layout_
### .addChild
Add a child element to this object.
**args**:
- child: Can be either raw html or an eclair element. 
```javascript
eclair.HStack()
    .addChild(eclair.Text("Add an eclair object"))
    .addChild("Add raw text")
    .addChild("<p>Or even HTML</p>")
```
### .alignment
Set the alignment of child items.
**args**:
- alignment: Takes in an eclair elignment state object.
```javascript
eclair.HStack()
    .alignment(eclair.Alignment().center())
```
