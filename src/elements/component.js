/// TITLE Eclair Component
/// EXTENDS style.style:EclairStylableObject
// WARN Doc not finished yet
// WARN EclairComponent is not finished.

class EclairComponent extends EclairStylableObject {
    constructor() {
        super()
        
        this._id = Eclair._newID();
        Eclair._elements[this.eID()] = this;
        
        this._callbacks = {}
        this.sharedStyles = []
        this.attributes = {}
        this.stateBindings = {}
        
        this._hidden = false
        this._hiddenStyle = "inline"
        
        this._buildStyle = true
        
        this.parent = null
        this.children = []
        
        this.htmlNode = null
        
        if (Eclair.context.element != null && Eclair.context.active) {
            this.parent = Eclair.context.element;
            Eclair.context.element.children.push(this);
        }
    }
    
    // Get the internal eclair ID
    eID() {return this._id;}
    
    // Set a id of an element 
    id(_value) {
        if (_value == null) {
            return this.getAttr("id")
        } else {
            return this.setAttr("id", _value)
        }
    }
    
    declareChildrenWithContext(elements) {
        let currentContextElement = Eclair.context.element;
        let currentContextActive = Eclair.context.active;
            
        Eclair.context.element = this
        Eclair.context.active = true
        
        elements(this)
        
        Eclair.context.element = currentContextElement
        Eclair.context.active = currentContextActive
    }
    
    write() {
        document.body.appendChild(this.compile())
        return this
    }
    
    to(elem) {
        if (typeof(elem) == "string") {
            elem = document.getElementById(elem)
        }
        elem.appendChild(this.compile())
        return this
    }
    
    getElement(callback) {
        if (callback != null) {
            if (this.htmlNode != null) {
                callback(this.htmlNode);
            }
            return this
        } else {
            return this.htmlNode;
        }
    }
    
    getAttr(key) {
        let elem = this.getElement();
        if (elem != null) {
            return elem.getAttribute(key);
        }
        return this.attributes[key];
    }
    
    setAttr(key, value) {
        if (key == "class") {
            throw "Setting attribute 'class' is discouraged. Please use '.addStyle' and '.getStyle'."
        }
        
        if (value == null) {
            delete this.attributes[key];
            this.getElement(elem => {elem.removeAttribute(key)})
        } else {
            this.attributes[key] = value;
            this.getElement(elem => {elem.setAttribute(key, value)})
        }
        return this;
    }
    
//    id(newID) {
//        if (newID == null) {
//            return this.getAttr("id", "")
//        }
//    }
    
    addStyle(sharedClass) {
        if (sharedClass != null) {
            let className = sharedClass instanceof EclairSharedStyle? sharedClass.eID() : sharedClass;
  
            let found = false;
            for (let n = 0; n < this.sharedStyles.length; n++) {
                found = found || this.sharedStyles[n] == className;
            }

            if (!found) {
                this.sharedStyles.push(className);
            }

            let classesString = "";
            for (let n = 0; n < this.sharedStyles.length; n++) {
                if (n > 0) {classesString += " ";}
                classesString += this.sharedStyles[n];
            }
            this.attributes["class"] = classesString + " " + this.eID();
            this.getElement(elem => {elem.setAttribute("class", classesString + " " + this.eID())})
            
            // Create the style object if this object exists
            let elem = this.getElement()
            if (elem != null) {
                if (Eclair._styles.hasOwnProperty(className)) {
                    Eclair._styles[className].create()
                }
            }
        }
        
        return this;
    }
    
    removeStyle(sharedClass) {
        if (sharedClass != null) { 
            let className = typeof(sharedClass) == "string"? sharedClass:sharedClass.eID();
            
            let newStyles = []
            for (let n = 0; n < this.sharedStyles.length; n++) {
                if (this.sharedStyles[n] != className) {
                    newStyles.push(this.sharedStyles[n])
                }
            }

            this.sharedStyles = newStyles;

            let classesString = "";
            for (let n = 0; n < this.sharedStyles.length; n++) {
                if (n > 0) {classesString += " ";}
                classesString += this.sharedStyles[n];
            }
            this.attributes["class"] = classesString + " " + this.eID();
            this.getElement(elem => {elem.setAttribute("class", classesString + " " + this.eID())})
        }
        return this;
    }
    
