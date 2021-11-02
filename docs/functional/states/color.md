# Eclair Color [extends [EclairState](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/states/state.md)]
Source: [_functional.states.color_](https://github.com/SamGarlick/Eclair/tree/main/src/functional/states/color.js)<br/><br/>
Create a color state object.
```javascript
Eclair.Button("Example")
    .background(Eclair.Color().hex("#ff9900"))
```
### constructor
Construct the Color component based on given arguments.

p1: The Red component. Alternatively, this argument can be an array; if so, then the color will be set based on the array elements. Finally, this parameter can be a string in a hexadecimal format or HTML color code format.

p2: The Green component.

p3: The Blue component.

p4: The Alpha (opacity) component.
```javascript
Eclair.Color()
Eclair.Color("hotpink")
Eclair.Color("#0099ff")
Eclair.Color("ff9900")
Eclair.Color(255, 0, 0)
Eclair.Color(255, 0, 0, 4)
Eclair.Color([125, 255, 150])
``` 
### .parse
Parse a given color from the formats: RGB, RGBA, HTML color code and hexadecimal. 

p1: The Red component. Alternatively, this argument can be an array; if so, then the color will be set based on the array elements. Finally, this parameter can be a string in a hexadecimal format or HTML color code format.

p2: The Green component.

p3: The Blue component.

p4: The Alpha (opacity) component.
```javascript
Eclair.Color()
Eclair.Color("hotpink")
Eclair.Color("#0099ff")
Eclair.Color("ff9900")
Eclair.Color(255, 0, 0)
Eclair.Color(255, 0, 0, 4)
Eclair.Color([125, 255, 150])
``` 
### .RGB
Set the color based on given RGB values. 

r: The Red component. Alternatively, this argument can be an array; if so, then the color will be set based on the array elements.

g: The Green component.

b: The Blue component.
```javascript
Eclair.Color().RGBA(255, 150, 0)
Eclair.Color().RGBA([255, 150, 0])
``` 
### .RGBA
Set the color based on given RGBA values.

r: The Red component. Alternatively, this argument can be an array; if so, then the color will be set based on the array elements.

g: The Green component.

b: The Blue component.

a: The Alpha (opacity) component.
```javascript
Eclair.Color().RGBA(255, 150, 0, 0.5)
Eclair.Color().RGBA([255, 150, 0, 0.5])
``` 
### .HSL
Set the color based on given HSL values.

h: The Hue component. Alternatively, this argument can be an array; if so, then the color will be set based on the array elements.

s: The Saturation component.

l: The Light component.
```javascript
Eclair.Color().HSLA(0, 1, 0.5)
Eclair.Color().HSLA([0, 1, 0.5])
``` 
### .HSLA
Set the color based on given HSLA values.

h: The Hue component. Alternatively, this argument can be an array; if so, then the color will be set based on the array elements.

s: The Saturation component.

l: The Light component.

a: The Alpha (opacity) component.
```javascript
Eclair.Color().HSLA(0, 1, 0.5, 0.5)
Eclair.Color().HSLA([0, 1, 0.5, 0.5])
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
Eclair.Color().hex("ffffff")
Eclair.Color().hex("#ffffff")
Eclair.Color().hex("fff")
Eclair.Color().hex("#fff")
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