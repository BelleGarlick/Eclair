# Eclair IFrame [extends [EclairCustomTagComponent](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/custom-tag.md)]
Source: [_elements.standard.iframe_](https://github.com/SamGarlick/Eclair/tree/main/src/elements/standard/iframe.js)<br/><br/>
An eclair IFrame object.
**
Eclair.styles.IFrame**  Default iFrame style.
```javascript
Eclair.IFrame()
    .url("https://www.w3schools.com")
    .allowFullScren(true)
    .referrerPolicy("no-referrer")
```
### constructor
Construct an Eclair iFrame element.
```javascript
Eclair.IFrame()
```
### .url
Set the URL for the webpage you want the IFrame to display.

source: URL source for the IFrame to load.
```javascript
Eclair.IFrame()
    .url("http://www.w3schools.com")
```
### .source
Set the webpage source code you want the IFrame to display.

source: HTML source for the IFrame to load.
```javascript
Eclair.IFrame()
    .source("<p>Hello World</p>")
```
### .allowFullScren
Set if the frame can activate fullscreen mode by calling the requestFullscreen() method.

allow: If true it will be allowed.
```javascript
Eclair.IFrame()
    .allowFullScren(true)
```
### .allowPaymentRequest
If true the iframe will be allowed to invoke the Payment Request API

allow: If true the iframe can invoke the Payment Request API.
```javascript
Eclair.IFrame()
    .allowPaymentRequest(true)
```
### .loading
Specifies how the iframe should be loaded - immediately or deferred.

loading: Can be either "eager" or "lazy".
```javascript
Eclair.IFrame()
    .loading("eager")
```
### .referrerPolicy
Specify the referrer policy of the iframe. See [w3schools](https://www.w3schools.com/tags/att_iframe_referrerpolicy.asp) for details.

policy: The refferer policy to use.
```javascript
Eclair.IFrame()
    .referrerPolicy("no-referrer")
```
### .sandbox
Specify additional restrictions for the iframe. See [w3schools](https://www.w3schools.com/tags/att_iframe_sandbox.asp) for details.

sandbox: The sandbox rule to use.
```javascript
Eclair.IFrame()
    .sandbox("allow-forms")
```

### Inherits from: elements.custom-tag
 - [.innerHTML()](https://github.com/SamGarlick/Eclair/tree/main/docs/elements/custom-tag.md#innerHTML)