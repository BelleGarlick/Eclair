# Eclair Alignment State
__extends [EclairState](https://github.com/SamGarlick/Eclair/tree/main/src/functional/states/state.js)__<br/>
This class inherits the functionality of a normal Eclair State, but is designed for alignment and has functions for doing so. 
```javascript
Eclair.VStack([...])
    .alignment(Eclair.Alignment().center())
```
### constructor
Construct an Alignment state object which defaults to centered alignment.
```javascript
    Eclair.Alignment()
```
### .start
Align items to the start of the flow direction (often the left or top).
```javascript
Eclair.VStack([...])
    .alignment(Eclair.Alignment().start())
```
### .center
Align items to the center of the flow direction.
```javascript
Eclair.VStack([...])
    .alignment(Eclair.Alignment().center())
```
### .end
Align items to the end of the flow direction (often the right or bottom).
```javascript
Eclair.VStack([...])
    .alignment(Eclair.Alignment().end())
```
<br/>Source: [_functional.states.alignment_](https://github.com/SamGarlick/Eclair/tree/main/src/functional/states/alignment.js)