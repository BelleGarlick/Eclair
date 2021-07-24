// PRINT Need to add more default colours
// PRINT TODO Store all colours as rgba to allow for darkening colours.
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
    
    white() {return this.hex("fff")}
    red() {return this.hex("f00")}
    orange() {return this.hex("f90")}
    yellow() {return this.hex("ee0")}
    green() {return this.hex("3d0")} 
    aqua() {return this.hex("0cc")}
    blue() {return this.hex("06f")}
    
    success() {return this.hex("d4edd9")}
    danger() {return this.hex("f8d7d9")}
    warning() {return this.hex("fff3cd")}
    info() {return this.hex("d1ecf1")}
    light() {return this.hex("efefef")}
    dark() {return this.hex("d5d8d9")}
}
