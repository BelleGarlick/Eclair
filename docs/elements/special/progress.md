# Eclair Progress Bar [extends [EclairComponent](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/component.md)]
Source: [_elements.special.progress_](https://github.com/SamGarlick/Eclair/tree/main/src/elements/special/progress.js)<br/><br/>
Create a eclair progress bar object.
**
Eclair.styles.ProgressBar**  Progress bar style.
**
Eclair.styles.ProgressBarLabel**  Progress label style.
**
Eclair.styles.ProgressBarIndicator**  Progress indicator style.
```javascript
let progress = Ø(0)

Eclair.EclairProgressBar(progress)
    .striped(true)
    .background("blue")
    .onClick(() => {
        progress.value(progress.value() += 0.05)
    })
```
### constructor
Construct an Eclair Progress Bar element with a given progression level.

progress: The progress of the element. 
```javascript
Eclair.ProgressBar(0.5)
```
### .striped
Enable or disable a stripey background.

_on:  If true, the background will be striped. 
```javascript
Eclair.ProgressBar(0.5)
    .stiped(true)
```
### .indicator
Callback function to access the indicator component.

callback: The callback function to be executed with the indicator component as a parameter.
```javascript
Eclair.ProgressBar(0.5)
    .indicator(e => {
        indicator.background("blue")
    })
```
### .label
Callback function to access the label component.

callback: The callback function to be executed with the label component as a parameter.
```javascript
Eclair.ProgressBar(0.5)
    .label(e => {
        e.fontColor("black")
    })
```
### .color
Sets the color of the progress bar.  

value: Can be either a string, an eclair State or eclair Color. 
```javascript
Eclair.ProgressBar(0.5)
    .label(e => {
        e.fontColor("black")
    })
```
### .showLabel
Sets whether the progress label should show on the progress bar.   

show: Can be either a bool or an eclair State.
```javascript
Eclair.ProgressBar(0.5)
    .showLabel(true)
```

### Inherits from: elements.component
 - [.id()](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/component.md#id)
 - [.eID()](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/component.md#eID)
 - [.addStyle()](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/component.md#addStyle)
 - [.removeStyle()](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/component.md#removeStyle)