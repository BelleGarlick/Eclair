/// ## Eclair HTTP Request
/// Create a HTTP request such as a POST or GET request.
/// ```javascript
/// eclair.request("/get-user/", "GET")
///     .onSuccess(data => {
///         location.href = `/user/${data}/`
///     })
///     .onError(_ => {
///         alert("Unable to load the user.")
///     })
///     .send({
///         "username": "Seymour_Buttz"
///     })
/// ```

/// ### constructor
/// Initialise the element.
/// <br/>**args**:
/// - url: The request endpoint.
/// - method: The method to use. E.g. "POST", "GET".
/// ```javascript
/// eclair.request("/login/", "GET")
/// ```
class EclairHTTPRequest {
    constructor(url, method) {
        this.url = url
        this.method = method

        this._responseType = ""
        this._timeout = 10000  // 10s
        this._headers = {}
        this._async = true
        this._widthCredentials = false
        
        // Callbacks
        this._onLoad = null
        this._onError = null
        this._onProgress = null
        this._onLoadUpload = null
        this._onErrorUpload = null
        this._onProgressUpload = null
        this._onReadyStateChange = null
    }

    /// ### .onSuccess
    /// A callback when the request returned successfully.
    /// <br/>**args**:
    /// - callback: The callback function called with the response passed as an argument.
    /// ```javascript
    /// eclair.request("/get-user/", "GET")
    ///     .onSuccess(data => {
    ///         location.href = `/user/${data}/`
    ///     })
    /// ```
    onSuccess(callback) {
        this._onLoad = callback
        return this
    }

    /// ### .onUploadSuccess
    /// A callback when the requested data has been uploaded successfully.
    /// <br/>**args**:
    /// - callback: The callback function called.
    /// ```javascript
    /// eclair.request("/new-profile-pic/", "POST")
    ///     .onUploadSuccess(_ => {
    ///         alert("Upload Complete.")
    ///     })
    /// ```
    onUploadSuccess(callback) {
        this._onLoadUpload = callback
        return this
    }

    /// ### .onError
    /// A callback when the request encountered an error.
    /// <br/>**args**:
    /// - callback: The callback function called.
    /// ```javascript
    /// eclair.request("/get-user/", "GET")
    ///     .onError(_ => {
    ///         alert("Unable to get user.")
    ///     })
    /// ```
    onError(callback) {
        this._onError = callback
        return this
    }

    /// ### .onUploadError
    /// A callback when the request encountered an error uploading.
    /// <br/>**args**:
    /// - callback: The callback function called.
    /// ```javascript
    /// eclair.request("/new-profile-picture/", "POST")
    ///     .onError(_ => {
    ///         alert("Unable to upload your beautiful new profile picture.")
    ///     })
    /// ```
    onUploadError(callback) {
        this._onE_onErrorUploadrror = callback
        return this
    }

    /// ### .onProgress
    /// A callback when the progress for a request changes. The argument given to the callback is the percentage progress of the request.
    /// <br/>**args**:
    /// - callback: The callback function called.
    /// ```javascript
    /// eclair.request("/get-image/", "GET")
    ///     .onProgress(progress => {
    ///         downloadProgress = progress
    ///     })
    /// ```
    onProgress(callback) {
        this._onProgress = callback
        return this
    }

    /// ### .onUploadProgress
    /// A callback when the upload progress for a request changes. The argument given to the callback is the percentage progress of the request.
    /// <br/>**args**:
    /// - callback: The callback function called.
    /// ```javascript
    /// eclair.request("/new-profile-picture/", "POST")
    ///     .onProgress(progress => {
    ///         uploadProgress = progress
    ///     })
    /// ```
    onUploadProgress(callback) {
        this._onProgressUpload = callback
        return this
    }

    /// ### .onReadyStateChange
    /// A callback when the ready state of the request changed. The argument given is the XMLHTTP object.
    /// <br/>**args**:
    /// - callback: The callback function called.
    /// ```javascript
    /// eclair.request("/new-profile-picture/", "POST")
    ///     .onReadyStateChanged(xmlHTTP => {
    ///         // if (xmlHTTP.status = ...
    ///     })
    /// ```
    onReadyStateChanged(callback) {
        this._onReadyStateChange = callback
        return this
    }
    
    /// ### .setHeader
    /// Set headers of the request.
    /// <br/>**args**:
    /// - key: Header key.
    /// - value: Header value. The given parameter can be an eclair state object.
    /// ```javascript
    /// eclair.request("/hello-world/", "GET")
    ///     .setHeader("Content-Type", "application/xml")
    ///     .setHeader("foo", "bar")
    /// ```
    setHeader(key, value) {
        this._headers[key] = (value instanceof EclairState)? value.value() : value
        return this
    }
    
    /// ### .setAsync
    /// Set whether the the request is performed asynchronously. (Default true)
    /// <br/>**args**:
    /// - value: boolean value - can be an eclair State.
    /// ```javascript
    /// eclair.request("/hello-world/", "GET")
    ///     .setAsync(true)
    /// ```
    setAsync(value) {
        this._async = (value instanceof EclairState)? value.value() : value
        return this
    }
    
