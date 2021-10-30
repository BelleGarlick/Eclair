/// TITLE Eclair GET Request
/// EXTENDS functional.requests.request:EclairHTTPRequest
/// DESC Create a GET HTTP request.

Eclair.get = function(_url) {
    return new EclairGet(_url);
}

/// ```javascript
/// Eclair.get("/get-user/")
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
            
    /// METHOD constructor
    /// DESC Construct an GET object.
    /// ARG url: Endpoint url to GET the request to.
    /// ```javascript
    /// Eclair.get("/get-user/")
    /// ```
    constructor(url) {
        super(url, "GET")
    }
}
