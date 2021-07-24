/// ### Link
/// Create a hyper link using eclair.
/// ```javascript
/// eclair.Link('DuckDuckGo')
///     .url('https://duckduckgo.com/')
///     .target("_blank")
/// ```
class EclairLink extends EclairCustomTagComponent {
    constructor(_text) {
        super("a")
        
        // Set inner html to text or bind with state.
        let self = this
        if (_text instanceof EclairState) {
            _text.addCallback(self.id() + "-html", function(state) {
                self.innerHTML(state.value())
            }, true)
        } else {
            self.innerHTML(_text)
        }
        
        this.addStyle(eclair.styles.Link)
    }
    
    /// ### url
    /// Set target URL that the hyperlink references.
    /// ```javascript
    /// eclair.Link('DuckDuckGo')
    ///     .url('https://duckduckgo.com/')
    /// ```
    url(_location) {
        if (_location instanceof EclairState) {
            let self = this
            _location.addCallback(this.id() + "-location", function(state) {
                self.setAttr("href", state.value())
            }, true)
        } else {
            this.setAttr("href", _location)
        }
        
        return this
    }
    
    /// ### target
    /// Set target for the hyperlink. This follows standard html targets for an 'a' element. E.g. '_blank'
    /// ```javascript
    /// eclair.Link('DuckDuckGo')
    ///     .url('https://duckduckgo.com/')
    ///     .target("_blank")
    /// ```
    target(_target) {
        if (_target instanceof EclairState) {
            let self = this
            _target.addCallback(this.id() + "-target", function(state) {
                self.setAttr("target", state.value())
            }, true)
        } else {
            this.setAttr("target", _target)
        }
        
        return this
    }
}