    /// Warn test .hide
    hide() {
        if (!this._hidden) {
            this._hidden = true
            this.getElement(e => {
                this._hiddenStyle = window.getComputedStyle(e, null).display
            })
            this.display("none")
        }
    }
    
    /// Warn test .show
    show() {
        this.display(this._hiddenStyle)
    }
    
    bindState(state, stateBindingID, onCallback, valueCallback) {
        if (state instanceof EclairState) {
            // Remove binding for old callback within old state
            if (this.stateBindings.hasOwnProperty(stateBindingID)) {
                this.stateBindings[stateBindingID].removeCallback(this.eID())
            }
            
            // Set new binding in class
            this.stateBindings[stateBindingID] = state
            
            // Add Callback to the state
            state.addCallback(this.eID(), function(state) {
                let value = (valueCallback == null)? state.value() : valueCallback(state)
                onCallback(value)
            }, true)
        } else {
            onCallback(state)
        }
    }
    
    /// ### .build
    /// This function should be implemented in a subclass but not called. Only the parent class should call this function otherwise the returned element will not be linked with all the eclair library.
    build() {
        throw "Build function not implemented"
    }
    
    /// ### .compile
    /// This function should be called to create the object. This calls the `.build` function as implemented in the subclass then applies all attributes to the object then return the compiled HTML code.
    /// ```javascript
    /// Eclair.Text("Hello World")
    ///     .compile()
    /// ```
    compile() {   
        if (this.htmlNode != null) {
            return this.htmlNode;
        }
        
        // Adding element attributes
        let element = null
        let builtObject = this.build();
        if (typeof(builtObject) == "string") {
            let wrapperElement = document.createElement("div")
            wrapperElement.innerHTML = this.build();
            element = wrapperElement.children[0]
        } 
        else if (builtObject instanceof Node) {
            element = builtObject;
        } 
        else {
            console.log(this)
            throw ".build() must return either a String or HTML Node element."
        }
        
        
        let classes = this.getAttr("class")
        if (classes != null) {
            classes = classes.split(" ")
            for (let c = 0; c < classes.length; c++) {
                if (Eclair._styles.hasOwnProperty(classes[c])) {
                    Eclair._styles[classes[c]].create()
                }
            }
        }
        
        let self = this;
        Object.keys(this.attributes).forEach(function(key) {
            element.setAttribute(key, self.attributes[key])
        });
                
        if (this._buildStyle) {
            let builtStyle = this.buildStyleObject();
            if (builtStyle != null && document.getElementsByClassName(builtStyle.getAttribute("class")).length == 0) {
                document.body.appendChild(builtStyle)
            }
        }
        
        this.htmlNode = element;
        
        return element
    }
    
