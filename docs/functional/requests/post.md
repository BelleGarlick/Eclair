# Eclair POST Request
__extends [EclairHTTPRequest](https://github.com/SamGarlick/Eclair/tree/main/src/functional/requests/request.js)__
Create a POST HTTP request.
```javascript
Eclair.post("/new-username/")
.onSuccess(data => {
location.href = '/profile/'
})
.onError(_ => {
alert("Unable to load the user.")
})
.send({
"username": "Seymour_Buttz",
"csrf": "super-secret-cross-site-request-fogery-token"
})
```
### constructor
Construct an POST object.
url: Endpoint url to POST the request to.
```javascript
Eclair.post("/new-username/")
```
<br/>### Inherits from functional.requests.request
 - .onSuccess()
 - .onUploadSuccess()
 - .onError()
 - .onUploadError()
 - .onProgress()
 - .onUploadProgress()
 - .onReadyStateChange()
 - .setHeader()
 - .setAsync()
 - .timeout()
 - .withCredentials()
 - .send()
<br/>Source: [_functional.requests.post_](https://github.com/SamGarlick/Eclair/tree/main/src/functional/requests/post.js)