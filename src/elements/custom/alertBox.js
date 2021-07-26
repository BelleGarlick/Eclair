class EclairAlertBox extends EclairComponent {
    constructor(alert) {
        super()
        
        this._titleText = eclair.State(null)
        this._title = eclair.Text(this._titleText)
            .fontWeight(500)
            .fontSize("1.5rem")
            .display("none")
            .fontColor("rgba(0, 0, 0, 0.6)")
            .width("100%")
        this._text = eclair.Text(alert)
            .fontColor("rgba(0, 0, 0, 0.6)")
        
        // Configure parent/children relation
        this._title.parent = this
        this._text.parent = this
        this.children = [this._title, this._text]
        
        this._title.getStyleSheet()["margin-bottom"] = ".5rem"
        
        this
            .background(eclair.theme.accent)
            .borderRadius(".25rem")
            .padding(".75rem 1.25rem")
        
        let styleSheet = this.getStyleSheet(" hr")
        styleSheet["border"] = "0px"
        styleSheet["margin-top"] = ".75rem"
        styleSheet["margin-bottom"] = ".75rem"
        styleSheet["border-top"] = "1px solid rgba(0, 0, 0, 0.2)"
        this.getStyleSheet()["box-shadow"] = "0px 0px 0px 2px rgba(0, 0, 0, 0.2) inset"
    }
    
    theme(_theme) {
        if (_theme instanceof EclairState) {            
            let self = this
            _theme.addCallback(this.id() + "-theme", function(state) {
                self.background(state.value())
            }, true)
        } else {
            this.background(_theme)
        }
        
        return this
    }
        
//    / ### .showLabel
//    / Sets whether the progress label should show on the progress bar.  
//    / **args**:
//    / - _show: Can be either a bool or an eclair State.
//    / ```javascript
//    / eclair.ProgressBar(0.5)
//    /     .showLabel(true)
//    / ```
    title(_text) {        
        if (_text instanceof EclairState) {            
            let self = this
            _text.addCallback(this.id() + "-title", function(state) {
                self._titleText.value(state.value())
                if (state.value() == null || state.value().trim().length == 0) {
                    self._title.display("none")
                } else {
                    self._title.display("block")
                }
            }, true)
        } else {
            if (_text == null || _text.trim().length == 0) {
                this._title.display("none")
            } else {
                this._title.display("block")
            }
        }
        
        return this
    }
    
    build() {
        return `<div>${this._title.compile()}${this._text.compile()}</div>`
    }
}