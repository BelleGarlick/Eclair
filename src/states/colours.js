// PRINT Need to add more default colours
class EclairColour extends EclairState {
    constructor(_col) {
        super()
        
        if (_col != null) {
            this.value(_col)
        }
    }
    
    hex(_hex) {
        this.value(_hex[0] == "#" ? _hex:`#${_hex}`)
        return this;
    }
    
    rgb(r, g, b) {
        this.value(`rgb(${r},${g},${b})`)
        return this;
    }
    
    rgba(r, g, b, a) {
        this.value(`rgb(${r},${g},${b}, ${a})`)
        return this;
    }   
}
