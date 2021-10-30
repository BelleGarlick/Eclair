/// TITLE Eclair Form Box
/// EXTENDS elements.layout.view:EclairView
/// DESC A form element for eclair objects. This object extends the EclairView object allowing dynamic creation of elements within the view.

Eclair.Form = function(elements) {
    return new EclairForm(elements);
}

/// SHARED-STYLE Eclair.styles.Form: Default form style.
Eclair.styles.Form = Eclair.Style("eclair-style-form")
    .boxSizing("border-box")

/// ```javascript
/// Eclair.Form([
///     Eclair.TextBox("")
///         .name("Username"),
///     Eclair.TextBox("")
///         .name("name"),
///     Eclair.Button("Submit")
///         .type("submit")
/// ])
///     .action("/new-user/")
///     .method("POST")
/// ```
class EclairForm extends EclairView {
    
    /// METHOD constructor
    /// DESC Construct the form object with given elements.
    /// ARG elements: List of items contained within the form.
    /// ARG objectFunc: A function applied to each object. __(See Eclair.layout.view)__
    /// ```javascript
    /// Eclair.Form([
    ///     Eclair.TextBox("")
    ///         .name("username"),
    ///     Eclair.Checkbox(false)
    ///         .name("over-18")
    /// ])
    /// ```
    constructor(elements, objectFunc) {
        super(elements, objectFunc)
        
        // View element has this varible which by default is set to 'div'
        // so that the built object is a div. Here we override it so that
        // the element is a form.
        this._elementTag = "form"
        
        this.addStyle(Eclair.styles.Form)
            .removeStyle(Eclair.styles.View)
            .setAttr("method", "POST")
            .setAttr("action", null)
    }
    
    /// METHOD .method
    /// DESC Set the new method for the form.
    /// ARG value: Method value.
    /// ```javascript
    /// Eclair.Form([...])
    ///     .method("POST")
    /// ```
    method(value) {
        this.bindState(value, "method", m => {
            this.setAttr("method", m)
        })
        return this;
    }
    
    /// METHOD .action
    /// DESC Set the new action for the form.
    /// ARG value: Action value.
    /// ```javascript
    /// Eclair.Form([...])
    ///     .action("/new-user/")
    /// ```
    action(_action) {
        this.bindState(_action, "action", value => {
            this.setAttr("action", value)
        })
        return this;
    }
    
    /// METHOD .submit
    /// DESC Alternative method to submitting a form which allows you to bind a state bool to the form such that when the bool becomes true the form will be submitted. 
    /// ARG state: Bound state.
    /// let submitted = Ø(false)
    /// Eclair.Form([
    ///     Eclair.TextBox("")
    ///         .name("Username"),
    ///     Eclair.Button()
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
