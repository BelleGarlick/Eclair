## Eclair Progress Bar
Create a eclair progress bar object.
```javascript
eclair.EclairProgressBar(0.5)
    .striped(true)
    .background("blue")
```
### .striped
Enable or disable a stripey background.
<br/>**args**:
- on: If true, stripe the background
```javascript
eclair.ProgressBar(0.5)
    .stiped(true)
```
### .indicator
Callback function to access the indicator component.
<br/>**args**:
- callback: The callback function to be executed with the indicator component as a parameter.
```javascript
eclair.ProgressBar(0.5)
    .indicator(e => {
        indicator.background("blue")
    })
```
### .label
Callback function to access the label component.
<br/>**args**:
- callback: The callback function to be executed with the label component as a parameter.
```javascript
eclair.ProgressBar(0.5)
    .label(e => {
        e.fontColor("black")
    })
```
### .color
Sets the color of the progress bar.  
<br/>**args**:
- _color: Can be either a string, an eclair State or eclair Color. 
```javascript
eclair.ProgressBar(0.5)
    .color("red")
```
### .showLabel
Sets whether the progress label should show on the progress bar.  
<br/>**args**:
- _show: Can be either a bool or an eclair State.
```javascript
eclair.ProgressBar(0.5)
    .showLabel(true)
```

<br/>Source: [_elements.custom.progress_](https://github.com/SamGarlick/Eclair/tree/main/src/elements/custom/progress.js)