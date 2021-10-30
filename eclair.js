
// core




let Eclair = {
    version: "0.0.92",
    _ids: 0,
    _elements: {},
    _styles: {},
    _newID: function() {
        this._ids += 1; 
        return "eclair-element-" + (this._ids - 1);
    },

    theme: {},
    styles: {},
    
    triggerEvent: function(eclairID, eventID, event, param) {
        this._elements[eclairID].triggerEvent(eventID, event, param);
    }
}


try {
    Ecalir.theme.accent = EclairThemeColor;
    Ecalir.theme.font = EclairThemeFont;
} catch(err) {
    Eclair.theme.accent = "#ee8800"
    Eclair.theme.font = '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"'
}


function Ø(value) {
    return new EclairState(value)
}


// functional.states.state

Eclair.State = function(_val) {
    return new EclairState(_val);
}  

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
                
                let ignoreID = (component instanceof EclairComponent)? component.eID() : ""

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


// functional.states.alignment

Eclair.Alignment = function() {
    return new EclairAlignmentState();
}

class EclairAlignmentState extends EclairState {
    
    constructor() {
        super("center")
    }
    
    start() {this.value("start"); return this;}
    
    center() {this.value("center"); return this;}
    
    end() {this.value("end"); return this;}
}


// functional.states.color

Eclair.Color = function(_col) {
    return new EclairColor(_col);
}

class EclairColor extends EclairState {
    
    constructor() {
        super("#000000")
        
        this._r = 0
        this._g = 0
        this._b = 0
        this._a = 0
    }
    
    RGB(r, g, b) {
        return this.RGBA(r, g, b, 1)
    }
    
    RGBA(r, g, b, a) {
        this.value(`rgb(${r}, ${g}, ${b}, ${a})`)
        
        this._r = r
        this._g = g
        this._b = b
        this._a = a
        
        return this;
    }  
    
    HSLA(h, s, l){
        return this.HSLA(h, s, l, 1)
    }
    
    HSLA(h, s, l, a){
        var r, g, b;

        if  (s == 0){
            r = g = b = l; // achromatic
        } else {
            var hue2rgb = function hue2rgb(p, q, t){
                if(t < 0) t += 1;
                if(t > 1) t -= 1;
                if(t < 1/6) return p + (q - p) * 6 * t;
                if(t < 1/2) return q;
                if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            }

            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }

        return this.RGBA(
            Math.round(r * 255),
            Math.round(g * 255),
            Math.round(b * 255),
            a
        )
        
        return this;
    }
    
    toHSL() {
        let r = this._r / 255
        let g = this._g / 255
        let b = this._b / 255
        
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;

        if(max == min){
            h = s = 0; // achromatic
        } else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch(max){
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return [h, s, l];
    }
    
    hex(_hex) {
        let hex_map = {
            "0": 0, "1": 1, "2": 2, "3": 3, "4": 4, 
            "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, 
            "a": 10, "b": 11, "c": 12, "d": 13, "e": 14, "f": 15
        }
        
        var value = _hex
        if (value[0] == "#") {
            value = value.substring(1)
        }
        
        if (value.length == 3) {
            let r = hex_map[value[0].toLowerCase()]
            let g = hex_map[value[1].toLowerCase()]
            let b = hex_map[value[2].toLowerCase()]
            this.RGB(r * 17, g * 17, b * 17)
            
        } else if (value.length == 4) {
            let r = hex_map[value[0].toLowerCase()]
            let g = hex_map[value[1].toLowerCase()]
            let b = hex_map[value[2].toLowerCase()]
            let a = hex_map[value[3].toLowerCase()]
            this.RGB(r * 17, g * 17, b * 17, a / 15)
            
        } else if (value.length == 6) {
            let r1 = hex_map[value[0].toLowerCase()]
            let r2 = hex_map[value[1].toLowerCase()]
            let g1 = hex_map[value[2].toLowerCase()]
            let g2 = hex_map[value[3].toLowerCase()]
            let b1 = hex_map[value[4].toLowerCase()]
            let b2 = hex_map[value[5].toLowerCase()]
            this.RGB(r1 * 16 + r2, g1 * 16 + g2, b1 * 16 + b2)
         
        } else if (value.length == 8) {
            let r1 = hex_map[value[0].toLowerCase()]
            let r2 = hex_map[value[1].toLowerCase()]
            let g1 = hex_map[value[2].toLowerCase()]
            let g2 = hex_map[value[3].toLowerCase()]
            let b1 = hex_map[value[4].toLowerCase()]
            let b2 = hex_map[value[5].toLowerCase()]
            let a1 = hex_map[value[6].toLowerCase()]
            let a2 = hex_map[value[7].toLowerCase()]
            this.RGB(r1 * 16 + r2, g1 * 16 + g2, b1 * 16 + b2, (a1 * 16 + a1) / 255)
        }
        
        this.value(`#${value}`)
        return this;
    } 
    
    lighten(value) {
        this._r = Math.min(255, this._r + value)
        this._g = Math.min(255, this._g + value)
        this._b = Math.min(255, this._b + value)
        this.value(`rgb(${this._r}, ${this._g}, ${this._b}, ${this._a})`)
        
        return this;
    }
    
    darken(value) {
        this._r = Math.max(0, this._r - value)
        this._g = Math.max(0, this._g - value)
        this._b = Math.max(0, this._b - value)
        this.value(`rgb(${this._r}, ${this._g}, ${this._b}, ${this._a})`)
        
        return this;
    }
    
    success() {return this.hex("d4edd9")}
    danger() {return this.hex("f8d7d9")}
    warning() {return this.hex("fff3cd")}
    info() {return this.hex("d1ecf1")}
    light() {return this.hex("efefef")}
    dark() {return this.hex("d5d8d9")}
    
    aliceBlue() {return this.rgb(240, 248, 255)}
    antiqueWhite() {return this.rgb(250, 235, 215)}
    aqua() {return this.rgb(0, 255, 255)}
    aquamarine() {return this.rgb(127, 255, 212)}
    azure() {return this.rgb(240, 255, 255)}
    beige() {return this.rgb(245, 245, 220)}
    bisque() {return this.rgb(255, 228, 196)}
    black() {return this.rgb(0, 0, 0)}
    blanchedAlmond() {return this.rgb(255, 235, 205)}
    blue() {return this.rgb(0, 0, 255)}
    blueViolet() {return this.rgb(138, 43, 226)}
    brown() {return this.rgb(165, 42, 42)}
    burlyWood() {return this.rgb(222, 184, 135)}
    cadetBlue() {return this.rgb(95, 158, 160)}
    chartreuse() {return this.rgb(127, 255, 0)}
    chocolate() {return this.rgb(210, 105, 30)}
    coral() {return this.rgb(255, 127, 80)}
    cornflowerBlue() {return this.rgb(100, 149, 237)}
    cornsilk() {return this.rgb(255, 248, 220)}
    crimson() {return this.rgb(220, 20, 60)}
    cyan() {return this.rgb(0, 255, 255)}
    darkBlue() {return this.rgb(0, 0, 139)}
    darkCyan() {return this.rgb(0, 139, 139)}
    darkGoldenRod() {return this.rgb(184, 134, 11)}
    darkGray() {return this.rgb(169, 169, 169)}
    darkGrey() {return this.rgb(169, 169, 169)}
    darkGreen() {return this.rgb(0, 100, 0)}
    darkKhaki() {return this.rgb(189, 183, 107)}
    darkMagenta() {return this.rgb(139, 0, 139)}
    darkOliveGreen() {return this.rgb(85, 107, 47)}
    darkOrange() {return this.rgb(255, 140, 0)}
    darkOrchid() {return this.rgb(153, 50, 204)}
    darkRed() {return this.rgb(139, 0, 0)}
    darkSalmon() {return this.rgb(233, 150, 122)}
    darkSeaGreen() {return this.rgb(143, 188, 143)}
    darkSlateBlue() {return this.rgb(72, 61, 139)}
    darkSlateGray() {return this.rgb(47, 79, 79)}
    darkSlateGrey() {return this.rgb(47, 79, 79)}
    darkTurquoise() {return this.rgb(0, 206, 209)}
    darkViolet() {return this.rgb(148, 0, 211)}
    deepPink() {return this.rgb(255, 20, 147)}
    deepSkyBlue() {return this.rgb(0, 191, 255)}
    dimGray() {return this.rgb(105, 105, 105)}
    dimGrey() {return this.rgb(105, 105, 105)}
    dodgerBlue() {return this.rgb(30, 144, 255)}
    fireBrick() {return this.rgb(178, 34, 34)}
    floralWhite() {return this.rgb(255, 250, 240)}
    forestGreen() {return this.rgb(34, 139, 34)}
    fuchsia() {return this.rgb(255, 0, 255)}
    gainsboro() {return this.rgb(220, 220, 220)}
    ghostWhite() {return this.rgb(248, 248, 255)}
    gold() {return this.rgb(255, 215, 0)}
    goldenRod() {return this.rgb(218, 165, 32)}
    gray() {return this.rgb(128, 128, 128)}
    grey() {return this.rgb(128, 128, 128)}
    green() {return this.rgb(0, 128, 0)}
    greenYellow() {return this.rgb(173, 255, 47)}
    honeyDew() {return this.rgb(240, 255, 240)}
    hotPink() {return this.rgb(255, 105, 180)}
    indianRed () {return this.rgb(205, 92, 92)}
    indigo () {return this.rgb(75, 0, 130)}
    ivory() {return this.rgb(255, 255, 240)}
    khaki() {return this.rgb(240, 230, 140)}
    lavender() {return this.rgb(230, 230, 250)}
    lavenderBlush() {return this.rgb(255, 240, 245)}
    lawnGreen() {return this.rgb(124, 252, 0)}
    lemonChiffon() {return this.rgb(255, 250, 205)}
    lightBlue() {return this.rgb(173, 216, 230)}
    lightCoral() {return this.rgb(240, 128, 128)}
    lightCyan() {return this.rgb(224, 255, 255)}
    lightGoldenRodYellow() {return this.rgb(250, 250, 210)}
    lightGray() {return this.rgb(211, 211, 211)}
    lightGrey() {return this.rgb(211, 211, 211)}
    lightGreen() {return this.rgb(144, 238, 144)}
    lightPink() {return this.rgb(255, 182, 193)}
    lightSalmon() {return this.rgb(255, 160, 122)}
    lightSeaGreen() {return this.rgb(32, 178, 170)}
    lightSkyBlue() {return this.rgb(135, 206, 250)}
    lightSlateGray() {return this.rgb(119, 136, 153)}
    lightSlateGrey() {return this.rgb(119, 136, 153)}
    lightSteelBlue() {return this.rgb(176, 196, 222)}
    lightYellow() {return this.rgb(255, 255, 224)}
    lime() {return this.rgb(0, 255, 0)}
    limeGreen() {return this.rgb(50, 205, 50)}
    linen() {return this.rgb(250, 240, 230)}
    magenta() {return this.rgb(255, 0, 255)}
    maroon() {return this.rgb(128, 0, 0)}
    mediumAquaMarine() {return this.rgb(102, 205, 170)}
    mediumBlue() {return this.rgb(0, 0, 205)}
    mediumOrchid() {return this.rgb(186, 85, 211)}
    mediumPurple() {return this.rgb(147, 112, 219)}
    mediumSeaGreen() {return this.rgb(60, 179, 113)}
    mediumSlateBlue() {return this.rgb(123, 104, 238)}
    mediumSpringGreen() {return this.rgb(0, 250, 154)}
    mediumTurquoise() {return this.rgb(72, 209, 204)}
    mediumVioletRed() {return this.rgb(199, 21, 133)}
    midnightBlue() {return this.rgb(25, 25, 112)}
    mintCream() {return this.rgb(245, 255, 250)}
    mistyRose() {return this.rgb(255, 228, 225)}
    moccasin() {return this.rgb(255, 228, 181)}
    navajoWhite() {return this.rgb(255, 222, 173)}
    navy() {return this.rgb(0, 0, 128)}
    oldLace() {return this.rgb(253, 245, 230)}
    olive() {return this.rgb(128, 128, 0)}
    oliveDrab() {return this.rgb(107, 142, 35)}
    orange() {return this.rgb(255, 165, 0)}
    orangeRed() {return this.rgb(255, 69, 0)}
    orchid() {return this.rgb(218, 112, 214)}
    paleGoldenRod() {return this.rgb(238, 232, 170)}
    paleGreen() {return this.rgb(152, 251, 152)}
    paleTurquoise() {return this.rgb(175, 238, 238)}
    paleVioletRed() {return this.rgb(219, 112, 147)}
    papayaWhip() {return this.rgb(255, 239, 213)}
    peachPuff() {return this.rgb(255, 218, 185)}
    peru() {return this.rgb(205, 133, 63)}
    pink() {return this.rgb(255, 192, 203)}
    plum() {return this.rgb(221, 160, 221)}
    powderBlue() {return this.rgb(176, 224, 230)}
    purple() {return this.rgb(128, 0, 128)}
    rebeccaPurple() {return this.rgb(102, 51, 153)}
    red() {return this.rgb(255, 0, 0)}
    rosyBrown() {return this.rgb(188, 143, 143)}
    royalBlue() {return this.rgb(65, 105, 225)}
    saddleBrown() {return this.rgb(139, 69, 19)}
    salmon() {return this.rgb(250, 128, 114)}
    sandyBrown() {return this.rgb(244, 164, 96)}
    seaGreen() {return this.rgb(46, 139, 87)}
    seaShell() {return this.rgb(255, 245, 238)}
    sienna() {return this.rgb(160, 82, 45)}
    silver() {return this.rgb(192, 192, 192)}
    skyBlue() {return this.rgb(135, 206, 235)}
    slateBlue() {return this.rgb(106, 90, 205)}
    slateGray() {return this.rgb(112, 128, 144)}
    slateGrey() {return this.rgb(112, 128, 144)}
    snow() {return this.rgb(255, 250, 250)}
    springGreen() {return this.rgb(0, 255, 127)}
    steelBlue() {return this.rgb(70, 130, 180)}
    tan() {return this.rgb(210, 180, 140)}
    teal() {return this.rgb(0, 128, 128)}
    thistle() {return this.rgb(216, 191, 216)}
    tomato() {return this.rgb(255, 99, 71)}
    turquoise() {return this.rgb(64, 224, 208)}
    violet() {return this.rgb(238, 130, 238)}
    wheat() {return this.rgb(245, 222, 179)}
    white() {return this.rgb(255, 255, 255)}
    whiteSmoke() {return this.rgb(245, 245, 245)}
    yellow() {return this.rgb(255, 255, 0)}
    yellowGreen() {return this.rgb(154, 205, 50)}

}



// functional.requests.request

Eclair.request = function(_url, _method) {
    return new EclairHTTPRequest(_url, _method);
}

class EclairHTTPRequest {
    
