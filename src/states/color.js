// TODO Store all colours as rgba to allow for darkening colours.
// TODO Doc not done

class EclairColor extends EclairState {
    constructor(_col) {
        super(_col)
        
        // TODO Parse colour
        
        this._r = 0
        this._g = 0
        this._b = 0
        this._a = 0
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
            this.rgb(r * 17, g * 17, b * 17)
            
        } else if (value.length == 4) {
            let r = hex_map[value[0].toLowerCase()]
            let g = hex_map[value[1].toLowerCase()]
            let b = hex_map[value[2].toLowerCase()]
            let a = hex_map[value[3].toLowerCase()]
            this.rgb(r * 17, g * 17, b * 17, a / 15)
            
        } else if (value.length == 6) {
            let r1 = hex_map[value[0].toLowerCase()]
            let r2 = hex_map[value[1].toLowerCase()]
            let g1 = hex_map[value[2].toLowerCase()]
            let g2 = hex_map[value[3].toLowerCase()]
            let b1 = hex_map[value[4].toLowerCase()]
            let b2 = hex_map[value[5].toLowerCase()]
            this.rgb(r1 * 16 + r2, g1 * 16 + g2, b1 * 16 + b2)
         
        } else if (value.length == 8) {
            let r1 = hex_map[value[0].toLowerCase()]
            let r2 = hex_map[value[1].toLowerCase()]
            let g1 = hex_map[value[2].toLowerCase()]
            let g2 = hex_map[value[3].toLowerCase()]
            let b1 = hex_map[value[4].toLowerCase()]
            let b2 = hex_map[value[5].toLowerCase()]
            let a1 = hex_map[value[6].toLowerCase()]
            let a2 = hex_map[value[7].toLowerCase()]
            this.rgb(r1 * 16 + r2, g1 * 16 + g2, b1 * 16 + b2, (a1 * 16 + a1) / 255)
        }
        
