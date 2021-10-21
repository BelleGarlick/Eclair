## Eclair Form Element
A form element for eclair objects. This object extends the EclairView object 
allowing dynamic creation of elements within the view.
<br/>**args**:
- elements: Elements within the view.
- objectFunction: A function which returns the constructed object.
```javascript
eclair.Form([
    eclair.TextBox("")
        .name("Username"),
    eclair.TextBox("")
        .name("name"),
    eclair.Button("Submit")
        .type("submit")
])
    .action("/new-user/")
    .method("POST")
```
### .method
Set the method of the form.
<br/>**args**:
- _method: Set the new method of the form.
```javascript
eclair.Form([
    eclair.TextBox("")
        .name("Username")
])
    .method("POST")
```
### .action
Set the action of the form.
<br/>**args**:
- _action: Set the new action of the form.
```javascript
eclair.Form([
    eclair.TextBox("")
        .name("Username")
])
    .action("/new-user/")
```
### .submit
Bind a state bool to the form such that when the bool becomes true
the form will be submitted.
<br/>**args**:
- state: The state to bind to.
```javascript
let submitted = Ø(false)
eclair.Form([
    eclair.TextBox("")
        .name("Username"),
    eclair.Button()
        .onClick(_ => {
            submitted.value(true)
        })
])
    .submit(submitted)
```

<br/>Source: [_elements.form.form_](https://github.com/SamGarlick/Eclair/tree/main/src/elements/form/form.js)