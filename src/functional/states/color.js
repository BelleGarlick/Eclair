/// TITLE Eclair Color
/// EXTENDS elements.states.state:EclairState
/// DESC Create a color state object.

Eclair.Color = function(_col) {
    return new EclairColor(_col);
}

/// ```javascript
/// Eclair.Button("Example")
///     .background(Eclair.Color().hex("#ff9900"))
/// ```

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
    
    /// METHOD constructor
    /// DESC Construct the Color component based on given arguments.
    /// ARG p1: The Red component. Alternatively, this argument can be an array; if so, then the color will be set based on the array elements. Finally, this parameter can be a string in a hexadecimal format or HTML color code format.
    /// ARG p2: The Green component.
    /// ARG p3: The Blue component.
    /// ARG p4: The Alpha (opacity) component.
    /// ```javascript
    /// Eclair.Color()
    /// Eclair.Color("hotpink")
    /// Eclair.Color("#0099ff")
    /// Eclair.Color("ff9900")
    /// Eclair.Color(255, 0, 0)
    /// Eclair.Color(255, 0, 0, 4)
    /// Eclair.Color([125, 255, 150])
    /// ``` 
    constructor(p1, p2, p3, p4) {
        super("#000000")
        
        this._r = 0
        this._g = 0
        this._b = 0
        this._a = 0
        
        this.parse(p1, p2, p3, p4)
    }
    
    
    /// METHOD .parse
    /// DESC Parse a given color from the formats: RGB, RGBA, HTML color code and hexadecimal. 
    /// ARG p1: The Red component. Alternatively, this argument can be an array; if so, then the color will be set based on the array elements. Finally, this parameter can be a string in a hexadecimal format or HTML color code format.
    /// ARG p2: The Green component.
    /// ARG p3: The Blue component.
    /// ARG p4: The Alpha (opacity) component.
    /// ```javascript
    /// Eclair.Color()
    /// Eclair.Color("hotpink")
    /// Eclair.Color("#0099ff")
    /// Eclair.Color("ff9900")
    /// Eclair.Color(255, 0, 0)
    /// Eclair.Color(255, 0, 0, 4)
    /// Eclair.Color([125, 255, 150])
    /// ``` 
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
    
    /// METHOD .RGB
    /// DESC Set the color based on given RGB values. 
    /// ARG r: The Red component. Alternatively, this argument can be an array; if so, then the color will be set based on the array elements.
    /// ARG g: The Green component.
    /// ARG b: The Blue component.
    /// ```javascript
    /// Eclair.Color().RGBA(255, 150, 0)
    /// Eclair.Color().RGBA([255, 150, 0])
    /// ``` 
    RGB(r, g, b) {
        if (r instanceof Array) {
            return this.RGBA(r[0], r[1], r[2], 1)
        }
        
        return this.RGBA(r, g, b, 1)
    }
    
    /// METHOD .RGBA
    /// DESC Set the color based on given RGBA values.
    /// ARG r: The Red component. Alternatively, this argument can be an array; if so, then the color will be set based on the array elements.
    /// ARG g: The Green component.
    /// ARG b: The Blue component.
    /// ARG a: The Alpha (opacity) component.
    /// ```javascript
    /// Eclair.Color().RGBA(255, 150, 0, 0.5)
    /// Eclair.Color().RGBA([255, 150, 0, 0.5])
    /// ``` 
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
    
    /// METHOD .HSL
    /// DESC Set the color based on given HSL values.
    /// ARG h: The Hue component. Alternatively, this argument can be an array; if so, then the color will be set based on the array elements.
    /// ARG s: The Saturation component.
    /// ARG l: The Light component.
    /// ```javascript
    /// Eclair.Color().HSLA(0, 1, 0.5)
    /// Eclair.Color().HSLA([0, 1, 0.5])
    /// ``` 
    HSL(h, s, l){
        if (h instanceof Array) {
            return this.HSLA(h[0], h[1], h[2], 1)
        }
        
        return this.HSLA(h, s, l, 1)
    }
    
    /// METHOD .HSLA
    /// DESC Set the color based on given HSLA values.
    /// ARG h: The Hue component. Alternatively, this argument can be an array; if so, then the color will be set based on the array elements.
    /// ARG s: The Saturation component.
    /// ARG l: The Light component.
    /// ARG a: The Alpha (opacity) component.
    /// ```javascript
    /// Eclair.Color().HSLA(0, 1, 0.5, 0.5)
    /// Eclair.Color().HSLA([0, 1, 0.5, 0.5])
    /// ``` 
    HSLA(h, s, l, a){
        if (h instanceof Array) {
            return this.HSLA(h[0], h[1], h[2], h[3])
        }
        
        // Cheers Mohsen and Martin: https://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
        var r, g, b;

        if  (s == 0){
            // achromatic
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
    
    /// METHOD .toHSL
    /// DESC Get the HLS color representation based on the current state's color.
    /// ```javascript
    /// let hsl = Eclair.Color().hex("#ffffff").toHSL()
    /// ```  
    toHSL() {
        // Cheers Mohsen and Martin: https://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
        let r = this._r / 255
        let g = this._g / 255
        let b = this._b / 255
        
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;

        if(max == min){
            // achromatic
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
    
    /// METHOD .hex
    /// DESC Set the color based on a given hexadecimal value.
    /// ARG _hex: A string based hexadecimal color.
    /// ```javascript
    /// Eclair.Color().hex("ffffff")
    /// Eclair.Color().hex("#ffffff")
    /// Eclair.Color().hex("fff")
    /// Eclair.Color().hex("#fff")
    /// ```  
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
    
    /// METHOD .lighten
    /// DESC Lighten the colour by a given amount.
    /// ARG value: A value from 0 - 255 which all the numbers will be lightened by.
    /// ```javascript
    /// Eclair.Color().hex("#ffffff")
    ///     .lighten(50)
    /// ```  
    lighten(value) {
        this._r = Math.min(255, this._r + value)
        this._g = Math.min(255, this._g + value)
        this._b = Math.min(255, this._b + value)
        this.value(`rgb(${this._r}, ${this._g}, ${this._b}, ${this._a})`)
        
        return this;
    }
    
    /// METHOD .darken
    /// DESC Darken the colour by a given amount.
    /// ARG value: A value from 0 - 255 which all the numbers will be darkened by.
    /// ```javascript
    /// Eclair.Color().hex("#ffffff")
    ///     .darken(50)
    /// ```  
    darken(value) {
        this._r = Math.max(0, this._r - value)
        this._g = Math.max(0, this._g - value)
        this._b = Math.max(0, this._b - value)
        this.value(`rgb(${this._r}, ${this._g}, ${this._b}, ${this._a})`)
        
        return this;
    }
    
    /// ### Themed Colours
    /// - ![#d4edd9](https://via.placeholder.com/15/d4edd9/000000?text=+) `.success()`
    /// - ![#f8d7d9](https://via.placeholder.com/15/f8d7d9/000000?text=+) `.danger()`
    /// - ![#fff3cd](https://via.placeholder.com/15/fff3cd/000000?text=+) `.warning()`
    /// - ![#d1ecf1](https://via.placeholder.com/15/d1ecf1/000000?text=+) `.info()`
    /// - ![#efefef](https://via.placeholder.com/15/efefef/000000?text=+) `.light()`
    /// - ![#d5d8d9](https://via.placeholder.com/15/d5d8d9/000000?text=+) `.dark()`
    success() {return this.hex("d4edd9")}
    danger() {return this.hex("f8d7d9")}
    warning() {return this.hex("fff3cd")}
    info() {return this.hex("d1ecf1")}
    light() {return this.hex("efefef")}
    dark() {return this.hex("d5d8d9")}
}