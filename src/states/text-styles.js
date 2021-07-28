/// ## EclairTextStyleState
/// Text can have it's theme set using a string, this class allows you to do it programatically, and bind the theme of multiple strings together like a normal eclair state.
/// let style = eclair.TextStyle().heading2()
///
/// eclair.VStack([
///     eclair.Text('Hello').type(style)
///     eclair.Text('Welcome').type(style)
///     Button("Change")
///         .onClick(() => {style.title()})
/// ]).write()
/// 
/// ```
/// Available styles:
/// ```javascript
/// title
/// subtitle
/// heading1
/// heading2
/// heading3
/// heading4
/// ```
class EclairTextStyleState extends EclairState {
    title() {this.value("title"); return this;}
    subtitle() {this.value("subtitle"); return this;}
    heading1() {this.value("heading1"); return this;}
    heading2() {this.value("heading2"); return this;}
    heading3() {this.value("heading3"); return this;}
    heading4() {this.value("heading4"); return this;}
}