## Eclair Text
Create a eclair text object.
```javascript
eclair.Text('Welcome')
    .type("title")
```
### .type
Set the type of text this is to a predefined style from the list of following: title, subtitle, heading1, heading2, heading3, heading 4.    
```javascript
eclair.Text('Hello')
    .type('heading1')
```

Alternatively, you can use an EclairTextStyleState to do this.
```javascript
eclair.Text('Hello')
    .type(eclair.TextStyle().heading2())
```