    constructor(url, method) {
        this.url = url
        this.method = method

        this._responseType = ""
        this._timeout = 10000  // 10s
        this._headers = {}
        this._async = true
        this._widthCredentials = false
        
        this._onLoad = null
        this._onError = null
        this._onProgress = null
        this._onLoadUpload = null
        this._onErrorUpload = null
        this._onProgressUpload = null
        this._onReadyStateChange = null
    }
    
    onSuccess(callback) {
        this._onLoad = callback
        return this
    }
    
    onUploadSuccess(callback) {
        this._onLoadUpload = callback
        return this
    }
    
    onError(callback) {
        this._onError = callback
        return this
    }
    
    onUploadError(callback) {
        this._onE_onErrorUploadrror = callback
        return this
    }
    
    onProgress(callback) {
        this._onProgress = callback
        return this
    }
    
    onUploadProgress(callback) {
        this._onProgressUpload = callback
        return this
    }
    
    onReadyStateChanged(callback) {
        this._onReadyStateChange = callback
        return this
    }
    
    setHeader(key, value) {
        this._headers[key] = (value instanceof EclairState)? value.value() : value
        return this
    }
    
    setAsync(value) {
        this._async = (value instanceof EclairState)? value.value() : value
        return this
    }
            
    responseType(value) {
        this._responseType = (value instanceof EclairState)? _value.value() : value
        return this
    }
            
    timeout(value) {
        this._timeout = (value instanceof EclairState)? value.value() : value
        return this
    }
             
    widthCredentials(value) {
        this._widthCredentials = (value instanceof EclairState)? value.value() : value
        return this
    }
    
    _buildXTTPObject() {
        var xhttp = (window.XMLHttpRequest)? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

        let self = this
        xhttp.onload = function() {if (self._onLoad != null) {self._onLoad(xhttp.response)}}
        xhttp.upload.onload = function() {if (self._onLoadUpload != null) {self._onLoadUpload()}}
        
        xhttp.onerror = function() {if (self._onError != null) {self._onError(xmlhttp.status)}}
        xhttp.upload.onerror = function() {if (self._onErrorUpload != null) {self._onErrorUpload(xmlhttp.status)}}
        
        xhttp.onprogress = function(evt) {
            if (self._onProgress != null) {self._onProgress(evt.loaded / evt.total)}
        }
        xhttp.upload.onprogress = function(evt) {
            if (self._onProgressUpload != null) {self._onProgressUpload(evt.loaded / evt.total)}
        }
        
        xhttp.onreadystatechange = function() {
            if (self._onReadyStateChange != null) {
                self._onReadyStateChange(xhttp)
            }
        };

        xhttp.withCredentials = this._widthCredentials
        xhttp.timeout = this._timeout
        xhttp.responseType = this._responseType
        
        let keys = Object.keys(this._headers);
        for (let k = 0; k < keys.length; k++) {
            xhttp.setRequestHeader(keys[k], this._headers[k]);
        }
        
        xhttp.open(this.method, this.url, this._async);
        
        return xhttp
    }
    
    send(_form) {
        var xhttp = this._buildXTTPObject();
        
        var formData = new FormData;
        if (_form instanceof HTMLElement && _form.tagName == "FORM") {
            formData = new FormData(_form)
            
        } else if (_form instanceof EclairForm) {
            _form.getElement(e => {
                formData = new FormData(e)
            })
            
        } else if (_form.constructor == Object) {
            Object.keys(_form).forEach(function(key) {
                let value = _form[key]
                console.log()
                if (value instanceof EclairState) {
                    value = value.value()
                    
                } else if (value instanceof HTMLElement && value.tagName == "INPUT") {
                    if (value.getAttribute("type") == "file") {
                        value = value.files[0]
                    } else {
                        value = value.value;
                    }
                } 
                
                
                formData.append(key, value)
            })
        }
        
        xhttp.send(formData);

        return this
    }
}


// functional.requests.get

Eclair.get = function(_url) {
    return new EclairGet(_url);
}

class EclairGet extends EclairHTTPRequest {
            
    constructor(url) {
        super(url, "GET")
    }
}


// functional.requests.post

Eclair.post = function(_url) {
    return new EclairPost(_url);
}

class EclairPost extends EclairHTTPRequest {
        
    constructor(url) {
        super(url, "POST")
    }
}






// style.style
class EclairStylableObject {
    constructor() {
        this._styles = {}
    }
    
    _getStyleSheet(rule, selector) {
        if (rule == null) {rule = ""}
        if (selector == null) {selector = ""}
        
        if (!this._styles.hasOwnProperty(rule)) {this._styles[rule] = {}}
        if (!this._styles[rule].hasOwnProperty(selector)) {this._styles[rule][selector] = {}}
        
        return this._styles[rule][selector];
    }
    
    buildStyleObject(cssOnly) {
        if (cssOnly == null) {cssOnly = false}
        let self = this;
        let objectID = this.eID()
        
        function jsonToCss(_json) {
            let styleCode = ""
            Object.keys(_json).forEach(function(selector) {
                let styleSheet = _json[selector];
                let styleSheetCode = '';

                Object.keys(_json[selector]).forEach(function(key) {
                    if (key != "css") {
                        let value = _json[selector][key]
                        styleSheetCode += `${key}:${value};` 
                    }
                });
                if (_json[selector].hasOwnProperty("css")) {
                    styleSheetCode += _json[selector]['css']
                }

                if (selector.length > 0) {
                    if (selector[0] != " ") {
                        selector = ":" + selector;
                    }
                }
                styleCode += `.${objectID}${selector}{${styleSheetCode}}`;
            });
            
            return styleCode
        }
        
        let fullStyleCode = ""
        Object.keys(this._styles).forEach(function(rule) {
            if (rule == "") {
                fullStyleCode += jsonToCss(self._styles[rule])
            } else {
                fullStyleCode += rule + "{" + jsonToCss(self._styles[rule]) + "}"
            }
        });
        
        if (cssOnly) {
            return fullStyleCode
        }
        
        if (fullStyleCode.length == 0) {return null}
        
        let styleObject = document.createElement("style");
        styleObject.setAttribute("class", `${objectID}-css`)
        styleObject.innerHTML = fullStyleCode
        
        return styleObject;
    }
    