        this.value(`#${value}`)
        return this;
    }
    
    rgb(r, g, b) {
        console.log(`{return this.rgb(${r}, ${g}, ${b})}`)
        return this.rgba(r, g, b, 1)
    }
    
    rgba(r, g, b, a) {
        this.value(`rgb(${r}, ${g}, ${b}, ${a})`)
        this._r = r
        this._g = g
        this._b = b
        this._a = a
        return this;
    }   
    
    /// - ![#f0f8ff](https://via.placeholder.com/15/f0f8ff/000000?text=+) `.aliceBlue()`
    /// - ![#faebd7](https://via.placeholder.com/15/faebd7/000000?text=+) `.antiqueWhite()`
    /// - ![#00ffff](https://via.placeholder.com/15/00ffff/000000?text=+) `.aqua()`
    /// - ![#7fffd4](https://via.placeholder.com/15/7fffd4/000000?text=+) `.aquamarine()`
    /// - ![#f0ffff](https://via.placeholder.com/15/f0ffff/000000?text=+) `.azure()`
    /// - ![#f5f5dc](https://via.placeholder.com/15/f5f5dc/000000?text=+) `.beige()`
    /// - ![#ffe4c4](https://via.placeholder.com/15/ffe4c4/000000?text=+) `.bisque()`
    /// - ![#000000](https://via.placeholder.com/15/000000/000000?text=+) `.black()`
    /// - ![#ffebcd](https://via.placeholder.com/15/ffebcd/000000?text=+) `.blanchedAlmond()`
    /// - ![#0000ff](https://via.placeholder.com/15/0000ff/000000?text=+) `.blue()`
    /// - ![#8a2be2](https://via.placeholder.com/15/8a2be2/000000?text=+) `.blueViolet()`
    /// - ![#a52a2a](https://via.placeholder.com/15/a52a2a/000000?text=+) `.brown()`
    /// - ![#deb887](https://via.placeholder.com/15/deb887/000000?text=+) `.burlyWood()`
    /// - ![#5f9ea0](https://via.placeholder.com/15/5f9ea0/000000?text=+) `.cadetBlue()`
    /// - ![#7fff00](https://via.placeholder.com/15/7fff00/000000?text=+) `.chartreuse()`
    /// - ![#d2691e](https://via.placeholder.com/15/d2691e/000000?text=+) `.chocolate()`
    /// - ![#ff7f50](https://via.placeholder.com/15/ff7f50/000000?text=+) `.coral()`
    /// - ![#6495ed](https://via.placeholder.com/15/6495ed/000000?text=+) `.cornflowerBlue()`
    /// - ![#fff8dc](https://via.placeholder.com/15/fff8dc/000000?text=+) `.cornsilk()`
    /// - ![#dc143c](https://via.placeholder.com/15/dc143c/000000?text=+) `.crimson()`
    /// - ![#00ffff](https://via.placeholder.com/15/00ffff/000000?text=+) `.cyan()`
    /// - ![#00008b](https://via.placeholder.com/15/00008b/000000?text=+) `.darkBlue()`
    /// - ![#008b8b](https://via.placeholder.com/15/008b8b/000000?text=+) `.darkCyan()`
    /// - ![#b8860b](https://via.placeholder.com/15/b8860b/000000?text=+) `.darkGoldenRod()`
    /// - ![#a9a9a9](https://via.placeholder.com/15/a9a9a9/000000?text=+) `.darkGray()`
    /// - ![#a9a9a9](https://via.placeholder.com/15/a9a9a9/000000?text=+) `.darkGrey()`
    /// - ![#006400](https://via.placeholder.com/15/006400/000000?text=+) `.darkGreen()`
    /// - ![#bdb76b](https://via.placeholder.com/15/bdb76b/000000?text=+) `.darkKhaki()`
    /// - ![#8b008b](https://via.placeholder.com/15/8b008b/000000?text=+) `.darkMagenta()`
    /// - ![#556b2f](https://via.placeholder.com/15/556b2f/000000?text=+) `.darkOliveGreen()`
    /// - ![#ff8c00](https://via.placeholder.com/15/ff8c00/000000?text=+) `.darkOrange()`
    /// - ![#9932cc](https://via.placeholder.com/15/9932cc/000000?text=+) `.darkOrchid()`
    /// - ![#8b0000](https://via.placeholder.com/15/8b0000/000000?text=+) `.darkRed()`
    /// - ![#e9967a](https://via.placeholder.com/15/e9967a/000000?text=+) `.darkSalmon()`
    /// - ![#8fbc8f](https://via.placeholder.com/15/8fbc8f/000000?text=+) `.darkSeaGreen()`
    /// - ![#483d8b](https://via.placeholder.com/15/483d8b/000000?text=+) `.darkSlateBlue()`
    /// - ![#2f4f4f](https://via.placeholder.com/15/2f4f4f/000000?text=+) `.darkSlateGray()`
    /// - ![#2f4f4f](https://via.placeholder.com/15/2f4f4f/000000?text=+) `.darkSlateGrey()`
    /// - ![#00ced1](https://via.placeholder.com/15/00ced1/000000?text=+) `.darkTurquoise()`
    /// - ![#9400d3](https://via.placeholder.com/15/9400d3/000000?text=+) `.darkViolet()`
    /// - ![#ff1493](https://via.placeholder.com/15/ff1493/000000?text=+) `.deepPink()`
    /// - ![#00bfff](https://via.placeholder.com/15/00bfff/000000?text=+) `.deepSkyBlue()`
    /// - ![#696969](https://via.placeholder.com/15/696969/000000?text=+) `.dimGray()`
    /// - ![#696969](https://via.placeholder.com/15/696969/000000?text=+) `.dimGrey()`
    /// - ![#1e90ff](https://via.placeholder.com/15/1e90ff/000000?text=+) `.dodgerBlue()`
    /// - ![#b22222](https://via.placeholder.com/15/b22222/000000?text=+) `.fireBrick()`
    /// - ![#fffaf0](https://via.placeholder.com/15/fffaf0/000000?text=+) `.floralWhite()`
    /// - ![#228b22](https://via.placeholder.com/15/228b22/000000?text=+) `.forestGreen()`
    /// - ![#ff00ff](https://via.placeholder.com/15/ff00ff/000000?text=+) `.fuchsia()`
    /// - ![#dcdcdc](https://via.placeholder.com/15/dcdcdc/000000?text=+) `.gainsboro()`
    /// - ![#f8f8ff](https://via.placeholder.com/15/f8f8ff/000000?text=+) `.ghostWhite()`
    /// - ![#ffd700](https://via.placeholder.com/15/ffd700/000000?text=+) `.gold()`
    /// - ![#daa520](https://via.placeholder.com/15/daa520/000000?text=+) `.goldenRod()`
    /// - ![#808080](https://via.placeholder.com/15/808080/000000?text=+) `.gray()`
    /// - ![#808080](https://via.placeholder.com/15/808080/000000?text=+) `.grey()`
    /// - ![#008000](https://via.placeholder.com/15/008000/000000?text=+) `.green()`
    /// - ![#adff2f](https://via.placeholder.com/15/adff2f/000000?text=+) `.greenYellow()`
    /// - ![#f0fff0](https://via.placeholder.com/15/f0fff0/000000?text=+) `.honeyDew()`
    /// - ![#ff69b4](https://via.placeholder.com/15/ff69b4/000000?text=+) `.hotPink()`
    /// - ![#cd5c5c](https://via.placeholder.com/15/cd5c5c/000000?text=+) `.indianRed ()`
    /// - ![#4b0082](https://via.placeholder.com/15/4b0082/000000?text=+) `.indigo ()`
    /// - ![#fffff0](https://via.placeholder.com/15/fffff0/000000?text=+) `.ivory()`
    /// - ![#f0e68c](https://via.placeholder.com/15/f0e68c/000000?text=+) `.khaki()`
    /// - ![#e6e6fa](https://via.placeholder.com/15/e6e6fa/000000?text=+) `.lavender()`
    /// - ![#fff0f5](https://via.placeholder.com/15/fff0f5/000000?text=+) `.lavenderBlush()`
    /// - ![#7cfc00](https://via.placeholder.com/15/7cfc00/000000?text=+) `.lawnGreen()`
    /// - ![#fffacd](https://via.placeholder.com/15/fffacd/000000?text=+) `.lemonChiffon()`
    /// - ![#add8e6](https://via.placeholder.com/15/add8e6/000000?text=+) `.lightBlue()`
    /// - ![#f08080](https://via.placeholder.com/15/f08080/000000?text=+) `.lightCoral()`
    /// - ![#e0ffff](https://via.placeholder.com/15/e0ffff/000000?text=+) `.lightCyan()`
    /// - ![#fafad2](https://via.placeholder.com/15/fafad2/000000?text=+) `.lightGoldenRodYellow()`
    /// - ![#d3d3d3](https://via.placeholder.com/15/d3d3d3/000000?text=+) `.lightGray()`
    /// - ![#d3d3d3](https://via.placeholder.com/15/d3d3d3/000000?text=+) `.lightGrey()`
    /// - ![#90ee90](https://via.placeholder.com/15/90ee90/000000?text=+) `.lightGreen()`
    /// - ![#ffb6c1](https://via.placeholder.com/15/ffb6c1/000000?text=+) `.lightPink()`
    /// - ![#ffa07a](https://via.placeholder.com/15/ffa07a/000000?text=+) `.lightSalmon()`
    /// - ![#20b2aa](https://via.placeholder.com/15/20b2aa/000000?text=+) `.lightSeaGreen()`
    /// - ![#87cefa](https://via.placeholder.com/15/87cefa/000000?text=+) `.lightSkyBlue()`
    /// - ![#778899](https://via.placeholder.com/15/778899/000000?text=+) `.lightSlateGray()`
    /// - ![#778899](https://via.placeholder.com/15/778899/000000?text=+) `.lightSlateGrey()`
    /// - ![#b0c4de](https://via.placeholder.com/15/b0c4de/000000?text=+) `.lightSteelBlue()`
    /// - ![#ffffe0](https://via.placeholder.com/15/ffffe0/000000?text=+) `.lightYellow()`
    /// - ![#00ff00](https://via.placeholder.com/15/00ff00/000000?text=+) `.lime()`
    /// - ![#32cd32](https://via.placeholder.com/15/32cd32/000000?text=+) `.limeGreen()`
    /// - ![#faf0e6](https://via.placeholder.com/15/faf0e6/000000?text=+) `.linen()`
    /// - ![#ff00ff](https://via.placeholder.com/15/ff00ff/000000?text=+) `.magenta()`
    /// - ![#800000](https://via.placeholder.com/15/800000/000000?text=+) `.maroon()`
    /// - ![#66cdaa](https://via.placeholder.com/15/66cdaa/000000?text=+) `.mediumAquaMarine()`
    /// - ![#0000cd](https://via.placeholder.com/15/0000cd/000000?text=+) `.mediumBlue()`
    /// - ![#ba55d3](https://via.placeholder.com/15/ba55d3/000000?text=+) `.mediumOrchid()`
    /// - ![#9370db](https://via.placeholder.com/15/9370db/000000?text=+) `.mediumPurple()`
    /// - ![#3cb371](https://via.placeholder.com/15/3cb371/000000?text=+) `.mediumSeaGreen()`
    /// - ![#7b68ee](https://via.placeholder.com/15/7b68ee/000000?text=+) `.mediumSlateBlue()`
    /// - ![#00fa9a](https://via.placeholder.com/15/00fa9a/000000?text=+) `.mediumSpringGreen()`
    /// - ![#48d1cc](https://via.placeholder.com/15/48d1cc/000000?text=+) `.mediumTurquoise()`
    /// - ![#c71585](https://via.placeholder.com/15/c71585/000000?text=+) `.mediumVioletRed()`
    /// - ![#191970](https://via.placeholder.com/15/191970/000000?text=+) `.midnightBlue()`
    /// - ![#f5fffa](https://via.placeholder.com/15/f5fffa/000000?text=+) `.mintCream()`
    /// - ![#ffe4e1](https://via.placeholder.com/15/ffe4e1/000000?text=+) `.mistyRose()`
    /// - ![#ffe4b5](https://via.placeholder.com/15/ffe4b5/000000?text=+) `.moccasin()`
    /// - ![#ffdead](https://via.placeholder.com/15/ffdead/000000?text=+) `.navajoWhite()`
    /// - ![#000080](https://via.placeholder.com/15/000080/000000?text=+) `.navy()`
    /// - ![#fdf5e6](https://via.placeholder.com/15/fdf5e6/000000?text=+) `.oldLace()`
    /// - ![#808000](https://via.placeholder.com/15/808000/000000?text=+) `.olive()`
    /// - ![#6b8e23](https://via.placeholder.com/15/6b8e23/000000?text=+) `.oliveDrab()`
    /// - ![#ffa500](https://via.placeholder.com/15/ffa500/000000?text=+) `.orange()`
    /// - ![#ff4500](https://via.placeholder.com/15/ff4500/000000?text=+) `.orangeRed()`
    /// - ![#da70d6](https://via.placeholder.com/15/da70d6/000000?text=+) `.orchid()`
    /// - ![#eee8aa](https://via.placeholder.com/15/eee8aa/000000?text=+) `.paleGoldenRod()`
    /// - ![#98fb98](https://via.placeholder.com/15/98fb98/000000?text=+) `.paleGreen()`
    /// - ![#afeeee](https://via.placeholder.com/15/afeeee/000000?text=+) `.paleTurquoise()`
    /// - ![#db7093](https://via.placeholder.com/15/db7093/000000?text=+) `.paleVioletRed()`
    /// - ![#ffefd5](https://via.placeholder.com/15/ffefd5/000000?text=+) `.papayaWhip()`
    /// - ![#ffdab9](https://via.placeholder.com/15/ffdab9/000000?text=+) `.peachPuff()`
    /// - ![#cd853f](https://via.placeholder.com/15/cd853f/000000?text=+) `.peru()`
    /// - ![#ffc0cb](https://via.placeholder.com/15/ffc0cb/000000?text=+) `.pink()`
    /// - ![#dda0dd](https://via.placeholder.com/15/dda0dd/000000?text=+) `.plum()`
    /// - ![#b0e0e6](https://via.placeholder.com/15/b0e0e6/000000?text=+) `.powderBlue()`
    /// - ![#800080](https://via.placeholder.com/15/800080/000000?text=+) `.purple()`
    /// - ![#663399](https://via.placeholder.com/15/663399/000000?text=+) `.rebeccaPurple()`
    /// - ![#ff0000](https://via.placeholder.com/15/ff0000/000000?text=+) `.red()`
    /// - ![#bc8f8f](https://via.placeholder.com/15/bc8f8f/000000?text=+) `.rosyBrown()`
    /// - ![#4169e1](https://via.placeholder.com/15/4169e1/000000?text=+) `.royalBlue()`
    /// - ![#8b4513](https://via.placeholder.com/15/8b4513/000000?text=+) `.saddleBrown()`
    /// - ![#fa8072](https://via.placeholder.com/15/fa8072/000000?text=+) `.salmon()`
    /// - ![#f4a460](https://via.placeholder.com/15/f4a460/000000?text=+) `.sandyBrown()`
    /// - ![#2e8b57](https://via.placeholder.com/15/2e8b57/000000?text=+) `.seaGreen()`
    /// - ![#fff5ee](https://via.placeholder.com/15/fff5ee/000000?text=+) `.seaShell()`
    /// - ![#a0522d](https://via.placeholder.com/15/a0522d/000000?text=+) `.sienna()`
    /// - ![#c0c0c0](https://via.placeholder.com/15/c0c0c0/000000?text=+) `.silver()`
    /// - ![#87ceeb](https://via.placeholder.com/15/87ceeb/000000?text=+) `.skyBlue()`
    /// - ![#6a5acd](https://via.placeholder.com/15/6a5acd/000000?text=+) `.slateBlue()`
    /// - ![#708090](https://via.placeholder.com/15/708090/000000?text=+) `.slateGray()`
    /// - ![#708090](https://via.placeholder.com/15/708090/000000?text=+) `.slateGrey()`
    /// - ![#fffafa](https://via.placeholder.com/15/fffafa/000000?text=+) `.snow()`
    /// - ![#00ff7f](https://via.placeholder.com/15/00ff7f/000000?text=+) `.springGreen()`
    /// - ![#4682b4](https://via.placeholder.com/15/4682b4/000000?text=+) `.steelBlue()`
    /// - ![#d2b48c](https://via.placeholder.com/15/d2b48c/000000?text=+) `.tan()`
    /// - ![#008080](https://via.placeholder.com/15/008080/000000?text=+) `.teal()`
    /// - ![#d8bfd8](https://via.placeholder.com/15/d8bfd8/000000?text=+) `.thistle()`
    /// - ![#ff6347](https://via.placeholder.com/15/ff6347/000000?text=+) `.tomato()`
    /// - ![#40e0d0](https://via.placeholder.com/15/40e0d0/000000?text=+) `.turquoise()`
    /// - ![#ee82ee](https://via.placeholder.com/15/ee82ee/000000?text=+) `.violet()`
    /// - ![#f5deb3](https://via.placeholder.com/15/f5deb3/000000?text=+) `.wheat()`
    /// - ![#ffffff](https://via.placeholder.com/15/ffffff/000000?text=+) `.white()`
    /// - ![#f5f5f5](https://via.placeholder.com/15/f5f5f5/000000?text=+) `.whiteSmoke()`
    /// - ![#ffff00](https://via.placeholder.com/15/ffff00/000000?text=+) `.yellow()`
    /// - ![#9acd32](https://via.placeholder.com/15/9acd32/000000?text=+) `.yellowGreen()`

    
    // Standard colors.
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

    
    // Themed colors
    success() {return this.hex("d4edd9")}
    danger() {return this.hex("f8d7d9")}
    warning() {return this.hex("fff3cd")}
    info() {return this.hex("d1ecf1")}
    light() {return this.hex("efefef")}
    dark() {return this.hex("d5d8d9")}
}