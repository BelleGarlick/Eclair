## Eclair IFrame
An eclair IFrame object
```javascript
eclair.IFrame()
    .source("<p>Hello World</p>")
```
### .url
Set the URL for the webpage you want the IFrame to display.
<br/>**args**:
- source: URL source for the IFrame to load
```javascript
eclair.IFrame()
    .url("http://www.w3schools.com")
```
### .source
Set the webpage source code you want the IFrame to display.
<br/>**args**:
- source: HTML source for the IFrame to load
```javascript
eclair.IFrame()
    .source("<p>Hello World</p>")
```
### .source
Set if the frame can activate fullscreen mode by calling the requestFullscreen() method.
<br/>**args**:
- allow: If true it will be allowed.
```javascript
eclair.IFrame()
    .allowFullScren(true)
```
### .allowPaymentRequest
If true the iframe will be allowed to invoke the Payment Request API
<br/>**args**:
- allow: If true the iframe can invoke the Payment Request API.
```javascript
eclair.IFrame()
    .allowPaymentRequest(true)
```
### .loading
Specifies how the iframe should be loaded - immediately or deferred.
<br/>**args**:
- loading: Can be either "eager" or "lazy"
```javascript
eclair.IFrame()
    .loading("eager")
```
### .name
Specify the name of the iframe.
<br/>**args**:
- name: The name to give to the iframe.
```javascript
eclair.IFrame()
    .name("John")
```
### .referrerPolicy
Specify the referrer policy of the iframe. See [w3schools](https://www.w3schools.com/tags/att_iframe_referrerpolicy.asp) for details.
<br/>**args**:
- policy: The refferer policy to use
```javascript
eclair.IFrame()
    .referrerPolicy("no-referrer")
```
### .sandbox
Specify additional restrictions for the iframe. See [w3schools](https://www.w3schools.com/tags/att_iframe_sandbox.asp) for details.
<br/>**args**:
- policy: The refferer policy to use
```javascript
eclair.IFrame()
    .sandbox("allow-forms")
```

<br/><br/>Source: [_elements.standard.iframe_](https://github.com/SamGarlick/Eclair/tree/main/src/elements/standard/iframe.js)