// TODO Doc and add all functions stuff

class EclairPost {
    constructor(url) {
        this.url = url
        this.form = null
        this.onSuccess = null
    }
    
    form(_form) {
        this.form = _form
        return this
    }
    
    onSuccess(callback) {
        this.onSuccess = callback
    }
    
    send() {
        if (this.form == null) {
            throw "Content of .form() is null."
        }
        
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                alert(this.responseText)
                
            } else if (this.readyState == 4) {
                
            }
        };
        xhttp.open("POST", this.url, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        var formString = ""
        Object.keys(this.form).forEach(function(key) {
            formString += escape(key) + "="
            formString += escape(form[key]) + "&"
        })
        alert(formString)
        xhttp.send(formString);
    }
}