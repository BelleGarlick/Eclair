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
    
    _setType(newType) {
        if (newType == "title") {
            this.fontSize("40px").fontWeight(700).margin("50px 10px 10px 10px")
        }
        
        if (newType == "subtitle") {
            this.fontSize("25px").margin("50px 10px 10px 10px")
        }
        
        if (newType == "heading1") {
            this.fontSize("30px")
            this.fontWeight(700)
            this.margin("50px 10px 10px 10px")
        }
        
        if (newType == "heading2") {
            this.fontSize("25px")
            this.fontWeight(700)
            this.margin("50px 10px 10px 10px")
        }
        
        if (newType == "heading3") {
            this.fontSize("20px")
            this.fontWeight(700)
            this.margin("50px 10px 10px 10px")
        }
        
        if (newType == "heading4") {
            this.fontSize("15px")
            this.fontWeight(700)
            this.margin("50px 10px 10px 10px")
        }
    }
    
    build() {
        return this.wrapHTML(`<span>${this._text}</span>`)
    }
}
