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
    eclair.Text("Label 1").addStyle(labelFont)
    eclair.Text("Label 2").addStyle(labelFont)
])
```

## How does it work?
All UI components inherit from the base 'EclairComponent' object. This object provides functionality such as altering attributes, styling and other helper functions such as getting the HTML element and writing the object to HTML. 

### EclairComponent
The base object determines an ID that is used to reference both the eclair object and the HTML object. Each object is stored in a map which can be accessed via `eclair._elements` which stores an element ID as the key and the object reference as the value. Additionally, the EclairComponent determines stores the reference to which the HTML object can be accessed. This allows for both HTML and EclairComponent to reference one another which acts as the basis for the Eclair library. This self-reference is how event methods are handled. When an event is added to a component, the component adds a method to the object which references the eclair ID. When the method is called the element can lookup which eclair component to call and access that objects event callbacks.

### Writing to HTML
There are three main methods used within Eclair to write the HTML for the UI components. `write` and `to` are implemented in the 'EclairComponent' and shouldn't be overwritten, however, `build` should always be implemented by a subclass.

`build`: Unique to each subclass, this funciton builds the HTML as a string. Often this function will only be called by parent UI components when building the child component. `document.getElementById(...).innerHTML = eclair.Text('Ola').build()`

`to`: This function will build the HTML of the item (and an subitems) and write them to an element with the given ID. `eclair.Text('Ola').to(...)`

`write`: This function will build the HTML of an item and call the `document.write` function to write the HTML. `eclair.Text('Ola').write()`

### Styling
There are three main ways to add a style to an element:
`Styles Attribute`, `Style classes`, `Default styles` (where style attributes have the most priority and default styles have the least). 
### event handling
### Other things, 'versioning', 'imports', 'getElement', etc.

## Components
### Custom elements.
...

# More documentation coming one day...
# Element Specific
### Selects


## Road Map
### Versioning
Version will work based on the standard major.minor.patch. Any major update will be a large undertaking and is unlikely to happen. This be a large update that would break current development and is unlikely to be backwards compatable. Minor updates include element additions to the library which are unlikely to break backwards compatability. Patch is for bug fixes.
