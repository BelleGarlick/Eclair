/// ## Eclair Hyperlink
/// Create a eclair hyperlink object.
/// ```javascript
/// eclair.Link('DuckDuckGo')
///     .url('https://duckduckgo.com/')
///     .target('_blank')
/// ```
class EclairLink extends EclairCustomTagComponent {
    constructor(_text) {
        super("a")
        
        // Set inner html to text or bind with state.
        this.bindState(_text, "html", value => {
            this.innerHTML(value)
        })  
        
        this.addStyle(eclair.styles.Link)
    }
    
    /// ### .url
    /// Set target URL that the hyperlink references.
    /// ```javascript
    /// eclair.Link('DuckDuckGo')
    ///     .url('https://duckduckgo.com/')
    /// ```
    url(_location) {
        this.bindState(_location, "href", value => {
            this.setAttr("href", value)
        })  
        
        return this
    }
    
    /// ### .target
    /// Set target for the hyperlink. This follows standard html targets for an 'a' element. E.g. '_blank'
    /// ```javascript
    /// eclair.Link('DuckDuckGo')
    ///     .url('https://duckduckgo.com/')
    ///     .target('_blank')
    /// ```
    target(_target) {
        this.bindState(_target, "target", value => {
            this.setAttr("target", value)
        })  
        
        return this
    }
}


*** TEST 
var object = eclair.Link("Test")
                .url("www.w3schools.com")
                .target("_blank")
                .write()

var element = object.getElement()

**eval(element.innerHTML, "Test")
**eval(element.getAttribute("href"), "www.w3schools.com")
**eval(element.getAttribute("target"), "_blank")


*** TEST 
var object = eclair.Link(Ø("Test"))
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

var object = eclair.Link(state1)
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
