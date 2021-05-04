# JS-Declarative UI


Don't ask why, ask why not. This library is a declarative UI maker for websites. Angular, React, Vue, etc. are all designed to help make coding web UIs easier (they do a good job of it). But often you'll find yourself still having to use HTML and CSS to do things. And the code isn't much easier to do anyways. This library takes inspiration for SwiftUI's superiour way of coding a UI...but for websites. It's easy, simple and you need to write a lot less code.

## Examples

HTML + CSS + JS
```
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

JSDUI
```
<script>
JButton("Hello There!")
    .fontSize("10px")
    .press(() => {
        alert("General Kenobi")
    })
</script>
```


# How does it work?
...

# More documentation coming one day...