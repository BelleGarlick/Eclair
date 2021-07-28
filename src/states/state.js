class EclairState {
    constructor(newValue) {
        this._value = newValue
        this.callbacks = {}
    }
    
    value(_value) {
        if (_value == undefined) {
            return this._value
        } else {
            this._value = _value;
            
            let self = this
            Object.keys(self.callbacks).forEach(function(key) {
                self.callbacks[key](self)
            })
        }
        
        return this
    }
    
    addCallback(key, func, perform) {
        this.callbacks[key] = func
        if (perform == true) {
            func(this)
        }
    }
    
    removeCallback(key) {
        delete this.callbacks[key]
    }
    
    string() {
        return `${this._value}`
    }
    
    number(_default) {
        try {
            return parseFloat(this._value)
        } catch {
            if (_default == null) {
                return 0
            } else {
                return _default
            }
        }
    }
    
    int(_default) {
        try {
            return parseInt(this._value)
        } catch {
            if (_default == null) {
                return 0
            } else {
                return _default
            }
        }
    }
    
    bool() {
        return this._value == "true" || this._value == "True" || this._value == "TRUE" || 
            this._value == "yes" || this._value == "1" || this._value == "Yes" || 
            this._value == "YES" || this._value == true || this._value == 1
    }

    true() {
        this.value(true)
        return this
    }

    false() {
        this.value(false)
        return this
    }
    

    toggle() {
        this.value(!this.bool())
    }
}
