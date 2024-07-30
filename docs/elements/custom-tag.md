# Eclair Custom Tag Component [extends [EclairComponent](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/component.md)]
Source: [_elements.custom-tag_](https://github.com/SamGarlick/Eclair/tree/main/src/elements/custom-tag.js)<br/><br/>
This is an abstract class which should be subclassed to make it a little easier to make custom components. This class only deals with simple elements that don't have many complex internal elements. This class takes a tag (in the super call) and a bindable `innerHTML` function which can be used to set the innerHTML of the element. You can then, of course, implement other functions that you might want such as binding parameters etc.
```javascript
Eclair.CustomTagComponent("svg")
    .innerHTML('<circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow"/>')
    .write()
```
```javascript
class Article extends EclairCustomTagComponent {
    constructor(headline, text) {
        super("article")
        this.innerHTML(`<h2>${headline}</h2><p>${text}</p>`)
    }
}

new Article("5 reasons why Eclair is the best JS library.", "...").write()
```
### constructor
Construct an eclair custom tag component with a given tag.

tag: The tag to build this element with.
```javascript
Eclair.CustomTagComponent("p")
```
### .innerHTML
Set the inner HTML of this element. This function can be given an eclair state to bind to or just a string.

html: The inner html to give the object.
```javascript
Eclair.CustomTagComponent("p")
    .innerHTML("Hello World")
```

### Inherits from: elements.component
 - [.id()](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/component.md#id)
 - [.eID()](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/component.md#eID)
 - [.addStyle()](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/component.md#addStyle)
 - [.removeStyle()](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/component.md#removeStyle)