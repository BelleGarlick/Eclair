# Eclair Hyperlink
__extends [EclairCustomTagComponent](https://github.com/SamGarlick/Eclair/tree/main/src/elements/custom-tag.js)__
Create a eclair hyperlink object.
Eclair.styles.Link: Default link style.
```javascript
Eclair.Link('DuckDuckGo')
.url('https://duckduckgo.com/')
.target('_blank')
```
### constructor
Construct an Eclair hyperlink object with a predefined text.
text: The text displayed.
```javascript
Eclair.Link('DuckDuckGo')
```
### .url
Set target URL that the hyperlink references.
url: Hyperlink target.
```javascript
Eclair.Link('DuckDuckGo')
.url('https://duckduckgo.com/')
```
### .target
Set target for the hyperlink. This follows standard html targets for an 'a' element. E.g. '_blank'
value: Hyperlink target.
```javascript
Eclair.Link('DuckDuckGo')
.url('https://duckduckgo.com/')
.target('_blank')
```
<br/>### Inherits from elements.custom-tag
 - .innerHTML()
<br/>Source: [_elements.standard.link_](https://github.com/SamGarlick/Eclair/tree/main/src/elements/standard/link.js)