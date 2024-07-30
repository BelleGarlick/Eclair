/// TITLE Eclair Hyperlink
/// EXTENDS elements.custom-tag:EclairCustomTagComponent
/// DESC Create a eclair hyperlink object.

Eclair.Link = function(text) {
    return new EclairLink(text);
}

/// SHARED-STYLE Eclair.styles.Link: Default link style.
Eclair.styles.Link = Eclair.Style("eclair-style-link")
    .fontFamily(Eclair.theme.font)   
    .fontColor(Eclair.theme.accent)
    .textDecoration("none")
    .textDecoration("underline", "hover")

/// ```javascript
/// Eclair.Link('DuckDuckGo')
///     .url('https://duckduckgo.com/')
///     .target('_blank')
/// ```
class EclairLink extends EclairView {
    // TODO Need to rewrite
    /// METHOD constructor
    /// DESC Construct an Eclair hyperlink object with a predefined text.
    /// ARG text: The text displayed.
    /// ```javascript
    /// Eclair.Link('DuckDuckGo')
    /// ```
    constructor(elements, objectFunc) {
        super(elements, objectFunc)
        
        this._elementTag = "a"
        
        this.removeStyle(Eclair.stylesViewLink)
        this.addStyle(Eclair.styles.Link)
    }
    
    /// METHOD .url
    /// DESC Set target URL that the hyperlink references.
    /// ARG url: Hyperlink target.
    /// ```javascript
    /// Eclair.Link('DuckDuckGo')
    ///     .url('https://duckduckgo.com/')
    /// ```
    url(_location) {
        this.bindState(_location, "href", value => {
            this.setAttr("href", value)
        })  
        
        return this
    }
    
    /// METHOD .target
    /// DESC Set target for the hyperlink. This follows standard html targets for an 'a' element. E.g. '_blank'
    /// ARG value: Hyperlink target.
    /// ```javascript
    /// Eclair.Link('DuckDuckGo')
    ///     .url('https://duckduckgo.com/')
    ///     .target('_blank')
    /// ```
    target(value) {
        this.bindState(_target, "target", v => {
            this.setAttr("target", v)
        })  
        
        return this
    }
}


*** TEST 
var object = Eclair.Link("Test")
                .url("www.w3schools.com")
                .target("_blank")
                .write()

var element = object.getElement()

**eval(element.innerHTML, "Test")
**eval(element.getAttribute("href"), "www.w3schools.com")
**eval(element.getAttribute("target"), "_blank")


*** TEST 
var object = Eclair.Link(Ø("Test"))
                .url(Ø("www.w3schools.com"))
                .target(Ø("_blank"))
                .write()

var element = object.getElement()

**eval(element.innerHTML, "Test")
**eval(element.getAttribute("href"), "www.w3schools.com")
**eval(element.getAttribute("target"), "_blank")


*** TEST 
var state1 = Ø("Test")
var state2 = Ø("www.w3schools.com")
let state3 = Ø("_blank")

var object = Eclair.Link(state1)
                .url(state2)
                .target(state3)
                .write()

var element = object.getElement()

**eval(element.innerHTML, "Test")
**eval(element.getAttribute("href"), "www.w3schools.com")
**eval(element.getAttribute("target"), "_blank")

state1.value("New Value")
state2.value("New URL")
state3.value("New Target")

**eval(element.innerHTML, "New Value")
**eval(element.getAttribute("href"), "New URL")
**eval(element.getAttribute("target"), "New Target")
