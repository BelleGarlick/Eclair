eclair.styles = {
    View: eclair.Style()
        .boxSizing("border-box"),
    VStack: eclair.Style()
        .boxSizing("border-box"),
    HStack: eclair.Style()
        .boxSizing("border-box"),
    TabView: eclair.Style()
        .display("flex")
        .boxSizing("border-box")
        .alignItems("center"),
    
    Text: eclair.Style()
        .font(eclair.theme.font),
    
    IFrame: eclair.Style()
        .borderColor("#333333")
        .borderSize("1px")
        .width("100%")
        .height("100%"),
    
    Button: eclair.Style()
        .borderSize("0px")
        .borderRadius("2px")
        .padding("8px 16px")
        .background("#eeeeee")
        .font(eclair.theme.font)
        .background("#dddddd", "hover")
        .background("#cccccc", "active"),
    
    Select: eclair.Style()
        .borderSize("0px")
        .borderRadius("2px")
        .padding("8px 16px")
        .background("#eeeeee")
        .font(eclair.theme.font)
        .background("#dddddd", "hover")
        .background("#cccccc", "active"),
    
    Slider: eclair.Style()
        .transition("0.2s all")
        .css("-webkit-appearance: none; box-sizing: border-box; outline: none;")
        .css("-webkit-appearance: none; appearance: none;", ":-webkit-slider-thumb")
        .css("-webkit-appearance: none; appearance: none;", ":-moz-slider-thumb")
        .cursor("pointer", ":-webkit-slider-thumb")
        .cursor("pointer", ":-moz-slider-thumb")
        .background("#d3d3d3")
        .background(eclair.theme.accent, ":-webkit-slider-thumb")
        .background(eclair.theme.accent, ":-moz-slider-thumb")
        .borderRadius("50%", ":-webkit-slider-thumb")
        .borderRadius("50%", ":-moz-slider-thumb")
        .height("25px", ":-webkit-slider-thumb")
        .height("25px", ":-moz-slider-thumb")
        .width("25px", ":-webkit-slider-thumb")
        .width("25px", ":-moz-slider-thumb")
        .width("100%")
        .height("15px")
        .borderRadius("5px")
        .opacity(0.7)
        .opacity(1, "hover"),
    
    Link: eclair.Style()
        .font(eclair.theme.font)   
        .fontColor(eclair.theme.accent)
        .textDecoration("none")
        .textDecoration("underline", "hover"),
    
    Image: eclair.Style()
        .display("block"),
    
    TextBox: eclair.Style()
        .fontSize("14px")
        .padding("12px 16px")
        .width("100%")
        .borderSize("0px")
        .borderRadius("3px")
        .background("#eeeeee")
        .font(eclair.theme.font)
        .background("#dddddd", "hover")
        .background("#cccccc", "active")
        .background("#bbbbbb", "focused"),
    TextArea: eclair.Style(),
    
    HorizontalLine: eclair.Style()
        .borderSize("0px")
        .width("100%")
        .css("border-top: 1px solid #999999"),
    
    RadioButtons: eclair.Style(),  // No default style
    RadioButtonsItem: eclair.Style()
        .cursor("pointer")
        .boxShadow("0px 0px 0px 100px rgba(0, 0, 0, 0.05) inset", "hover")
        .padding("2px")
        .borderRadius("4px")
        .width("100%")
        .userSelect("none")
        .font(eclair.theme.font),
    RadioButtonsSelectedItem: eclair.Style()
        .cursor("pointer")
        .boxShadow("0px 0px 0px 100px rgba(0, 0, 0, 0.05) inset", "hover")
        .padding("2px")
        .borderRadius("4px")
        .userSelect("none")
        .width("100%")
        .font(eclair.theme.font),
    RadioButtonsRadio: eclair.Style()
        .width("14px")
        .height("14px")
        .userSelect("none")
        .borderSize("2px")
        .borderStyle("solid")
        .borderColor(eclair.theme.accent)
        .borderRadius("100%"),
    RadioButtonsSelectedRadio: eclair.Style()
        .width("14px")
        .height("14px")
        .userSelect("none")
        .borderSize("2px")
        .borderStyle("solid")
        .borderColor(eclair.theme.accent)
        .borderRadius("100%")
        .background(eclair.theme.accent),
    
    CheckBox: eclair.Style()    
        .cursor("pointer")
        .boxShadow("0px 0px 0px 100px rgba(0, 0, 0, 0.05) inset", "hover")
        .padding("2px")
        .borderRadius("4px")
        .width("100%")
        .transition("0.2s all")
        .userSelect("none")
        .font(eclair.theme.font),
    CheckBoxIcon: eclair.Style()
        .borderSize("2px")
        .borderRadius("4px")
        .borderColor(eclair.theme.accent)
        .borderStyle("solid")
        .width("16px")
        .height("16px")
        .fontSize("0.85rem")
        .userSelect("none")
        .textAlign("center"),        
    CheckBoxActiveIcon: eclair.Style()
        .borderSize("2px")
        .borderRadius("4px")
        .borderColor(eclair.theme.accent)
        .borderStyle("solid")
        .width("16px")
        .height("16px")
        .userSelect("none")
        .background(eclair.theme.accent)
        .fontColor("white")
        .fontSize("0.85rem")
        .textAlign("center"),
    CheckBoxLabel: eclair.Style(),
    
    ProgressBar: eclair.Style()
        .background("#d3d3d3")
        .borderRadius("3px")
        .height("16px")
        .userSelect("none")
        .overflow("hidden"),
    ProgressBarIndicator: eclair.Style()
        .display("flex")
        .flexDirection("row")
        .alignItems("center")
        .background(eclair.theme.accent)
        .height("100%")
        .transition("0.3s all")
        .userSelect("none")
        .margin("0px auto 0px 0px"),
    ProgressBarLabel: eclair.Style()
        .fontColor("white")
        .fontWeight(700)
        .userSelect("none")
        .fontSize("11px"),
    
    Toggle: eclair.Style()    
        .display("flex")
        .flexDirection("row")
        .alignItems("center")
        .position("relative")
        .width("50px")
        .background("#dddddd")
        .padding("3px")
        .cursor("pointer")
        .userSelect("none")
        .borderRadius("20px")
        .transition("0.2s all")
        .boxSizing("border-box"),
    ToggleKnob: eclair.Style()
        .height("14px")
        .width("14px")
        .background("#ffffff")
        .transform("translateX(0%)")
        .transition("0.2s all")
        .userSelect("none")
        .borderRadius("20px"),
    ToggleTick: eclair.Style()
        .position("absolute")
        .fontColor("#ffffff")
        .left("35%")
        .transition("0.2s all")
        .transform("translateX(-50%)")
        .fontWeight(700)
        .userSelect("none")
        .opacity(0),
    
    AlertBox: eclair.Style()
        .background(eclair.theme.accent)
        .boxSizing("border-box")
        .borderRadius(".25rem")
        .padding(".75rem 1.25rem")
        .boxShadow("0px 0px 0px 2px rgba(0, 0, 0, 0.2) inset")
        .borderSize("1px 0px 0px 0px", " hr")
        .margin(".75rem 0px", " hr")
        .borderColor("rgba(0, 0, 0, 0.2)", " hr"),
    AlertBoxTitle: eclair.Style()
        .fontWeight(500)
        .fontSize("1.5rem")
        .display("none")
        .fontColor("rgba(0, 0, 0, 0.6)")
        .width("100%")
        .marginBottom(".5rem"),
    AlertBoxText: eclair.Style()
        .fontColor("rgba(0, 0, 0, 0.6)"),
}