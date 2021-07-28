## Eclair Slider
An eclair slider allowing a user to scrub to a numeric value..
<br/>**args**:
- value: Value of the slider.
```javascript
let value = eclair.State(0.5)
eclair.Slider(value)
```
### .name
Set the name attribute for this element. (used in forms).
```javascript
eclair.Slider(0.5)
    .name("value")
```
### .min
The minimum value the slider can be.
<br/>**args**:
- min: The slider's smallest value will be set to this value given.
```javascript
eclair.Slider(0.5)
    .min(0)
```
### .max
The maximum value the slider can be.
<br/>**args**:
- max: The slider's largest value will be set to this value given.
```javascript
eclair.Slider(0.5)
    .max(1)
```
### .step
Set the step between points along the slider.
<br/>**args**:
- step: The value between steps, e.g. min(0), max(1), step(0.1) would have 11 steps, 0, 0.1, 0.2, ... 0.9, 1.
```javascript
eclair.Slider(0.5)
    .step(0.1)
```

<br/>Source: [_elements.form.slider_](https://github.com/SamGarlick/Eclair/tree/main/src/elements/form/slider.js)