# Eclair Slider
__extends [EclairCustomTagComponent](https://github.com/SamGarlick/Eclair/tree/main/src/elements/custom-tag.js)__<br/>
An eclair slider allowing a user to scrub to a numeric value.
Eclair.styles.Slider: Default slider style.
```javascript
Eclair.Form([
    Eclair.Slider(0.5)
])
```
### constructor
Construct an Eclair Slider element with a predefined value.
value: Value of the slider.
```javascript
Eclair.Slider(0.5)
```
### .name
Set the name attribute for this element. (used in forms).
value: Value to set the name to.
```javascript
Eclair.Slider(0.5)
    .name("weight")
```
### .min
The minimum value the slider can be.
value: The slider's smallest value will be set to this value given.
```javascript
Eclair.Slider(0.5)
    .min(0)
```
### .max
The maximum value the slider can be.
value: The slider's largest value will be set to this value given.
```javascript
Eclair.Slider(0.5)
    .max(1)
```
### .step
Set the step between points along the slider.
value: The value between steps, e.g. min(0), max(1), step(0.1) would have 11 steps, 0, 0.1, 0.2, ... 0.9, 1.
```javascript
Eclair.Slider(0.5)
    .step(0.1)
```

### Inherits from: elements.custom-tag
 - [.innerHTML()](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/custom-tag.md#innerHTML)
<br/>Source: [_elements.form.slider_](https://github.com/SamGarlick/Eclair/tree/main/src/elements/form/slider.js)