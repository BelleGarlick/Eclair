/// ## Eclair VStack
/// Create a vertically stacked view in eclair.
/// <br/>**args**:
/// - elements: Elements within the view.
/// ```javascript
/// eclair.VStack([
///    eclair.Text("This is a view"),
///    eclair.Button("Views can have multiple elements")
/// ])
///     .gap("8px")
/// ```
///
/// <br/>**args**:
/// - elements: Elements within the view.
/// - objectFunction: A function which returns the constructed object.
/// ```javascript
/// eclair.VStack([
///     {'name': 'Joe Briggs', 'age': 28},
///     {'name': 'Amy Wong', 'age': 24},
///     {'name': 'Dustin James', 'age': 15}
/// ], item => {
///    return eclair.HStack([
///        eclair.Text(item.name),
///        eclair.Text(item.age)
///    ])
/// })
/// ```
class EclairVStack extends EclairView {
    constructor(elems, creatorFunc) {
        super(elems, creatorFunc)
        
        this
            .display("flex")
            .flexDirection("column")
            .alignItems("center")
            .justifyContent("space-around")
        
        // Need to remove view as given by parent
        this.removeStyle(eclair.styles.View)
        this.addStyle(eclair.styles.VStack)
    }
    
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