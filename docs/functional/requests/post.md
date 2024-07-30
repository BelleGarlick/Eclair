# Eclair POST Request [extends [EclairHTTPRequest](https://github.com/SamGarlick/Eclair/tree/main/docs/functional/requests/request.md)]
Source: [_functional.requests.post_](https://github.com/SamGarlick/Eclair/tree/main/src/functional/requests/post.js)<br/><br/>
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

### Inherits from: functional.requests.request
 - [.onSuccess()](https://github.com/SamGarlick/Eclair/tree/main/docs/functional/requests/request.md#onSuccess)
 - [.onUploadSuccess()](https://github.com/SamGarlick/Eclair/tree/main/docs/functional/requests/request.md#onUploadSuccess)
 - [.onError()](https://github.com/SamGarlick/Eclair/tree/main/docs/functional/requests/request.md#onError)
 - [.onUploadError()](https://github.com/SamGarlick/Eclair/tree/main/docs/functional/requests/request.md#onUploadError)
 - [.onProgress()](https://github.com/SamGarlick/Eclair/tree/main/docs/functional/requests/request.md#onProgress)
 - [.onUploadProgress()](https://github.com/SamGarlick/Eclair/tree/main/docs/functional/requests/request.md#onUploadProgress)
 - [.onReadyStateChange()](https://github.com/SamGarlick/Eclair/tree/main/docs/functional/requests/request.md#onReadyStateChange)
 - [.setHeader()](https://github.com/SamGarlick/Eclair/tree/main/docs/functional/requests/request.md#setHeader)
 - [.setAsync()](https://github.com/SamGarlick/Eclair/tree/main/docs/functional/requests/request.md#setAsync)
 - [.timeout()](https://github.com/SamGarlick/Eclair/tree/main/docs/functional/requests/request.md#timeout)
 - [.withCredentials()](https://github.com/SamGarlick/Eclair/tree/main/docs/functional/requests/request.md#withCredentials)
 - [.contentType()](https://github.com/SamGarlick/Eclair/tree/main/docs/functional/requests/request.md#contentType)
 - [.send()](https://github.com/SamGarlick/Eclair/tree/main/docs/functional/requests/request.md#send)