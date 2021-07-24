class EclairProgressBar extends EclairComponent {
    constructor(_progress) {
        super()
        
        this._striped = false
        
        this._labelText = eclair.State("0%")
        this._label = eclair.Text(this._labelText)
            .addStyle(eclair.styles.ProgressBarLabel)
        
        this._indicator = eclair.HBox([this._label])
            .margin(null)  // Overrides default HBox Margin
            .addStyle(eclair.styles.ProgressBarIndicator)
        
        // Add callback for progress changing state
        this.progress = _progress
        if (_progress instanceof EclairState) {
            this.progress = _progress.value()
            this._labelText.value(Math.round(this.progress * 100) + "%")
            this._indicator.width((this.progress * 100 + 0.0001) + "%")
            
            let self = this
            _progress.addCallback(this.id() + "-progress", function(state) {
                _progress = Math.max(Math.min(state.value(), 1), 0)
                self._progress = _progress;
                self._labelText.value(Math.round(_progress * 100) + "%")
                self._indicator.width((_progress * 100 + 0.0001) + "%")
            })
        }
        
        this.addStyle(eclair.styles.ProgressBar)
            .displayLabel(false)
    }
    
    striped(_on) {
        if (_on == null) {
            return this._striped;
        } else {
            if (_on) {
                this._indicator.getStyleSheet()["background-image"] = "linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)";
                this._indicator.getStyleSheet()["background-size"] = "1rem 1rem;";
            } else {
                this._indicator.getStyleSheet()["background-image"] = "";
                this._indicator.getStyleSheet()["background-size"] = "1rem 1rem;";
            }
            this._indicator.updateCSSStyle()
        }
        
        return this;
    }
    
    indicator(callback) {
        callback(this._indicator)
        return this;
    }
    
    label(callback) {
        callback(this._label)
        return this;
    }
    
    color(_color) {
        this._indicator.background(_color)
        return this
    }
    
    displayLabel(_show) {
        if (_show instanceof EclairState) {
            let self = this
            self._label.opacity(_show.bool()? "1":"0")
            
            _show.addCallback(this.id() + "-password", function(state) {
                self._label.opacity(state.bool()? "1":"0")
            })
        } else {
            this._label.opacity(_show? "1":"0")
        }
        
        return this
    }
    
    build() {
        return this.wrapHTML(`<div>${this._indicator.build()}</div>`)
    }
}