/// TITLE Eclair Image
/// EXTENDS elements.custom-tag:EclairCustomTagComponent
/// DESC An eclair image element.

Eclair.Image = function(_value) {
    return new EclairImage(_value);
}

/// SHARED-STYLE Eclair.styles.Image: Default Image style.
Eclair.styles.Image = Eclair.Style("eclair-style-image")
    .display("block")

/// ```javascript
/// Eclair.Image('image.png')
/// ```
class EclairImage extends EclairCustomTagComponent {
    
    /// METHOD constructor
    /// DESC Construct an Eclair Image element with a predefined url.
    /// ARG src: URL of the image.
    /// ```javascript
    /// Eclair.Image('image.png')
    /// ```
    constructor(src) {
        super("img")
        
        // Set the attribute with the image source.
        this.bindState(src, "src", value => {
            this.setAttr("src", value)
        })  
        
        // Add a default style for images
        this.addStyle(Eclair.styles.Image)
    }
            
    /// METHOD .altText
    /// DESC Set alt text of the image for accessibility.
    /// ARG alt: Alt text of the image.
    /// ```javascript
    /// Eclair.Image('image.png')
    ///     .altText('An image of a goldfish jumping on a trampoline.')
    /// ```
    altText(alt) {
        this.bindState(alt, "alt", value => {
            this.setAttr("alt", value)
        })  
    }
}
