// TODO IFrame Needs documentation and updating to states.
class EclairIFrame extends EclairCustomTagComponent {
    constructor() {
        super("iframe")
        this.innerHTML("Your client does not support iframes.")
        this.addStyle(eclair.styles.IFrame)
    }
    
    url(_source) {
        this.bindState(_source, "src", value => {
            this.setAttr("src", value)
        })  
    }
    
    source(_source) {
        this.bindState(_source, "srcdoc", value => {
            this.setAttr("srcdoc", value)
        })  
    }
    
    allowFullScren(_allow) {
        this.bindState(_allow, "allowfullscreen", value => {
            this.setAttr("allowfullscreen", value)
        })  
    }
    
    allowPaymentRequest(_allow) {
        this.bindState(_allow, "allowpaymentrequest", value => {
            this.setAttr("allowpaymentrequest", value)
        })  
    }
    
    loading(_loading) {
        this.bindState(_loading, "loading", value => {
            this.setAttr("loading", value)
        })  
    }
    
    name(_name) {
        this.bindState(_name, "name", value => {
            this.setAttr("name", value)
        })  
    }
    
    referrerPolicy(_policy) {
        this.bindState(_policy, "referrerpolicy", value => {
            this.setAttr("referrerpolicy", value)
        })  
    }
    
    sandbox(_sandbox) {
        this.bindState(_sandbox, "sandbox", value => {
            this.setAttr("sandbox", value)
        })  
    }
}