hex_lookup = {char: i for i, char in enumerate([str(x) for x in range(10)] + ["a", "b", "c", "d", "e", "f"])}


lines = \
"""aliceBlue() {return this.hex("F0F8FF")}
antiqueWhite() {return this.hex("FAEBD7")}
aqua() {return this.hex("00FFFF")}
aquamarine() {return this.hex("7FFFD4")}
azure() {return this.hex("F0FFFF")}
beige() {return this.hex("F5F5DC")}
bisque() {return this.hex("FFE4C4")}
black() {return this.hex("000000")}
blanchedAlmond() {return this.hex("FFEBCD")}
blue() {return this.hex("0000FF")}
blueViolet() {return this.hex("8A2BE2")}
brown() {return this.hex("A52A2A")}
burlyWood() {return this.hex("DEB887")}
cadetBlue() {return this.hex("5F9EA0")}
chartreuse() {return this.hex("7FFF00")}
chocolate() {return this.hex("D2691E")}
coral() {return this.hex("FF7F50")}
cornflowerBlue() {return this.hex("6495ED")}
cornsilk() {return this.hex("FFF8DC")}
crimson() {return this.hex("DC143C")}
cyan() {return this.hex("00FFFF")}
darkBlue() {return this.hex("00008B")}
darkCyan() {return this.hex("008B8B")}
darkGoldenRod() {return this.hex("B8860B")}
darkGray() {return this.hex("A9A9A9")}
darkGrey() {return this.hex("A9A9A9")}
darkGreen() {return this.hex("006400")}
darkKhaki() {return this.hex("BDB76B")}
darkMagenta() {return this.hex("8B008B")}
darkOliveGreen() {return this.hex("556B2F")}
darkOrange() {return this.hex("FF8C00")}
darkOrchid() {return this.hex("9932CC")}
darkRed() {return this.hex("8B0000")}
darkSalmon() {return this.hex("E9967A")}
darkSeaGreen() {return this.hex("8FBC8F")}
darkSlateBlue() {return this.hex("483D8B")}
darkSlateGray() {return this.hex("2F4F4F")}
darkSlateGrey() {return this.hex("2F4F4F")}
darkTurquoise() {return this.hex("00CED1")}
darkViolet() {return this.hex("9400D3")}
deepPink() {return this.hex("FF1493")}
deepSkyBlue() {return this.hex("00BFFF")}
dimGray() {return this.hex("696969")}
dimGrey() {return this.hex("696969")}
dodgerBlue() {return this.hex("1E90FF")}
fireBrick() {return this.hex("B22222")}
floralWhite() {return this.hex("FFFAF0")}
forestGreen() {return this.hex("228B22")}
fuchsia() {return this.hex("FF00FF")}
gainsboro() {return this.hex("DCDCDC")}
ghostWhite() {return this.hex("F8F8FF")}
gold() {return this.hex("FFD700")}
goldenRod() {return this.hex("DAA520")}
gray() {return this.hex("808080")}
grey() {return this.hex("808080")}
green() {return this.hex("008000")}
greenYellow() {return this.hex("ADFF2F")}
honeyDew() {return this.hex("F0FFF0")}
hotPink() {return this.hex("FF69B4")}
indianRed () {return this.hex("CD5C5C")}
indigo () {return this.hex("4B0082")}
ivory() {return this.hex("FFFFF0")}
khaki() {return this.hex("F0E68C")}
lavender() {return this.hex("E6E6FA")}
lavenderBlush() {return this.hex("FFF0F5")}
lawnGreen() {return this.hex("7CFC00")}
lemonChiffon() {return this.hex("FFFACD")}
lightBlue() {return this.hex("ADD8E6")}
lightCoral() {return this.hex("F08080")}
lightCyan() {return this.hex("E0FFFF")}
lightGoldenRodYellow() {return this.hex("FAFAD2")}
lightGray() {return this.hex("D3D3D3")}
lightGrey() {return this.hex("D3D3D3")}
lightGreen() {return this.hex("90EE90")}
lightPink() {return this.hex("FFB6C1")}
lightSalmon() {return this.hex("FFA07A")}
lightSeaGreen() {return this.hex("20B2AA")}
lightSkyBlue() {return this.hex("87CEFA")}
lightSlateGray() {return this.hex("778899")}
lightSlateGrey() {return this.hex("778899")}
lightSteelBlue() {return this.hex("B0C4DE")}
lightYellow() {return this.hex("FFFFE0")}
lime() {return this.hex("00FF00")}
limeGreen() {return this.hex("32CD32")}
linen() {return this.hex("FAF0E6")}
magenta() {return this.hex("FF00FF")}
maroon() {return this.hex("800000")}
mediumAquaMarine() {return this.hex("66CDAA")}
mediumBlue() {return this.hex("0000CD")}
mediumOrchid() {return this.hex("BA55D3")}
mediumPurple() {return this.hex("9370DB")}
mediumSeaGreen() {return this.hex("3CB371")}
mediumSlateBlue() {return this.hex("7B68EE")}
mediumSpringGreen() {return this.hex("00FA9A")}
mediumTurquoise() {return this.hex("48D1CC")}
mediumVioletRed() {return this.hex("C71585")}
midnightBlue() {return this.hex("191970")}
mintCream() {return this.hex("F5FFFA")}
mistyRose() {return this.hex("FFE4E1")}
moccasin() {return this.hex("FFE4B5")}
navajoWhite() {return this.hex("FFDEAD")}
navy() {return this.hex("000080")}
oldLace() {return this.hex("FDF5E6")}
olive() {return this.hex("808000")}
oliveDrab() {return this.hex("6B8E23")}
orange() {return this.hex("FFA500")}
orangeRed() {return this.hex("FF4500")}
orchid() {return this.hex("DA70D6")}
paleGoldenRod() {return this.hex("EEE8AA")}
paleGreen() {return this.hex("98FB98")}
paleTurquoise() {return this.hex("AFEEEE")}
paleVioletRed() {return this.hex("DB7093")}
papayaWhip() {return this.hex("FFEFD5")}
peachPuff() {return this.hex("FFDAB9")}
peru() {return this.hex("CD853F")}
pink() {return this.hex("FFC0CB")}
plum() {return this.hex("DDA0DD")}
powderBlue() {return this.hex("B0E0E6")}
purple() {return this.hex("800080")}
rebeccaPurple() {return this.hex("663399")}
red() {return this.hex("FF0000")}
rosyBrown() {return this.hex("BC8F8F")}
royalBlue() {return this.hex("4169E1")}
saddleBrown() {return this.hex("8B4513")}
salmon() {return this.hex("FA8072")}
sandyBrown() {return this.hex("F4A460")}
seaGreen() {return this.hex("2E8B57")}
seaShell() {return this.hex("FFF5EE")}
sienna() {return this.hex("A0522D")}
silver() {return this.hex("C0C0C0")}
skyBlue() {return this.hex("87CEEB")}
slateBlue() {return this.hex("6A5ACD")}
slateGray() {return this.hex("708090")}
slateGrey() {return this.hex("708090")}
snow() {return this.hex("FFFAFA")}
springGreen() {return this.hex("00FF7F")}
steelBlue() {return this.hex("4682B4")}
tan() {return this.hex("D2B48C")}
teal() {return this.hex("008080")}
thistle() {return this.hex("D8BFD8")}
tomato() {return this.hex("FF6347")}
turquoise() {return this.hex("40E0D0")}
violet() {return this.hex("EE82EE")}
wheat() {return this.hex("F5DEB3")}
white() {return this.hex("FFFFFF")}
whiteSmoke() {return this.hex("F5F5F5")}
yellow() {return this.hex("FFFF00")}
yellowGreen() {return this.hex("9ACD32")}"""
#
#    /// - ![#7FFF00](https://via.placeholder.com/15/7fff00/000000?text=+) `#7FFF00`
for line in lines.split("\n"):
    color_name = line.split("() ")[0]
    hex_col = line.split("return this.hex(")[1][1:7].lower()
    print(f"/// - ![#{hex_col}](https://via.placeholder.com/15/{hex_col}/000000?text=+) `.{color_name}()`")
    
    r1, r2, g1, g2, b1, b2 = hex_col
    r = hex_lookup[r1] * 16 + hex_lookup[r2]
    g = hex_lookup[g1] * 16 + hex_lookup[g2]
    b = hex_lookup[b1] * 16 + hex_lookup[b2]
    
#    print(f"{color_name}" + "() {return this.rgb(" + f"{r}, {g}, {b}" + ")}")
    


print(hex_lookup)