    updateCSSStyle() {
        let curCSSElements = document.getElementsByClassName(this.eID() + "-css");
        let newCSSElement = this.buildStyleObject();
        
        if (newCSSElement != null) {
            if (curCSSElements.length == 0) {
                if (!(this instanceof EclairStyleComponent)) {
                    document.head.appendChild(newCSSElement)
                }
            } else {
                curCSSElements[0].innerHTML = newCSSElement.innerHTML;
            }
        } else {
            if (curCSSElements.length > 0) {
                curCSSElements[0].parentElement.removeChild(curCSSElements[0]);
            }
        }
        
        return this;
    }
    
    _set(property, _style, _rule) {
        let selector = null
        let rule = null
        
        if (_rule != null) {
            if (_rule.hasOwnProperty("selector") || _rule.hasOwnProperty("rule")) {
                if (_rule.hasOwnProperty("selector")) {selector = _rule["selector"]}
                if (_rule.hasOwnProperty("rule")) {
                    rule = _rule["rule"]
                    if (rule == "darkmode") {rule = "@media (prefers-color-scheme: dark)"}
                }
            } else {
                selector = _rule
            }
        }
        
        this._getStyleSheet(rule, selector)[property] = _style; 
        
        if (_style instanceof EclairState) {
            let self = this
            _style.addCallback(this.eID() + `-style-{property}`, function(state) {
                self._getStyleSheet(rule, selector)[property] = _style.string(); 
                self.updateCSSStyle()
            }, true)
        }
        
        return this.updateCSSStyle()
    }
    
    css(_style, rule) {return this._set("css", _style, rule)}
    display(_display, rule) {return this._set("display", _display, rule)}
    background(_background, rule) {return this._set("background", _background, rule)}
    backgroundColor(_color, rule) {return this._set("background-color", _color, rule)}
    backgroundSize(_color, rule) {return this._set("background-size", _color, rule)}
    borderSize(_size, rule) {return this._set("border-width", _size, rule)}
    borderColor(_color, rule) {return this._set("border-color", _color, rule)}
    borderStyle(_style, rule) {return this._set("border-style", _style, rule)}
    borderRadius(_radius, rule) {return this._set("border-radius", _radius, rule)}
    boxShadow(_radius, rule) {return this._set("box-shadow", _radius, rule)}
    padding(_size, rule) {return this._set("padding", _size, rule)}
    margin(_size, rule) {return this._set("margin", _size, rule)}
    marginTop(_size, rule) {return this._set("margin-top", _size, rule)}
    marginLeft(_size, rule) {return this._set("margin-left", _size, rule)}
    marginBottom(_size, rule) {return this._set("margin-bottom", _size, rule)}
    marginright(_size, rule) {return this._set("margin-right", _size, rule)}
    gap(_size, rule) {return this._set("gap", _size, rule)}
    font(_family, rule) {return this._set("font-family", _family, rule)}
    fontSize(_size, rule) {return this._set("font-size", _size, rule)}
    fontColor(_color, rule) {return this._set("color", _color, rule)}
    fontWeight(_weight, rule) {return this._set("font-weight", _weight, rule)}
    width(_width, rule) {return this._set("width", _width, rule)}
    maxWidth(_width, rule) {return this._set("max-width", _width, rule)}
    minWidth(_width, rule) {return this._set("min-width", _width, rule)}
    height(_height, rule) {return this._set("height", _height, rule)}
    maxHeight(_height, rule) {return this._set("max-height", _height, rule)}
    minHeight(_height, rule) {return this._set("min-height", _height, rule)}
    opacity(_opacity, rule) {return this._set("opacity", _opacity, rule)}
    textAlign(_align, rule) {return this._set("text-align", _align, rule)}
    verticalAlign(_align, rule) {return this._set("vertical-align", _align, rule)}
    position(_pos, rule) {return this._set("position", _pos, rule)}
    top(_top, rule) {return this._set("top", _top, rule)}
    bottom(_bottom, rule) {return this._set("bottom", _bottom, rule)}
    left(_left, rule) {return this._set("left", _left, rule)}
    right(_right, rule) {return this._set("right", _right, rule)}
    cursor(_value, rule) {return this._set("cursor", _value, rule)}
    textDecoration(_value, rule) {return this._set("text-decoration", _value, rule)}
    transition(_value, rule) {return this._set("transition", _value, rule)}
    userSelect(_value, rule) {return this._set("user-select", _value, rule)}
    boxSizing(_value, rule) {return this._set("box-sizing", _value, rule)}
    transform(_value, rule) {return this._set("transform", _value, rule)}
    justifyContent(_value, rule) {return this._set("justify-content", _value, rule)}
    outline(_value, rule) {return this._set("outline", _value, rule)}
    caretColor(_value, rule) {return this._set("caret-color", _value, rule)}
    resize(_value, rule) {return this._set("resize", _value, rule)}
    whiteSpace(_value, rule) {return this._set("white-space", _value, rule)}
    overflowWrap(_value, rule) {return this._set("overflow-wrap", _value, rule)}
    overflow(_value, rule) {return this._set("overflow", _value, rule)}
    overflowX(_value, rule) {return this._set("overflow-x", _value, rule)}
    overflowY(_value, rule) {return this._set("overflow-y", _value, rule)}
    lineHeight(_value, rule) {return this._set("line-height", _value, rule)}
    appearance(_value, rule) {return this._set("-webkit-appearance", _value, rule)._set("appearance", _value, rule)}
    
    flexDirection(_value, selector) {return this._set("flex-direction", _value, selector)}
    alignItems(_value, selector) {return this._set("align-items", _value, selector)}
}



class EclairStyleComponent extends EclairStylableObject {
    constructor(styleClassID) {
        super()
        this._id = styleClassID != null? styleClassID : Eclair._newID()
        Eclair._styles[this._id] = this
        
        this._stylePrefix = "."  // Use class not default id 
    }
    
    eID() {
        return this._id;
    }
    
    create() {
        let elems = document.getElementsByClassName(this.eID() + "-css")
        if (elems.length == 0) {
            let newStyleObject = this.buildStyleObject()
            if (newStyleObject != null) {
                document.head.appendChild(newStyleObject)
            }
        }
    }
}

Eclair.Style = function(_styleID) {
    return new EclairStyleComponent(_styleID);
}




// elements.component

class EclairComponent extends EclairStylableObject {
    constructor() {
        super()
        
        this._id = Eclair._newID();
        Eclair._elements[this.eID()] = this;
        
        this.parent = null
        this.children = []
        
        this._callbacks = {}
        this.sharedStyles = [this.eID()]
        this.attributes = {class: this.eID()}
        this.stateBindings = {}
        
        this._hidden = false
        this._hiddenStyle = "inline"
        
        this._buildStyle = true
    }
    
    eID() {return this._id;}
    
    id(_value) {
        if (_value == null) {
            return this.getAttr("id")
        } else {
            return this.setAttr("id", _value)
        }
    }
    
    write() {
        document.write(this.compile())
        return this
    }
    
    to(elemID) {
        document.getElementById(elemID).innerHTML = this.compile();
        return this
    }
    
    getElement(callback) {
        let elems = document.getElementsByClassName(this.eID());
        
        if (callback != null) {
            if (elems.length > 0) {
                callback(elems[0]);
            }
            return this
        } else {
            if (elems.length > 0) {
                return elems[0]
            } else {
                return null
            }
        }
    }
    
    getAttr(key) {
        let elem = this.getElement();
        if (elem != null) {
            return elem.getAttribute(key);
        }
        return this.attributes[key];
    }
    
    setAttr(key, value) {
        if (key == "class") {
            throw "Setting attribute 'class' is discouraged. Please use '.addStyle' and '.getStyle'."
        }
        
        if (value == null) {
            delete this.attributes[key];
            this.getElement(elem => {elem.removeAttribute(key)})
        } else {
            this.attributes[key] = value;
            this.getElement(elem => {elem.setAttribute(key, value)})
        }
        return this;
    }
    
    
    addStyle(sharedClass) {
        if (sharedClass != null) {
            let className = sharedClass instanceof EclairStyleComponent? sharedClass.eID() : sharedClass;
  
            let found = false;
            for (let n = 0; n < this.sharedStyles.length; n++) {
                found = found || this.sharedStyles[n] == className;
            }

            if (!found) {
                this.sharedStyles.push(className);
            }

            let classesString = "";
            for (let n = 0; n < this.sharedStyles.length; n++) {
                if (n > 0) {classesString += " ";}
                classesString += this.sharedStyles[n];
            }
            this.attributes["class"] = classesString;
            this.getElement(elem => {elem.setAttribute("class", classesString)})
            
            let elem = this.getElement()
            if (elem != null) {
                if (Eclair._styles.hasOwnProperty(className)) {
                    Eclair._styles[className].create()
                }
            }
        }
        
        return this;
    }
    
    removeStyle(sharedClass) {
        if (sharedClass != null) { 
            let className = typeof(sharedClass) == "string"? sharedClass:sharedClass.eID();
            
            let newStyles = []
            for (let n = 0; n < this.sharedStyles.length; n++) {
                if (this.sharedStyles[n] != className) {
                    newStyles.push(this.sharedStyles[n])
                }
            }

            this.sharedStyles = newStyles;

            let classesString = "";
            for (let n = 0; n < this.sharedStyles.length; n++) {
                if (n > 0) {classesString += " ";}
                classesString += this.sharedStyles[n];
            }
            this.attributes["class"] = classesString;
            this.getElement(elem => {elem.setAttribute("class", classesString)})
        }
        return this;
    }
    
    hide() {
        if (!this._hidden) {
            this._hidden = true
            this.getElement(e => {
                this._hiddenStyle = window.getComputedStyle(e, null).display
            })
            this.display("none")
        }
    }
    
    show() {
        this.display(this._hiddenStyle)
    }
    
    bindState(state, stateBindingID, onCallback, valueCallback) {
        if (state instanceof EclairState) {
            if (this.stateBindings.hasOwnProperty(stateBindingID)) {
                this.stateBindings[stateBindingID].removeCallback(this.eID())
            }
            
            this.stateBindings[stateBindingID] = state
            
            state.addCallback(this.eID(), function(state) {
                let value = (valueCallback == null)? state.value() : valueCallback(state)
                onCallback(value)
            }, true)
        } else {
            onCallback(state)
        }
    }
    
    build() {
        throw "Build function not implemented"
    }
    
    compile() {       
        let wrapperElement = document.createElement("div")
        wrapperElement.innerHTML = this.build();
        let element = wrapperElement.children[0]
        
        
        let classes = this.getAttr("class")
        if (classes != null) {
            classes = classes.split(" ")
            for (let c = 0; c < classes.length; c++) {
                if (Eclair._styles.hasOwnProperty(classes[c])) {
                    Eclair._styles[classes[c]].create()
                }
            }
        }
        
        let self = this;
        Object.keys(this.attributes).forEach(function(key) {
            element.setAttribute(key, self.attributes[key])
        });
                
        if (this._buildStyle) {
            let builtStyle = this.buildStyleObject();
            if (builtStyle != null && document.getElementsByClassName(builtStyle.getAttribute("class")).length == 0) {
                document.head.appendChild(builtStyle)
            }
        }
        
        return wrapperElement.innerHTML
    }
    
