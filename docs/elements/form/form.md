# Eclair Form Box__extends [EclairView](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/layout/view.md)__<br/>

Source: [_elements.form.form_](https://github.com/SamGarlick/Eclair/tree/main/src/elements/form/form.js)
A form element for eclair objects. This object extends the EclairView object allowing dynamic creation of elements within the view.
**Eclair.styles.Form**  Default form style.
```javascript
Eclair.Form([
    Eclair.TextBox("")
        .name("Username"),
    Eclair.TextBox("")
        .name("name"),
    Eclair.Button("Submit")
        .type("submit")
])
    .action("/new-user/")
    .method("POST")
```
### constructor
Construct the form object with given elements.
elements: List of items contained within the form.
objectFunc: A function applied to each object. __(See Eclair.layout.view)__
```javascript
Eclair.Form([
    Eclair.TextBox("")
        .name("username"),
    Eclair.Checkbox(false)
        .name("over-18")
])
```
### .method
Set the new method for the form.
value: Method value.
```javascript
Eclair.Form([...])
    .method("POST")
```
### .action
Set the new action for the form.
value: Action value.
```javascript
Eclair.Form([...])
    .action("/new-user/")
```
### .submit
Alternative method to submitting a form which allows you to bind a state bool to the form such that when the bool becomes true the form will be submitted. 
state: Bound state.
let submitted = Ø(false)
Eclair.Form([
    Eclair.TextBox("")
        .name("Username"),
    Eclair.Button()
        .onClick(_ => {
            submitted.value(true)
        })
])
    .submit(submitted)
```