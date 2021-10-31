class EclairSharedStyle extends EclairStylableObject {
    constructor(styleClassID) {
        super()
        this._id = styleClassID != null? styleClassID : Eclair._newID()
        Eclair._styles[this._id] = this
    }
    
    eID() {
        return this._id;
    }
    
    // Create is used to signal a difference between compile/build etc
    create() {
        let elems = document.getElementsByClassName(this.eID() + "-css")
        if (elems.length == 0) {
            let newStyleObject = this.buildStyleObject()
            if (newStyleObject != null) {
                document.head.appendChild(newStyleObject)
            }
        }
    }   
    
    remove() {
        delete Eclair._elements[this.eID()];
        
        // Get element and style element if available.
        let styleElems = document.getElementsByClassName(this.eID() + "-css")
        for (let i = 0; i < styleElems.length; i++) {
            styleElems[i].parentNode.removeChild(styleElems[i]);
        }
    }
}

Eclair.Style = function(_styleID) {
    return new EclairSharedStyle(_styleID);
}
