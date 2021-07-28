## Eclair TabView
Create a tab view capable of hiding and showing states.
<br/>**args**:
- selectedView: The selected view to display. This parameter must be an Eclair State object
- elements: Elements within the view. All direct children must be of type EclairView
```javascript
let selectedTab = State(0)

eclair.TabView(selectedTab, [
    eclair.View([
        eclair.Text("Tab 1")
    ]),
    eclair.View([
        eclair.Text("Tab 2")
    ]),
    eclair.View([
        eclair.Text("Tab 3")
    ]),
])
```
### .addChild
Add a child element to this object. The child element must be of type EclairView
<br/>**args**:
- child: Can be either raw html or an eclair element. 
```javascript
let selectedTab = State(0)

eclair.TabView(selectedTab)
    .addChild(eclair.View(eclair.Text("Tab 1")))
    .addChild(eclair.View(eclair.Text("Tab 2")))
    .addChild(eclair.View(eclair.Text("Tab 3")))
```

<br/>Source: [_elements.layout.tabs_](https://github.com/SamGarlick/Eclair/tree/main/src/elements/layout/tabs.js)