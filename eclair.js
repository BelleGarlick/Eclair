



let Eclair = {
    version: "0.0.95",
    _ids: -1,
    _elements: {},
    _styles: {},
    _newID: function() {
        this._ids += 1; 
        return "eclair-element-" + this._ids;
    },
    context: {
        active: false,
        element: null
    },

    theme: {},
    styles: {},
    
    triggerEvent: function(eclairID, eventID, event, param) {
        this._elements[eclairID].triggerEvent(eventID, event, param);
    }
}


try {
    Eclair.theme.accent = EclairThemeColor;
} catch(err) {
    Eclair.theme.accent = "#ee8800"
}
try {
    Eclair.theme.font = EclairThemeFont;
} catch(err) {
    Eclair.theme.font = 'arial'
}


function Ø(value) {
    return new EclairState(value)
}
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
Eclair.Color = function(_col) {
    return new EclairColor(_col);
}


let EclairColorMap = {
    "aliceblue": [240, 248, 255],
    "antiqueWhite": [250, 235, 215],
    "aqua": [0, 255, 255],
    "aquamarine": [127, 255, 212],
    "azure": [240, 255, 255],
    "beige": [245, 245, 220],
    "bisque": [255, 228, 196],
    "black": [0, 0, 0],
    "blanchedalmond": [255, 235, 205],
    "blue": [0, 0, 255],
    "blueviolet": [138, 43, 226],
    "brown": [165, 42, 42],
    "burlywood": [222, 184, 135],
    "cadetblue": [95, 158, 160],
    "chartreuse": [127, 255, 0],
    "chocolate": [210, 105, 30],
    "coral": [255, 127, 80],
    "cornflowerblue": [100, 149, 237],
    "cornsilk": [255, 248, 220],
    "crimson": [220, 20, 60],
    "cyan": [0, 255, 255],
    "darkblue": [0, 0, 139],
    "darkcyan": [0, 139, 139],
    "darkgoldenrod": [184, 134, 11],
    "darkgray": [169, 169, 169],
    "darkgrey": [169, 169, 169],
    "darkgreen": [0, 100, 0],
    "darkkhaki": [189, 183, 107],
    "darkmagenta": [139, 0, 139],
    "darkolivegreen": [85, 107, 47],
    "darkorange": [255, 140, 0],
    "darkorchid": [153, 50, 204],
    "darkred": [139, 0, 0],
    "darksalmon": [233, 150, 122],
    "darkseagreen": [143, 188, 143],
    "darkslateblue": [72, 61, 139],
    "darkslategray": [47, 79, 79],
    "darkslategrey": [47, 79, 79],
    "darkturquoise": [0, 206, 209],
    "darkviolet": [148, 0, 211],
    "deeppink": [255, 20, 147],
    "deepskyblue": [0, 191, 255],
    "dimgray": [105, 105, 105],
    "dimgrey": [105, 105, 105],
    "dodgerblue": [30, 144, 255],
    "firebrick": [178, 34, 34],
    "floralwhite": [255, 250, 240],
    "forestgreen": [34, 139, 34],
    "fuchsia": [255, 0, 255],
    "gainsboro": [220, 220, 220],
    "ghostwhite": [248, 248, 255],
    "gold": [255, 215, 0],
    "goldenrod": [218, 165, 32],
    "gray": [128, 128, 128],
    "grey": [128, 128, 128],
    "green": [0, 128, 0],
    "greenyellow": [173, 255, 47],
    "honeydew": [240, 255, 240],
    "hotpink": [255, 105, 180],
    "indianred ": [205, 92, 92],
    "indigo ": [75, 0, 130],
    "ivory": [255, 255, 240],
    "khaki": [240, 230, 140],
    "lavender": [230, 230, 250],
    "lavenderblush": [255, 240, 245],
    "lawngreen": [124, 252, 0],
    "lemonchiffon": [255, 250, 205],
    "lightblue": [173, 216, 230],
    "lightcoral": [240, 128, 128],
    "lightcyan": [224, 255, 255],
    "lightgoldenrodyellow": [250, 250, 210],
    "lightgray": [211, 211, 211],
    "lightgrey": [211, 211, 211],
    "lightgreen": [144, 238, 144],
    "lightpink": [255, 182, 193],
    "lightsalmon": [255, 160, 122],
    "lightseagreen": [32, 178, 170],
    "lightskyblue": [135, 206, 250],
    "lightslategray": [119, 136, 153],
    "lightslategrey": [119, 136, 153],
    "lightsteelblue": [176, 196, 222],
    "lightyellow": [255, 255, 224],
    "lime": [0, 255, 0],
    "limegreen": [50, 205, 50],
    "linen": [250, 240, 230],
    "magenta": [255, 0, 255],
    "maroon": [128, 0, 0],
    "mediumaquamarine": [102, 205, 170],
    "mediumblue": [0, 0, 205],
    "mediumorchid": [186, 85, 211],
    "mediumpurple": [147, 112, 219],
    "mediumseagreen": [60, 179, 113],
    "mediumslateblue": [123, 104, 238],
    "mediumspringgreen": [0, 250, 154],
    "mediumturquoise": [72, 209, 204],
    "mediumvioletred": [199, 21, 133],
    "midnightblue": [25, 25, 112],
    "mintcream": [245, 255, 250],
    "mistyrose": [255, 228, 225],
    "moccasin": [255, 228, 181],
    "navajowhite": [255, 222, 173],
    "navy": [0, 0, 128],
    "oldlace": [253, 245, 230],
    "olive": [128, 128, 0],
    "olivedrab": [107, 142, 35],
    "orange": [255, 165, 0],
    "orangered": [255, 69, 0],
    "orchid": [218, 112, 214],
    "palegoldenrod": [238, 232, 170],
    "palegreen": [152, 251, 152],
    "paleturquoise": [175, 238, 238],
    "palevioletred": [219, 112, 147],
    "papayawhip": [255, 239, 213],
    "peachpuff": [255, 218, 185],
    "peru": [205, 133, 63],
    "pink": [255, 192, 203],
    "plum": [221, 160, 221],
    "powderblue": [176, 224, 230],
    "purple": [128, 0, 128],
    "rebeccapurple": [102, 51, 153],
    "red": [255, 0, 0],
    "rosybrown": [188, 143, 143],
    "royalblue": [65, 105, 225],
    "saddlebrown": [139, 69, 19],
    "salmon": [250, 128, 114],
    "sandybrown": [244, 164, 96],
    "seagreen": [46, 139, 87],
    "seashell": [255, 245, 238],
    "sienna": [160, 82, 45],
    "silver": [192, 192, 192],
    "skyblue": [135, 206, 235],
    "slateblue": [106, 90, 205],
    "slategray": [112, 128, 144],
    "slategrey": [112, 128, 144],
    "snow": [255, 250, 250],
    "springgreen": [0, 255, 127],
    "steelblue": [70, 130, 180],
    "tan": [210, 180, 140],
    "teal": [0, 128, 128],
    "thistle": [216, 191, 216],
    "tomato": [255, 99, 71],
    "turquoise": [64, 224, 208],
    "violet": [238, 130, 238],
    "wheat": [245, 222, 179],
    "white": [255, 255, 255],
    "whitesmoke": [245, 245, 245],
    "yellow": [255, 255, 0],
    "yellowgreen": [154, 205, 50],
}



