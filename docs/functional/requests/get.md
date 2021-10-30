# Eclair GET Request
__extends [EclairHTTPRequest](https://github.com/SamGarlick/Eclair/tree/main/src/functional/requests/request.js)__
Create a GET HTTP request.
```javascript
Eclair.get("/get-user/")
.onSuccess(data => {
location.href = `/user/${data}/`
})
.onError(_ => {
alert("Unable to load the user.")
})
.send({
"username": "Seymour_Buttz"
})
```
### constructor
Construct an GET object.
url: Endpoint url to GET the request to.
```javascript
Eclair.get("/get-user/")
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
<br/>Source: [_functional.requests.get_](https://github.com/SamGarlick/Eclair/tree/main/src/functional/requests/get.js)