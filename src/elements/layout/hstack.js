/// ## Eclair EclairHStack
/// Create a horizontally stacked view in eclair.
/// <br/>**args**:
/// - elements: Elements within the view.
/// ```javascript
/// eclair.HStack([
///    eclair.Text("This is a view"),
///    eclair.Button("Views can have multiple elements"),
///    "Or even just html"
/// ])
/// ```
class EclairHStack extends EclairView {
    constructor(elements) {
        super(elements)
        this
            .display("flex")
            .flexDirection("row")
            .alignItems("center")
            .css("justify-content: space-around;")
        
        // Need to remove view as given by parent
        this.removeStyle(eclair.styles.View)
        this.addStyle(eclair.styles.HStack)
    }
    
    /// INCLUDE elements.layout.view.addChild eclair.HStack()
    /// INCLUDE elements.layout.vstack.alignment eclair.HStack()
    
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