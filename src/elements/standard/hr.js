/// ## Eclair Horizontal Line
/// A horizontal line element.
/// ```javascript
/// eclair.HorizontalLine()
/// ```
class EclairHorizontalLine extends EclairCustomTagComponent {
    constructor() {
        super("hr")        
        this.addStyle(eclair.styles.HorizontalLine)
    }
}