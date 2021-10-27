## Eclair Alignment State
This class inherits the functionality of a normal Eclair State, but is designed for alignment and has functions for doing so. 
```javascript
eclair.VStack([...])
    .alignment(eclair.Alignment().center())
```
### .start
Align items to the start of the flow direction (often the left or top).
```javascript
eclair.VStack([...])
    .alignment(eclair.Alignment().start())
```
### .center
Align items to the center of the flow direction.
```javascript
eclair.VStack([...])
    .alignment(eclair.Alignment().center())
```
### .end
Align items to the end of the flow direction (often the right or bottom).
```javascript
eclair.VStack([...])
    .alignment(eclair.Alignment().end())
```

<br/>Source: [_functional.states.alignment_](https://github.com/SamGarlick/Eclair/tree/main/src/functional/states/alignment.js)