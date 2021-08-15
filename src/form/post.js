class EclairPost {
    constructor(url) {
        this.url = url

        this._onLoad = function() {}
<!--            this._onAbort = null-->
<!--            this._onLoadEnd = null-->
<!--            this._onLoadStart = null-->
        this._onProgress = null
<!--            this._onTimeOut = null-->
    }

    onSuccess(callback) {
        this._onLoad = callback
        return this
    }

    onProgress(callback) {
        this._onProgress = callback
        return this
    }

    send(_form) {
        var xhttp = new XMLHttpRequest();

        // Add callbacks
        let self = this
        xhttp.onload = function() {if (self._onLoad != null) {self._onLoad(xhttp.responseText)}}
        xhttp.onprogress = function(evt) {
            if (self._onProgress != null){self._onProgress(evt.loaded / evt.total)}
        }

        xhttp.open("POST", this.url, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        // Build form string
        var formString = ""
        Object.keys(_form).forEach(function(key) {
            let value = _form[key]
            if (value instanceof EclairState) {
                value = value.value()
            }
            formString += escape(key) + "="
            formString += escape(value) + "&"
        })

        xhttp.send(formString);

        return this
    }
}