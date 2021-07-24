## Eclair Hyperlink
Create a eclair hyperlink object.
```javascript
eclair.Link('DuckDuckGo')
    .url('https://duckduckgo.com/')
    .target('_blank')
```
### .url
Set target URL that the hyperlink references.
```javascript
eclair.Link('DuckDuckGo')
    .url('https://duckduckgo.com/')
```
### .target
Set target for the hyperlink. This follows standard html targets for an 'a' element. E.g. '_blank'
```javascript
eclair.Link('DuckDuckGo')
    .url('https://duckduckgo.com/')
    .target('_blank')
```
