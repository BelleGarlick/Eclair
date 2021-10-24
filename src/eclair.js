// TODO Hide show elements
// TODO Implement these: https://getbootstrap.com/docs/4.0/components/progress/
// PRINT Add margin, paddding, border: left, top, right bottom
// PRINT Add deleting element
// PRINT Add callback getters when accessing specific child elements.
// WARN Layout objects have no shared style
// TODO State all the shared styles in docs for an object .e.g. alert box uses eclair.styles.AlertBox, ...
// TODO Examples
// TODO Add get/post stuff
// TODO Make sure all args are declared in documentation
// TODO Add enabled tag to all elements.
// Check on change bindings
// Add getting value from objects and altering lists. This should enable objects to be easier to work with.
// TODO NEed tutorials for everything. Geting to grips with eclair, making a custom object, specific object tutorials.

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
let eclair = {
    version: "0.0.89",
    _ids: 0,
    _elements: {},
    _styles: {},
    _newID: function() {
        this._ids += 1; 
        return "eclair-element-" + (this._ids - 1);
    },
    
    performCallback: function(eclairID, eventID, event, param) {
        this._elements[eclairID].performCallback(eventID, event, param);
    },
    
    // Styling
    Style: function(_styleID) {return new EclairStyleComponent(_styleID);},
    
    post: function(_url) {return new EclairPost(_url);},
    
    // State based 
    State: function(_val) {return new EclairState(_val);},    
    Color: function(_col) {return new EclairColor(_col);},
    TextStyle: function() {return new EclairTextStyleState();},
    Alignment: function() {return new EclairAlignmentState();},
    
    // Layout 
    View: function(_elements, _func) {return new EclairView(_elements, _func);},
    VStack: function(_elements, _func) {return new EclairVStack(_elements, _func);},
    HStack: function(_elements, _func) {return new EclairHStack(_elements, _func);},
    TabView: function(_tab, _elements) {return new EclairTabView(_tab, _elements);},
    
    CustomTagComponent: function(tag) {return new EclairCustomTagComponent(tag);},
    
    Button: function(text) {return new EclairButton(text);},
    TextBox: function(text) {return new EclairTextBox(text);},
    Form: function(elements) {return new EclairForm(elements);},
    Select: function(_value) {return new EclairSelect(_value);},
    Slider: function(_value) {return new EclairSlider(_value);},
    Toggle: function(_value) {return new EclairToggle(_value);},
    RadioButtons: function(_value) {return new EclairRadioButtons(_value);},
    CheckBox: function(text) {return new EclairCheckBox(text);},
    TextArea: function(_value) {return new EclairTextArea(_value);},
    HiddenInput: function(_value) {return new EclairHiddenInput(_value);},
    
    Image: function(_value) {return new EclairImage(_value);},
    IFrame: function() {return new EclairIFrame();},
    Text: function(text) {return new EclairText(text);},
    Link: function(text) {return new EclairLink(text);},
    HorizontalLine: function() {return new EclairHorizontalLine();},
    
    Alert: function(_value) {return new EclairAlertBox(_value);},
    ProgressBar: function(_progress) {return new EclairProgressBar(_progress);},
    SyntaxHighlighter: function(_value) {return new EclairSyntaxHighlighter(_value);},
    
    theme: {
        "accent": "#ee8800",
        "font": '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"'
    }
}

function ø(value) {
    // Single char value for wrapping an varible in an elair state. Can be done with alt + o on macos
    return eclair.State(value)
}

function Ø(value) {
    // Single char value for wrapping an varible in an elair state. Can be done with alt + o on macos
    return eclair.State(value)
}
