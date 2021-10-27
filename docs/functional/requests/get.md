## Eclair Get Request
Create a GET HTTP request.
```javascript
eclair.get("/get-user/")
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

<br/>Source: [_functional.requests.get_](https://github.com/SamGarlick/Eclair/tree/main/src/functional/requests/get.js)