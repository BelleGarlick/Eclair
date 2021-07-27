/// ## Eclair Image
/// An eclair image element.
/// ```javascript
/// eclair.Image('image.png')
/// ```
class EclairImage extends EclairCustomTagComponent {
    constructor(_src) {
        super("img")
        
        // Set the attribute with the image source.
        this.bindState(_src, "src", value => {
            this.setAttr("src", value)
        })  
        
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
        this.bindState(_alt, "alt", value => {
            this.setAttr("alt", value)
        })  
    }
}