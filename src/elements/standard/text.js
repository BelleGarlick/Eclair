/// ## Eclair Text
/// Create a eclair text object.
/// ```javascript
/// eclair.Text('Welcome')
///     .type("title")
/// ```
class EclairText extends EclairComponent {
    constructor(text) {
        super()
        
        this._text = text;
        if (text instanceof EclairState) {
            let self = this
            text.addCallback(this.id() + "-text", function(state) {
                let newState = state.value()
                self._text = newState;
                self.getElement(elem => {elem.innerHTML = newState});
            }, true)
        }
        
        this.addStyle(eclair.styles.Text)
    }
    
    /// ### .type
    /// Set the type of text this is to a predefined style from the list of following: `title, subtitle, heading1, heading2, heading3, heading 4`.    
    /// ```javascript
    /// eclair.Text('Hello')
    ///     .type('heading1')
    /// ```
    type(_state) {
        if (_state instanceof EclairTextStyleState) {
            let self = this
            _state.addCallback(this.id() + "-type", function(state) {
                self._setType(state.value())
            }, true)
        } else {
            this._setType(_state);
        }
        
        return this
    }
    
    // This shouldn't really be accessed externally as it should all be done via .type.
    // All this does is set the style based upon the styling type given.
    _setType(newType) {
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
    }
    
    // No doc listed as this is standard eclair object
    build() {
        return `<span>${this._text}</span>`
    }
}