    /// ### Event Handling
    /// All eclair components have a range of built in event handing functions easily accessable using callback functions. You can assign these functions to any eclair object, however, if the HTML object cannot invoke the event then the event will never get called. For example onError invoked when an image element fails to load an image, but the button object would never invoke that function. The parameter given in the callback parameters is the object eclair object. Full list of events:
    /// <br/>**args**: callback: Call back function which passes the object as a parameter.
    /// <br/><br/>Full list of callback functoins are:
    /// <br/>**onBlur**: When the object loses focus.
    /// <br/>**onChange**: When the object's selected item changes.
    /// <br/>**onFocus**: When the object gains focus from the user.
    /// <br/>**onSelect**: Invoked when an element's item is selected.
    /// <br/>**onSubmit**: Invoked when a form is submitted.
    /// <br/>**onReset**: Invoked when a form is reset.
    /// <br/>**onKeyDown**: Invoked when a key is pressed.
    /// <br/>**onKeyPress**: Invoked when a key is pressed and released.
    /// <br/>**onKeyUp**: Invoked when a key is released.
    /// <br/>**onInput**: Invoked when a form gets user input.
    /// <br/>**onMouseDown**: Invoked when a mouse button is pressed.
    /// <br/>**onMouseUp**: Invoked when a mouse button is released.
    /// <br/>**onMouseOver**: Invoked when the cursor moves over the object.
    /// <br/>**onMouseOut**: Invoked when the cursor moves out of the object.
    /// <br/>**onMouseMove**: Invoked when the cursor moves whlist within the object.
    /// <br/>**onClick**: Invoked when the user clicks on the object.
    /// <br/>**onDblClick**: Invoked when the user double clicks on the object.
    /// <br/>**onScroll**: Invoked when the frame scrolls.
    /// <br/>**onLoad**: Invoked when the objects data loads.
    /// <br/>**onError**: Invoked if there was an error loading the data.
    /// <br/>**onUnload**: Invoked when the data is unloaded.
    /// <br/>**onResize**: Invoked when object resizes.
    onBlur(callback) {return this._updateCallback("onBlur", callback);}
    onChange(callback) {return this._updateCallback("onChange", callback);}
    onFocus(callback) {return this._updateCallback("onFocus", callback);}
    onSelect(callback) {return this._updateCallback("onSelect", callback);}
    onSubmit(callback) {return this._updateCallback("onSubmit", callback);}
    onReset(callback) {return this._updateCallback("onReset", callback);}
    onKeyDown(callback) {return this._updateCallback("onKeyDown", callback);}
    onKeyPress(callback) {return this._updateCallback("onKeyPress", callback);}
    onKeyUp(callback) {return this._updateCallback("onKeyUp", callback);}
    onInput(callback) {return this._updateCallback("onInput", callback);}
    onMouseDown(callback) {return this._updateCallback("onMouseDown", callback);}
    onMouseUp(callback) {return this._updateCallback("onMouseUp", callback);}
    onMouseOver(callback) {return this._updateCallback("onMouseOver", callback);}
    onMouseOut(callback) {return this._updateCallback("onMouseOut", callback);}
    onMouseMove(callback) {return this._updateCallback("onMouseMove", callback);}
    onClick(callback) {return this._updateCallback("onClick", callback);}
    onDblClick(callback) {return this._updateCallback("onDblClick", callback);}
    onScroll(callback) {return this._updateCallback("onScroll", callback);}
    onLoad(callback) {return this._updateCallback("onLoad", callback);}
    onError(callback) {return this._updateCallback("onError", callback);}
    onUnload(callback) {return this._updateCallback("onUnload", callback);}
    onResize(callback) {return this._updateCallback("onResize", callback);}
    // TODO Check event handing documentation as the events have been added in
    /// ```javascript
    /// Eclair.Button("Hello There")
    ///     .onClick((el, ev) => {
    ///         alert("General Kenobi")
    ///     })
    ///     .onMouseOver((el, ev) => {
    ///         el.backgorund("red")
    ///     })
    ///     .onMouseOut((el, ev) => {
    ///         el.background("blue")
    ///     })
    /// ```
    
    // Eclair calls
    triggerEvent(eventID, event, param) {
        if (this._callbacks.hasOwnProperty(eventID)) {
            this._callbacks[eventID](this, event, param);
        }
    }
    
    _updateCallback(callbackKey, callback) {
        this._callbacks[callbackKey] = callback;
        
        if (callback == null) {
            this.setAttr(callbackKey.toLowerCase(), null)
        } else {
            this.setAttr(callbackKey.toLowerCase(), `Eclair.triggerEvent("${this.eID()}", "${callbackKey}", event)`)
        }
        return this;
    }
    
    child(n, callback) {
        let item = n < this.children.length && n >= 0? this.children[n] : null
        if (callback == null) {
            return item
        } else {
            callback(item)
        }
        
        return this
    }
    
    remove() {
        delete Eclair._elements[this.eID()];
        
        // Get element and style element if available.
        let elems = document.getElementsByClassName(this.eID())
        let styleElems = document.getElementsByClassName(this.eID() + "-css")
        for (let i = 0; i < elems.length; i++) {elems[i].parentNode.removeChild(elems[i]);}
        for (let i = 0; i < styleElems.length; i++) {styleElems[i].parentNode.removeChild(styleElems[i]);}
        
        for (let c = 0; c < this.children.length; c++) {
            this.children[c].remove()
        }
        
        // Remove state bindings
        
        this.cleanup()
    }
    
    cleanup() {}
}