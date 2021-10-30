/// TITLE Eclair Custom Tag Component
/// EXTENDS elements.component:EclairComponent
/// DESC This is an abstract class which should be subclassed to make it a little easier to make custom components. This class only deals with simple elements that don't have many complex internal elements. This class takes a tag (in the super call) and a bindable `innerHTML` function which can be used to set the innerHTML of the element. You can then, of course, implement other functions that you might want such as binding parameters etc.

Eclair.CustomTagComponent = function(tag) {
    return new EclairCustomTagComponent(tag);
}

/// ```javascript
/// Eclair.CustomTagComponent("svg")
///     .innerHTML('<circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow"/>')
///     .write()
/// ```

/// ```javascript
/// class Article extends EclairCustomTagComponent {
///     constructor(headline, text) {
///         super("article")
///         this.innerHTML(`<h2>${headline}</h2><p>${text}</p>`)
///     }
/// }
///
/// new Article("5 reasons why Eclair is the best JS library.", "...").write()
/// ```
class EclairCustomTagComponent extends EclairComponent {
    /// METHOD constructor
    /// DESC Construct an eclair custom tag component with a given tag.
    /// ARG tag: The tag to build this element with.
    /// ```javascript
    /// Eclair.CustomTagComponent("p")
    /// ```
    constructor(tag) {
        super(tag)
        
        this.tag = tag;
        this._innerHTML = "";
    }
    
    /// METHOD .innerHTML
    /// DESC Set the inner HTML of this element. This function can be given an eclair state to bind to or just a string.
    /// ARG html: The inner html to give the object.
    /// ```javascript
    /// Eclair.CustomTagComponent("p")
    ///     .innerHTML("Hello World")
    /// ```
    innerHTML(_html) {
        this.bindState(_html, "html", value => {
            this._innerHTML = value;
            this.getElement(e => {
                e.innerHTML = value
            })
        })
        return this;
    }
    
    // Build the class
    build() {
        return `<${this.tag}>${this._innerHTML}</${this.tag}>`
    }
}
