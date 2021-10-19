/// ## Eclair HStack
/// Create a horizontally stacked view in eclair.
/// <br/>**args**:
/// - elements: Elements within the view.
/// ```javascript
/// eclair.HStack([
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
/// eclair.HStack([
///     {'name': 'Joe Briggs', 'age': 28},
///     {'name': 'Amy Wong', 'age': 24},
///     {'name': 'Dustin James', 'age': 15}
/// ], item => {
///    return eclair.VStack([
///        eclair.Text(item.name),
///        eclair.Text(item.age)
///    ])
/// })
/// ```
class EclairHStack extends EclairView {
    constructor(elements, creatorFunc) {
        super(elements, creatorFunc)
        this
            .display("flex")
            .flexDirection("row")
            .alignItems("center")
            .justifyContent("space-around")
        
        // Need to remove view as given by parent
        this.removeStyle(eclair.styles.View)
        this.addStyle(eclair.styles.HStack)
    }
    
    /// INCLUDE elements.layout.vstack.alignment eclair.HStack()
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