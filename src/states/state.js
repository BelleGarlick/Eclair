class EclairState {
    constructor(newValue) {
        this._value = newValue
        this.callbacks = {}
    }
    
    value(_value, component) {
        if (_value == undefined) {
            return this._value
        } else {
            if (_value != this._value){
                this._value = _value;
                
                let ignoreID = (component instanceof EclairComponent)? component.id() : ""

                let self = this
                Object.keys(self.callbacks).forEach(function(key) {
                    if (key != ignoreID) {
                        self.callbacks[key](self)
                        self.updateCallbacks()
                    }
                })
            }
        }
        
        return this
    }
    
    
    // CALL BACK CONTROLS
    
    updateCallbacks() {
        let self = this
        Object.keys(self.callbacks).forEach(function(key) {
            self.callbacks[key](self)
        })
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
    
    // SINGULAR VALUES
    
    string() {
        return `${this._value}`
    }
    
    number(_default) {
        try {
            if (this._value == null) { 
                return _default == null? 0 : _default
            }
            return parseFloat(this._value)
        } catch (error) {
            return _default == null? 0 : _default
        }
    }
    
    int(_default) {
        try {
            if (this._value == null) { 
                return _default == null? 0 : _default
            }
            return parseInt(this._value)
        } catch (error) {
            return _default == null? 0 : _default
        }
    }
    
    bool() {
        return this._value == "true" || this._value == "True" || this._value == "TRUE" || 
            this._value == "yes" || this._value == "1" || this._value == "Yes" || 
            this._value == "YES" || this._value == true || this._value == 1
    }

    toggle() {
        this.value(!this.bool())
    }

    // ARRAYS

    isArray(_func) {
        let correntType = this._value instanceof Array
        
        if (_func != null) {
            if (correntType) {
                let retValue = _func()
                if (retValue != null) {
                    return retValue
                }
            } else {
                throw "State is not of type Array"
            }
            return this
        }
        
        return correntType
    }

    length() {
        return this.isArray(_ => {
            return this._value.length
        })
    }

    add(_item) {
        return this.isArray(_ => {
            this._value.push(_item)
            this.updateCallbacks()
        })
    }

    addAll(_items) {
        return this.isArray(_ => {
            for (let i = 0; i < _items.length; i++) {
                this._value.push(_items[i])
            }
            this.updateCallbacks()
        })
    }

    insert(_item, _index) {
        return this.isArray(_ => {
            for (let i = 0; i < _items.length; i++) {
                this._value.splice(_index, 0, _item)
            }
            this.updateCallbacks()
        })
    }

    remove(_value) {
        return this.isArray(_ => {
            let removedValue = this._value.splice(this._value.indexOf(_value), 1)
            this.updateCallbacks()
            return removedValue;
        })
    }

    removeAt(_index) {
        return this.isArray(_ => {
            let removedValue = this._value.splice(_index, 1)
            this.updateCallbacks()
            return removedValue;
        })
    }

    // TODO Remove all 
    // TODO Remove all at

    get(_index, _toIndex) {
        if (this.isArray() && this._value.length > 0) {
            if (_toIndex == null) {
                var start = _index
                while (start < 0) {
                    start += this._value.length;
                }
                return this._value[start]
            } else {
                if (_index < _toIndex) {
                    console.log("TODO")
                } else if (_index == _toIndex) {
                    console.log("TODO")
                } else {
                    // if _toIndex > index
                    console.log("TODO")
                }
                
            }
        }
        
        return null
    }
    
    
    true() {
        this.value(true)
        return this
    }

    false() {
        this.value(false)
        return this
    }
}
