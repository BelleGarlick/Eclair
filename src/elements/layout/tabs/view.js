/// TITLE Eclair Tab View
/// EXTENDS elements.layout.view:EclairView
/// DESC Create a tab view capable of hiding and showing states.

Eclair.TabView = function(_tab, _elements, _func) {
    return new EclairTabView(_tab, _elements, _func);
}

/// SHARED-STYLE Eclair.styles.TabView: Tab View style.
Eclair.styles.TabView = Eclair.Style("eclair-style-tab-view")
    .display("flex")
    .boxSizing("border-box")
    .alignItems("center")

/// ```javascript
/// let selectedTab = State(0)
///
/// Eclair.TabView(selectedTab, [
///     Eclair.TabPage([
///         Eclair.Text("Tab 1"),
///         Eclair.Button("Next")
///             .onClick(_ => {selectedTab.value(1)})
///     ]),
///     Eclair.TabPage([
///         Eclair.Text("Tab 2"),
///         Eclair.Button("Prev")
///             .onClick(_ => {selectedTab.value(0)}),
///         Eclair.Button("Next")
///             .onClick(_ => {selectedTab.value(2)})
///     ]),
///     Eclair.TabPage([
///         Eclair.Text("Tab 3"),
///         Eclair.Button("Prev")
///             .onClick(_ => {selectedTab.value10)})
///     ]),
/// ])
/// ```
class EclairTabView extends EclairView {
    
    /// METHOD constructor
    /// DESC Construct an eclair TabView object. 
    /// ARG selectedView: Selected tab page.
    /// ARG elements: List of all child elements.
    /// ARG func: A callback function called for each child object. For more details see elements.layout.view.
    /// ```javascript
    /// Eclair.TabView([
    ///     Eclair.TabPage([...]),
    ///     Eclair.TabPage([...]),
    /// ])
    /// ```
    /// ```javascript
    /// Eclair.TabView([
    ///     {"id": "0", ...},
    ///     {"id": "1", ...},
    /// ], e => {return TabPage([...])})
    /// ```
    
    constructor(_selectedView, elements, func) {
        super(elements, func)
        
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
        
        // Need to remove view as given by parent
        this.removeStyle(Eclair.styles.View)
        this.addStyle(Eclair.styles.TabView)
    }
    
    // Overwrite child checker to check if child is of type tab page.
    _isValidChild(child) {
        let valid = child instanceof EclairTabPage
        if (!valid) {
            throw "All tab view children should be an eclair TabPage"
        }
        return valid
    }
}







*** TEST 
var text1 = Eclair.View([Eclair.Text("Tab A")])
var text2 = Eclair.View([Eclair.Text("Tab B")])

Eclair.TabView(Ø(0), [text1, text2]).write()

**eval(window.getComputedStyle(text2.getElement(), null).display, "none")

*** TEST 
var text1 = Eclair.View([Eclair.Text("Tab A")])
var text2 = Eclair.View([Eclair.Text("Tab B")])
Eclair.TabView(Ø(1), [text1, text2]).write()

**eval(window.getComputedStyle(text1.getElement(), null).display, "none")

*** TEST 
var text1 = Eclair.View([Eclair.Text("Tab A")])
var text2 = Eclair.View([Eclair.Text("Tab B")])
var state1 = Ø(0)
Eclair.TabView(state1, [text1, text2]).write()

**eval(window.getComputedStyle(text2.getElement(), null).display, "none")
state1.value(1)
**eval(window.getComputedStyle(text1.getElement(), null).display, "none")