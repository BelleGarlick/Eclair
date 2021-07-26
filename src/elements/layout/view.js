/// ## Eclair View
/// Create a generic eclair View.
/// **args**:
/// - elements: Elements within the view.
/// ```javascript
/// eclair.EclairView([
///    eclair.Text("This is a view"),
///    eclair.Button("Views can have multiple elements"),
///    "Or even just html"
/// ])
/// ```
class EclairView extends EclairComponent {
    constructor(elements) {
        super()
        
        if (elements != null) {
            for (let i = 0; i < elements.length; i++) {
                this.addChild(elements[i])
            }
        }
        
        this.addStyle(eclair.styles.View)
    }
    
    /// SHARED addChild eclair.View()
    /// ### .addChild
    /// Add a child element to this object.
    /// **args**:
    /// - child: Can be either raw html or an eclair element. 
    /// ```javascript
    /// WILDCARD
    ///     .addChild(eclair.Text("Add an eclair object"))
    ///     .addChild("Add raw text")
    ///     .addChild("<p>Or even HTML</p>")
    /// ```
    /// END-SHARED
    addChild(_child) {
        this.children.push(_child)
        if (_child instanceof EclairComponent) {
            _child.parent = this
        }
        
        this.getElement(e => {
            let childHTML = child;
            if (_child instanceof EclairComponent) {
                childHTML = _child.compile()
            }
            e.insertAdjacentHTML('beforeend', childHTML)
        })
    }
    
    build () {                
        let code = ""
        for (let e = 0; e < this.children.length; e++) {
            let child = this.children[e];
            
            if (child instanceof EclairComponent) {
                code += this.children[e].compile();
            }

            else if (typeof(child) == "string") { 
                code += child
            } 
            
            else {
                console.log(child)
                throw `Unable to compile object type: ${typeof(child)}`
            }
        }
        
        return "<div>" + code + "</div>";
    }
}