    onBlur(callback) {return this._updateCallback("onBlur", callback);}
    onChange(callback) {return this._updateCallback("onChange", callback);}
    onFocus(callback) {return this._updateCallback("onFocus", callback);}
    onSelect(callback) {return this._updateCallback("onSelect", callback);}
    onSubmit(callback) {return this._updateCallback("onSubmit", callback);}
    onReset(callback) {return this._updateCallback("onReset", callback);}
    onKeyDown(callback) {return this._updateCallback("onKeyDown", callback);}
    onKeyPress(callback) {return this._updateCallback("onKeyPress", callback);}
    onKeyUp(callback) {return this._updateCallback("onKeyUp", callback);}
    onInput(callback) {return this._updateCallback("onInput", callback);}
    onMouseDown(callback) {return this._updateCallback("onMouseDown", callback);}
    onMouseUp(callback) {return this._updateCallback("onMouseUp", callback);}
    onMouseOver(callback) {return this._updateCallback("onMouseOver", callback);}
    onMouseOut(callback) {return this._updateCallback("onMouseOut", callback);}
    onMouseMove(callback) {return this._updateCallback("onMouseMove", callback);}
    onClick(callback) {return this._updateCallback("onClick", callback);}
    onDblClick(callback) {return this._updateCallback("onDblClick", callback);}
    onScroll(callback) {return this._updateCallback("onScroll", callback);}
    onLoad(callback) {return this._updateCallback("onLoad", callback);}
    onError(callback) {return this._updateCallback("onError", callback);}
    onUnload(callback) {return this._updateCallback("onUnload", callback);}
    onResize(callback) {return this._updateCallback("onResize", callback);}
    
    triggerEvent(eventID, event, param) {
        if (this._callbacks.hasOwnProperty(eventID)) {
            this._callbacks[eventID](this, event, param);
        }
    }
    
    _addChild(item) {
        this.children.push(item)
        item.parent = this
        return item
    }
    
    child(n, callback) {
        let item = n < this.children.length && n >= 0? this.children[n] : null
        callback(item)
        return this
    }
    
    _updateCallback(callbackKey, callback) {
        this._callbacks[callbackKey] = callback;
        
        if (callback == null) {
            this.setAttr(callbackKey.toLowerCase(), null)
        } else {
            this.setAttr(callbackKey.toLowerCase(), `Eclair.triggerEvent("${this.eID()}", "${callbackKey}", event)`)
        }
        return this;
    }
}

// elements.custom-tag

Eclair.CustomTagComponent = function(tag) {
    return new EclairCustomTagComponent(tag);
}


class EclairCustomTagComponent extends EclairComponent {
    constructor(tag) {
        super(tag)
        
        this.tag = tag;
        this._innerHTML = "";
    }
    
    innerHTML(_html) {
        this.bindState(_html, "html", value => {
            this._innerHTML = value;
            this.getElement(e => {
                e.innerHTML = value
            })
        })
        return this;
    }
    
    build() {
        return `<${this.tag}>${this._innerHTML}</${this.tag}>`
    }
}


// elements.layout.view

Eclair.View = function(_elements, _func) {
    return new EclairView(_elements, _func);
}

Eclair.styles.View = Eclair.Style("eclair-style-view")
    .boxSizing("border-box")

class EclairView extends EclairComponent {    
    
    constructor(elements, creatorFunc) {
        super("view")
        
        this._elementTag = "div"
        
        this.creatorFunc = (creatorFunc != null)? creatorFunc : (e) => {return e}
        
        let self = this;
        this.items = elements instanceof Array? Ø(elements) : elements
        
        let knownItems = []
        
        if (this.items instanceof EclairState && this.items.isArray()) {
            this.bindState(elements, "element", array => {
                var itemChanges = self._itemChanges(knownItems, array)
                
                let dummyParent = document.createElement("div")
                
                for (let i = 0; i < itemChanges.length; i++) {
                    if (itemChanges[i] == -1) {
                        let newItem = self.creatorFunc(array[i])
                        if (self._isValidChild(newItem)) {
                            self._addChild(newItem)

                            let dummychild = document.createElement("div")
                            dummychild.innerHTML = newItem.compile()
                            dummyParent.appendChild(dummychild.childNodes[0])
                        }
                    } else {
                        let itemIndexValue = itemChanges[i]
                        
                        dummyParent.appendChild(
                            self.getElement().childNodes[itemIndexValue]
                        );
                        itemChanges[i] = -1
                        
                        for (let j = 0; j < itemChanges.length; j++) {
                            if (itemChanges[j] >= itemIndexValue) {
                                itemChanges[j] -= 1
                            }
                        }
                    }
                }
                
                
                self.getElement(e => {
                    while (dummyParent.firstChild) {
                        e.appendChild(dummyParent.childNodes[0])
                    }
                })
                
                knownItems = []
                for (let i = 0; i < array.length; i++) {knownItems.push(array[i])}
                
                this._onItemsChanged()
            })
        }
        
        this.addStyle(Eclair.styles.View)
    }
    
    
    _itemChanges(oldItems, newItems) {
        var resultantMap = []

        for (let i = 0; i < newItems.length; i++) {
            var positionChange = -1
            for (let j = 0; j < oldItems.length; j++) {
                if (oldItems[j] == newItems[i]) {
                    positionChange = j
                    break
                }
            }
            resultantMap.push(positionChange)
        }

        return resultantMap
    }
    
    _onItemsChanged() {}
    
    _isValidChild(child) {
        return true
    }
    
    
    build () {                
        let code = ""
        for (let e = 0; e < this.children.length; e++) {
            let child = this.children[e];
            
            if (child instanceof EclairComponent) {
                code += child.compile();
            }

            else if (typeof(child) == "string") { 
                code += child
            } 
            
            else {
                throw `Unable to compile object type: ${typeof(child)}`
            }
        }
        
        return `<${this._elementTag}>` + code + `</${this._elementTag}>`;
    }
}

// elements.layout.vstack

Eclair.VStack = function(_elements, _func) {
    return new EclairVStack(_elements, _func);
}

Eclair.styles.VStack = Eclair.Style("eclair-style-vstack")
    .boxSizing("border-box")
    .display("flex")
    .flexDirection("column")
    .alignItems("center")
    .justifyContent("space-around")

class EclairVStack extends EclairView { 
    
    constructor(elems, creatorFunc) {
        super(elems, creatorFunc)
        
        this.removeStyle(Eclair.styles.View)
        this.addStyle(Eclair.styles.VStack)
    }
                
    alignment(_alignment) {
        this.bindState(_alignment, "alignment", value => {
            if (value == "start") {
                this.alignItems("flex-start")
            } 
            else if (value == "center") {
                this.alignItems("center")
            }
            else if (value == "end") {
                this.alignItems("flex-end")
            }
            else if (value == "stretch") {
                this.alignItems("stretch")
            } else {
                throw "Unknown alignment"
            }
        })  
        
        return this
    }
}


// elements.layout.hstack

Eclair.HStack = function(_elements, _func) {
    return new EclairHStack(_elements, _func);
}

Eclair.styles.HStack = Eclair.Style("eclair-style-hstack")
    .boxSizing("border-box")
    .display("flex")
    .flexDirection("row")
    .alignItems("center")
    .justifyContent("space-around")

class EclairHStack extends EclairView {
       
    constructor(elements, itemFunction) {
        super(elements, itemFunction)
        
        this.removeStyle(Eclair.styles.View)
        this.addStyle(Eclair.styles.HStack)
    }
                
    alignment(_alignment) {
        this.bindState(_alignment, "alignment", value => {
            if (value == "start") {
                this.alignItems("flex-start")
            } 
            else if (value == "center") {
                this.alignItems("center")
            }
            else if (value == "end") {
                this.alignItems("flex-end")
            }
            else if (value == "stretch") {
                this.alignItems("stretch")
            } else {
                throw "Unknown alignment"
            }
        })  
        
        return this
    }
}


// elements.layout.tabs.page

Eclair.TabPage = function(_elements, _func) {
    return new EclairTabPage(_elements, _func);
}

Eclair.styles.TabPage = Eclair.Style("eclair-style-tab-page")

class EclairTabPage extends EclairView {
        
    constructor(elements, func) {
        super(elements, func)
        
        this.removeStyle(Eclair.styles.View)
        this.addStyle(Eclair.styles.TabPage)
    }
}


// elements.layout.tabs.view

Eclair.TabView = function(_tab, _elements, _func) {
    return new EclairTabView(_tab, _elements, _func);
}

Eclair.styles.TabView = Eclair.Style("eclair-style-tab-view")
    .display("flex")
    .boxSizing("border-box")
    .alignItems("center")

class EclairTabView extends EclairView {
    
    
    constructor(_selectedView, elements, func) {
        super(elements, func)
        
        if (_selectedView instanceof EclairState) {
            this.bindState(_selectedView, "tab", value => {
                for (let e = 0; e < this.children.length; e++) {
                    this.children[e].display(value == e? "flex": "none")
                }
            }, state => {return state.int(0)})
        } else {
            throw "First parameter of Eclair TabView's must be an Eclair State"
        }
        
        this.removeStyle(Eclair.styles.View)
        this.addStyle(Eclair.styles.TabView)
    }
    
    _isValidChild(child) {
        let valid = child instanceof EclairTabPage
        if (!valid) {
            throw "All tab view children should be an eclair TabPage"
        }
        return valid
    }
}












// elements.form.button

Eclair.Button = function(text) {
    return new EclairButton(text);
}

Eclair.styles.Button = Eclair.Style("eclair-style-button")
    .borderSize("0px")
    .borderRadius("2px")
    .padding("8px 16px")
    .background("#eeeeee")
    .font(Eclair.theme.font)
    .background("#dddddd", "hover")
    .background("#cccccc", "active")

class EclairButton extends EclairComponent {
    
    constructor(text) {
        super()
        
        this.bindState(text, "text", value => {
            this.text = value;
            this.getElement(elem => {elem.innerHTML = value;});
        })
        
        this.setAttr("type", "button")
        this.addStyle(Eclair.styles.Button)
    }
    
