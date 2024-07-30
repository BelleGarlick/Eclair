# Eclair Tab Page [extends [EclairView](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/layout/view.md)]
Source: [_elements.layout.tabs.page_](https://github.com/SamGarlick/Eclair/tree/main/src/elements/layout/tabs/page.js)<br/><br/>
A view stored within a tab view. 
**
Eclair.styles.TabPage**  Tab page style.
```javascript
Eclair.TabView(Ø(0), [
   Eclair.TabPage([...]),
   Eclair.TabPage([...]),
])
    .gap("8px")
```
### constructor
Construct an eclair TabPage object. 

elements: List child items.

func: A callback function called for each child object. For more details see elements.layout.view.
```javascript
Eclair.TabPage([
    Eclair.Text('...'),
    Eclair.Button('...')
        .onClick(...)
])
```
```javascript
Eclair.TabPage([
    {"name": "Sam", "gender": "Male"},
    {"name": "Amie", "gender": "NB"}
], e => {return Text(e.name + " " + e.gender)})
```

### Inherits from: elements.component
 - [.id()](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/component.md#id)
 - [.eID()](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/component.md#eID)
 - [.addStyle()](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/component.md#addStyle)
 - [.removeStyle()](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/component.md#removeStyle)