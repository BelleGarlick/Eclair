# Eclair Text [extends [EclairComponent](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/component.md)]
Source: [_elements.standard.text_](https://github.com/SamGarlick/Eclair/tree/main/src/elements/standard/text.js)<br/><br/>
Create a eclair text object.
**
Eclair.styles.Text**  Default text style.
**
Eclair.styles.TextTitleStyle**  Modifiable text style which can be given to a text object using .type('title').
**
Eclair.styles.TextSubtitleStyle**  Modifiable text style which can be given to a text object using .type('subtitle').
**
Eclair.styles.TextHeading1Style**  Modifiable text style which can be given to a text object using .type('heading1').
**
Eclair.styles.TextHeading2Style**  Modifiable text style which can be given to a text object using .type('heading2').
**
Eclair.styles.TextHeading3Style**  Modifiable text style which can be given to a text object using .type('heading3').
**
Eclair.styles.TextHeading4Style**  Modifiable text style which can be given to a text object using .type('heading4').
```javascript
Eclair.Text('Welcome')
    .type("title")
```
### constructor
Construct an Eclair text element with a predefined value.

text: Text contained in the element.
```javascript
Eclair.Text('Hello World')
```
### .type
Set the type of text this is to a predefined style from the list of following: `title, subtitle, heading1, heading2, heading3, heading4`. 

value: Predefined style.
```javascript
Eclair.Text('Welcome')
    .type("subtitle")
```

### Inherits from: elements.component
 - [.id()](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/component.md#id)
 - [.eID()](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/component.md#eID)
 - [.addStyle()](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/component.md#addStyle)
 - [.removeStyle()](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/component.md#removeStyle)