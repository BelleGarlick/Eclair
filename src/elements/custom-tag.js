/// ## Eclair Custom Tag Component
/// This is an abstract class which should be subclassed to make it a little easier to make custom components. This class only deals with simple elements that don't have many complex internal elements. This class takes a tag (in the super call) and a bindable `innerHTML` function which can be used to set the innerHTML of the element. You can then, of course, implement other functions that you might want such as binding parameters etc. Commonly you may subclass this object as such:
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
    constructor(tag) {
        super(tag)
        
        this.tag = tag;
        this._innerHTML = "";
    }
    
    /// ### .innerHTML
    /// Set the inner html of this object.
    /// <br/>**args**:
    /// - html: The inner html bound to the object.
    /// ```javascript
    /// new EclairCustomTagComponent("p")
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
