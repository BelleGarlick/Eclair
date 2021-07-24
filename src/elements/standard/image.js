/// ## Eclair Image
/// An eclair image element.
/// ```javascript
/// eclair.Image('image.png')
/// ```
class EclairImage extends EclairCustomTagComponent {
    constructor(_src) {
        super("img")
        
        // Set the attribute with the image source.
        if (_src instanceof EclairState) {
            let self = this
            _src.addCallback(this.id() + "-src", function(state) {
                self.setAttr("src", state.value())
            }, true)
        } else {
            this.setAttr("src", _src)
        }
        
        // Add a default style for images
        this.addStyle(eclair.styles.Image)
    }
    
    /// ### .altText
    /// Set alt text of the image for accessibility.
    /// ```javascript
    /// eclair.Image('image.png')
    ///     .altText('An image of a goldfish jumping on a trampoline.')
    /// ```
    altText(_alt) {
        if (_alt instanceof EclairState) {
            let self = this
            _alt.addCallback(this.id() + "-alt", function(state) {
                self.setAttr("alt", state.value())
            }, true)
        } else {
            this.setAttr("alt", _alt)
        }
    }
}