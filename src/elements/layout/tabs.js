/// ## Eclair TabView
/// Create a tab view capable of hiding and showing states.
/// <br/>**args**:
/// - selectedView: The selected view to display. This parameter must be an Eclair State object
/// - elements: Elements within the view. All direct children must be of type EclairView
/// ```javascript
/// let selectedTab = State(0)
///
/// eclair.TabView(selectedTab, [
///     eclair.View([
///         eclair.Text("Tab 1")
///     ]),
///     eclair.View([
///         eclair.Text("Tab 2")
///     ]),
///     eclair.View([
///         eclair.Text("Tab 3")
///     ]),
/// ])
/// ```
class EclairTabView extends EclairView {
    constructor(_selectedView, elements) {
        super(elements)
        
        // Add callback for selecting tabs
        if (_selectedView instanceof EclairState) {
            this.bindState(_selectedView, "tab", value => {
                for (let e = 0; e < this.children.length; e++) {
                    this.children[e].display(value == e? "flex": "none")
                }
            }, state => {return state.int(0)})
        } else {
            throw "First parameter of Eclair TabView's must be an Eclair State"
        }
        
        // TODO Make sure all children are of type TabPage (todo)
        
        // Need to remove view as given by parent
        this.removeStyle(eclair.styles.View)
        this.addStyle(eclair.styles.TabView)
    }
}




*** TEST 
var text1 = eclair.View([eclair.Text("Tab A")])
var text2 = eclair.View([eclair.Text("Tab B")])

eclair.TabView(eclair.State(0), [text1, text2]).write()

**eval(window.getComputedStyle(text2.getElement(), null).display, "none")

*** TEST 
var text1 = eclair.View([eclair.Text("Tab A")])
var text2 = eclair.View([eclair.Text("Tab B")])
eclair.TabView(eclair.State(1), [text1, text2]).write()

**eval(window.getComputedStyle(text1.getElement(), null).display, "none")

*** TEST 
var text1 = eclair.View([eclair.Text("Tab A")])
var text2 = eclair.View([eclair.Text("Tab B")])
var state1 = eclair.State(0)
eclair.TabView(state1, [text1, text2]).write()

**eval(window.getComputedStyle(text2.getElement(), null).display, "none")
state1.value(1)
**eval(window.getComputedStyle(text1.getElement(), null).display, "none")