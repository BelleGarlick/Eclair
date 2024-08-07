# Eclair GET Request [extends [EclairHTTPRequest](https://github.com/SamGarlick/Eclair/tree/main/docs/functional/requests/request.md)]
Source: [_functional.requests.get_](https://github.com/SamGarlick/Eclair/tree/main/src/functional/requests/get.js)<br/><br/>
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