# Eclair Image [extends [EclairCustomTagComponent](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/custom-tag.md)]
Source: [_elements.standard.image_](https://github.com/SamGarlick/Eclair/tree/main/src/elements/standard/image.js)<br/><br/>
An eclair image element.
**
Eclair.styles.Image**  Default Image style.
```javascript
Eclair.Image('image.png')
```
### constructor
Construct an Eclair Image element with a predefined url.

src: URL of the image.
```javascript
Eclair.Image('image.png')
```
### .altText
Set alt text of the image for accessibility.

alt: Alt text of the image.
```javascript
Eclair.Image('image.png')
    .altText('An image of a goldfish jumping on a trampoline.')
```

### Inherits from: elements.custom-tag
 - [.innerHTML()](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/custom-tag.md#innerHTML)