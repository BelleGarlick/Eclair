examples = {
    "toggle_switch": `// Toggle Switch
let toggleOn = Ø(true)
let toggleTick = Ø(false)
let toggleEnabled = Ø(true)

eclair.VStack([
    // Attach states to toggle
    eclair.VStack([
        eclair.Toggle(toggleOn)
            .showTick(toggleTick)
            .enabled(toggleEnabled)
    ]).width("100%"),

    eclair.HorizontalLine(),

    // Tick mark toggle
    eclair.Text("Tick Mark"),
    eclair.Toggle(toggleTick),

    // Toggle toggle
    eclair.Text("Toggle"),
    eclair.Toggle(true)
        .onChange(e => {toggleOn.toggle()}),

    // Toggle enabled
    eclair.Text("Enabled"),
    eclair.Toggle(toggleEnabled)
])
    .alignment(eclair.Alignment().start())
    .gap("8px")
    .write()
    `,
    
    "progress_bar": `// Progress bar code
let progressValue = Ø(0.5)
let showProgressState = Ø(false)
let progressBarStripped = Ø(false)
let progressBarColor = eclair.Color()

eclair.VStack([
    eclair.ProgressBar(progressValue)
        .striped(progressBarStripped)
        .color(progressBarColor)
        .showLabel(showProgressState)
        .width("100%"),

    eclair.HorizontalLine(),

    eclair.Text("Progress"),
    eclair.Slider(progressValue)
        .min(0).max(1).step(0.01)
        .width("100%"),

    eclair.Text("Striped"),
    eclair.Toggle(progressBarStripped),

    eclair.Text("Show Label"),
    eclair.Toggle(showProgressState)
])
    .alignment(eclair.Alignment().start())
    .gap("8px")
    .write()
    `,
    
    "alert_box": `// Alert Box
let alertBoxTitle = Ø("Alert Box")
let alertBoxText = Ø("You're learning Eclair")
let alertBoxTheme = eclair.Color().success()
let selectedAlertBoxColour = Ø()

eclair.VStack([
    eclair.Alert(alertBoxText)
        .title(alertBoxTitle)
        .theme(alertBoxTheme)
        .width("100%")
        .boxSizing("border-box"),

    eclair.HorizontalLine(),

    eclair.Text("Title"),
    eclair.TextBox(alertBoxTitle)
        .placeholder("Title..."),

    eclair.Text("Message"),
    eclair.TextBox(alertBoxText).placeholder("Message..."),

    eclair.Text("Line breaker"),
    eclair.Button("Add line break").onClick(c => {
        alertBoxText.value(alertBoxText.value() + "<hr/>A new line break can be added by typing &lt;hr/&gt;.")
    }),

    eclair.Text("Preset"),
    eclair.Select(["Success", "Danger", "Warning", "Info", "Light", "Dark"])
        .value(selectedAlertBoxColour)
        .onChange(s => {
            if (selectedAlertBoxColour.value() == "Success") {alertBoxTheme.success()}
            if (selectedAlertBoxColour.value() == "Danger") {alertBoxTheme.danger()}
            if (selectedAlertBoxColour.value() == "Warning") {alertBoxTheme.warning()}
            if (selectedAlertBoxColour.value() == "Info") {alertBoxTheme.info()}
            if (selectedAlertBoxColour.value() == "Light") {alertBoxTheme.light()}
            if (selectedAlertBoxColour.value() == "Dark") {alertBoxTheme.dark()}
        })
])
    .alignment(eclair.Alignment().start())
    .gap("8px")
    .write()
    `,
    
    "check_box": `// Check Box
let checkboxText = Ø("Accept Cookies?")
let checkBoxState = Ø(false)
let checkboxEnabled = Ø(true)

eclair.VStack([
    eclair.CheckBox(checkBoxState)
        .text(checkboxText)
        .enabled(checkboxEnabled),

    eclair.HorizontalLine(),

    eclair.TextBox(checkboxText),
    eclair.TextBox(checkBoxState),
             
    eclair.Text("Enabled"),
    eclair.Toggle(checkboxEnabled)
])
    .alignment(eclair.Alignment().start())
    .gap("8px")
    .write()
    `
}