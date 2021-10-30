/// TITLE Eclair POST Request
/// EXTENDS functional.requests.request:EclairHTTPRequest
/// DESC Create a POST HTTP request.

Eclair.post = function(_url) {
    return new EclairPost(_url);
}

/// ```javascript
/// Eclair.post("/new-username/")
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
        
    /// METHOD constructor
    /// DESC Construct an POST object.
    /// ARG url: Endpoint url to POST the request to.
    /// ```javascript
    /// Eclair.post("/new-username/")
    /// ```
    constructor(url) {
        super(url, "POST")
    }
}
