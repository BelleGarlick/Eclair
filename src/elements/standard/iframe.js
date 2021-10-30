/// TITLE Eclair IFrame
/// EXTENDS elements.custom-tag:EclairCustomTagComponent
/// DESC An eclair IFrame object.

Eclair.IFrame = function() {
    return new EclairIFrame();
}

/// SHARED-STYLE Eclair.styles.IFrame: Default iFrame style.
Eclair.styles.IFrame= Eclair.Style("eclair-style-iframe")
    .borderColor("#333333")
    .borderSize("1px")
    .width("100%")
    .height("100%")

/// ```javascript
/// Eclair.IFrame()
///     .url("https://www.w3schools.com")
///     .allowFullScren(true)
///     .referrerPolicy("no-referrer")
/// ```
class EclairIFrame extends EclairCustomTagComponent {    
    
    /// METHOD constructor
    /// DESC Construct an Eclair iFrame element.
    /// ```javascript
    /// Eclair.IFrame()
    /// ```
    constructor() {
        super("iframe")
        this.innerHTML("Your client does not support iframes.")
        this.addStyle(Eclair.styles.IFrame)
    }
        
    /// METHOD .url
    /// DESC Set the URL for the webpage you want the IFrame to display.
    /// ARG source: URL source for the IFrame to load.
    /// ```javascript
    /// Eclair.IFrame()
    ///     .url("http://www.w3schools.com")
    /// ```
    url(_source) {
        this.bindState(_source, "src", value => {
            this.setAttr("src", value)
        })  
        return this
    }
        
    /// METHOD .source
    /// DESC Set the webpage source code you want the IFrame to display.
    /// ARG source: HTML source for the IFrame to load.
    /// ```javascript
    /// Eclair.IFrame()
    ///     .source("<p>Hello World</p>")
    /// ```
    source(_source) {
        this.bindState(_source, "srcdoc", value => {
            this.setAttr("srcdoc", value)
        })  
        return this
    }
        
    /// METHOD .allowFullScren
    /// DESC Set if the frame can activate fullscreen mode by calling the requestFullscreen() method.
    /// ARG allow: If true it will be allowed.
    /// ```javascript
    /// Eclair.IFrame()
    ///     .allowFullScren(true)
    /// ```
    allowFullScren(_allow) {
        this.bindState(_allow, "allowfullscreen", value => {
            this.setAttr("allowfullscreen", value)
        })  
        return this
    }
        
    /// METHOD .allowPaymentRequest
    /// DESC If true the iframe will be allowed to invoke the Payment Request API
    /// ARG allow: If true the iframe can invoke the Payment Request API.
    /// ```javascript
    /// Eclair.IFrame()
    ///     .allowPaymentRequest(true)
    /// ```
    allowPaymentRequest(_allow) {
        this.bindState(_allow, "allowpaymentrequest", value => {
            this.setAttr("allowpaymentrequest", value)
        })  
        return this
    }
        
    /// METHOD .loading
    /// DESC Specifies how the iframe should be loaded - immediately or deferred.
    /// ARG loading: Can be either "eager" or "lazy".
    /// ```javascript
    /// Eclair.IFrame()
    ///     .loading("eager")
    /// ```
    loading(_loading) {
        this.bindState(_loading, "loading", value => {
            this.setAttr("loading", value)
        })  
        return this
    }
        
    /// METHOD .referrerPolicy
    /// DESC Specify the referrer policy of the iframe. See [w3schools](https://www.w3schools.com/tags/att_iframe_referrerpolicy.asp) for details.
    /// ARG policy: The refferer policy to use.
    /// ```javascript
    /// Eclair.IFrame()
    ///     .referrerPolicy("no-referrer")
    /// ```
    referrerPolicy(_policy) {
        this.bindState(_policy, "referrerpolicy", value => {
            this.setAttr("referrerpolicy", value)
        })  
        return this
    }
        
    /// METHOD .sandbox
    /// DESC Specify additional restrictions for the iframe. See [w3schools](https://www.w3schools.com/tags/att_iframe_sandbox.asp) for details.
    /// ARG sandbox: The sandbox rule to use.
    /// ```javascript
    /// Eclair.IFrame()
    ///     .sandbox("allow-forms")
    /// ```
    sandbox(_sandbox) {
        this.bindState(_sandbox, "sandbox", value => {
            this.setAttr("sandbox", value)
        })  
        return this
    }
}
