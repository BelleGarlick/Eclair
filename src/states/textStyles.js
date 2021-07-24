class EclairTextStyleState extends EclairState {
    title() {this.value("title"); return this;}
    subtitle() {this.value("subtitle"); return this;}
    heading1() {this.value("heading1"); return this;}
    heading2() {this.value("heading2"); return this;}
    heading3() {this.value("heading3"); return this;}
    heading4() {this.value("heading4"); return this;}
}



//    /
//    / Alternatively, you can use an EclairTextStyleState to do this. The EclairTextStyleState is like any other state, if you update the EclairTextStyleState, all elements using that State will be updated.
//    / ```javascript
//    / let style = eclair.TextStyle().heading2()
//    /
//    / eclair.VBox([
//    /     eclair.Text('Hello').type(style),
//    /     eclair.Text('Welcome').type(style),
//    /     Button("Change "),
//    / ]).write()
//    / 
//    / ```