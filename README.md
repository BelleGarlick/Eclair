# Eclair
Don't ask why, ask why not. This library is a declarative UI builder for websites. Angular, React, Vue, etc. are all designed to help make coding web UIs easier (they do a good job of it). But often you'll find yourself still having to use HTML and CSS to do things. And the code isn't much easier to do anyways. This library takes inspiration for SwiftUI's superiour way of coding a UI...but for websites. It's easy, simple and you need to write a lot less code.

## Examples
### Simple Button
_HTML + CSS + JS_
``` html
<style>
    .myButton {
        font-size: 10px;
    }
</style>
<script>
    function myButtonClick() {
        alert("General Kenobi")
    }
</script>
<button class="myButton" onclick="myButtonClick()">Hello There!</button>
```

_Eclair_
``` javascript
eclair.Button("Hello There!")
    .fontSize("10px")
    .onClick(() => {
        alert("General Kenobi")
    })
    .write()
```

### Destructive Select
_HTML + CSS + JS_
``` html
<script>
    function destruct(elem) {
        elem.removeChild(elem.children[elem.selectedIndex]);
    }
</script>
<select onchange='destruct(this)'>
    <option>Welcome to the Jungle</option>
    <option>It's so Easy</option>
    <option>Nightrain</option>
    <option>Out Ta Get Me</option>
    <option>Mr. Brownstone</option>
    <option selected>Sweet Child O' Mine</option>
</select>
```

_Eclair_
``` javascript
eclair.Select()
    .addOptions(["Welcome to the Jungle", "It's so Easy", "Nightrain",
                 "Out Ta Get Me", "Mr. Brownstone", "Sweet Child O' Mine"])
    .selectedIndex(5)
    .onChange(self => {
        self.removeOption(self.value())
    })
    .write()
```

### Sharing Styles
_HTML + CSS + JS_
``` html
<style>
    .label {
        color: #0000ff;
        font-weight: 700;
    }
    
    .label:hover {
        font-weight: 300;
    }
</style>
<div>
    <span class="label">Label 1</span>
    <span class="label">Label 2</span>
</div>
```

_Eclair_
``` javascript
let labelFont = eclair.Style()
    .fontColor("#0000ff")
    .fontWeight(700)
    .fontWeight(300, "hover")

eclair.View([
    eclair.Text("Label 1").addStyle(labelFont),
    eclair.Text("Label 2").addStyle(labelFont)
])
    .write()
```

# How does it work?
### Base Eclair Object
### Writing to html
### styling
Simple Styles, Style classes, Default classes
### event handling
### Subclasses
### Other things, 'versioning', 'imports', 'getElement', etc
### Custom elements.
...

# More documentation coming one day...
# Element Specific
### Selects
