class EclairCheckbox extends EclairComponent {
    constructor(text) {
        super()
        
        this._enabled = true     
        
        this.setAttr("cellpadding", 6)     
            .addStyle(eclair.styles.CheckBox)   
        
        this._label = eclair.Text(text)
            .addStyle(eclair.styles.CheckBoxLabel)
        this._checkbox = eclair.CustomTagComponent("div")
            .addStyle(eclair.styles.CheckBoxIcon)
        
        this._hiddenValue = eclair.State(false)
        this._hidden = eclair.HiddenInput(this._hiddenValue)
        
        this.items = []
        
        let self = this
        this._updateCallback("onClick", () => {
            if (this.overrideOnClick != null) {
                this.overrideOnClick(this)
            }
            if (self._enabled) {   
                this.toggle()
                if (self._callbacks.hasOwnProperty("onChange")) 
                    self.performCallback("onChange")
            }  
        })
        
        this.overrideOnClick = null
    }
    
    label(callback) {
        callback(this._label)
        return this;
    }
    
    checkbox(callback) {
        callback(this._checkbox)
        return this;
    }
        
    // Standard element. No need to write doc.
    onClick(callback) {
        this.overrideOnClick = callback;
        return this;
    }
    
    value(_val) {
        if (_val == null) {
            return this._hiddenValue.bool()
        }
        
        if (this._callbacks.hasOwnProperty("onChange")) {
            this.performCallback("onChange")    
        }
        
        if (_val == true) {
            this._hiddenValue.value(true)
            this._checkbox
                .addStyle(eclair.styles.CheckBoxActiveIcon)
                .removeStyle(eclair.styles.CheckBoxIcon)
                .innerHTML("✓")
        } else {
            this._hiddenValue.value(false)
            this._checkbox
                .addStyle(eclair.styles.CheckBoxIcon)
                .removeStyle(eclair.styles.CheckBoxActiveIcon)
                .innerHTML("")
        }
        return this        
    }
    
    toggle() {
        this.value(!this.value())
        return this;
    }
    
    name(_name) {
        if (_name == null) {
            return this._hidden.name()
        } else {
            this._hidden.name(_name)
        }
        return this;
    }
    
    enabled(_enabled) {
        if (_enabled == null) {
            return this._enabled;
        } else {
            this._enabled = _enabled;
            return this
        }
    }
    
    // Standard element. No need to write doc.
    build() {
        let items = ""
        for (let i = 0; i < this.items.length; i++) {
            items += this.buildItem(this.items[i], i)
        }
        return this.wrapHTML(`<table><tr><td width=1>${this._checkbox.build()}</td><td>${this._label.build()}</td></tr></table>${this._hidden.build()}`)
    }
}