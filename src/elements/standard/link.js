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