    build() {
        let text = this.text;
        if (text == null) {
            text = "Button"
        }
        
        if (text instanceof EclairComponent) {
            text = text.compile()
        } 
        
        return `<button>${this.text}</button>`
    }
}

// elements.form.checkbox

Eclair.CheckBox = function(text) {
    return new EclairCheckBox(text);
}

Eclair.styles.CheckBox = Eclair.Style("eclair-style-checkbox")    
    .cursor("pointer")
    .boxShadow("0px 0px 0px 100px rgba(0, 0, 0, 0.05) inset", "hover")
    .padding("2px")
    .borderRadius("4px")
    .width("100%")
    .transition("0.2s all")
    .userSelect("none")
    .font(Eclair.theme.font)
Eclair.styles.CheckBoxIcon = Eclair.Style("eclair-style-checkbox-icon")
    .borderSize("2px")
    .borderRadius("4px")
    .borderColor(Eclair.theme.accent)
    .borderStyle("solid")
    .width("16px")
    .height("16px")
    .fontSize("0.85rem")
    .userSelect("none")
    .textAlign("center")    
Eclair.styles.CheckBoxActiveIcon = Eclair.Style("eclair-style-checkbox-active-icon")
    .background(Eclair.theme.accent)
    .fontColor("white")
Eclair.styles.CheckBoxLabel = Eclair.Style("eclair-style-checkbox-label")

class EclairCheckBox extends EclairComponent {   
    
    constructor(checked) {
        super()
        
        this._enabled = true        
        
        this.checked = checked instanceof EclairState? checked : Ø(checked)  // Parent one given by user
        this._hiddenValue = Ø(false)  // Private one which is updated in the .checked callback
        this._textValue = Ø("")  // Text value which is the message displayed alongside
        
        this._label = this._addChild(Eclair.Text(this._textValue))
        this._checkbox = this._addChild(Eclair.CustomTagComponent("div"))
        this._hidden = this._addChild(Eclair.HiddenInput(this._hiddenValue))
        
        let self = this
        this.overrideOnClick = null
        this._updateCallback("onClick", (e, ev) => {
            if (this._enabled) {   
                this.checked.value(!this.checked.bool())
            }  
            if (this.overrideOnClick != null) {this.overrideOnClick(this, ev)}
        })
        
        this.bindState(this.checked, "checked", value => {
            this._hiddenValue.value(value)
            
            if (value) {
                this._checkbox
                    .addStyle(Eclair.styles.CheckBoxActiveIcon)
                    .innerHTML("✓")
            } else {
                this._checkbox
                    .removeStyle(Eclair.styles.CheckBoxActiveIcon)
                    .innerHTML("")
            }
        }, state => {return state.bool()})
        
        this.setAttr("cellpadding", 6)   
        this.addStyle(Eclair.styles.CheckBox)  
        this._label.addStyle(Eclair.styles.CheckBoxLabel)
        this._checkbox.addStyle(Eclair.styles.CheckBoxIcon)
    }
    
    checkbox(callback) {
        callback(this._checkbox)
        return this;
    }
    
    label(callback) {
        callback(this._label)
        return this;
    }
    
    text(_text) {
        this.bindState(_text, "text", value => {
            this._textValue.value(value)
        });
        return this;
    }
        
    onClick(callback) {
        this.overrideOnClick = callback;
        return this;
    }
    
    name(_name) {
        this._hidden.name(_name)
        return this;
    }
    
    enabled(_enabled) {
        this.bindState(_enabled, "enabled", value => {
            this.opacity(value ? "1":"0.6")
            this._enabled = value
        }, state => {return state.bool()});
        
        return this
    }
    
    build() {
        return `<table><tr><td width=1>${this._checkbox.compile()}</td><td>${this._label.compile()}</td></tr></table>${this._hidden.compile()}`
    }
}

// elements.form.form

Eclair.Form = function(elements) {
    return new EclairForm(elements);
}

Eclair.styles.Form = Eclair.Style("eclair-style-form")
    .boxSizing("border-box")

class EclairForm extends EclairView {
    
    constructor(elements, objectFunc) {
        super(elements, objectFunc)
        
        this._elementTag = "form"
        
        this.addStyle(Eclair.styles.Form)
            .removeStyle(Eclair.styles.View)
            .setAttr("method", "POST")
            .setAttr("action", null)
    }
    
    method(value) {
        this.bindState(value, "method", m => {
            this.setAttr("method", m)
        })
        return this;
    }
    
    action(_action) {
        this.bindState(_action, "action", value => {
            this.setAttr("action", value)
        })
        return this;
    }
    
    submit(state) {
        this.bindState(state, "submit", value => {
            this.getElement(e => {
                e.submit();
            })
        }, state => {return state.bool()})
    }
}


// elements.form.hidden

Eclair.HiddenInput = function(_value) {
    return new EclairHiddenInput(_value);
}

class EclairHiddenInput extends EclairCustomTagComponent {
    
    constructor(value) {
        super("input")
        
        this.setAttr("type", "hidden")
        
        this._buildStyle = false

        this.bindState(value, "value", v => {
            this.setAttr("value", v)
            this.getElement(e => {e.value = v})
        })
    }
    
    name(value) {
        this.bindState(value, "name", v => {
            this.setAttr("name", v)
        })
        
        return this
    }
}


// elements.form.radio-buttons

Eclair.RadioButtons = function(_value) {
    return new EclairRadioButtons(_value);
}

Eclair.styles.RadioButtons = Eclair.Style("eclair-style-radio-button"),
Eclair.styles.RadioButtonsItem = Eclair.Style("eclair-style-radio-buttons-item")
    .cursor("pointer")
    .boxShadow("0px 0px 0px 1000px rgba(0, 0, 0, 0.05) inset", "hover")
    .padding("12px")
    .borderRadius("4px")
    .width("100%")
    .userSelect("none")
    .justifyContent("flex-start")
    .gap("12px")
    .font(Eclair.theme.font)
Eclair.styles.RadioButtonsSelectedItem = Eclair.Style("eclair-style-radio-buttons-selected-item")
Eclair.styles.RadioButtonsRadio = Eclair.Style("eclair-style-radio-buttons-dot")
    .width("14px")
    .height("14px")
    .userSelect("none")
    .borderSize("2px")
    .borderStyle("solid")
    .borderColor(Eclair.theme.accent)
    .borderRadius("100%")
Eclair.styles.RadioButtonsSelectedRadio = Eclair.Style("eclair-style-radio-buttons-selected-dot")
    .background(Eclair.theme.accent)
Eclair.styles.RadioButtonsLabel = Eclair.Style("eclair-style-label")
Eclair.styles.RadioButtonsSelectedLabel = Eclair.Style("eclair-style-radio-buttons-selected-label")

class EclairRadioButtons extends EclairComponent {
    
    constructor(_options) {
        super()
        
        this._options = _options instanceof EclairState? _options : Ø(_options)
        this._selectedIndex = -1
        this._selectedValue = State("")
        
        this.customStyles = {
            "itemStyle": Eclair.Style(),
            "radioStyle": Eclair.Style(),
            "labelStyle": Eclair.Style(),
            "selectedItemStyle": Eclair.Style(),
            "selectedRadioStyle": Eclair.Style(),
            "selectedLabelStyle": Eclair.Style(),
        }
        
        let self = this
        this._hidden = this._addChild(Eclair.HiddenInput(this._selectedValue))
        this._view = this._addChild(Eclair.VStack(_options, item => {
            return new EclairRatioItem(item, this.customStyles)
                .onClick((e, ev) => {
                    let newIndex = this._updateSelectedItemStyles(item)
                    
                    this._selectedValue.value(item, self)
                    this._selectedIndex = newIndex;
                
                    if (self.stateBindings.hasOwnProperty("index")) {self.stateBindings["index"].value(newIndex, self)}
                    if (self.stateBindings.hasOwnProperty("value")) {self.stateBindings["value"].value(item, self)}
                })
        }))
        
        this.addStyle(Eclair.styles.RadioButtons)
    }
    
    _updateSelectedItemStyles(selectedValue) {
        let newIndex = -1;
        for (let i = 0; i < this._options.length(); i++) {
            let match = this._options.get(i) == selectedValue
            this._view.child(i, el => {
                el.selected(match)
            })
            if (match) {newIndex = i;}
        }
        
        return newIndex;
    }
    
    name(_name) {
        this._hidden.name(_name)
        return this;
    }
    
    value(_value) {
        this.bindState(_value, "value", value => {
            if (value != this._selectedValue.value()) {
                let newIndex = this._updateSelectedItemStyles(value)
                
                this._selectedIndex = newIndex;
                this._selectedValue.value(value, self)
                
                if (this.stateBindings.hasOwnProperty("index")) {this.stateBindings["index"].value(newIndex, this)}
            }
        })
        
        return this
    }
    
    selectedIndex(_index) {
        this.bindState(_index, "index", value => {
            if (value != this._selectedIndex) {
                let newValue = ""
                for (let i = 0; i < this._options.length(); i++) {
                    let match = i == value

                    this._view.children[i].selected(match)
                    if (match) {newValue = this._options.get(i);}
                }
                
                this._selectedIndex = value;
                this._selectedValue.value(newValue, self)
                
                if (this.stateBindings.hasOwnProperty("value")) {this.stateBindings["value"].value(newValue, this)}
            }
        }, state => {return state.int(0)})
        
        return this
    }
    
    itemStyle(callback) {
        callback(this.customStyles.itemStyle)
        return this           
    }
    
    radioStyle(callback) {
        callback(this.customStyles.radioStyle)
        return this           
    }
    
    labelStyle(callback) {
        callback(this.customStyles.labelStyle)
        return this           
    }
    
    selectedItemStyle(callback) {
        callback(this.customStyles.selectedItemStyle)
        return this           
    }
    
    selectedRadioStyle(callback) {
        callback(this.customStyles.selectedRadioStyle)
        return this           
    }
    
    selectedLabelStyle(callback) {
        callback(this.customStyles.selectedLabelStyle)
        return this           
    }
    
    build() {         
        return `<div>${this._hidden.compile()}${this._view.compile()}</div>`
    }
}


class EclairRatioItem extends EclairHStack {
    constructor(_text, customStyles) {
        super([
            Eclair.CustomTagComponent("div")
                .addStyle(Eclair.styles.RadioButtonsRadio)
                .addStyle(customStyles.radioStyle),
            Eclair.Text(_text)
                .addStyle(Eclair.styles.RadioButtonsLabel)
                .addStyle(customStyles.labelStyle)
        ])
        
        this.value = _text
        this.addStyle(Eclair.styles.RadioButtonsItem)
            .addStyle(customStyles.itemStyle)
        
        this.customStyles = customStyles
    }
    
