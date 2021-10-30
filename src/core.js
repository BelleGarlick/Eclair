// TODO Implement these: https://getbootstrap.com/docs/4.0/components/progress/
// PRINT Add margin, paddding, border: left, top, right bottom
// PRINT Add deleting element
// TODO Add enabled tag to all elements.
// TODO Examples 
// TODO Update readme.
// Add getting value from objects and altering lists. This should enable objects to be easier to work with.
// TODO NEed tutorials for everything. Geting to grips with eclair, making a custom object, specific object tutorials.documentation
// Main documentation
    // Inherits form 'element.dsads'
    // .to
    // .write
    // Inherits from 'Eclair.component...'
    //....

// Future custom objects
//  - Cookies accept + ability to set
//  - Colour picker
//  - multi media - video, audio etc
//  - Loading elements - spinenrs etc.
//  - Upload file element
//  - dropdown
//  - List
//  - Built in icons

// When creating a new element make sure
//  - Links to children objects and parent association
//  - Default styles
//  - Documentation: states the shared styles. Add functions doc and class doc, args
//  - All binding values call onChange
//  - Tests


/// # Eclair
/// The `eclair` object allows you to easily construct an eclair object and interact in the Eclair development kit.
let Eclair = {
    version: "0.0.92",
    _ids: 0,
    _elements: {},
    _styles: {},
    _newID: function() {
        this._ids += 1; 
        return "eclair-element-" + (this._ids - 1);
    },

    theme: {},
    styles: {},
    
    triggerEvent: function(eclairID, eventID, event, param) {
        this._elements[eclairID].triggerEvent(eventID, event, param);
    }
}


try {
    Ecalir.theme.accent = EclairThemeColor;
    Ecalir.theme.font = EclairThemeFont;
} catch(err) {
    Eclair.theme.accent = "#ee8800"
    Eclair.theme.font = '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"'
}


function Ø(value) {
    // Single char value for wrapping an varible in an elair state. Can be done with alt + o on macos
    return new EclairState(value)
}
