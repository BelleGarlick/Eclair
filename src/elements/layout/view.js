/// TITLE Eclair View
/// EXTENDS elements.component:EclairComponent
/// DESC Create a generic eclair View.

Eclair.View = function(_elements, _func) {
    return new EclairView(_elements, _func);
}

/// SHARED-STYLE Eclair.styles.View: Shared View style.
Eclair.styles.View = Eclair.Style("eclair-style-view")
    .boxSizing("border-box")

/// ```javascript
/// Eclair.View([
///     Eclair.Text('...'),
///     Eclair.Button('...')
///         .onClick(...)
/// ])
/// ```
class EclairView extends EclairComponent {    
    
    /// METHOD constructor
    /// DESC Construct an eclair View element. 
    /// ARG elements: **List** of child items.
    /// ARG creatorFunc: A callback function called for each child object. This allows the child elements to be a dictionary or other type, then the view for that object can be dynamically build by this funciton. For example, a server could dynamically load json data from the server and uses it to directly update this view. This function can then build the appropriate object from the given json data. 
    /// ```javascript
    /// Eclair.View([
    ///     Eclair.Text('...'),
    ///     Eclair.Button('...')
    ///         .onClick(...)
    /// ])
    /// ```
    /// ```javascript
    /// let users = Ø([
    ///     {"name": "Sam"},
    ///     {"name": "James"},
    ///     {"name": "Alex"} 
    /// ])
    ///
    /// Eclair.View([
    ///     Eclair.View(users, e => {
    ///         return Text(e.name)
    ///     }),
    ///     Eclair.Button("Add")
    ///         .onClick(_ => {
    ///             users.add({"name": "Isaac"})
    ///         })
    /// ])
    /// ```
    constructor(elements, creatorFunc) {
        super("view")
        
        this._elementTag = "div"
        
        this.creatorFunc = (creatorFunc != null)? creatorFunc : (e) => {return e}
        
        let self = this;
        this.items = elements instanceof Array? Ø(elements) : elements
        
        let knownItems = []
        
        if (this.items instanceof EclairState && this.items.isArray()) {
            this.bindState(elements, "element", array => {
                // Find the positional changes of all elements
                var itemChanges = self._itemChanges(knownItems, array)
                
                // create new list of elements
                let dummyParent = document.createElement("div")
                
                for (let i = 0; i < itemChanges.length; i++) {
                    if (itemChanges[i] == -1) {
                        // add new item to the dummy parent
                        let newItem = self.creatorFunc(array[i])
                        if (self._isValidChild(newItem)) {
                            self._addChild(newItem)

                            let dummychild = document.createElement("div")
                            dummychild.innerHTML = newItem.compile()
                            dummyParent.appendChild(dummychild.childNodes[0])
                        }
                    } else {
                        let itemIndexValue = itemChanges[i]
                        
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
                
                // Update and children elements calling this object.
                this._onItemsChanged()
            })
        }
        
        this.addStyle(Eclair.styles.View)
    }
    
    
    // This function isn't in the docs as it doesn't need to be publically accessable. The function works
    // by iterating through both the current items in the view and new items being added and finds where
    // all old items have moved to. New items will be set to '-1' and will be newly added to the view, 
    // whereas old items will be taken from their position (found in this function) and moved.
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
    
    // Overrideable method for child elements to know if items have been updated. E.g. Select Element uses this to then update the selected item.
    _onItemsChanged() {}
    
    // Overrideable method to check if the new child is valid. e.g. Tab Views check if child is of type TabPage
    _isValidChild(child) {
        return true
    }
    
    
    build () {                
        let code = ""
        for (let e = 0; e < this.children.length; e++) {
            let child = this.children[e];
            
            if (child instanceof EclairComponent) {
                code += child.compile();
            }

            else if (typeof(child) == "string") { 
                code += child
            } 
            
            else {
                throw `Unable to compile object type: ${typeof(child)}`
            }
        }
        
        return `<${this._elementTag}>` + code + `</${this._elementTag}>`;
    }
}