# Eclair HTTP Request
Create a HTTP request such as a POST or GET request.
```javascript
Eclair.request("/get-user/", "GET")
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
Initialise the request.
url: The request endpoint.
method: The method to use. E.g. "POST", "GET".
```javascript
Eclair.request("/login/", "GET")
```
### .onSuccess
A callback when the request returned successfully.
callback: The callback function called.
```javascript
Eclair.request("/get-user/", "GET")
    .onSuccess(data => {
        location.href = `/user/${data}/`
    })
```
### .onUploadSuccess
A callback when the requested data has been uploaded successfully.
callback: The callback function called.
```javascript
Eclair.request("/new-profile-pic/", "POST")
    .onUploadSuccess(_ => {
        alert("Upload Complete.")
    })
```
### .onError
A callback when the request encountered an error.
callback: The callback function called.
```javascript
Eclair.request("/get-user/", "GET")
    .onError(_ => {
        alert("Unable to get user.")
    })
```
### .onUploadError
A callback when the request encountered an error uploading.
callback: The callback function called.
```javascript
Eclair.request("/new-profile-picture/", "POST")
    .onError(_ => {
        alert("Unable to upload your beautiful new profile picture.")
    })
```
### .onProgress
A callback when the progress for a request changes. The argument given to the callback is the percentage progress of the request.
callback: The callback function called.
```javascript
Eclair.request("/get-image/", "GET")
    .onProgress(progress => {
        downloadProgress = progress
    })
```
### .onUploadProgress
A callback when the upload progress for a request changes. The argument given to the callback is the percentage progress of the request.
callback: The callback function called.
```javascript
Eclair.request("/new-profile-picture/", "POST")
    .onProgress(progress => {
        uploadProgress = progress
    })
```
### .onReadyStateChange
A callback when the ready state of the request changed. The argument given is the XMLHTTP object.
callback: The callback function called.
```javascript
Eclair.request("/new-profile-picture/", "POST")
    .onReadyStateChanged(xmlHTTP => {
        // if (xmlHTTP.status = ...
    })
```
### .setHeader
Set headers of the request.
key: Header key.
headers:Header value. The given parameter can be an eclair state object.
```javascript
Eclair.request("/hello-world/", "GET")
    .setHeader("Content-Type", "application/xml")
    .setHeader("foo", "bar")
```
### .setAsync
Set whether the the request is performed asynchronously. (Default true).
value: boolean value - can be an eclair State.
```javascript
Eclair.request("/hello-world/", "GET")
    .setAsync(true)
```
### .setAsync
Sets the response type for the content. (Default "" = string).
value: Response type of the data - can be an eclair State.
```javascript
Eclair.request("/hello-world/", "GET")
    .responseType("json")
```
### .timeout
Sets the timeout for the request in milliseconds. Default: 10000 (10 seconds).
value: New timeout time in milliseconds - can be an eclair State.
```javascript
Eclair.request("/hello-world/", "GET")
    .timeout(5000)
```
### .withCredentials
Sets the request uses credentials. Detauls: false.
value: Boolean representing whether credentials are used - can be an eclair State.
```javascript
Eclair.request("/hello-world/", "GET")
    .widthCredentials(true)
```
### .send
Send the form element. This function can be passed several types of data which are sent to the given endpoint. You can pass in a HTML Form element, an eclair Element of a JSON object. If using the JSON object the keys must be strings, but the values can be either: primative types (string, bool, etc...), eclair State, HTML Input[type=File] element, Input element. Method and action attributes of a given form will be ignored. To set the method and action use .method and .action.
data: Data sent to the target endpoint.
```javascript
Eclair.request("/submit/", "POST")
    .send({
        "a-string": "bar",
        "an-eclair-state": Ø("bar"),,
        "an-eclair-object": Eclair.TextBox("yo mama")
        "a-html-input": document.getElementById("myInput"),
        "a-html-file-file": document.getElementById("myFileInput"),
        "a-file-object": document.getElementById("myFileInput").files[0]
    })

Eclair.request("/submit/", "POST")
    .send(document.forms.main)

Eclair.request("/submit/", "POST")
    .send(Eclair.Form([Eclair.TextBox("bar").name("foo")]))
```
<br/>Source: [_functional.requests.request_](https://github.com/SamGarlick/Eclair/tree/main/src/functional/requests/request.js)