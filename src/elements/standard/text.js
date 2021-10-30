/// TITLE Eclair Text
/// EXTENDS elements.component:EclairComponent
/// DESC Create a eclair text object.

Eclair.Text = function(text) {
    return new EclairText(text);
}

/// SHARED-STYLE Eclair.styles.Text: Default text style.
/// SHARED-STYLE Eclair.styles.TextTitleStyle: Modifiable text style which can be given to a text object using .type('title').
/// SHARED-STYLE Eclair.styles.TextSubtitleStyle: Modifiable text style which can be given to a text object using .type('subtitle').
/// SHARED-STYLE Eclair.styles.TextHeading1Style: Modifiable text style which can be given to a text object using .type('heading1').
/// SHARED-STYLE Eclair.styles.TextHeading2Style: Modifiable text style which can be given to a text object using .type('heading2').
/// SHARED-STYLE Eclair.styles.TextHeading3Style: Modifiable text style which can be given to a text object using .type('heading3').
/// SHARED-STYLE Eclair.styles.TextHeading4Style: Modifiable text style which can be given to a text object using .type('heading4').
Eclair.styles.Text = Eclair.Style("eclair-style-text")
    .font(Eclair.theme.font)
Eclair.styles.TextTitleStyle = Eclair.Style("eclair-style-text-title")
    .fontSize("40px")
    .fontWeight(700)
Eclair.styles.TextSubtitleStyle = Eclair.Style("eclair-style-text-subtitle")
    .fontSize("25px")
Eclair.styles.TextHeading1Style = Eclair.Style("eclair-style-text-heading1")
    .fontSize("30px")
    .fontWeight(700)
Eclair.styles.TextHeading2Style = Eclair.Style("eclair-style-text-heading2")
    .fontSize("25px")
    .fontWeight(700)
Eclair.styles.TextHeading3Style = Eclair.Style("eclair-style-text-heading3")
    .fontSize("20px")
    .fontWeight(700)
Eclair.styles.TextHeading4Style = Eclair.Style("eclair-style-text-heading4")
    .fontSize("15px")
    .fontWeight(700)

/// ```javascript
/// Eclair.Text('Welcome')
///     .type("title")
/// ```
class EclairText extends EclairComponent {
    
    /// METHOD constructor
    /// DESC Construct an Eclair text element with a predefined value.
    /// ARG text: Text contained in the element.
    /// ```javascript
    /// Eclair.Text('Hello World')
    /// ```
    constructor(text) {
        super()
        
        this.bindState(text, "text", value => {
            this._text = value;
            this.getElement(elem => {elem.innerHTML = value});
        })  
        
        this.addStyle(Eclair.styles.Text)
    }
        
    /// METHOD .type
    /// DESC Set the type of text this is to a predefined style from the list of following: `title, subtitle, heading1, heading2, heading3, heading 4`. 
    /// ARG value: Predefined style.
    /// ```javascript
    /// Eclair.Text('Welcome')
    ///     .type("subtitle")
    /// ```
    type(state) {
        this.bindState(state, "type", newType => {
            // Possible text styles to remove
            let textStyles = [
                Eclair.styles.TextTitleStyle, Eclair.styles.TextSubtitleStyle, Eclair.styles.TextHeading1Style, 
                Eclair.styles.TextHeading2Style, Eclair.styles.TextHeading3Style, Eclair.styles.TextHeading4Style
            ]
            
            // Possible text styles to add
            let typeStyles = {
                "title": Eclair.styles.TextTitleStyle,
                "subtitle": Eclair.styles.TextSubtitleStyle,
                "heading1": Eclair.styles.TextHeading1Style,
                "heading2": Eclair.styles.TextHeading2Style,
                "heading3": Eclair.styles.TextHeading3Style,
                "heading4": Eclair.styles.TextHeading4Style
            }
            
            // Remove any current style
            for (let t = 0; t < textStyles.length; t++) {
                this.removeStyle(textStyles[t])
            }
            
            // Add new style
            if (typeStyles.hasOwnProperty(newType)) {
                this.addStyle(typeStyles[newType])
            }
        })  
        
        return this
    }
    
    // No doc listed as this is standard eclair object
    build() {
        return `<span>${this._text}</span>`
    }
}
