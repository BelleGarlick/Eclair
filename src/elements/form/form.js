/// ## Eclair Form Element
/// A form element for eclair objects. This object extends the EclairView object 
/// allowing dynamic creation of elements within the view.
/// <br/>**args**:
/// - elements: Elements within the view.
/// - objectFunction: A function which returns the constructed object.
/// ```javascript
/// eclair.Form([
///     eclair.TextBox("")
///         .name("Username"),
///     eclair.TextBox("")
///         .name("name"),
///     eclair.Button("Submit")
///         .type("submit")
/// ])
///     .action("/new-user/")
///     .method("POST")
/// ```
class EclairForm extends EclairView {
    constructor(elements, objectFunc) {
        super(elements, objectFunc)
        
        // View element has this varible which by default is set to 'div'
        // so that the built object is a div. Here we override it so that
        // the element is a form.
        this._elementTag = "form"
        
        this.addStyle(eclair.styles.Form)
            .removeStyle(eclair.styles.View)
            .setAttr("method", "POST")
            .setAttr("action", null)
    }
    
    /// ### .method
    /// Set the method of the form.
    /// <br/>**args**:
    /// - _method: Set the new method of the form.
    /// ```javascript
    /// eclair.Form([
    ///     eclair.TextBox("")
    ///         .name("Username")
    /// ])
    ///     .method("POST")
    /// ```
    method(_method) {
        this.bindState(_method, "method", value => {
            this.setAttr("method", value)
        })
        return this;
    }
    
    /// ### .action
    /// Set the action of the form.
    /// <br/>**args**:
    /// - _action: Set the new action of the form.
    /// ```javascript
    /// eclair.Form([
    ///     eclair.TextBox("")
    ///         .name("Username")
    /// ])
    ///     .action("/new-user/")
    /// ```
    action(_action) {
        this.bindState(_action, "action", value => {
            this.setAttr("action", value)
        })
        return this;
    }
    
    /// ### .submit
    /// Bind a state bool to the form such that when the bool becomes true
    /// the form will be submitted.
    /// <br/>**args**:
    /// - state: The state to bind to.
    /// ```javascript
    /// let submitted = Ø(false)
    /// eclair.Form([
    ///     eclair.TextBox("")
    ///         .name("Username"),
    ///     eclair.Button()
    ///         .onClick(_ => {
    ///             submitted.value(true)
    ///         })
    /// ])
    ///     .submit(submitted)
    /// ```
    submit(state) {
        this.bindState(state, "submit", value => {
            this.getElement(e => {
                e.submit();
            })
        }, state => {return state.bool()})
    }
}
