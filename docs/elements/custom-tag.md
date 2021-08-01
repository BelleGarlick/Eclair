## Eclair Custom Tag Component
This is an abstract class which should be subclassed to make it a little easier to make custom components. This class only deals with simple elements that don't have many complex internal elements. This class takes a tag (in the super call) and a bindable `innerHTML` function which can be used to set the innerHTML of the element. You can then, of course, implement other functions that you might want such as binding parameters etc. Commonly you may subclass this object as such:
```javascript
class Article extends EclairCustomTagComponent {
    constructor(headline, text) {
        super("article")
        this.innerHTML(`<h2>${headline}</h2><p>${text}</p>`)
    }
}

new Article("5 reasons why Eclair is the best JS library.", "...").write()
```
### .innerHTML
Set the inner html of this object.
<br/>**args**:
- html: The inner html bound to the object.
```javascript
new EclairCustomTagComponent("p")
    .innerHTML("Hello World")
```

<br/>Source: [_elements.custom-tag_](https://github.com/SamGarlick/Eclair/tree/main/src/elements/custom-tag.js)