class EclairColor extends EclairState {
    
    constructor(p1, p2, p3, p4) {
        super("#000000")
        
        this._r = 0
        this._g = 0
        this._b = 0
        this._a = 0
        
        this.parse(p1, p2, p3, p4)
    }
    
    
    parse(p1, p2, p3, p4) {
        if (p1 == null) { 
            return this.RGB(0, 0, 0)
        }
        
        if (p1 instanceof String) {
            if (EclairColorMap.hasOwnProperty(p1.toLowerCase())) {
                return this.RGB(EclairColorMap[p1.toLowerCase()])
            } else {
                return this.hex(p1)
            }
        }
        
        return this.RGBA(p1, p2, p3, p4)
    }
    
    RGB(r, g, b) {
        if (r instanceof Array) {
            return this.RGBA(r[0], r[1], r[2], 1)
        }
        
        return this.RGBA(r, g, b, 1)
    }
    
    RGBA(r, g, b, a) {
        if (r instanceof Array) {
            return this.RGBA(r[0], r[1], r[2], r[3])
        }
        
        if (a == null) {
            a = 1;
        }
        
        this.value(`rgb(${r}, ${g}, ${b}, ${a})`)
        
        this._r = r
        this._g = g
        this._b = b
        this._a = a
        
        return this;
    }  
    
    HSL(h, s, l){
        if (h instanceof Array) {
            return this.HSLA(h[0], h[1], h[2], 1)
        }
        
        return this.HSLA(h, s, l, 1)
    }
    
