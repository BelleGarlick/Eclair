/// TITLE Horizontal Line
/// EXTENDS elements.custom-tag:EclairCustomTagComponent
/// DESC A horizontal line element.

Eclair.HorizontalLine = function() {
    return new EclairHorizontalLine();
}

/// SHARED-STYLE Eclair.styles.HorizontalLine: Default horiztonal line style.
Eclair.styles.HorizontalLine = Eclair.Style("eclair-style-horz-line")
    .borderSize("0px")
    .width("100%")
    .css("border-top: 1px solid #999999")

/// ```javascript
/// Eclair.HorizontalLine()
/// ```
class EclairHorizontalLine extends EclairCustomTagComponent {  
    
    /// METHOD constructor
    /// DESC Construct an Eclair horizontal line element.
    /// ```javascript
    /// Eclair.HorizontalLine()
    /// ```
    constructor() {
        super("hr")        
        this.addStyle(Eclair.styles.HorizontalLine)
    }
}
