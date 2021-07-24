//PRINT TODO Add events to callbacks (mousemove position etc)
//PRINT TODO Prevent layered on click events
//PRINT TODO Hide show elements
//PRINT TODO Superscript/Subscript text
//PRINT TODO Implement these: https://getbootstrap.com/docs/4.0/components/progress/
//PRINT Add string html to views
//PRINT Add margin, paddding, border: left, top, right bottom
//PRINT Add deleting element
//PRINT Add spinner
//PRINT Add upload icon
//PRINT Add callback getters when accessing child element.
//PRINT TODO Add default styles to everything
//PRINT TODO Check getters and setters calling sub functions are correct

/// # Eclair
/// The `eclair` object allows you to easily construct an eclair object and interact in the Eclair development kit.
let eclair = {
    _ids: 0,
    _elements: {},
    _newID: function() {this._ids += 1; return this._ids - 1;},
    
    Style: function() {return new EclairStyleComponent();},
    State: function(_val) {return new EclairState(_val);},
    
    View: function(elements) {return new EclairView(elements);},
    ScrollView: function(elements) {return new EclairScrollView(elements);},
    VBox: function(elements) {return new EclairVBox(elements);},
    HBox: function(elements) {return new EclairHBox(elements);},
    
    Button: function(text) {return new EclairButton(text);},
    Form: function(elements) {return new EclairForm(elements);},
    Image: function() {return new EclairImage();},
    Text: function(text) {return new EclairText(text);},
    TextStyle: function() {return new EclairTextStyleState();},
    
    TextBox: function(text) {return new EclairTextBox(text);},
    TextArea: function() {return new EclairTextArea();},
    IFrame: function() {return new EclairIFrame();},
    Select: function() {return new EclairSelect();},
    Link: function(text) {return new EclairLink(text);},
    Slider: function(_value) {return new EclairSlider(_value);},
    HiddenInput: function() {return new EclairHiddenInput();},
    Toggle: function(_value) {return new EclairToggle(_value);},
    HorizontalLine: function() {return new EclairHorizontalLine();},
    CustomTagComponent: function(tag) {return new EclairCustomTagComponent(tag);},
    SyntaxHighlighter: function() {return new EclairSyntaxHighlighter();},
    RadioButtons: function() {return new EclairRadioButtons();},
    CheckBox: function(text) {return new EclairCheckbox(text);},
    
    ProgressBar: function(_progress) {return new EclairProgressBar(_progress);},
    AlertState: function() {return new EclairAlertBoxState();},
    Alert: function(_value) {return new EclairAlertBox(_value);},
    
    Color: function(_col) {return new EclairColour(_col);},
    
    performCallback: function(eID, event, param1) {this._elements[eID].performCallback(event, param1);},
    
    theme: {
        "accent": "#ee8800",
        "font": '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"'
    }
}
