/// ## Eclair View
/// Create a generic eclair View.
/// <br/>**args**:
/// - elements: Elements within the view.
/// ```javascript
/// eclair.View([
///    eclair.Text("This is a view"),
///    eclair.Button("Views can have multiple elements"),
///    "Or even just html"
/// ])
/// ```
class EclairView extends EclairComponent {
    constructor(elements) {
        super()
        
        if (elements instanceof Array) {
            if (elements != null) {
                for (let i = 0; i < elements.length; i++) {
                    this._addChild(elements[i])
                }
            }
        } else if (elements instanceof EclairState && elements.isArray()) {
            this.bindState(elements, "element", array => {
                let children = new Set(this.children)
                for (let i = 0; i < array.length; i++) {
                    let newChild = array[i]
                    if (!children.has(newChild)) {
                        this._addChild(newChild)
                        children.add(newChild)
                    }
                } 
            })
        }
        
        this.addStyle(eclair.styles.View)
    }
    
    _addChild(_child) {
        this.children.push(_child)
        if (_child instanceof EclairComponent) {
            _child.parent = this
        }
        
        this.getElement(e => {
            let childHTML = _child;
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
                throw `Unable to compile object type: ${typeof(child)}`
            }
        }
        
        return "<div>" + code + "</div>";
    }
}