# Eclair Tab View [extends [EclairView](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/layout/view.md)]
Source: [_elements.layout.tabs.view_](https://github.com/SamGarlick/Eclair/tree/main/src/elements/layout/tabs/view.js)<br/><br/>
Create a tab view capable of hiding and showing states.
**
Eclair.styles.TabView**  Tab View style.
```javascript
let selectedTab = State(0)

Eclair.TabView(selectedTab, [
    Eclair.TabPage([
        Eclair.Text("Tab 1"),
        Eclair.Button("Next")
            .onClick(_ => {selectedTab.value(1)})
    ]),
    Eclair.TabPage([
        Eclair.Text("Tab 2"),
        Eclair.Button("Prev")
            .onClick(_ => {selectedTab.value(0)}),
        Eclair.Button("Next")
            .onClick(_ => {selectedTab.value(2)})
    ]),
    Eclair.TabPage([
        Eclair.Text("Tab 3"),
        Eclair.Button("Prev")
            .onClick(_ => {selectedTab.value10)})
    ]),
])
```
### constructor
Construct an eclair TabView object. 

selectedView: Selected tab page.

elements: List of all child elements.

func: A callback function called for each child object. For more details see elements.layout.view.
```javascript
Eclair.TabView([
    Eclair.TabPage([...]),
    Eclair.TabPage([...]),
])
```
```javascript
Eclair.TabView([
    {"id": "0", ...},
    {"id": "1", ...},
], e => {return TabPage([...])})
```

### Inherits from: elements.component
 - [.id()](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/component.md#id)
 - [.eID()](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/component.md#eID)
 - [.addStyle()](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/component.md#addStyle)
 - [.removeStyle()](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/component.md#removeStyle)