    HSLA(h, s, l, a){
        if (h instanceof Array) {
            return this.HSLA(h[0], h[1], h[2], h[3])
        }
        
        var r, g, b;

        if  (s == 0){
            r = g = b = l; 
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
            h = s = 0; 
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
}
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
             
    contentType(value) {
        this._contentType = (value instanceof EclairState)? value.value() : value
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
        xhttp.contentType = this._contentType
        
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
Eclair.get = function(_url) {
    return new EclairGet(_url);
}

class EclairGet extends EclairHTTPRequest {
            
    constructor(url) {
        super(url, "GET")
    }
}
Eclair.post = function(_url) {
    return new EclairPost(_url);
}

class EclairPost extends EclairHTTPRequest {
        
    constructor(url) {
        super(url, "POST")
    }
}class EclairStylableObject {
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
                if (!(this instanceof EclairSharedStyle)) {
                    document.body.appendChild(newCSSElement)
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
    
    alignContent(_value, selector) {return this._set("align-content", _value, selector)}
    alignItems(_value, selector) {return this._set("align-items", _value, selector)}
    alignSelf(_value, selector) {return this._set("align-self", _value, selector)}
    animation(_value, selector) {return this._set("animation", _value, selector)}
    animationDelay(_value, selector) {return this._set("animation-delay", _value, selector)}
    animationDirection(_value, selector) {return this._set("animation-direction", _value, selector)}
    animationDuration(_value, selector) {return this._set("animation-duration", _value, selector)}
    animationFillMode(_value, selector) {return this._set("animation-fill-mode", _value, selector)}
    animationIterationCount(_value, selector) {return this._set("animation-iteration-count", _value, selector)}
    animationName(_value, selector) {return this._set("animation-name", _value, selector)}
    animationPlayState(_value, selector) {return this._set("animation-play-state", _value, selector)}
    animationTimingFunction(_value, selector) {return this._set("animation-timing-function", _value, selector)}
    appearance(_value, rule) {return this._set("-webkit-appearance", _value, rule)._set("appearance", _value, rule)}
    backfaceVisibility(_background, rule) {return this._set("backface-visibility", _background, rule)}
    background(_value, rule) {return this._set("background", _value, rule)}
    backgroundAttachment(_value, rule) {return this._set("background-attachment", _value, rule)}
    backgroundClip(_value, rule) {return this._set("background-clip", _value, rule)}
    backgroundColor(_value, rule) {return this._set("background-color", _value, rule)}
    backgroundImage(_value, rule) {return this._set("background-image", _value, rule)}
    backgroundOrigin(_value, rule) {return this._set("background-origin", _value, rule)}
    backgroundPosition(_value, rule) {return this._set("background-position", _value, rule)}
    backgroundRepeat(_value, rule) {return this._set("background-repeat", _value, rule)}
    backgroundSize(_value, rule) {return this._set("background-size", _value, rule)}
    border(_value, rule) {return this._set("border", _value, rule)}
    borderBottom(_value, rule) {return this._set("border-bottom", _value, rule)}
    borderBottomColor(_value, rule) {return this._set("border-bottom-color", _value, rule)}
    borderBottomLeftRadius(_value, rule) {return this._set("border-bottom-left-radius", _value, rule)}
    borderBottomRightRadius(_value, rule) {return this._set("border-bottom-right-radius", _value, rule)}
    borderBottomStyle(_value, rule) {return this._set("border-bottom-style", _value, rule)}
    borderBottomWidth(_value, rule) {return this._set("border-bottom-width", _value, rule)}
    borderCollapse(_value, rule) {return this._set("border-collapse", _value, rule)}
    borderColor(_color, rule) {return this._set("border-color", _color, rule)}
    borderImage(_value, rule) {return this._set("border-image", _value, rule)}
    borderImageOutset(_value, rule) {return this._set("border-image-outset", _value, rule)}
    borderImageRepeat(_value, rule) {return this._set("border-image-repeat", _value, rule)}
    borderImageSlice(_value, rule) {return this._set("border-image-slice", _value, rule)}
    borderImageSource(_value, rule) {return this._set("border-image-source", _value, rule)}
    borderLeft(_value, rule) {return this._set("border-left", _value, rule)}
    borderLeftColor(_value, rule) {return this._set("border-left-color", _value, rule)}
    borderLeftStyle(_value, rule) {return this._set("border-left-style", _value, rule)}
    borderLeftWidth(_value, rule) {return this._set("border-left-width", _value, rule)}
    borderRadius(_value, rule) {return this._set("border-radius", _value, rule)}
    borderRight(_value, rule) {return this._set("border-right", _value, rule)}
    borderRightColor(_value, rule) {return this._set("border-right-color", _value, rule)}
    borderRightStyle(_value, rule) {return this._set("border-right-style", _value, rule)}
    borderRightWidth(_value, rule) {return this._set("border-right-width", _value, rule)}
    borderSpacing(_value, rule) {return this._set("border-spacing", _value, rule)}
    borderStyle(_style, rule) {return this._set("border-style", _style, rule)}
    borderSize(value, rule) {return this._set("border-width", value, rule)}
    borderTop(_value, rule) {return this._set("border-top", _value, rule)}
    borderTopColor(_value, rule) {return this._set("border-top-color", _value, rule)}
    borderTopLeftRadius(_value, rule) {return this._set("border-top-left-radius", _value, rule)}
    borderTopRightRadius(_value, rule) {return this._set("border-top-right-radius", _value, rule)}
    borderTopStyle(_value, rule) {return this._set("border-top-style", _value, rule)}
    borderTopWidth(_value, rule) {return this._set("border-top-width", _value, rule)}
    borderWidth(_size, rule) {return this._set("border-width", _size, rule)}
    bottom(_bottom, rule) {return this._set("bottom", _bottom, rule)}
    boxShadow(_radius, rule) {return this._set("box-shadow", _radius, rule)}
    boxSizing(_value, rule) {return this._set("box-sizing", _value, rule)}
    captionSize(_value, rule) {return this._set("caption-side", _value, rule)}
    caretColor(_value, rule) {return this._set("caret-color", _value, rule)}
    clear(_value, rule) {return this._set("clear", _value, rule)}
    clip(_value, rule) {return this._set("clip", _value, rule)}
    color(_value, rule) {return this._set("color", _value, rule)}
    columnCount(_value, rule) {return this._set("column-count", _value, rule)}
    columnFill(_value, rule) {return this._set("column-fill", _value, rule)}
    columnGap(_value, rule) {return this._set("column-gap", _value, rule)}
    columnRule(_value, rule) {return this._set("column-rule", _value, rule)}
    columnRuleColor(_value, rule) {return this._set("column-rule-color", _value, rule)}
    columnRuleStyle(_value, rule) {return this._set("column-rule-style", _value, rule)}
    columnRuleWidth(_value, rule) {return this._set("column-rule-width", _value, rule)}
    columnSpan(_value, rule) {return this._set("column-span", _value, rule)}
    columnWidth(_value, rule) {return this._set("column-width", _value, rule)}
    columns(_value, rule) {return this._set("columns", _value, rule)}
    content(_value, rule) {return this._set("content", _value, rule)}
    counterIncrement(_value, rule) {return this._set("counter-increment", _value, rule)}
    counterReset(_value, rule) {return this._set("counter-reset", _value, rule)}
    cursor(_value, rule) {return this._set("cursor", _value, rule)}
    direction(_value, rule) {return this._set("direction", _value, rule)}
    display(_display, rule) {return this._set("display", _display, rule)}
    emptyCells(_value, rule) {return this._set("empty-cells", _value, rule)}
    flex(_value, rule) {return this._set("flex", _value, rule)}
    flexBasis(_value, rule) {return this._set("flex-basis", _value, rule)}
    flexDirection(_value, rule) {return this._set("flex-direction", _value, rule)}
    flexFlow(_value, rule) {return this._set("flex-flow", _value, rule)}
    flexGrow(_value, rule) {return this._set("flex-grow", _value, rule)}
    flexShrink(_value, rule) {return this._set("flex-shrink", _value, rule)}
    flexWrap(_value, rule) {return this._set("flex-wrap", _value, rule)}
    float(_value, rule) {return this._set("float", _value, rule)}
    font(_family, rule) {return this._set("font", _family, rule)}
    fontColor(_color, rule) {return this._set("color", _color, rule)}
    fontFamily(_family, rule) {return this._set("font-family", _family, rule)}
    fontSize(_size, rule) {return this._set("font-size", _size, rule)}
    fontSizeAdjust(_weight, rule) {return this._set("font-size-adjust", _weight, rule)}
    fontStretch(_weight, rule) {return this._set("font-stretch", _weight, rule)}
    fontStyle(_weight, rule) {return this._set("font-style", _weight, rule)}
    fontVariant(_weight, rule) {return this._set("font-variant", _weight, rule)}
    fontWeight(_weight, rule) {return this._set("font-weight", _weight, rule)}
    gap(_size, rule) {return this._set("gap", _size, rule)}
    height(_height, rule) {return this._set("height", _height, rule)}
    justifyContent(_value, rule) {return this._set("justify-content", _value, rule)}
    left(_left, rule) {return this._set("left", _left, rule)}
    letterSpacing(_value, rule) {return this._set("letter-spacing", _value, rule)}
    lineHeight(_value, rule) {return this._set("line-height", _value, rule)}
    listStyle(_value, rule) {return this._set("list-style", _value, rule)}
    listStyleImage(_value, rule) {return this._set("list-style-image", _value, rule)}
    listStylePosition(_value, rule) {return this._set("list-style-position", _value, rule)}
    listStyleType(_value, rule) {return this._set("list-style-type", _value, rule)}
    margin(_size, rule) {return this._set("margin", _size, rule)}
    marginBottom(_size, rule) {return this._set("margin-bottom", _size, rule)}
    marginLeft(_size, rule) {return this._set("margin-left", _size, rule)}
    marginTop(_size, rule) {return this._set("margin-top", _size, rule)}
    marginright(_size, rule) {return this._set("margin-right", _size, rule)}
    maxHeight(_height, rule) {return this._set("max-height", _height, rule)}
    maxWidth(_width, rule) {return this._set("max-width", _width, rule)}
    minHeight(_height, rule) {return this._set("min-height", _height, rule)}
    minWidth(_width, rule) {return this._set("min-width", _width, rule)}
    opacity(_value, rule) {return this._set("opacity", _value, rule)}
    order(_value, rule) {return this._set("order", _value, rule)}
    outline(_value, rule) {return this._set("outline", _value, rule)}
    outlineColor(_value, rule) {return this._set("outline-color", _value, rule)}
    outlineOffset(_value, rule) {return this._set("outline-offset", _value, rule)}
    outlineStyle(_value, rule) {return this._set("outline-style", _value, rule)}
    outlineWidth(_value, rule) {return this._set("outline-width", _value, rule)}
    overflow(_value, rule) {return this._set("overflow", _value, rule)}
    overflowWrap(_value, rule) {return this._set("overflow-wrap", _value, rule)}
    overflowX(_value, rule) {return this._set("overflow-x", _value, rule)}
    overflowY(_value, rule) {return this._set("overflow-y", _value, rule)}
    padding(_size, rule) {return this._set("padding", _size, rule)}
    paddingBottom(_size, rule) {return this._set("padding-bottom", _size, rule)}
    paddingLeft(_size, rule) {return this._set("padding-left", _size, rule)}
    paddingRight(_size, rule) {return this._set("padding-right", _size, rule)}
    paddingTop(_size, rule) {return this._set("padding-top", _size, rule)}
    pageBreak(value, rule) {return this._set("page-break", value, rule)}
    pageBreakAfter(value, rule) {return this._set("page-break-after", value, rule)}
    pageBreakBefore(value, rule) {return this._set("page-break-before", value, rule)}
    pageBreakInside(value, rule) {return this._set("page-break-inside", value, rule)}
    perspective(value, rule) {return this._set("perspective", value, rule)}
    perspectiveOrigin(value, rule) {return this._set("perspective-origin", value, rule)}
    position(_pos, rule) {return this._set("position", _pos, rule)}
    quotes(value, rule) {return this._set("quotes", value, rule)}
    resize(_value, rule) {return this._set("resize", _value, rule)}
    right(_right, rule) {return this._set("right", _right, rule)}
    tabSize(value, rule) {return this._set("tab-size", value, rule)}
    tableLayout(_value, rule) {return this._set("table-layout", _value, rule)}
    textAlign(_align, rule) {return this._set("text-align", _align, rule)}
    textAlignLast(_align, rule) {return this._set("text-align-last", _align, rule)}
    textDecoration(_value, rule) {return this._set("text-decoration", _value, rule)}
    textDecorationColor(_value, rule) {return this._set("text-decoration-color", _value, rule)}
    textDecorationLine(_value, rule) {return this._set("text-decoration-line", _value, rule)}
    textDecorationStyle(_value, rule) {return this._set("text-decoration-style", _value, rule)}
    textIndent(_value, rule) {return this._set("text-indent", _value, rule)}
    textJustify(_value, rule) {return this._set("text-justify", _value, rule)}
    textOverflow(_value, rule) {return this._set("text-overflow", _value, rule)}
    textShadow(_value, rule) {return this._set("text-shadow", _value, rule)}
    textTransform(_value, rule) {return this._set("text-transform", _value, rule)}
    top(_top, rule) {return this._set("top", _top, rule)}
    transform(_value, rule) {return this._set("transform", _value, rule)}
    transformOrigin(_value, rule) {return this._set("transform-origin", _value, rule)}
    transformStyle(_value, rule) {return this._set("transform-style", _value, rule)}
    transition(_value, rule) {return this._set("transition", _value, rule)}
    transitionDelay(_value, rule) {return this._set("transition-delay", _value, rule)}
    transitionDuration(_value, rule) {return this._set("transition-duration", _value, rule)}
    transitionProperty(_value, rule) {return this._set("transition-property", _value, rule)}
    transitionTimingFunction(_value, rule) {return this._set("transition-timing-function", _value, rule)}
    userSelect(_value, rule) {return this._set("user-select", _value, rule)}
    verticalAlign(_align, rule) {return this._set("vertical-align", _align, rule)}
    visibility(value, rule) {return this._set("visibility", value, rule)}
    whiteSpace(_value, rule) {return this._set("white-space", _value, rule)}
    width(_width, rule) {return this._set("width", _width, rule)}
    wordBreak(_width, rule) {return this._set("word-break", _width, rule)}
    wordSpacing(_width, rule) {return this._set("word-spacing", _width, rule)}
    wordWrap(_width, rule) {return this._set("word-wrap", _width, rule)}
    zIndex(value, rule) {return this._set("z-index", _width, rule)}
}class EclairSharedStyle extends EclairStylableObject {
    constructor(styleClassID) {
        super()
        this._id = styleClassID != null? styleClassID : Eclair._newID()
        Eclair._styles[this._id] = this
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
    
    remove() {
        delete Eclair._elements[this.eID()];
        
        let styleElems = document.getElementsByClassName(this.eID() + "-css")
        for (let i = 0; i < styleElems.length; i++) {
            styleElems[i].parentNode.removeChild(styleElems[i]);
        }
    }
}

Eclair.Style = function(_styleID) {
    return new EclairSharedStyle(_styleID);
}
class EclairComponent extends EclairStylableObject {
    constructor() {
        super()
        
        this._id = Eclair._newID();
        Eclair._elements[this.eID()] = this;
        
        this._callbacks = {}
        this.sharedStyles = []
        this.attributes = {}
        this.stateBindings = {}
        
        this._hidden = false
        this._hiddenStyle = "inline"
        
        this._buildStyle = true
        
        this.parent = null
        this.children = []
        
        this.htmlNode = null
        
        if (Eclair.context.element != null && Eclair.context.active) {
            this.parent = Eclair.context.element;
            Eclair.context.element.children.push(this);
        }
    }
    
    declareChildrenWithContext(elements) {
        let currentContextElement = Eclair.context.element;
        let currentContextActive = Eclair.context.active;
            
        Eclair.context.element = this
        Eclair.context.active = true
        
        elements(this)
        
        Eclair.context.element = currentContextElement
        Eclair.context.active = currentContextActive
    }
    
    id(_value) {
        if (_value == null) {
            return this.getAttr("id")
        } else {
            this.bindState(_value, "id", value => {
                this.setAttr("id", _value)
            })
            return this;
        }
    }
    
    eID() {return this._id;}
    
    getElement(callback) {
        if (callback != null) {
            if (this.htmlNode != null) {
                callback(this.htmlNode);
            }
            return this
        } else {
            return this.htmlNode;
        }
    }
    
    setAttr(key, value) {
        if (key == "class") {
            throw "Setting attribute 'class' is discouraged. Use '.addStyle' and '.getStyle' to add a class to the object."
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
    
    getAttr(key) {
        let elem = this.getElement();
        if (elem != null) {
            return elem.getAttribute(key);
        }
        return this.attributes[key];
    }
    
    addStyle(sharedClass) {
        if (sharedClass != null) {
            let className = sharedClass instanceof EclairSharedStyle? sharedClass.eID() : sharedClass;
  
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
            this.attributes["class"] = classesString + " " + this.eID();
            this.getElement(elem => {elem.setAttribute("class", classesString + " " + this.eID())})
            
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
            this.attributes["class"] = classesString + " " + this.eID();
            this.getElement(elem => {elem.setAttribute("class", classesString + " " + this.eID())})
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
    
    _updateCallback(callbackKey, callback) {
        this._callbacks[callbackKey] = callback;
        
        if (callback == null) {
            this.setAttr(callbackKey.toLowerCase(), null)
        } else {
            this.setAttr(callbackKey.toLowerCase(), `Eclair.triggerEvent("${this.eID()}", "${callbackKey}", event)`)
        }
        return this;
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
    
    child(n, callback) {
        let item = n < this.children.length && n >= 0? this.children[n] : null
        if (callback == null) {
            return item
        } else {
            callback(item)
        }
        
        return this
    }
    
    build() {
        throw "Build function not implemented"
    }
    
    compile() {   
        if (this.htmlNode != null) {
            return this.htmlNode;
        }
        
        let element = null
        let builtObject = this.build();
        if (typeof(builtObject) == "string") {
            let wrapperElement = document.createElement("div")
            wrapperElement.innerHTML = this.build();
            element = wrapperElement.children[0]
        } 
        else if (builtObject instanceof Node) {
            element = builtObject;
        } 
        else {
            throw ".build() must return either a String or HTML Node element."
        }
        
        
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
        
        let c = this.getAttr("class")
        element.setAttribute("class", c != null? c + " " + this.eID():this.eID())        
        
        if (this._buildStyle) {
            let builtStyle = this.buildStyleObject();
            if (builtStyle != null && document.getElementsByClassName(builtStyle.getAttribute("class")).length == 0) {
                document.body.appendChild(builtStyle)
            }
        }
        
        this.htmlNode = element;
        
        return element
    }
    
    write() {
        document.body.appendChild(this.compile())
        return this
    }
    
    to(elem) {
        if (typeof(elem) == "string") {
            elem = document.getElementById(elem)
        }
        elem.appendChild(this.compile())
        return this
    }
    
    remove() {
        delete Eclair._elements[this.eID()];
        
        let elems = document.getElementsByClassName(this.eID())
        let styleElems = document.getElementsByClassName(this.eID() + "-css")
        for (let i = 0; i < elems.length; i++) {elems[i].parentNode.removeChild(elems[i]);}
        for (let i = 0; i < styleElems.length; i++) {styleElems[i].parentNode.removeChild(styleElems[i]);}
        
        for (let c = 0; c < this.children.length; c++) {
            this.children[c].remove()
        }
        
        
        this.cleanup()
    }
    
    cleanup() {}
}
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
        let elem = document.createElement(this.tag)
        elem.innerHTML = this._innerHTML;
        return elem;
    }
}
Eclair.View = function(_elements, _func) {
    return new EclairView(_elements, _func);
}

Eclair.styles.View = Eclair.Style("eclair-style-view")
    .boxSizing("border-box")

class EclairView extends EclairComponent {    
    
    constructor(elements, creatorFunc) {
        super()
        this._elementTag = "div"
        
        
        if (typeof(elements) == "function") {
            this.declareChildrenWithContext(elements)
            
        } else {
            this.creatorFunc = (creatorFunc != null)? creatorFunc : (e) => {return e}
            this.items = elements instanceof Array? Ø(elements) : elements
            let knownItems = []
            
            if (this.items.isArray()) {
                this.bindState(elements, "element", array => {
                    var itemChanges = this._itemChanges(knownItems, array)
                    let newChildren = []
                    
                    let tempParent = document.createElement("div")

                    for (let i = 0; i < itemChanges.length; i++) {
                        if (itemChanges[i] == -1) {
                            let activeContext = Eclair.context.active;
                            Eclair.context.active = false;
                            let newItem = this.creatorFunc(array[i])
                            if (this._isValidChild(newItem)) {
                                newItem.parent = this;
                                newChildren.push(newItem)
                                
                                tempParent.appendChild(newItem.compile())
                            }

                            Eclair.context.active = activeContext;
                        } else {
                            let itemIndexValue = itemChanges[i]
                            
                            newChildren.push(this.children[itemIndexValue])
                            tempParent.appendChild(
                                this.children[itemIndexValue].getElement()
                            );
                            itemChanges[i] = -1
                        }
                    }


                    this.getElement(e => {
                        while (e.firstChild) {
                            e.removeChild(e.childNodes[0])
                        }
                        
                        while (tempParent.firstChild) {
                            e.appendChild(tempParent.childNodes[0])
                        }
                    })

                    this.children = newChildren
                    
                    knownItems = []
                    for (let i = 0; i < array.length; i++) {knownItems.push(array[i])}

                    this._onItemsChanged()
                })
            }
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
        let elem = document.createElement(this._elementTag);
        
        for (let e = 0; e < this.children.length; e++) {
            let child = this.children[e]
            if (child instanceof EclairComponent) {
                elem.appendChild(child.compile());
            }
            
            else {
                throw `Unable to compile object type: ${typeof(child)}`
            }
        }
        
        return elem;
    }
}
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
class EclairTable extends EclairView {
    constructor(elements, objectFunc) {
        super(elements, objectFunc)
        
        this._elementTag  "table"
    }
}

class EclairTableRow extends EclairView {
    constructor(elements, objectFunc) {
        super(elements, objectFunc)
        
        this._elementTag  "tr"
    }
}

class EclairTableCell extends EclairView {
    constructor(elements, objectFunc) {
        super(elements, objectFunc)
        
        this._elementTag  "td"
    }
}
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
Eclair.Button = function(text) {
    return new EclairButton(text);
}

Eclair.styles.Button = Eclair.Style("eclair-style-button")
    .borderSize("0px")
    .borderRadius("2px")
    .padding("8px 16px")
    .background("#eeeeee")
    .fontFamily(Eclair.theme.font)
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
        let element = document.createElement("button")
        
        if (this.text instanceof EclairComponent) {
            element.appendChild(this.text.compile())
        } else {
            element.innerHTML = this.text;
        }
        
        return element
    }
}
Eclair.CheckBox = function(text) {
    return new EclairCheckBox(text);
}

Eclair.styles.CheckBox = Eclair.Style("eclair-style-checkbox") 
    .display("flex")
    .flexDirection("row")
    .justifyContent("flex-start")
    .padding("10px")
    .gap("10px")
    .cursor("pointer")
    .boxShadow("0px 0px 0px 100px rgba(0, 0, 0, 0.05) inset", "hover")
    .borderRadius("4px")
    .width("100%")
    .transition("0.2s all")
    .userSelect("none")
    .fontFamily(Eclair.theme.font)
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
        
        this._label = null, this._checkbox = null, this._hidden = null;
        this.declareChildrenWithContext(_=>{
            this._label = Eclair.Text(this._textValue)
            this._checkbox = Eclair.CustomTagComponent("div")
            this._hidden = Eclair.HiddenInput(this._hiddenValue)
        })
        
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
        
        this.addStyle(Eclair.styles.CheckBox)  
        this._label.addStyle(Eclair.styles.CheckBoxLabel)
        this._checkbox.addStyle(Eclair.styles.CheckBoxIcon)
    }
    
    value(newValue) {
        if (newValue == null) {
            return this.checked.value()
        } else {
        }
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
        let checkbox = document.createElement("div")
        
        checkbox.appendChild(this._hidden.compile())
        checkbox.appendChild(this._checkbox.compile())
        checkbox.appendChild(this._label.compile())
        
        return checkbox
    }
}
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
    .fontFamily(Eclair.theme.font)
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
        this._selectedValue = Ø("")
        
        this.customStyles = {
            "itemStyle": Eclair.Style(),
            "radioStyle": Eclair.Style(),
            "labelStyle": Eclair.Style(),
            "selectedItemStyle": Eclair.Style(),
            "selectedRadioStyle": Eclair.Style(),
            "selectedLabelStyle": Eclair.Style(),
        }
        
        let self = this
        this._hidden = null, this._view = null
        this.declareChildrenWithContext(_=>{
            this._hidden = Eclair.HiddenInput(this._selectedValue)
            this._view = Eclair.VStack(_options, item => {
                return new EclairRatioItem(item, this.customStyles)
                    .onClick((e, ev) => {
                        let newIndex = this._updateSelectedItemStyles(item)

                        this._selectedValue.value(item, self)
                        this._selectedIndex = newIndex;

                        if (self.stateBindings.hasOwnProperty("index")) {self.stateBindings["index"].value(newIndex, self)}
                        if (self.stateBindings.hasOwnProperty("value")) {self.stateBindings["value"].value(item, self)}
                    })
            })
        })
        
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
        let elem = document.createElement("div")
        
        elem.appendChild(this._hidden.compile())
        elem.appendChild(this._view.compile())
        
        return elem
    }
    
    cleanup() {
        let keys = Object.keys(this.customStyles);
        for (let k = 0; k < keys.length; k++) {
            this.customStyles[keys[k]].remove()
        }
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
Eclair.Select = function(_value) {
    return new EclairSelect(_value);
}

Eclair.styles.Select = Eclair.Style("eclair-style-select")
    .borderSize("0px")
    .borderRadius("2px")
    .padding("8px 16px")
    .background("#eeeeee")
    .fontFamily(Eclair.theme.font)
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
            select.getElement(e => {
                this._updateSelected(e.selectedIndex, e.value)
                if (this.overrideOnChangeCallback != null) {this.overrideOnChangeCallback(this, ev)}
            })
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
                if (newIndex != this._selectedIndex) {
                    this._selectedIndex = newIndex
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
                    newValue = this.items.get(value)
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
                this.stateBindings["index"].value(this._selectedIndex, this)
            }
        }
        if (_value != this._selectedValue) {
            this._selectedValue = _value
            
            if (this.stateBindings.hasOwnProperty("value")) {
                this.stateBindings["value"].value(this._selectedValue, this)
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
                    if (i == e._selectedIndex) {
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
        let elem = document.createElement("select")
        for (let e = 0; e < this.children.length; e++) {
            let child = this.children[e]
            if (e == this._selectedIndex) {
                child.setAttr("selected", "true")
            }
                
            elem.appendChild(child.compile())
        }
        
        return elem;
    }
}
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
        
        this.step(0.001)
        
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
    .fontFamily(Eclair.theme.font)
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
        
        this._tickMark = null, this._knob = null;
        this.declareChildrenWithContext(_=>{
            this._tickMark = Eclair.Text("✓")
                .addStyle(Eclair.styles.ToggleTick)
            
            this._knob = Eclair.CustomTagComponent("div")
                .addStyle(Eclair.styles.ToggleKnob)
        })
        
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
        let toggle = document.createElement("div")
        
        let wrapper = document.createElement("div")
        wrapper.setAttribute("class", "wrapper")
        wrapper.appendChild(this._knob.compile())
        
        toggle.appendChild(this._hiddenComponent.compile())
        toggle.appendChild(wrapper)
        
        return toggle
    }
}
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
    .fontColor("rgba(0, 0, 0, 0.6)")
    .width("100%")
    .marginBottom(".5rem")
Eclair.styles.AlertBoxText = Eclair.Style("eclair-style-alert-text")
    .fontColor("rgba(0, 0, 0, 0.6)")

class EclairAlertBox extends EclairComponent {
    
    constructor(text) {
        super()
        
        this._titleText = Ø(null)
        
        this.addStyle(Eclair.styles.AlertBox)
        
        this._text = null, this._title = null
        this.declareChildrenWithContext(_ => {
            this._text = Eclair.Text(text)
                .addStyle(Eclair.styles.AlertBoxText)
            
            this._title = Eclair.Text(this._titleText)
                .addStyle(Eclair.styles.AlertBoxTitle)
        })
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
        let elem = document.createElement("div")
        elem.appendChild(this._title.compile())
        elem.appendChild(this._text.compile())
        return elem
    }
}
Eclair.ProgressBar = function(_progress) {
    return new EclairProgressBar(_progress);
}

Eclair.styles.ProgressBar = Eclair.Style("eclair-style-progress-bar")
    .background("#d3d3d3")
    .borderRadius("3px")
    .height("16px")
    .userSelect("none")
    .overflow("hidden")
Eclair.styles.ProgressBarIndicator = Eclair.Style("eclair-style-progress-bar-indicator")
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
        
        this._label = null, this._indicator = null
        this.declareChildrenWithContext(_=>{
            this._indicator = Eclair.View(_=>{
                this._label = Eclair.Text(this._labelText)
                    .addStyle(Eclair.styles.ProgressBarLabel)
            })
                .addStyle(Eclair.styles.ProgressBarIndicator)
        })
        
        this.bindState(progress, "progress", value => {
            progress = Math.max(Math.min(value, 1), 0)
            this.progress = value;
            this._labelText.value(Math.round(value * 100) + "%")
            this._indicator.width((value * 100 + 0.0001) + "%")
        }, state => {return state.number(0.5)})
        
        this.addStyle(Eclair.styles.ProgressBar)
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
        let elem = document.createElement("div")
        elem.appendChild(this._indicator.compile())
        return elem
    }
}
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
    .fontFamily("monospace")
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
    .fontFamily("monospace")
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
        