    /// ### .setAsync
    /// Sets the response type for the content. (Default "" = string).
    /// <br/>**args**:
    /// - value: Response type of the data - can be an eclair State.
    /// ```javascript
    /// eclair.request("/hello-world/", "GET")
    ///     .responseType("json")
    /// ```
    responseType(value) {
        this._responseType = (value instanceof EclairState)? _value.value() : value
        return this
    }
    
    /// ### .timeout
    /// Sets the timeout for the request in milliseconds. Default: 10000 (10 seconds).
    /// <br/>**args**:
    /// - value: New timeout time in milliseconds - can be an eclair State.
    /// ```javascript
    /// eclair.request("/hello-world/", "GET")
    ///     .timeout(5000)
    /// ```
    timeout(value) {
        this._timeout = (value instanceof EclairState)? value.value() : value
        return this
    }
    
    /// ### .withCredentials
    /// Sets the request uses credentials. Detauls: false.
    /// <br/>**args**:
    /// - value: Boolean representing whether credentials are used - can be an eclair State.
    /// ```javascript
    /// eclair.request("/hello-world/", "GET")
    ///     .widthCredentials(true)
    /// ```
    widthCredentials(value) {
        this._widthCredentials = (value instanceof EclairState)? value.value() : value
        return this
    }
    
    // Build the xhttp object with all parameters.
    _buildXTTPObject() {
        var xhttp = (window.XMLHttpRequest)? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

        // Add callbacks
        let self = this
        xhttp.onload = function() {if (self._onLoad != null) {self._onLoad(xhttp.response)}}
        xhttp.upload.onload = function() {if (self._onLoadUpload != null) {self._onLoadUpload()}}
        
        xhttp.onerror = function() {if (self._onError != null) {self._onError(xmlhttp.status)}}
        xhttp.upload.onerror = function() {if (self._onErrorUpload != null) {self._onErrorUpload(xmlhttp.status)}}
        
        xhttp.onprogress = function(evt) {
            if (self._onProgress != null) {self._onProgress(evt.loaded / evt.total)}
        }
        xhttp.upload.onprogress = function(evt) {
            if (self._onProgressUpload != null) {self._onProgressUpload(evt.loaded / evt.total)}
        }
        
        xhttp.onreadystatechange = function() {
            if (self._onReadyStateChange != null) {
                self._onReadyStateChange(xhttp)
            }
        };

        xhttp.withCredentials = this._widthCredentials
        xhttp.timeout = this._timeout
        xhttp.responseType = this._responseType
        
        let keys = Object.keys(this._headers);
        for (let k = 0; k < keys.length; k++) {
            xhttp.setRequestHeader(keys[k], this._headers[k]);
        }
        
        xhttp.open(this.method, this.url, this._async);
        
        return xhttp
    }

    /// ### .send
    /// Send the form element. This function can be passed several types of data which are sent to the given endpoint. You can pass in a HTML Form element, an eclair Element of a JSON object. If using the JSON object the keys must be strings, but the values can be either: primative types (string, bool, etc...), eclair State, HTML Input[type=File] element, Input element. 
    /// <br/>**args**:
    /// - value: Data to send.
    /// ```javascript
    /// eclair.request("/submit/", "POST")
    ///     .send({
    ///         "a-string": "bar",
    ///         "an-eclair-state": Ø("bar"),,
    ///         "an-eclair-object": eclair.TextBox("yo mama")
    ///         "a-html-input": document.getElementById("myInput"),
    ///         "a-html-file-file": document.getElementById("myFileInput"),
    ///         "a-file-object": document.getElementById("myFileInput").files[0]
    ///     })
    ///
    /// eclair.request("/submit/", "POST")
    ///     .send(document.forms.main)
    ///
    /// eclair.request("/submit/", "POST")
    ///     .send(eclair.Form([eclair.TextBox("bar").name("foo")]))
    /// ```
    // if using form element post and methods attributes will be disregarded. Using .method and .action
    send(_form) {
        var xhttp = this._buildXTTPObject();
        
        var formData = new FormData;
        // Check if is a form element
        if (_form instanceof HTMLElement && _form.tagName == "FORM") {
            formData = new FormData(_form)
            
        // Check if is eclair form element
        } else if (_form instanceof EclairForm) {
            _form.getElement(e => {
                formData = new FormData(e)
            })
            
        // Check object is {} - this can be done as below.
        } else if (_form.constructor == Object) {
            Object.keys(_form).forEach(function(key) {
                let value = _form[key]
                console.log()
                if (value instanceof EclairState) {
                    value = value.value()
                    
                } else if (value instanceof HTMLElement && value.tagName == "INPUT") {
                    if (value.getAttribute("type") == "file") {
                        value = value.files[0]
                    } else {
                        value = value.value;
                    }
                } 
                
                // TODO Check EclairFileChooser, TextArea, Object is an eclair element with .value function.
                
                formData.append(key, value)
            })
        }
        
        xhttp.send(formData);

        return this
    }
}