/// ## Eclair IFrame
/// An eclair IFrame object
/// ```javascript
/// eclair.IFrame()
///     .source("<p>Hello World</p>")
/// ```
class EclairIFrame extends EclairCustomTagComponent {
    constructor() {
        super("iframe")
        this.innerHTML("Your client does not support iframes.")
        this.addStyle(eclair.styles.IFrame)
    }
    
    /// ### .url
    /// Set the URL for the webpage you want the IFrame to display.
    /// <br/>**args**:
    /// - source: URL source for the IFrame to load
    /// ```javascript
    /// eclair.IFrame()
    ///     .url("http://www.w3schools.com")
    /// ```
    url(_source) {
        this.bindState(_source, "src", value => {
            this.setAttr("src", value)
        })  
    }
    
    /// ### .source
    /// Set the webpage source code you want the IFrame to display.
    /// <br/>**args**:
    /// - source: HTML source for the IFrame to load
    /// ```javascript
    /// eclair.IFrame()
    ///     .source("<p>Hello World</p>")
    /// ```
    source(_source) {
        this.bindState(_source, "srcdoc", value => {
            this.setAttr("srcdoc", value)
        })  
    }
    
    /// ### .source
    /// Set if the frame can activate fullscreen mode by calling the requestFullscreen() method.
    /// <br/>**args**:
    /// - allow: If true it will be allowed.
    /// ```javascript
    /// eclair.IFrame()
    ///     .allowFullScren(true)
    /// ```
    allowFullScren(_allow) {
        this.bindState(_allow, "allowfullscreen", value => {
            this.setAttr("allowfullscreen", value)
        })  
    }
    
    /// ### .allowPaymentRequest
    /// If true the iframe will be allowed to invoke the Payment Request API
    /// <br/>**args**:
    /// - allow: If true the iframe can invoke the Payment Request API.
    /// ```javascript
    /// eclair.IFrame()
    ///     .allowPaymentRequest(true)
    /// ```
    allowPaymentRequest(_allow) {
        this.bindState(_allow, "allowpaymentrequest", value => {
            this.setAttr("allowpaymentrequest", value)
        })  
    }
    
    /// ### .loading
    /// Specifies how the iframe should be loaded - immediately or deferred.
    /// <br/>**args**:
    /// - loading: Can be either "eager" or "lazy"
    /// ```javascript
    /// eclair.IFrame()
    ///     .loading("eager")
    /// ```
    loading(_loading) {
        this.bindState(_loading, "loading", value => {
            this.setAttr("loading", value)
        })  
    }
    
    /// ### .name
    /// Specify the name of the iframe.
    /// <br/>**args**:
    /// - name: The name to give to the iframe.
    /// ```javascript
    /// eclair.IFrame()
    ///     .name("John")
    /// ```
    name(_name) {
        this.bindState(_name, "name", value => {
            this.setAttr("name", value)
        })  
    }
    
    /// ### .referrerPolicy
    /// Specify the referrer policy of the iframe. See [w3schools](https://www.w3schools.com/tags/att_iframe_referrerpolicy.asp) for details.
    /// <br/>**args**:
    /// - policy: The refferer policy to use
    /// ```javascript
    /// eclair.IFrame()
    ///     .referrerPolicy("no-referrer")
    /// ```
    referrerPolicy(_policy) {
        this.bindState(_policy, "referrerpolicy", value => {
            this.setAttr("referrerpolicy", value)
        })  
    }
    
    /// ### .sandbox
    /// Specify additional restrictions for the iframe. See [w3schools](https://www.w3schools.com/tags/att_iframe_sandbox.asp) for details.
    /// <br/>**args**:
    /// - policy: The refferer policy to use
    /// ```javascript
    /// eclair.IFrame()
    ///     .sandbox("allow-forms")
    /// ```
    sandbox(_sandbox) {
        this.bindState(_sandbox, "sandbox", value => {
            this.setAttr("sandbox", value)
        })  
    }
}