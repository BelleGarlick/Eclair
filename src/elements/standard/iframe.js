// TODO IFrame Needs documentation and updating to states.
class EclairIFrame extends EclairCustomTagComponent {
    constructor() {
        super("iframe")
        this.innerHTML("Your client does not support iframes.")
        this.addStyle(eclair.styles.IFrame)
    }
    
    url(_source) {
        return _source == null? this.getAttr("src") : this.setAttr("src", _source)
    }
    
    source(_source) {
        return _source == null? this.getAttr("srcdoc") : this.setAttr("srcdoc", _source)
    }
    
    allowFullScren(_allow) {
        return _allow == null? this.getAttr("allowfullscreen") : this.setAttr("allowfullscreen", _allow)
    }
    
    allowPaymentRequest(_allow) {
        return _allow == null? this.getAttr("allowpaymentrequest") : this.setAttr("allowpaymentrequest", _allow)
    }
    
    loading(_loading) {
        return _loading == null? this.getAttr("loading") : this.setAttr("loading", _loading)
    }
    
    name(_name) {
        return _name == null? this.getAttr("name") : this.setAttr("name", _name)
    }
    
    referrerPolicy(_policy) {
        return _policy == null? this.getAttr("referrerpolicy") : this.setAttr("referrerpolicy", _policy)
    }
    
    sandbox(_sandbox) {
        return _sandbox == null? this.getAttr("sandbox") : this.setAttr("sandbox", _sandbox)
    }
}