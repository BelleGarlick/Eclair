/// ## Eclair Get Request
/// Create a GET HTTP request.
/// ```javascript
/// eclair.get("/get-user/")
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
class EclairGet extends EclairHTTPRequest {
    constructor(url) {
        super(url, "GET")
    }
}