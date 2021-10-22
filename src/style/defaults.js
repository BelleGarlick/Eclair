eclair.styles = {
    View: eclair.Style("eclair-style-view")
        .boxSizing("border-box"),
    
    VStack: eclair.Style("eclair-style-vstack")
        .boxSizing("border-box")
        .display("flex")
        .flexDirection("column")
        .alignItems("center")
        .justifyContent("space-around"),
    
    HStack: eclair.Style("eclair-style-hstack")
        .boxSizing("border-box")
        .display("flex")
        .flexDirection("row")
        .alignItems("center")
        .justifyContent("space-around"),
    
    Form: eclair.Style("eclair-style-form")
        .boxSizing("border-box"),
    
    TabView: eclair.Style("eclair-style-tab-view")
        .display("flex")
        .boxSizing("border-box")
        .alignItems("center"),
    
    Text: eclair.Style("eclair-style-text")
        .font(eclair.theme.font),
    
    IFrame: eclair.Style("eclair-style-iframe")
        .borderColor("#333333")
        .borderSize("1px")
        .width("100%")
        .height("100%"),
    
    Button: eclair.Style("eclair-style-button")
        .borderSize("0px")
        .borderRadius("2px")
        .padding("8px 16px")
        .background("#eeeeee")
        .font(eclair.theme.font)
        .background("#dddddd", "hover")
        .background("#cccccc", "active"),
    
    Select: eclair.Style("eclair-style-select")
        .borderSize("0px")
        .borderRadius("2px")
        .padding("8px 16px")
        .background("#eeeeee")
        .font(eclair.theme.font)
        .background("#dddddd", "hover")
        .background("#cccccc", "active"),
    
    Slider: eclair.Style("eclair-style-slider")
        .transition("0.2s all")
        .css("-webkit-appearance: none; box-sizing: border-box; outline: none;")
        .appearance("none", ":-webkit-slider-thumb")
        .appearance("none", ":-moz-slider-thumb")
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
    
    Link: eclair.Style("eclair-style-link")
        .font(eclair.theme.font)   
        .fontColor(eclair.theme.accent)
        .textDecoration("none")
        .textDecoration("underline", "hover"),
    
    Image: eclair.Style("eclair-style-image")
        .display("block"),
    
    TextBox: eclair.Style("eclair-style-text-box")
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
    
    TextArea: eclair.Style("eclair-style-text-area"),
    
    HorizontalLine: eclair.Style("eclair-style-horz-line")
        .borderSize("0px")
        .width("100%")
        .css("border-top: 1px solid #999999"),
    
    RadioButtons: eclair.Style("eclair-style-radio-button"), 
    RadioButtonsItem: eclair.Style("eclair-style-radio-buttons-item")
        .cursor("pointer")
        .boxShadow("0px 0px 0px 1000px rgba(0, 0, 0, 0.05) inset", "hover")
        .padding("12px")
        .borderRadius("4px")
        .width("100%")
        .userSelect("none")
        .justifyContent("flex-start")
        .gap("12px")
        .font(eclair.theme.font),
    RadioButtonsSelectedItem: eclair.Style("eclair-style-radio-buttons-selected-item"),
    RadioButtonsRadio: eclair.Style("eclair-style-radio-buttons-dot")
        .width("14px")
        .height("14px")
        .userSelect("none")
        .borderSize("2px")
        .borderStyle("solid")
        .borderColor(eclair.theme.accent)
        .borderRadius("100%"),
    RadioButtonsSelectedRadio: eclair.Style("eclair-style-radio-buttons-selected-dot")
        .background(eclair.theme.accent),
    RadioButtonsLabel: eclair.Style("eclair-style-label"),
    RadioButtonsSelectedLabel: eclair.Style("eclair-style-radio-buttons-selected-label"),
    
    CheckBox: eclair.Style("eclair-style-checkbox")    
        .cursor("pointer")
        .boxShadow("0px 0px 0px 100px rgba(0, 0, 0, 0.05) inset", "hover")
        .padding("2px")
        .borderRadius("4px")
        .width("100%")
        .transition("0.2s all")
        .userSelect("none")
        .font(eclair.theme.font),
    CheckBoxIcon: eclair.Style("eclair-style-checkbox-icon")
        .borderSize("2px")
        .borderRadius("4px")
        .borderColor(eclair.theme.accent)
        .borderStyle("solid")
        .width("16px")
        .height("16px")
        .fontSize("0.85rem")
        .userSelect("none")
        .textAlign("center"),        
    CheckBoxActiveIcon: eclair.Style("eclair-style-checkbox-active-icon")
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
    CheckBoxLabel: eclair.Style("eclair-style-checkbox-label"),
    
    ProgressBar: eclair.Style("eclair-style-progress-bar")
        .background("#d3d3d3")
        .borderRadius("3px")
        .height("16px")
        .userSelect("none")
        .overflow("hidden"),
    ProgressBarIndicator: eclair.Style("eclair-style-progress-bar")
        .display("flex")
        .flexDirection("row")
        .alignItems("center")
        .background(eclair.theme.accent)
        .height("100%")
        .transition("0.3s all")
        .userSelect("none")
        .margin("0px auto 0px 0px"),
    ProgressBarLabel: eclair.Style("eclair-style-progress-bar-label")
        .fontColor("white")
        .fontWeight(700)
        .userSelect("none")
        .fontSize("11px"),
    
    Toggle: eclair.Style("eclair-style-toggle")    
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
    ToggleKnob: eclair.Style("eclair-style-toggle-knob")
        .height("14px")
        .width("14px")
        .background("#ffffff")
        .transform("translateX(0%)")
        .transition("0.2s all")
        .userSelect("none")
        .borderRadius("20px"),
    ToggleTick: eclair.Style("eclair-style-toggle-tick")
        .position("absolute")
        .fontColor("#ffffff")
        .left("35%")
        .transition("0.2s all")
        .transform("translateX(-50%)")
        .fontWeight(700)
        .userSelect("none")
        .opacity(0),
    
    AlertBox: eclair.Style("eclair-style-alert-box")
        .background(eclair.theme.accent)
        .boxSizing("border-box")
        .borderRadius(".25rem")
        .padding(".75rem 1.25rem")
        .boxShadow("0px 0px 0px 2px rgba(0, 0, 0, 0.2) inset")
        .borderSize("1px 0px 0px 0px", " hr")
        .margin(".75rem 0px", " hr")
        .borderColor("rgba(0, 0, 0, 0.2)", " hr"),
    AlertBoxTitle: eclair.Style("eclair-style-alert-title")
        .fontWeight(500)
        .fontSize("1.5rem")
        .display("none")
        .fontColor("rgba(0, 0, 0, 0.6)")
        .width("100%")
        .marginBottom(".5rem"),
    AlertBoxText: eclair.Style("eclair-style-alert-text")
        .fontColor("rgba(0, 0, 0, 0.6)"),
}