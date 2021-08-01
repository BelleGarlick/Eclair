// WARN TEST TAB VIEW BINDING TO ELEMENTS
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
        
        // Need to remove view as given by parent
        this.removeStyle(eclair.styles.View)
        this.addStyle(eclair.styles.TabView)
    }
    
    /// ### .addChild
    /// Add a child element to this object. The child element must be of type EclairView
    /// <br/>**args**:
    /// - child: Can be either raw html or an eclair element. 
    /// ```javascript
    /// let selectedTab = State(0)
    ///
    /// eclair.TabView(selectedTab)
    ///     .addChild(eclair.View(eclair.Text("Tab 1")))
    ///     .addChild(eclair.View(eclair.Text("Tab 2")))
    ///     .addChild(eclair.View(eclair.Text("Tab 3")))
    /// ```
    // This function overrides the parent function to check that the child is of type eclair view.
    _addChild(_child) {
        if (_child instanceof EclairView) {
            this.children.push(_child)
            _child.parent = this

            this.getElement(e => {
                let childHTML = child;
                if (_child instanceof EclairComponent) {
                    childHTML = _child.compile()
                }
                e.insertAdjacentHTML('beforeend', childHTML)
            })
        } else {
            throw "All children of Eclair's Tab View must inherit from an Eclair View"
        }
    }
}