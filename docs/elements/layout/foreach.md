## Eclair ForEach Object
An object which allows you to pass a list and a method which constructs each item in the list. This allows you to simply define how each item in a list should be constructed without having to iterate through the list yourself. If the list is wrapped in an eclair state object, then the list can be mutated and the visible list will change too.
<br/>**args**:
- items: A list of items that will be iterated.
- objectFunction: A function which returns the constructed object.
```javascript
eclair.ForEach([
    {'name': 'Joe Briggs', 'age': 28},
    {'name': 'Amy Wong', 'age': 24},
    {'name': 'Dustin James', 'age': 15}
], item => {
   return eclair.HStack([
       eclair.Text(item.name),
       eclair.Text(item.age)
   ])
})
```

<br/>Source: [_elements.layout.foreach_](https://github.com/SamGarlick/Eclair/tree/main/src/elements/layout/foreach.js)