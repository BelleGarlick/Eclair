/// TITLE Eclair VStack
/// EXTENDS elements.layout.view:EclairView
/// DESC Create a horizontally stacked view in Eclair.

Eclair.VStack = function(_elements, _func) {
    return new EclairVStack(_elements, _func);
}

/// SHARED-STYLE Eclair.styles.VStack: VStack style.
Eclair.styles.VStack = Eclair.Style("eclair-style-vstack")
    .boxSizing("border-box")
    .display("flex")
    .flexDirection("column")
    .alignItems("center")
    .justifyContent("space-around")

/// ```javascript
/// Eclair.VStack([
///    Eclair.Text("This is a view"),
///    Eclair.Button("Views can have multiple elements")
/// ])
///     .gap("8px")
/// ```
/// ```javascript
/// Eclair.VStack([
///     {'name': 'Joe Briggs', 'age': 28},
///     {'name': 'Amy Wong', 'age': 24},
///     {'name': 'Dustin James', 'age': 15}
/// ], item => {
///    return Eclair.Text(item.name + " " + item.age)
/// })
/// ```
class EclairVStack extends EclairView { 
    
    /// METHOD constructor
    /// DESC Construct an eclair VStack object. 
    /// ARG elements: List child items.
    /// ARG itemFunction: A callback function called for each child object. For more details see elements.layout.view.
    /// ```javascript
    /// Eclair.VStack([
    ///     Eclair.Text('...'),
    ///     Eclair.Button('...')
    ///         .onClick(...)
    /// ])
    /// ```
    constructor(elems, creatorFunc) {
        super(elems, creatorFunc)
        
        // Need to remove view as given by parent
        this.removeStyle(Eclair.styles.View)
        this.addStyle(Eclair.styles.VStack)
    }
                
    /// METHOD .alignment
    /// DESC Set the alignment of child items.
    /// ARG alignment: Takes in an eclair elignment state object and calls the 'this.alignItems' style.
    /// ```javascript
    /// Eclair.VStack([...])
    ///     .alignment(Eclair.Alignment().center())
    /// ```
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
