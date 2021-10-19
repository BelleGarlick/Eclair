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
        let items = elements instanceof Array? eclair.State(elements) : elements
        
        let knownItems = []
        
        if (items instanceof EclairState && items.isArray()) {
            this.bindState(elements, "element", array => {
                // Find the positional changes of all elements
                var itemChanges = self._itemChanges(knownItems, array)
                
                // create new list of elements
                let dummyParent = document.createElement("div")
                
                for (let i = 0; i < itemChanges.length; i++) {
                    if (itemChanges[i] == -1) {
                        // add new item to the dummy parent
                        let newItem = self.creatorFunc(array[i])
                        this.children.push(newItem)
                        newItem.parent = self
                        
                        let dummychild = document.createElement("div")
                        dummychild.innerHTML = newItem.compile()
                        dummyParent.appendChild(dummychild.childNodes[0])
                    } else {
                        let itemIndexValue = itemChanges[i]
                        // TODO Need to sort out what happens when items move
                        dummyParent.appendChild(
                            self.getElement().childNodes[itemIndexValue]
                        );
                        itemChanges[i] = -1
                        
                        for (let j = 0; j < itemChanges.length; j++) {
                            if (itemChanges[j] >= itemIndexValue) {
                                itemChanges[j] -= 1
                            }
                        }
                    }
                }
                
                // Have function for properly removing elements and references and from children
                // remove all items from old list, child and element
                // remove all elements and add all from the new list
                
                // Remove items from current element and add all elements as shown above
                self.getElement(e => {
                    while (dummyParent.firstChild) {
                        e.appendChild(dummyParent.childNodes[0])
                    }
                })
                
                // Add all elements to the known elements array so we known what changes when the array changes
                knownItems = []
                for (let i = 0; i < array.length; i++) {knownItems.push(array[i])}
            })
        }
        
        this.addStyle(eclair.styles.View)
    }
    
    
    // TODO Add explanation of wtf this function does. it's used for finding how positions in an array change when moved to another
    _itemChanges(oldItems, newItems) {
        var resultantMap = []

        for (let i = 0; i < newItems.length; i++) {
            var positionChange = -1
            for (let j = 0; j < oldItems.length; j++) {
                if (oldItems[j] == newItems[i]) {
                    positionChange = j
                    break
                }
            }
            resultantMap.push(positionChange)
        }

        return resultantMap
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