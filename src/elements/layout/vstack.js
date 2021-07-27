/// ## Eclair VStack
/// Create a vertically stacked view in eclair.
/// <br/>**args**:
/// - elements: Elements within the view.
/// ```javascript
/// eclair.VStack([
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
    /// <br/>**args**:
    /// - alignment: Takes in an eclair elignment state object.
    /// ```javascript
    /// WILDCARD
    ///     .alignment(eclair.Alignment().center())
    /// ```
    /// END-SHARED
    alignment(_alignment) {
        this.bindState(_alignment, "alignment", value => {
            if (value == "start") {
                this.alignItems("flex-start")
            } 
            else if (value == "center") {
                this.alignItems("center")
            }
            else if (value == "end") {
                this.alignItems("flex-end")
            }
            else if (value == "stretch") {
                this.alignItems("stretch")
            } else {
                throw "Unknown alignment"
            }
        })  
        
        return this
    }
}