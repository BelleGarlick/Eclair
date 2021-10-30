# Eclair Color
__extends [EclairState](https://github.com/SamGarlick/Eclair/tree/main/src/elements/states/state.js)__
Create a color state object.
```javascript
Eclair.Button("Example")
.background(Eclair.Color().hex("#ff9900"))
```
### constructor
Construct the Color component.
```javascript
Eclair.Color()
``` 
### .RGBA
Set the color based on given RGBA values.
r: The Red component.
g: The Green component.
b: The Blue component.
```javascript
Eclair.Color().RGBA(255, 150, 0)
``` 
### .RGBA
Set the color based on given RGBA values.
r: The Red component.
g: The Green component.
b: The Blue component.
a: The Alpha (opacity) component.
```javascript
Eclair.Color().RGBA(255, 150, 0, 0.5)
``` 
### .HSL
Set the color based on given HSL values.
h: The Hue component.
s: The Saturation component.
l: The Light component.
```javascript
Eclair.Color().HSLA(0, 1, 0.5)
``` 
### .HSLA
Set the color based on given HSLA values.
h: The Hue component.
s: The Saturation component.
l: The Light component.
a: The Alpha (opacity) component.
```javascript
Eclair.Color().HSLA(0, 1, 0.5, 0.5)
``` 
### .toHSL
Get the HLS color representation based on the current state's color.
```javascript
let hsl = Eclair.Color().hex("#ffffff").toHSL()
```  
### .hex
Set the color based on a given hexadecimal value.
_hex: A string based hexadecimal color.
```javascript
Eclair.Color().hex("#ffffff")
```  
### .lighten
Lighten the colour by a given amount.
value: A value from 0 - 255 which all the numbers will be lightened by.
```javascript
Eclair.Color().hex("#ffffff")
.lighten(50)
```  
### .darken
Darken the colour by a given amount.
value: A value from 0 - 255 which all the numbers will be darkened by.
```javascript
Eclair.Color().hex("#ffffff")
.darken(50)
```  
### Themed Colours
- ![#d4edd9](https://via.placeholder.com/15/d4edd9/000000?text=+) `.success()`
- ![#f8d7d9](https://via.placeholder.com/15/f8d7d9/000000?text=+) `.danger()`
- ![#fff3cd](https://via.placeholder.com/15/fff3cd/000000?text=+) `.warning()`
- ![#d1ecf1](https://via.placeholder.com/15/d1ecf1/000000?text=+) `.info()`
- ![#efefef](https://via.placeholder.com/15/efefef/000000?text=+) `.light()`
- ![#d5d8d9](https://via.placeholder.com/15/d5d8d9/000000?text=+) `.dark()`
### Color Presets
- ![#f0f8ff](https://via.placeholder.com/15/f0f8ff/000000?text=+) `.aliceBlue()`
- ![#faebd7](https://via.placeholder.com/15/faebd7/000000?text=+) `.antiqueWhite()`
- ![#00ffff](https://via.placeholder.com/15/00ffff/000000?text=+) `.aqua()`
- ![#7fffd4](https://via.placeholder.com/15/7fffd4/000000?text=+) `.aquamarine()`
- ![#f0ffff](https://via.placeholder.com/15/f0ffff/000000?text=+) `.azure()`
- ![#f5f5dc](https://via.placeholder.com/15/f5f5dc/000000?text=+) `.beige()`
- ![#ffe4c4](https://via.placeholder.com/15/ffe4c4/000000?text=+) `.bisque()`
- ![#000000](https://via.placeholder.com/15/000000/000000?text=+) `.black()`
- ![#ffebcd](https://via.placeholder.com/15/ffebcd/000000?text=+) `.blanchedAlmond()`
- ![#0000ff](https://via.placeholder.com/15/0000ff/000000?text=+) `.blue()`
- ![#8a2be2](https://via.placeholder.com/15/8a2be2/000000?text=+) `.blueViolet()`
- ![#a52a2a](https://via.placeholder.com/15/a52a2a/000000?text=+) `.brown()`
- ![#deb887](https://via.placeholder.com/15/deb887/000000?text=+) `.burlyWood()`
- ![#5f9ea0](https://via.placeholder.com/15/5f9ea0/000000?text=+) `.cadetBlue()`
- ![#7fff00](https://via.placeholder.com/15/7fff00/000000?text=+) `.chartreuse()`
- ![#d2691e](https://via.placeholder.com/15/d2691e/000000?text=+) `.chocolate()`
- ![#ff7f50](https://via.placeholder.com/15/ff7f50/000000?text=+) `.coral()`
- ![#6495ed](https://via.placeholder.com/15/6495ed/000000?text=+) `.cornflowerBlue()`
- ![#fff8dc](https://via.placeholder.com/15/fff8dc/000000?text=+) `.cornsilk()`
- ![#dc143c](https://via.placeholder.com/15/dc143c/000000?text=+) `.crimson()`
- ![#00ffff](https://via.placeholder.com/15/00ffff/000000?text=+) `.cyan()`
- ![#00008b](https://via.placeholder.com/15/00008b/000000?text=+) `.darkBlue()`
- ![#008b8b](https://via.placeholder.com/15/008b8b/000000?text=+) `.darkCyan()`
- ![#b8860b](https://via.placeholder.com/15/b8860b/000000?text=+) `.darkGoldenRod()`
- ![#a9a9a9](https://via.placeholder.com/15/a9a9a9/000000?text=+) `.darkGray()`
- ![#a9a9a9](https://via.placeholder.com/15/a9a9a9/000000?text=+) `.darkGrey()`
- ![#006400](https://via.placeholder.com/15/006400/000000?text=+) `.darkGreen()`
- ![#bdb76b](https://via.placeholder.com/15/bdb76b/000000?text=+) `.darkKhaki()`
- ![#8b008b](https://via.placeholder.com/15/8b008b/000000?text=+) `.darkMagenta()`
- ![#556b2f](https://via.placeholder.com/15/556b2f/000000?text=+) `.darkOliveGreen()`
- ![#ff8c00](https://via.placeholder.com/15/ff8c00/000000?text=+) `.darkOrange()`
- ![#9932cc](https://via.placeholder.com/15/9932cc/000000?text=+) `.darkOrchid()`
- ![#8b0000](https://via.placeholder.com/15/8b0000/000000?text=+) `.darkRed()`
- ![#e9967a](https://via.placeholder.com/15/e9967a/000000?text=+) `.darkSalmon()`
- ![#8fbc8f](https://via.placeholder.com/15/8fbc8f/000000?text=+) `.darkSeaGreen()`
- ![#483d8b](https://via.placeholder.com/15/483d8b/000000?text=+) `.darkSlateBlue()`
- ![#2f4f4f](https://via.placeholder.com/15/2f4f4f/000000?text=+) `.darkSlateGray()`
- ![#2f4f4f](https://via.placeholder.com/15/2f4f4f/000000?text=+) `.darkSlateGrey()`
- ![#00ced1](https://via.placeholder.com/15/00ced1/000000?text=+) `.darkTurquoise()`
- ![#9400d3](https://via.placeholder.com/15/9400d3/000000?text=+) `.darkViolet()`
- ![#ff1493](https://via.placeholder.com/15/ff1493/000000?text=+) `.deepPink()`
- ![#00bfff](https://via.placeholder.com/15/00bfff/000000?text=+) `.deepSkyBlue()`
- ![#696969](https://via.placeholder.com/15/696969/000000?text=+) `.dimGray()`
- ![#696969](https://via.placeholder.com/15/696969/000000?text=+) `.dimGrey()`
- ![#1e90ff](https://via.placeholder.com/15/1e90ff/000000?text=+) `.dodgerBlue()`
- ![#b22222](https://via.placeholder.com/15/b22222/000000?text=+) `.fireBrick()`
- ![#fffaf0](https://via.placeholder.com/15/fffaf0/000000?text=+) `.floralWhite()`
- ![#228b22](https://via.placeholder.com/15/228b22/000000?text=+) `.forestGreen()`
- ![#ff00ff](https://via.placeholder.com/15/ff00ff/000000?text=+) `.fuchsia()`
- ![#dcdcdc](https://via.placeholder.com/15/dcdcdc/000000?text=+) `.gainsboro()`
- ![#f8f8ff](https://via.placeholder.com/15/f8f8ff/000000?text=+) `.ghostWhite()`
- ![#ffd700](https://via.placeholder.com/15/ffd700/000000?text=+) `.gold()`
- ![#daa520](https://via.placeholder.com/15/daa520/000000?text=+) `.goldenRod()`
- ![#808080](https://via.placeholder.com/15/808080/000000?text=+) `.gray()`
- ![#808080](https://via.placeholder.com/15/808080/000000?text=+) `.grey()`
- ![#008000](https://via.placeholder.com/15/008000/000000?text=+) `.green()`
- ![#adff2f](https://via.placeholder.com/15/adff2f/000000?text=+) `.greenYellow()`
- ![#f0fff0](https://via.placeholder.com/15/f0fff0/000000?text=+) `.honeyDew()`
- ![#ff69b4](https://via.placeholder.com/15/ff69b4/000000?text=+) `.hotPink()`
- ![#cd5c5c](https://via.placeholder.com/15/cd5c5c/000000?text=+) `.indianRed ()`
- ![#4b0082](https://via.placeholder.com/15/4b0082/000000?text=+) `.indigo ()`
- ![#fffff0](https://via.placeholder.com/15/fffff0/000000?text=+) `.ivory()`
- ![#f0e68c](https://via.placeholder.com/15/f0e68c/000000?text=+) `.khaki()`
- ![#e6e6fa](https://via.placeholder.com/15/e6e6fa/000000?text=+) `.lavender()`
- ![#fff0f5](https://via.placeholder.com/15/fff0f5/000000?text=+) `.lavenderBlush()`
- ![#7cfc00](https://via.placeholder.com/15/7cfc00/000000?text=+) `.lawnGreen()`
- ![#fffacd](https://via.placeholder.com/15/fffacd/000000?text=+) `.lemonChiffon()`
- ![#add8e6](https://via.placeholder.com/15/add8e6/000000?text=+) `.lightBlue()`
- ![#f08080](https://via.placeholder.com/15/f08080/000000?text=+) `.lightCoral()`
- ![#e0ffff](https://via.placeholder.com/15/e0ffff/000000?text=+) `.lightCyan()`
- ![#fafad2](https://via.placeholder.com/15/fafad2/000000?text=+) `.lightGoldenRodYellow()`
- ![#d3d3d3](https://via.placeholder.com/15/d3d3d3/000000?text=+) `.lightGray()`
- ![#d3d3d3](https://via.placeholder.com/15/d3d3d3/000000?text=+) `.lightGrey()`
- ![#90ee90](https://via.placeholder.com/15/90ee90/000000?text=+) `.lightGreen()`
- ![#ffb6c1](https://via.placeholder.com/15/ffb6c1/000000?text=+) `.lightPink()`
- ![#ffa07a](https://via.placeholder.com/15/ffa07a/000000?text=+) `.lightSalmon()`
- ![#20b2aa](https://via.placeholder.com/15/20b2aa/000000?text=+) `.lightSeaGreen()`
- ![#87cefa](https://via.placeholder.com/15/87cefa/000000?text=+) `.lightSkyBlue()`
- ![#778899](https://via.placeholder.com/15/778899/000000?text=+) `.lightSlateGray()`
- ![#778899](https://via.placeholder.com/15/778899/000000?text=+) `.lightSlateGrey()`
- ![#b0c4de](https://via.placeholder.com/15/b0c4de/000000?text=+) `.lightSteelBlue()`
- ![#ffffe0](https://via.placeholder.com/15/ffffe0/000000?text=+) `.lightYellow()`
- ![#00ff00](https://via.placeholder.com/15/00ff00/000000?text=+) `.lime()`
- ![#32cd32](https://via.placeholder.com/15/32cd32/000000?text=+) `.limeGreen()`
- ![#faf0e6](https://via.placeholder.com/15/faf0e6/000000?text=+) `.linen()`
- ![#ff00ff](https://via.placeholder.com/15/ff00ff/000000?text=+) `.magenta()`
- ![#800000](https://via.placeholder.com/15/800000/000000?text=+) `.maroon()`
- ![#66cdaa](https://via.placeholder.com/15/66cdaa/000000?text=+) `.mediumAquaMarine()`
- ![#0000cd](https://via.placeholder.com/15/0000cd/000000?text=+) `.mediumBlue()`
- ![#ba55d3](https://via.placeholder.com/15/ba55d3/000000?text=+) `.mediumOrchid()`
- ![#9370db](https://via.placeholder.com/15/9370db/000000?text=+) `.mediumPurple()`
- ![#3cb371](https://via.placeholder.com/15/3cb371/000000?text=+) `.mediumSeaGreen()`
- ![#7b68ee](https://via.placeholder.com/15/7b68ee/000000?text=+) `.mediumSlateBlue()`
- ![#00fa9a](https://via.placeholder.com/15/00fa9a/000000?text=+) `.mediumSpringGreen()`
- ![#48d1cc](https://via.placeholder.com/15/48d1cc/000000?text=+) `.mediumTurquoise()`
- ![#c71585](https://via.placeholder.com/15/c71585/000000?text=+) `.mediumVioletRed()`
- ![#191970](https://via.placeholder.com/15/191970/000000?text=+) `.midnightBlue()`
- ![#f5fffa](https://via.placeholder.com/15/f5fffa/000000?text=+) `.mintCream()`
- ![#ffe4e1](https://via.placeholder.com/15/ffe4e1/000000?text=+) `.mistyRose()`
- ![#ffe4b5](https://via.placeholder.com/15/ffe4b5/000000?text=+) `.moccasin()`
- ![#ffdead](https://via.placeholder.com/15/ffdead/000000?text=+) `.navajoWhite()`
- ![#000080](https://via.placeholder.com/15/000080/000000?text=+) `.navy()`
- ![#fdf5e6](https://via.placeholder.com/15/fdf5e6/000000?text=+) `.oldLace()`
- ![#808000](https://via.placeholder.com/15/808000/000000?text=+) `.olive()`
- ![#6b8e23](https://via.placeholder.com/15/6b8e23/000000?text=+) `.oliveDrab()`
- ![#ffa500](https://via.placeholder.com/15/ffa500/000000?text=+) `.orange()`
- ![#ff4500](https://via.placeholder.com/15/ff4500/000000?text=+) `.orangeRed()`
- ![#da70d6](https://via.placeholder.com/15/da70d6/000000?text=+) `.orchid()`
- ![#eee8aa](https://via.placeholder.com/15/eee8aa/000000?text=+) `.paleGoldenRod()`
- ![#98fb98](https://via.placeholder.com/15/98fb98/000000?text=+) `.paleGreen()`
- ![#afeeee](https://via.placeholder.com/15/afeeee/000000?text=+) `.paleTurquoise()`
- ![#db7093](https://via.placeholder.com/15/db7093/000000?text=+) `.paleVioletRed()`
- ![#ffefd5](https://via.placeholder.com/15/ffefd5/000000?text=+) `.papayaWhip()`
- ![#ffdab9](https://via.placeholder.com/15/ffdab9/000000?text=+) `.peachPuff()`
- ![#cd853f](https://via.placeholder.com/15/cd853f/000000?text=+) `.peru()`
- ![#ffc0cb](https://via.placeholder.com/15/ffc0cb/000000?text=+) `.pink()`
- ![#dda0dd](https://via.placeholder.com/15/dda0dd/000000?text=+) `.plum()`
- ![#b0e0e6](https://via.placeholder.com/15/b0e0e6/000000?text=+) `.powderBlue()`
- ![#800080](https://via.placeholder.com/15/800080/000000?text=+) `.purple()`
- ![#663399](https://via.placeholder.com/15/663399/000000?text=+) `.rebeccaPurple()`
- ![#ff0000](https://via.placeholder.com/15/ff0000/000000?text=+) `.red()`
- ![#bc8f8f](https://via.placeholder.com/15/bc8f8f/000000?text=+) `.rosyBrown()`
- ![#4169e1](https://via.placeholder.com/15/4169e1/000000?text=+) `.royalBlue()`
- ![#8b4513](https://via.placeholder.com/15/8b4513/000000?text=+) `.saddleBrown()`
- ![#fa8072](https://via.placeholder.com/15/fa8072/000000?text=+) `.salmon()`
- ![#f4a460](https://via.placeholder.com/15/f4a460/000000?text=+) `.sandyBrown()`
- ![#2e8b57](https://via.placeholder.com/15/2e8b57/000000?text=+) `.seaGreen()`
- ![#fff5ee](https://via.placeholder.com/15/fff5ee/000000?text=+) `.seaShell()`
- ![#a0522d](https://via.placeholder.com/15/a0522d/000000?text=+) `.sienna()`
- ![#c0c0c0](https://via.placeholder.com/15/c0c0c0/000000?text=+) `.silver()`
- ![#87ceeb](https://via.placeholder.com/15/87ceeb/000000?text=+) `.skyBlue()`
- ![#6a5acd](https://via.placeholder.com/15/6a5acd/000000?text=+) `.slateBlue()`
- ![#708090](https://via.placeholder.com/15/708090/000000?text=+) `.slateGray()`
- ![#708090](https://via.placeholder.com/15/708090/000000?text=+) `.slateGrey()`
- ![#fffafa](https://via.placeholder.com/15/fffafa/000000?text=+) `.snow()`
- ![#00ff7f](https://via.placeholder.com/15/00ff7f/000000?text=+) `.springGreen()`
- ![#4682b4](https://via.placeholder.com/15/4682b4/000000?text=+) `.steelBlue()`
- ![#d2b48c](https://via.placeholder.com/15/d2b48c/000000?text=+) `.tan()`
- ![#008080](https://via.placeholder.com/15/008080/000000?text=+) `.teal()`
- ![#d8bfd8](https://via.placeholder.com/15/d8bfd8/000000?text=+) `.thistle()`
- ![#ff6347](https://via.placeholder.com/15/ff6347/000000?text=+) `.tomato()`
- ![#40e0d0](https://via.placeholder.com/15/40e0d0/000000?text=+) `.turquoise()`
- ![#ee82ee](https://via.placeholder.com/15/ee82ee/000000?text=+) `.violet()`
- ![#f5deb3](https://via.placeholder.com/15/f5deb3/000000?text=+) `.wheat()`
- ![#ffffff](https://via.placeholder.com/15/ffffff/000000?text=+) `.white()`
- ![#f5f5f5](https://via.placeholder.com/15/f5f5f5/000000?text=+) `.whiteSmoke()`
- ![#ffff00](https://via.placeholder.com/15/ffff00/000000?text=+) `.yellow()`
- ![#9acd32](https://via.placeholder.com/15/9acd32/000000?text=+) `.yellowGreen()`
<br/>Source: [_functional.states.color_](https://github.com/SamGarlick/Eclair/tree/main/src/functional/states/color.js)