        this.codeElement = null, this.textArea = null;
        this.declareChildrenWithContext(_ => {
            this.codeElement = Eclair.CustomTagComponent("code")
                .addStyle(Eclair.styles.SyntaxHighlighterCodeElement)

            this.textArea = Eclair.TextArea(this._codeState)
                .removeStyle(Eclair.styles.TextArea)
                .addStyle(Eclair.styles.SyntaxHighlighterTextAreaElement)
                .setAttr("spellcheck", "false")
                .onScroll((e, ev) => {
                    let textarea = e.getElement()
                    this.codeElement.getElement().scroll(textarea.scrollLeft, textarea.scrollTop)
                })
        })
        
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
        
        let elem = document.createElement("div")
        elem.appendChild(this.codeElement.compile())
        elem.appendChild(this.textArea.compile())
        return elem
    }
}
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
Eclair.Link = function(text) {
    return new EclairLink(text);
}

Eclair.styles.Link = Eclair.Style("eclair-style-link")
    .fontFamily(Eclair.theme.font)   
    .fontColor(Eclair.theme.accent)
    .textDecoration("none")
    .textDecoration("underline", "hover")

class EclairLink extends EclairView {
    constructor(elements, objectFunc) {
        super(elements, objectFunc)
        
        this._elementTag = "a"
        
        this.removeStyle(Eclair.stylesViewLink)
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
Eclair.Text = function(text) {
    return new EclairText(text);
}

Eclair.styles.Text = Eclair.Style("eclair-style-text")
    .fontFamily(Eclair.theme.font)
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