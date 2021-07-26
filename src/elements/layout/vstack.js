/// ## Eclair VStack
/// Create a vertically stacked view in eclair.
/// **args**:
/// - elements: Elements within the view.
/// ```javascript
/// eclair.EclairVStack([
///    eclair.Text("This is a view"),
///    eclair.Button("Views can have multiple elements"),
///    "Or even just html"
/// ])
/// ```
class EclairVStack extends EclairView {
    constructor(func) {
        super(func)
        this
            .display("flex")
            .flexDirection("column")
            .alignItems("center")
        this.css("justify-content: space-around;")
        
        // Need to remove view as given by parent
        this.removeStyle(eclair.styles.View)
        this.addStyle(eclair.styles.VStack)
    }
    
    /// INCLUDE elements.layout.view.addChild eclair.VStack()
    
    /// SHARED alignment eclair.VStack()
    /// ### .alignment
    /// Set the alignment of child items.
    /// **args**:
    /// - alignment: Takes in an eclair elignment state object.
    /// ```javascript
    /// WILDCARD
    ///     .alignment(eclair.Alignment().center())
    /// ```
    /// END-SHARED
    alignment(_alignment) {
        if (_alignment instanceof EclairState) {
            _alignment.addCallback(this.id() + "-alignment", function(state) {
                this._setAlignment(state.value())
            }, true)
        } else {
            this._setAlignment(_alignment)
        }
        return this
    }
    
    _setAlignment(_alignment) {
        if (_alignment == "start") {
            this.alignItems("flex-start")
        } 
        else if (_alignment == "center") {
            this.alignItems("center")
        }
        else if (_alignment == "end") {
            this.alignItems("flex-end")
        }
        else if (_alignment == "stretch") {
            this.alignItems("stretch")
        } else {
            throw "Unknown alignment"
        }
    }
}