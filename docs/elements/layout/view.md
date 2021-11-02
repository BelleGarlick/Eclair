# Eclair View [extends [EclairComponent](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/component.md)]
Source: [_elements.layout.view_](https://github.com/SamGarlick/Eclair/tree/main/src/elements/layout/view.js)<br/><br/>
Create a generic eclair View.
**
Eclair.styles.View**  Shared View style.
```javascript
Eclair.View([
    Eclair.Text('...'),
    Eclair.Button('...')
        .onClick(...)
])
```
### constructor
Construct an eclair View element. 

elements: **List** of child items.

creatorFunc: A callback function called for each child object. This allows the child elements to be a dictionary or other type, then the view for that object can be dynamically build by this funciton. For example, a server could dynamically load json data from the server and uses it to directly update this view. This function can then build the appropriate object from the given json data. 
```javascript
Eclair.View([
    Eclair.Text('...'),
    Eclair.Button('...')
        .onClick(...)
])
```
```javascript
let users = Ø([
    {"name": "Sam"},
    {"name": "James"},
    {"name": "Alex"} 
])

Eclair.View([
    Eclair.View(users, e => {
        return Text(e.name)
    }),
    Eclair.Button("Add")
        .onClick(_ => {
            users.add({"name": "Isaac"})
        })
])
```