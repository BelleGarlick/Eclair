/// ## Eclair Text
/// Create a eclair text object.
/// ```javascript
/// eclair.Text('Welcome')
///     .type("title")
/// ```
class EclairText extends EclairComponent {
    constructor(text) {
        super()
        
        this.bindState(text, "text", value => {
            this._text = value;
            this.getElement(elem => {elem.innerHTML = value});
        })  
        
        this.addStyle(eclair.styles.Text)
    }
    
    /// ### .type
    /// Set the type of text this is to a predefined style from the list of following: `title, subtitle, heading1, heading2, heading3, heading 4`.    
    /// ```javascript
    /// eclair.Text('Hello')
    ///     .type('heading1')
    /// ```
    type(_state) {
        this.bindState(_state, "type", newType => {
            if (newType == "title") {
                this.fontSize("40px")
                    .fontWeight(700)
                    .margin("20px 10px 10px 10px")
            }

            if (newType == "subtitle") {
                this.fontSize("25px")
                    .margin("20px 10px 10px 10px")
            }

            if (newType == "heading1") {
                this.fontSize("30px")
                    .fontWeight(700)
                    .margin("20px 10px 10px 10px")
            }

            if (newType == "heading2") {
                this.fontSize("25px")
                    .fontWeight(700)
                    .margin("20px 10px 10px 10px")
            }

            if (newType == "heading3") {
                this.fontSize("20px")
                    .fontWeight(700)
                    .margin("20px 10px 10px 10px")
            }

            if (newType == "heading4") {
                this.fontSize("15px")
                    .fontWeight(700)
                    .margin("20px 10px 10px 10px")
            }
        })  
        
        return this
    }
    
    // No doc listed as this is standard eclair object
    build() {
        return `<span>${this._text}</span>`
    }
}