    selected(value) {
        if (value) {
            this.addStyle(Eclair.styles.RadioButtonsSelectedItem)
                .addStyle(this.customStyles.selectedItemStyle)
                .child(0, radio => {
                    radio.addStyle(Eclair.styles.RadioButtonsSelectedRadio)
                        .addStyle(this.customStyles.selectedRadioStyle)
                })
                .child(1, label => {
                    label.addStyle(Eclair.styles.RadioButtonsSelectedLabel)
                        .addStyle(this.customStyles.selectedLabelStyle)
                })
        } else {
            this.removeStyle(Eclair.styles.RadioButtonsSelectedItem)
                .removeStyle(this.customStyles.selectedItemStyle)
                .child(0, radio => {
                    radio.removeStyle(Eclair.styles.RadioButtonsSelectedRadio)
                        .removeStyle(this.customStyles.selectedRadioStyle)
                })
                .child(1, label => {
                    label.removeStyle(Eclair.styles.RadioButtonsSelectedLabel)
                        .removeStyle(this.customStyles.selectedLabelStyle)
                })
        }
    }
}


// elements.form.select

Eclair.Select = function(_value) {
    return new EclairSelect(_value);
}

Eclair.styles.Select = Eclair.Style("eclair-style-select")
    .borderSize("0px")
    .borderRadius("2px")
    .padding("8px 16px")
    .background("#eeeeee")
    .font(Eclair.theme.font)
    .background("#dddddd", "hover")
    .background("#cccccc", "active")

class EclairSelect extends EclairView {
    
    constructor(items) {
        super(items, item => {
            return Eclair.CustomTagComponent("option").innerHTML(item)
        })
        
        this._selectedIndex = 0
        this._selectedValue = null
        
        this.overrideOnChangeCallback = null
        this._updateCallback("onChange", (select, ev) => {
            this._updateSelected(select.selectedIndex, select.value)
            if (this.overrideOnChangeCallback != null) {this.overrideOnChangeCallback(this, ev)}
        })
        
        this.addStyle(Eclair.styles.Select)
            .removeStyle(Eclair.styles.View)
    }
    
    
    onChange(callback) {
        this.overrideOnChangeCallback = callback
        return this;
    }
    
    value(_value) {
        this.bindState(_value, "value", value => {
            if (value != this._selectedValue) {
                this._selectedValue = value
                
                let newIndex = -1
                for (let i = 0; i < this.items.length(); i++) {
                    if (this.items.get(i) == value) {
                        newIndex = i; break
                    }
                }
                if (newIndex != this.selectedIndex) {
                    this.selectedIndex = newIndex
                    if (this.stateBindings.hasOwnProperty("index")) {this.stateBindings["index"].value(i, this)}
                }
                
                this.getElement(elem => {elem.value = value})
                
                if (this.overrideOnChangeCallback != null) {this.overrideOnChangeCallback(this)}
            }
        })
        
        return this
    }
    
    selectedIndex(_index) {
        this.bindState(_index, "index", value => {
            if (value != this._selectedIndex) {
                this._selectedIndex = value
                
                let newValue = ""
                if (value < this.items.length() && value >= 0) {
                    newValue = this.itens.get(value)
                }
                
                if (newValue != this._selectedValue) {
                    this._selectedValue = newValue
                    if (this.stateBindings.hasOwnProperty("value")) {this.stateBindings["value"].value(i, this)}
                }
                
                this.getElement(elem => {elem.selectedIndex = value})
                
                if (this.overrideOnChangeCallback != null) {this.overrideOnChangeCallback(this)}
            }
        }, state => {return state.int()})
        
        return this
    }
    
    _updateSelected(_index, _value) {
        if (_index != this._selectedIndex) {
            this._selectedIndex = _index
            
            if (this.stateBindings.hasOwnProperty("index")) {
                this.stateBindings["index"].value(select.selectedIndex, this)
            }
        }
        if (_value != this._selectedValue) {
            this._selectedValue= _value
            
            if (this.stateBindings.hasOwnProperty("value")) {
                this.stateBindings["value"].value(select.value, this)
            }
        }
    }
    
    _onItemsChanged() {
        let newIndex = 0
        let newValue = null
        
        if (this.items.length() > 0) {
            newIndex = 0
            newValue = this.items.get(0)
            
            this.getElement(e => {
                for (let i = 1; i < this.items.length(); i++) {
                    if (i == e.selectedIndex) {
                        newIndex = i
                        newValue = this.items.get(i)
                    }
                }
            })
        } 
        
        this._updateSelected(newIndex, newValue)
        
        if (this.overrideOnChangeCallback != null) {this.overrideOnChangeCallback(this)}
    }
    
    build () {                
        let code = ""
        for (let e = 0; e < this.children.length; e++) {
            let child = this.children[e]
            if (e == this._selectedIndex) {
                child.setAttr("selected", "true")
            }
                
            code += child.compile()
        }
        
        return `<select>` + code + `</select>`;
    }
}

// elements.form.slider

Eclair.Slider = function(_value) {
    return new EclairSlider(_value);
}

Eclair.styles.Slider = Eclair.Style("eclair-style-slider")
    .transition("0.2s all")
    .css("-webkit-appearance: none; box-sizing: border-box; outline: none;")
    .appearance("none", ":-webkit-slider-thumb")
    .appearance("none", ":-moz-slider-thumb")
    .cursor("pointer", ":-webkit-slider-thumb")
    .cursor("pointer", ":-moz-slider-thumb")
    .background("#d3d3d3")
    .background(Eclair.theme.accent, ":-webkit-slider-thumb")
    .background(Eclair.theme.accent, ":-moz-slider-thumb")
    .borderRadius("50%", ":-webkit-slider-thumb")
    .borderRadius("50%", ":-moz-slider-thumb")
    .height("25px", ":-webkit-slider-thumb")
    .height("25px", ":-moz-slider-thumb")
    .width("25px", ":-webkit-slider-thumb")
    .width("25px", ":-moz-slider-thumb")
    .width("100%")
    .height("15px")
    .borderRadius("5px")
    .opacity(0.7)
    .opacity(1, "hover")

class EclairSlider extends EclairCustomTagComponent {    
    
    constructor(value) {
        super("input")
        
        this.bindState(value, "value", value => {
            this.setAttr("value", value)
            this.getElement(elem => {elem.value = value})
        }, state => {return state.number()})
        
        let overrideOnInput = null;
        this._updateCallback("onInput", (e, ev) => {
            if (value instanceof EclairState) {e.getElement(elem => {value.value(elem.value)})}
            if (this.overrideOnInput != null) {this.overrideOnInput(this, ev)}
        })
        
        this.setAttr("type", "range")
        this.addStyle(Eclair.styles.Slider)
    }
    
    onInput(callback) {
        this.overrideOnInput = callback;
        return this;
    }
        
    name(value) {
        this.bindState(value, "name", v => {
            this.setAttr("name", v)
        })
        return this;
    }
        
    min(value) {
        this.bindState(value, "min", v => {
            this.setAttr("min", v);
        }, state => {return state.number()})
        
        return this;
    }
        
    max(value) {
        this.bindState(value, "max", v => {
            this.setAttr("max", v);
        }, state => {return state.number()})
        
        return this;
    }
        
    step(value) {
        this.bindState(value, "step", v => {
            this.setAttr("step", v);
        }, state => {return state.number()})
        
        return this;
    }
}   

// elements.form.text-area

Eclair.TextArea = function(_value) {
    return new EclairTextArea(_value);
}

Eclair.styles.TextArea = Eclair.Style("eclair-style-text-area")

class EclairTextArea extends EclairCustomTagComponent { 
    
    constructor(value) {
        super("textarea")
        
        this.bindState(value, "value", v => {
            this.innerHTML(v)
            this.getElement(e => {e.value = v})
        })
        
        this._overrideOnInput = null
        this._updateCallback("onInput", (e, ev) => {
            if (value instanceof EclairState) {value.value(e.getElement().value)}
            if (this._overrideOnInput != null) {this._overrideOnInput(e, ev)} 
        })
        
        this.addStyle(Eclair.styles.TextArea)
    }
    
    onInput(callback) {
        this._overrideOnInput = callback
        return this
    }
}


// elements.form.textbox

Eclair.TextBox = function(text) {
    return new EclairTextBox(text);
}

Eclair.styles.TextBox = Eclair.Style("eclair-style-text-box")
    .fontSize("14px")
    .padding("12px 16px")
    .width("100%")
    .borderSize("0px")
    .borderRadius("3px")
    .background("#eeeeee")
    .font(Eclair.theme.font)
    .background("#dddddd", "hover")
    .background("#cccccc", "active")
    .background("#bbbbbb", "focused")

class EclairTextBox extends EclairCustomTagComponent {
    
    constructor(_text) {
        super("input")
        this.setAttr("type", "text")
            .addStyle(Eclair.styles.TextBox)
        
        let self = this
        
        this.valueBinding = _text instanceof EclairState? _text : Ø(_text == null? "": _text)
        
        this.bindState(this.valueBinding, "value", value => {
            this.setAttr("value", value)
            this.getElement(elem => {elem.value = value});
        })
        
        this.overrideOnInput = null
        this._updateCallback("onInput", (e, ev) => {
            if (self.valueBinding instanceof EclairState) {e.getElement(elem => {self.valueBinding.value(elem.value)})}
            if (this.overrideOnInput != null) {this.overrideOnInput(this, ev)}
        })
    }
    
    onInput(callback) {
        this.overrideOnInput = callback
        return this
    }
    
    name(value) {
        this.bindState(value, "name", v => {
            this.setAttr("name", v)
        })
        
        return this
    }
    
    placeholder(value) {
        this.bindState(value, "placeholder", v => {
            this.setAttr("placeholder", v)
        })
        
        return this
    }
    
    password(value) {
        this.bindState(value, "password", v => {
            this.setAttr("type", v? "password":'text')
        }, state => {return state.bool()})
        
        return this
    }
    
    maxLength(value) {
        this.bindState(value, "maxlength", v => {
            this.setAttr("maxlength", v)
        })
        
        return this
    } 
    
    enabled(_enabled) {
        this.bindState(_enabled, "enabled", value => {
            this.setAttr("enabled", value ? "true" : "null")
        }, state => {return state.bool()})
        
        return this
    } 
        
    required(value) {
        this.bindState(value, "required", v => {
            this.setAttr("required", v ? "true" : "null")
        }, state => {return state.bool()})
        
        return this
    } 
        
