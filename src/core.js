// TODO Update readme.
// TODO Add getting value from objects and altering lists. This should enable objects to be easier to work with.
// TODO NEed tutorials for everything and Examples. Geting to grips with eclair, making a custom object, specific object tutorials.documentation
// Add test for each objct removing elements loads. Each test needs looping 1000s of times and checking if, when removed, there is no execsive files left over.
// Add callback in View to have the option to cleanup elements.
// Add modularity

// Future work
//  - Add enabled tag to all elements.
//  - Cookies accept + ability to set
//  - Colour picker
//  - multi media - video, audio etc
//  - Loading elements - spinenrs etc.
//  - Upload file element
//  - dropdown
//  - List
//  - Built in icons
//  - Implement these: https://getbootstrap.com/docs/4.0/components/progress/, https://mui.com

// When creating a new element make sure
//  - Links to children objects and parent association
//  - Default styles
//  - Documentation: states the shared styles. Add functions doc and class doc, args
//  - All binding values call onChange
//  - Tests
//  - Cleanup
//  - Child/Parent assoc
//  - Create blank template
//  - Each test needs looping 1000s of times and checking if, when removed, there is no execsive files left over.


/// # Eclair
/// The `eclair` object allows you to easily construct an eclair object and interact in the Eclair development kit.
let Eclair = {
    version: "0.0.95",
    _ids: -1,
    _elements: {},
    _styles: {},
    _newID: function() {
        this._ids += 1; 
        return "eclair-element-" + this._ids;
    },
    context: {
        active: false,
        element: null
    },

    theme: {},
    styles: {},
    
    triggerEvent: function(eclairID, eventID, event, param) {
        this._elements[eclairID].triggerEvent(eventID, event, param);
    }
}


try {
    Eclair.theme.accent = EclairThemeColor;
} catch(err) {
    Eclair.theme.accent = "#ee8800"
}
try {
    Eclair.theme.font = EclairThemeFont;
} catch(err) {
    Eclair.theme.font = 'arial'
}


function Ø(value) {
    // Single char value for wrapping an varible in an elair state. Can be done with alt + o on macos
    return new EclairState(value)
}
