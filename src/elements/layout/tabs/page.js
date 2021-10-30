/// TITLE Eclair Tab Page
/// EXTENDS elements.layout.view:EclairView
/// DESC A view stored within a tab view. 

Eclair.TabPage = function(_elements, _func) {
    return new EclairTabPage(_elements, _func);
}

/// SHARED-STYLE Eclair.styles.TabPage: Tab page style.
Eclair.styles.TabPage = Eclair.Style("eclair-style-tab-page")

/// ```javascript
/// Eclair.TabView(Ø(0), [
///    Eclair.TabPage([...]),
///    Eclair.TabPage([...]),
/// ])
///     .gap("8px")
/// ```
class EclairTabPage extends EclairView {
        
    /// METHOD constructor
    /// DESC Construct an eclair TabPage object. 
    /// ARG elements: List child items.
    /// ARG func: A callback function called for each child object. For more details see elements.layout.view.
    /// ```javascript
    /// Eclair.TabPage([
    ///     Eclair.Text('...'),
    ///     Eclair.Button('...')
    ///         .onClick(...)
    /// ])
    /// ```
    /// ```javascript
    /// Eclair.TabPage([
    ///     {"name": "Sam", "gender": "Male"},
    ///     {"name": "Amie", "gender": "NB"}
    /// ], e => {return Text(e.name + " " + e.gender)})
    /// ```
    constructor(elements, func) {
        super(elements, func)
        
        this.removeStyle(Eclair.styles.View)
        this.addStyle(Eclair.styles.TabPage)
    }
}