    autofocus(value) {
        this.bindState(value, "autofocus", v => {
            this.setAttr("autofocus", v ? "true" : "null")
        }, state => {return state.bool()})
        
        return this
    } 
}



// elements.form.toggle

Eclair.Toggle = function(_value) {
    return new EclairToggle(_value);
}

Eclair.styles.Toggle = Eclair.Style("eclair-style-toggle")    
    .display("flex")
    .flexDirection("row")
    .alignItems("center")
    .position("relative")
    .width("50px")
    .background("#dddddd")
    .padding("3px")
    .cursor("pointer")
    .userSelect("none")
    .borderRadius("20px")
    .transition("0.2s all")
    .boxSizing("border-box")
Eclair.styles.ToggleKnob = Eclair.Style("eclair-style-toggle-knob")
    .height("14px")
    .width("14px")
    .background("#ffffff")
    .transform("translateX(0%)")
    .transition("0.2s all")
    .userSelect("none")
    .borderRadius("20px")
Eclair.styles.ToggleTick = Eclair.Style("eclair-style-toggle-tick")
    .position("absolute")
    .fontColor("#ffffff")
    .left("35%")
    .transition("0.2s all")
    .transform("translateX(-50%)")
    .fontWeight(700)
    .userSelect("none")
    .opacity(0)

class EclairToggle extends EclairComponent {
            
    constructor(value) {
        super()
        
        let overrideOnClick = null;
        
        this._tickMark = this._addChild(Eclair.Text("✓"))
        this._knob = this._addChild(Eclair.View())
        
        this._value = (value instanceof EclairState)? value : Ø(value)
        this._hiddenComponent = Eclair.HiddenInput(this._value)
    
        this.bindState(value, "toggle", value => {
            this._updateStyle() 
        }, state => {return state.bool()})
        
        let self = this;
        this._updateCallback("onClick", (e, ev) => {
            if (e._enabled) {
                this._value.value(!this._value.bool(), self)
                this._updateStyle()
            }
            if (self.overrideOnClick != null) {
                overrideOnClick(e, ev)
            }
        })
        
        this._showCheckMark = false
        this._enabled = true
        
        this.addStyle(Eclair.styles.Toggle)
        this._tickMark.addStyle(Eclair.styles.ToggleTick)
        this._knob.addStyle(Eclair.styles.ToggleKnob)
        
        this.width("100%", " .wrapper")
            .transition("0.2s all", " .wrapper")
    }
    
    onClick(callback) {
        this.overrideOnClick = callback;
        return this;
    }
    
    knob(callback) {
        callback(this._knob)
        return this
    }
        
    name(value) {
        this._hiddenComponent.name(value)
        return this;
    }
    
    enabled(_enabled) {
        this.bindState(_enabled, "enabled", value => {
            this._enabled = value
            this.opacity(value? 1 : 0.6)
        }, state => {return state.bool()})
        
        return this
    }
    
    
    showTick(value) {
        this.bindState(value, "showTick", v => {
            this._showCheckMark = v
            this._tickMark.opacity((v && (this._value.bool()))? 1:0)
        }, state => {return state.bool()})
        
        return this
    }
    
    _updateStyle() {
        if (this._value.bool()) {
            this._tickMark.opacity(this._showCheckMark ? 1 : 0)
            this.background(Eclair.theme.accent)
                .transform("translateX(100%)", " .wrapper")
            this._knob
                .transform("translateX(-100%)")
        } else {
            this._tickMark.opacity(0)
            this.background("#dddddd")
                .transform("translateX(0%)", " .wrapper")
            
            this._knob
                .transform("translateX(0%)")
        }
    }
    
    build() {
        return `<toggle>${this._tickMark.compile()}<div class='wrapper'>${this._knob.compile()}</div>${this._hiddenComponent.compile()}</toggle>`
    }
}




// elements.special.alert-box

Eclair.AlertBox = function(_value) {
    return new EclairAlertBox(_value);
}

Eclair.styles.AlertBox = Eclair.Style("eclair-style-alert-box")
    .background(Eclair.theme.accent)
    .boxSizing("border-box")
    .borderRadius(".25rem")
    .padding(".75rem 1.25rem")
    .boxShadow("0px 0px 0px 2px rgba(0, 0, 0, 0.2) inset")
    .borderSize("1px 0px 0px 0px", " hr")
    .margin(".75rem 0px", " hr")
    .borderColor("rgba(0, 0, 0, 0.2)", " hr")
Eclair.styles.AlertBoxTitle = Eclair.Style("eclair-style-alert-title")
    .fontWeight(500)
    .fontSize("1.5rem")
    .display("none")
    .fontColor("rgba(0, 0, 0, 0.6)")
    .width("100%")
    .marginBottom(".5rem")
Eclair.styles.AlertBoxText = Eclair.Style("eclair-style-alert-text")
    .fontColor("rgba(0, 0, 0, 0.6)")

class EclairAlertBox extends EclairComponent {
    
    constructor(text) {
        super()
        
        this._titleText = Ø(null)
        
        this._text = this._addChild(Eclair.Text(text))
        this._title = this._addChild(Eclair.Text(this._titleText))
        
        this.addStyle(Eclair.styles.AlertBox)
        this._title.addStyle(Eclair.styles.AlertBoxTitle)
        this._text.addStyle(Eclair.styles.AlertBoxText)
    }
    
    theme(_color) {
        this.bindState(_color, "color", value => {
            this.background(value)
        })
        
        return this
    }
        
    title(_text) {        
        this.bindState(_text, "title", value => {
            this._titleText.value(value)
            
            let hideTitle = value == null || value.trim().length == 0
            this._title.display(hideTitle? "none": "block")
        })
        
        return this
    }
    
    build() {
        return `<div>${this._title.compile()}${this._text.compile()}</div>`
    }
}
    

// elements.special.progress

Eclair.ProgressBar = function(_progress) {
    return new EclairProgressBar(_progress);
}

Eclair.styles.ProgressBar = Eclair.Style("eclair-style-progress-bar")
    .background("#d3d3d3")
    .borderRadius("3px")
    .height("16px")
    .userSelect("none")
    .overflow("hidden")
Eclair.styles.ProgressBarIndicator = Eclair.Style("eclair-style-progress-bar")
    .display("flex")
    .flexDirection("row")
    .alignItems("center")
    .background(Eclair.theme.accent)
    .height("100%")
    .transition("0.3s all")
    .userSelect("none")
    .margin("0px auto 0px 0px")
Eclair.styles.ProgressBarLabel = Eclair.Style("eclair-style-progress-bar-label")
    .fontColor("white")
    .fontWeight(700)
    .userSelect("none")
    .fontSize("11px")

class EclairProgressBar extends EclairComponent {
    
    constructor(progress) {
        super()
        
        this._labelText = Ø("0%")
        this._label = Eclair.Text(this._labelText)
        this._indicator = this._addChild(Eclair.HStack([this._label]))
        
        this.bindState(progress, "progress", value => {
            progress = Math.max(Math.min(value, 1), 0)
            this.progress = value;
            this._labelText.value(Math.round(value * 100) + "%")
            this._indicator.width((value * 100 + 0.0001) + "%")
        }, state => {return state.number(0.5)})
        
        this.addStyle(Eclair.styles.ProgressBar)
        this._label.addStyle(Eclair.styles.ProgressBarLabel)
        this._indicator.addStyle(Eclair.styles.ProgressBarIndicator)
    }
    
    striped(_on) {
        this.bindState(_on, "color", value => {
            if (value) {
                this._indicator
                    .backgroundSize("1rem 1rem")
                    .css("background-image: linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)");
            } else {
                this._indicator
                    .backgroundSize("1rem 1rem")
                    .css("background-image: ;");
            }
            this._indicator.updateCSSStyle()
        }, state => {return state.bool()})
        
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
    
    color(value) {
        this._indicator.backgroundColor(value)
        return this
    }
    
    showLabel(show) {
        this.bindState(show, "label", value => {
            this._label.opacity(value? "1":"0")
        }, state => {return state.bool()});
        
        return this
    }
    
    build() {
        return `<div>${this._indicator.compile()}</div>`
    }
}

// elements.special.syntax-highlighter

Eclair.SyntaxHighlighter = function(_value) {
    return new EclairSyntaxHighlighter(_value);
}

Eclair.styles.SyntaxHighlighter = Eclair.Style("eclair-syntax-highlighter")
    .position("relative")
    .width("420px")
    .height("360px")
    .borderSize("1px")
    .borderStyle("solid")
    .borderColor("#999999")
    .borderRadius("3px")
Eclair.styles.SyntaxHighlighterCodeElement = Eclair.Style("eclair-syntax-highlighter-code")
    .position("absolute")
    .top("0px")
    .left("0px")
    .width("100%")
    .height("100%")
    .fontSize("14px")
    .font("monospace")
    .borderSize("0px")
    .outline("none")
    .caretColor("black")
    .resize("none")
    .whiteSpace("pre")
    .boxSizing("border-box")
    .padding("10px")
    .overflowWrap("normal")
    .display("none", ":-webkit-scrollbar")
    .css("-ms-overflow-style: none; scrollbar-width: none;")
    .overflowX("scroll")
Eclair.styles.SyntaxHighlighterTextAreaElement = Eclair.Style("eclair-syntax-highlighter-text-area")
    .position("absolute")
    .top("0px")
    .left("0px")
    .width("100%")
    .height("100%")
    .fontSize("14px")
    .font("monospace")
    .borderSize("0px")
    .outline("none")
    .caretColor("black")
    .resize("none")
    .whiteSpace("pre")
    .boxSizing("border-box")
    .background("transparent")
    .fontColor("rgb(1, 1, 1, 0)")
    .padding("10px")
    .overflowWrap("normal")
    .overflowX("scroll")
Eclair.styles.SyntaxHighlighterCommentStyle = Eclair.Style("eclair-syntax-highlighter-comment").fontColor("grey")
Eclair.styles.SyntaxHighlighterKeywordStyle = Eclair.Style("eclair-syntax-highlighter-keyword").fontColor("#0066ee")
Eclair.styles.SyntaxHighlighterStringStyle = Eclair.Style("eclair-syntax-highlighter-string").fontColor("#dd9900")
Eclair.styles.SyntaxHighlighterQuoteStyle = Eclair.Style("eclair-syntax-highlighter-quote").fontColor("#dd9900")
Eclair.styles.SyntaxHighlighterEclairStyle = Eclair.Style("eclair-syntax-highlighter-eclair").fontColor("#009900")

class EclairSyntaxHighlighter extends EclairComponent {    
    constructor(_code) {
        super()
        
        this.tokenSeperators = new Set([
            "{", "(", " ", "}", ")", "[", "]", "\n", "\t", ".", ","
        ])
        this.eclairKeywords = new Set([
            "VStack", "HStack", "State", "Toggle", "Text", "HorizontalLine", "Alignment", "Eclair", 
            "Ø", "Style", "Color", "TextStyle", "View", "TabPage", "TabView", "CustomTagComponent", "Button", 
            "TextBox", "Form", "Select", "Slider", "RadioButtons", "CheckBox", "TextArea", 
            "HiddenInput", "Image", "IFrame", "Text", "Link", "HorizontalLine", "Alert", 
            "ProgressBar", "SyntaxHighlighter"
        ])
        this.jsKeywords = new Set([
            "let", "var", "if", "else", "true", "false", "const", "for", "while", "await", "break", 
            "case", "catch", "class", "continue", "debugger", "default", "delete", "do", "enum", 
            "export", "extends", "finally", "function", "implements", "import", "in", "instanceof", 
            "interface", "new", "null", "package", "private", "protected", "public", "return", 
            "super", "switch", "static", "this", "throw", "try", "typeof", "void", "while", 
            "with", "yield"
        ])
         	 	 	
        this.theme = {
            "comment": Eclair.styles.SyntaxHighlighterCommentStyle,
            "keyword": Eclair.styles.SyntaxHighlighterKeywordStyle,
            "eclair": Eclair.styles.SyntaxHighlighterEclairStyle,
            "string": Eclair.styles.SyntaxHighlighterStringStyle, 
            "quote": Eclair.styles.SyntaxHighlighterQuoteStyle, 
            "number": Eclair.styles.SyntaxHighlighterKeywordStyle, 
        }
        
        this._cachedLines = {}
        this._codeState = (_code instanceof EclairState)? _code : Ø(_code)
        
        this.codeElement = this._addChild(Eclair.CustomTagComponent("code")
            .addStyle(Eclair.styles.SyntaxHighlighterCodeElement)
         )
        
        this.textArea = this._addChild(Eclair.TextArea(this._codeState)
            .removeStyle(Eclair.styles.TextArea)
            .addStyle(Eclair.styles.SyntaxHighlighterTextAreaElement)
            .setAttr("spellcheck", "false")
            .onScroll((e, ev) => {
                let textarea = e.getElement()
                this.codeElement.getElement().scroll(textarea.scrollLeft, textarea.scrollTop)
            })
        )
        
        this.addStyle(Eclair.styles.SyntaxHighlighter)
        
        this.bindState(this._codeState, "code", value => {
            this._update()
        })
    }
    
