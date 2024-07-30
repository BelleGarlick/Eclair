# Eclair Component [extends [EclairStylableObject](https://github.com/SamGarlick/Eclair/tree/main/docs/style/style.md)]
Source: [_elements.component_](https://github.com/SamGarlick/Eclair/tree/main/src/elements/component.js)<br/><br/>
### .id
Get or set the id attribute of an element allowing the element to be obtainable via document.getElementById

If present, the id of the object will be set to the given value. However, if no parameter is given, then the id of the object will be returned.
```javascript
let a = Component1().id("id1")
document.write(a.id())
```
### .eID
Get the Eclair ID of an object.
```javascript
Component1().eID()
```
### .addStyle
This function adds a class name or Style object to an Eclair object.

sharedClass: The Eclair Style object, or string class name to add.
```javascript
let sharedStyle = Eclair.Style()
    .width("100%")
    .background("blue")

Component1().addStyle(sharedStyle)
Component2().addStyle(sharedStyle)
```
```javascript
<style>
.sharedStyle {background: blue}
</style>
...
Component1().addStyle("sharedStyle")
Component2().addStyle("sharedStyle")
```
### .removeStyle
This function removes a class name or Style object from an Eclair object.

sharedClass: The Eclair Style object, or string class name to remove.
```javascript
let sharedStyle = Eclair.Style()
    .width("100%")
    .background("blue")

Component1().removeStyle(sharedStyle)
```
```javascript
<style>
.sharedStyle {background: blue}
</style>
...
Component().removeStyle("sharedStyle")
```
### Event Handling
All eclair components have a range of built in event handing functions easily accessable using callback functions. You can assign these functions to any eclair object, however, if the HTML object cannot invoke the event then the event will never get called. For example onError invoked when an image element fails to load an image, but the button object would never invoke that function. The parameter given in the callback parameters is the object eclair object. Full list of events:
<br/>**args**: callback: Call back function which passes the object as a parameter.
<br/><br/>Full list of callback functoins are:
<br/>**onBlur**: When the object loses focus.
<br/>**onChange**: When the object's selected item changes.
<br/>**onFocus**: When the object gains focus from the user.
<br/>**onSelect**: Invoked when an element's item is selected.
<br/>**onSubmit**: Invoked when a form is submitted.
<br/>**onReset**: Invoked when a form is reset.
<br/>**onKeyDown**: Invoked when a key is pressed.
<br/>**onKeyPress**: Invoked when a key is pressed and released.
<br/>**onKeyUp**: Invoked when a key is released.
<br/>**onInput**: Invoked when a form gets user input.
<br/>**onMouseDown**: Invoked when a mouse button is pressed.
<br/>**onMouseUp**: Invoked when a mouse button is released.
<br/>**onMouseOver**: Invoked when the cursor moves over the object.
<br/>**onMouseOut**: Invoked when the cursor moves out of the object.
<br/>**onMouseMove**: Invoked when the cursor moves whlist within the object.
<br/>**onClick**: Invoked when the user clicks on the object.
<br/>**onDblClick**: Invoked when the user double clicks on the object.
<br/>**onScroll**: Invoked when the frame scrolls.
<br/>**onLoad**: Invoked when the objects data loads.
<br/>**onError**: Invoked if there was an error loading the data.
<br/>**onUnload**: Invoked when the data is unloaded.
<br/>**onResize**: Invoked when object resizes.
```javascript
Eclair.Button("Hello There")
    .onClick((el, ev) => {
        alert("General Kenobi")
    })
    .onMouseOver((el, ev) => {
        el.backgorund("red")
    })
    .onMouseOut((el, ev) => {
        el.background("blue")
    })
```
### .build
This function should be implemented in a subclass but not called. Only the parent class should call this function otherwise the returned element will not be linked with all the eclair library.
### .compile
This function should be called to create the object. This calls the `.build` function as implemented in the subclass then applies all attributes to the object then return the compiled HTML code.
```javascript
Eclair.Text("Hello World")
    .compile()
```