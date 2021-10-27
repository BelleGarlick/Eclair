/// ## Eclair POST Request
/// Create a POST HTTP request.
/// ```javascript
/// eclair.post("/new-username/")
///     .onSuccess(data => {
///         location.href = '/profile/'
///     })
///     .onError(_ => {
///         alert("Unable to load the user.")
///     })
///     .send({
///         "username": "Seymour_Buttz",
///         "csrf": "super-secret-cross-site-request-fogery-token"
///     })
/// ```
class EclairPost extends EclairHTTPRequest {
    constructor(url) {
        super(url, "POST")
    }
}