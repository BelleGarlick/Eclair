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
///
/// <br/>**args**:
/// - elements: Elements within the view.
/// - objectFunction: A function which returns the constructed object.
/// ```javascript
/// eclair.View([
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
class EclairView extends EclairComponent {
    constructor(elements, creatorFunc) {
        super("view")
        this.creatorFunc = (creatorFunc != null)? creatorFunc : (e) => {return e}
        
        let self = this;
        if (elements instanceof Array) {
            if (elements != null) {
                for (let i = 0; i < elements.length; i++) {
                    this._addChild(self.creatorFunc(elements[i]))
                }
            }
        } else if (elements instanceof EclairState && elements.isArray()) {
            this.bindState(elements, "element", array => {
                let children = new Set(this.children)
                
                for (let i = 0; i < array.length; i++) {
                    let newChild = array[i]
                    if (!children.has(newChild)) {
                        this._addChild(self.creatorFunc(newChild))
                        children.add(newChild)
                    }
                } 
                
                let elems = new Set(array)
                for (let i = this.children.length - 1; i >= 0; i--) {
                    let cChild = this.children[i]
                    if (!elems.has(cChild)) {
                        this._removeChild(i)
                        elems.delete(cChild)
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
    
    
    _removeChild(_index) {
        // TODO Add .remove function to all elements
        let child = this.children[_index]
        child.parent = null
        
        this.getElement(e => {
            e.removeChild(child.getElement())
        })
        
        this.children.splice(_index, 1)
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