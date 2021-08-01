// TODO Add events to callbacks (mousemove position etc)
// TODO Prevent layered on click events
// TODO Hide show elements
// TODO Superscript/Subscript text
// TODO Implement these: https://getbootstrap.com/docs/4.0/components/progress/
// PRINT Add margin, paddding, border: left, top, right bottom
// PRINT Add deleting element
// PRINT Add callback getters when accessing child element.
// TODO Add default styles to everything
// WARN Layout objects have no shared style
// PRINT MAKE SURE ALL OBJECTS HAVE PARENT AssOCIATION
// PRINT when building doc, clear current folder
// TODO State all the shared styles in docs for an object .e.g. alert box uses eclair.styles.AlertBox, ...
// TODO Examples
// TODO Tutorials
// TODO Add get/post stuff
// TODO Add more style fucntions to remove the need for .getStyleSheet
// TODO Make sure all args are declared in documentation
// TODO Replace doc
// TODO Add enabled tag to all elements.
// Check on change bindings
// TODO Nested elements

// Future custom objects
//  - Cookies accept + ability to set
//  - Colour picker
//  - multi media - video, audio etc
//  - Loading elements - spinenrs etc.
//  - Upload file element
//  - dropdown
//  - eclair list state
//  - List

// When creating a new element make sure
//  - Links to children objects and parent association
//  - Default styles
//  - Documentation: states the shared styles. Add functions doc and class doc, args
//  - All binding values call onChange


/// # Eclair
/// The `eclair` object allows you to easily construct an eclair object and interact in the Eclair development kit.
let eclair = {
    _ids: 0,
    _elements: {},
    _newID: function() {this._ids += 1; return this._ids - 1;},
    
    performCallback: function(eID, event, param1) {this._elements[eID].performCallback(event, param1);},
    
    // Styling
    Style: function() {return new EclairStyleComponent();},
    
    // State based 
    State: function(_val) {return new EclairState(_val);},    
    Color: function(_col) {return new EclairColor(_col);},
    TextStyle: function() {return new EclairTextStyleState();},
    Alignment: function() {return new EclairAlignmentState();},
    
    // Layout 
    View: function(_elements) {return new EclairView(_elements);},
    VStack: function(_elements) {return new EclairVStack(_elements);},
    HStack: function(_elements) {return new EclairHStack(_elements);},
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