    _update() {
        let code = this._codeState.value();
        
        let output = "";
        let tokenisedLines = []

        let lines = code.split("\n")
        let allLines = new Set(lines)
        for (let l = 0; l < lines.length; l++) {
            if (!this._cachedLines.hasOwnProperty(lines[l])) {
                this._cachedLines[lines[l]] = this._tokeniseLine(lines[l])
            }
            tokenisedLines.push(this._cachedLines[lines[l]])
        }
        
        let cachedKeys = Object.keys(this._cachedLines)
        for (let i = 0; i < cachedKeys.length; i++) {
            if (!allLines.has(cachedKeys[i])) {
                delete this._cachedLines[cachedKeys[i]]
            }
        }

        let formattedCode = ""
        for (let l = 0; l < tokenisedLines.length; l++) {
            let cline = tokenisedLines[l];
            for (let t = 0; t < cline.length; t++) {
                formattedCode += `<span class='${(cline[t].type != '')? this.theme[cline[t].type].eID():""}'>${cline[t].text}</span>`
            }
            formattedCode += "<br/>"
        }

        
        this.codeElement.innerHTML(`<pre style="margin: 0px; padding: 0px;">${formattedCode}</pre>`)
        
        return this
    }
    
    _tokeniseLine(line) {
        let tokens = [], token = "", state = ""

        let self = this;
        function pushTokenState(_text, _state) {
            if (state == "") {
                if (self.jsKeywords.has(_text)) {_state = "keyword"}
                if (self.eclairKeywords.has(_text)) {_state = "eclair"}
                if (!isNaN(parseFloat(_text))) {_state = "number"}
            }

            tokens.push({"text": _text, "type": _state})
            state = "", token = ""
        }

        for (let c = 0; c < line.length; c++) {
            if (state == "comment") {token += line[c]} 

            else if (state != "comment" && c < line.length - 1 && line[c] == "/" && line[c + 1] == "/") {
                pushTokenState(token, state); state = "comment"; token = line[c]
            } 

            else if (state != "quote" && state != "string" && line[c] == "'") {
                pushTokenState(token, state)
                state = "quote"; token = line[c]
            } 

            else if (state == "quote" && line[c] == "'") {pushTokenState(token + "'", state)} 

            else if (state == "string" && line[c] == '"') {pushTokenState(token + '"', state)} 

            else if (state != "string" && state != "quote" && line[c] == '"') {pushTokenState(token, state); state = "string"; token = line[c]} 

            else if (state != "string" && state != "quote" && this.tokenSeperators.has(line[c])) {
                pushTokenState(token, state)
                token = line[c]
            }

            else {
                if (this.tokenSeperators.has(token)) {
                    pushTokenState(token, state)
                }
                token += line[c]
            }
        }
        
        pushTokenState(token, state)

        return tokens
    }
    
    build() {
        let classes = Object.keys(this.theme);
        for (let i = 0; i < classes.length; i++) {
            this.theme[classes[i]].create()
        }
        return `<div>${this.codeElement.compile()}${this.textArea.compile()}</div>`
    }
}




// elements.standard.hr

Eclair.HorizontalLine = function() {
    return new EclairHorizontalLine();
}

Eclair.styles.HorizontalLine = Eclair.Style("eclair-style-horz-line")
    .borderSize("0px")
    .width("100%")
    .css("border-top: 1px solid #999999")

class EclairHorizontalLine extends EclairCustomTagComponent {  
    
    constructor() {
        super("hr")        
        this.addStyle(Eclair.styles.HorizontalLine)
    }
}


// elements.standard.iframe

Eclair.IFrame = function() {
    return new EclairIFrame();
}

Eclair.styles.IFrame= Eclair.Style("eclair-style-iframe")
    .borderColor("#333333")
    .borderSize("1px")
    .width("100%")
    .height("100%")

class EclairIFrame extends EclairCustomTagComponent {    
    
    constructor() {
        super("iframe")
        this.innerHTML("Your client does not support iframes.")
        this.addStyle(Eclair.styles.IFrame)
    }
        
    url(_source) {
        this.bindState(_source, "src", value => {
            this.setAttr("src", value)
        })  
        return this
    }
        
    source(_source) {
        this.bindState(_source, "srcdoc", value => {
            this.setAttr("srcdoc", value)
        })  
        return this
    }
        
    allowFullScren(_allow) {
        this.bindState(_allow, "allowfullscreen", value => {
            this.setAttr("allowfullscreen", value)
        })  
        return this
    }
        
    allowPaymentRequest(_allow) {
        this.bindState(_allow, "allowpaymentrequest", value => {
            this.setAttr("allowpaymentrequest", value)
        })  
        return this
    }
        
    loading(_loading) {
        this.bindState(_loading, "loading", value => {
            this.setAttr("loading", value)
        })  
        return this
    }
        
    referrerPolicy(_policy) {
        this.bindState(_policy, "referrerpolicy", value => {
            this.setAttr("referrerpolicy", value)
        })  
        return this
    }
        
    sandbox(_sandbox) {
        this.bindState(_sandbox, "sandbox", value => {
            this.setAttr("sandbox", value)
        })  
        return this
    }
}


// elements.standard.image

Eclair.Image = function(_value) {
    return new EclairImage(_value);
}

Eclair.styles.Image = Eclair.Style("eclair-style-image")
    .display("block")

class EclairImage extends EclairCustomTagComponent {
    
    constructor(src) {
        super("img")
        
        this.bindState(src, "src", value => {
            this.setAttr("src", value)
        })  
        
        this.addStyle(Eclair.styles.Image)
    }
            
    altText(alt) {
        this.bindState(alt, "alt", value => {
            this.setAttr("alt", value)
        })  
    }
}


// elements.standard.link

Eclair.Link = function(text) {
    return new EclairLink(text);
}

Eclair.styles.Link = Eclair.Style("eclair-style-link")
    .font(Eclair.theme.font)   
    .fontColor(Eclair.theme.accent)
    .textDecoration("none")
    .textDecoration("underline", "hover")

class EclairLink extends EclairCustomTagComponent {
        
    constructor(text) {
        super("a")
        
        this.bindState(text, "html", value => {
            this.innerHTML(value)
        })  
        
        this.addStyle(Eclair.styles.Link)
    }
    
    url(_location) {
        this.bindState(_location, "href", value => {
            this.setAttr("href", value)
        })  
        
        return this
    }
    
    target(value) {
        this.bindState(_target, "target", v => {
            this.setAttr("target", v)
        })  
        
        return this
    }
}



// elements.standard.text

Eclair.Text = function(text) {
    return new EclairText(text);
}

Eclair.styles.Text = Eclair.Style("eclair-style-text")
    .font(Eclair.theme.font)
Eclair.styles.TextTitleStyle = Eclair.Style("eclair-style-text-title")
    .fontSize("40px")
    .fontWeight(700)
Eclair.styles.TextSubtitleStyle = Eclair.Style("eclair-style-text-subtitle")
    .fontSize("25px")
Eclair.styles.TextHeading1Style = Eclair.Style("eclair-style-text-heading1")
    .fontSize("30px")
    .fontWeight(700)
Eclair.styles.TextHeading2Style = Eclair.Style("eclair-style-text-heading2")
    .fontSize("25px")
    .fontWeight(700)
Eclair.styles.TextHeading3Style = Eclair.Style("eclair-style-text-heading3")
    .fontSize("20px")
    .fontWeight(700)
Eclair.styles.TextHeading4Style = Eclair.Style("eclair-style-text-heading4")
    .fontSize("15px")
    .fontWeight(700)

class EclairText extends EclairComponent {
    
    constructor(text) {
        super()
        
        this.bindState(text, "text", value => {
            this._text = value;
            this.getElement(elem => {elem.innerHTML = value});
        })  
        
        this.addStyle(Eclair.styles.Text)
    }
        
    type(state) {
        this.bindState(state, "type", newType => {
            let textStyles = [
                Eclair.styles.TextTitleStyle, Eclair.styles.TextSubtitleStyle, Eclair.styles.TextHeading1Style, 
                Eclair.styles.TextHeading2Style, Eclair.styles.TextHeading3Style, Eclair.styles.TextHeading4Style
            ]
            
            let typeStyles = {
                "title": Eclair.styles.TextTitleStyle,
                "subtitle": Eclair.styles.TextSubtitleStyle,
                "heading1": Eclair.styles.TextHeading1Style,
                "heading2": Eclair.styles.TextHeading2Style,
                "heading3": Eclair.styles.TextHeading3Style,
                "heading4": Eclair.styles.TextHeading4Style
            }
            
            for (let t = 0; t < textStyles.length; t++) {
                this.removeStyle(textStyles[t])
            }
            
            if (typeStyles.hasOwnProperty(newType)) {
                this.addStyle(typeStyles[newType])
            }
        })  
        
        return this
    }
    
    build() {
        return `<span>${this._text}</span>`
    }
}






