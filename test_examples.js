examples = {
    "toggle_switch": `// Toggle Switch
let toggleOn = Ø(true)
let toggleTick = Ø(false)
let toggleEnabled = Ø(true)

Eclair.VStack([
    // Attach states to toggle
    Eclair.VStack([
        Eclair.Toggle(toggleOn)
            .showTick(toggleTick)
            .enabled(toggleEnabled)
    ]).width("100%"),

    Eclair.HorizontalLine(),

    // Tick mark toggle
    Eclair.Text("Tick Mark"),
    Eclair.Toggle(toggleTick),

    // Toggle toggle
    Eclair.Text("Toggle"),
    Eclair.Toggle(true)
        .onChange(e => {toggleOn.toggle()}),

    // Toggle enabled
    Eclair.Text("Enabled"),
    Eclair.Toggle(toggleEnabled)
])
    .alignment(Eclair.Alignment().start())
    .gap("8px")
    .write()
    `,
    
    "progress_bar": `// Progress bar code
let progressValue = Ø(0.5)
let showProgressState = Ø(false)
let progressBarStripped = Ø(false)
let progressBarColor = Eclair.Color()

Eclair.VStack([
    Eclair.ProgressBar(progressValue)
        .striped(progressBarStripped)
        .color(progressBarColor)
        .showLabel(showProgressState)
        .width("100%"),

    Eclair.HorizontalLine(),

    Eclair.Text("Progress"),
    Eclair.Slider(progressValue)
        .min(0).max(1).step(0.01)
        .width("100%"),

    Eclair.Text("Striped"),
    Eclair.Toggle(progressBarStripped),

    Eclair.Text("Show Label"),
    Eclair.Toggle(showProgressState)
])
    .alignment(Eclair.Alignment().start())
    .gap("8px")
    .write()
    `,
    
    "alert_box": `// Alert Box
let alertBoxTitle = Ø("Alert Box")
let alertBoxText = Ø("You're learning Eclair")
let alertBoxTheme = Eclair.Color().success()
let selectedAlertBoxColour = Ø()

Eclair.VStack([
    Eclair.Alert(alertBoxText)
        .title(alertBoxTitle)
        .theme(alertBoxTheme)
        .width("100%")
        .boxSizing("border-box"),

    Eclair.HorizontalLine(),

    Eclair.Text("Title"),
    Eclair.TextBox(alertBoxTitle)
        .placeholder("Title..."),

    Eclair.Text("Message"),
    Eclair.TextBox(alertBoxText).placeholder("Message..."),

    Eclair.Text("Line breaker"),
    Eclair.Button("Add line break").onClick(c => {
        alertBoxText.value(alertBoxText.value() + "<hr/>A new line break can be added by typing &lt;hr/&gt;.")
    }),

    Eclair.Text("Preset"),
    Eclair.Select(["Success", "Danger", "Warning", "Info", "Light", "Dark"])
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
    .alignment(Eclair.Alignment().start())
    .gap("8px")
    .write()
    `,
    
    "check_box": `// Check Box
let checkboxText = Ø("Accept Cookies?")
let checkBoxState = Ø(false)
let checkboxEnabled = Ø(true)

Eclair.VStack([
    Eclair.CheckBox(checkBoxState)
        .text(checkboxText)
        .enabled(checkboxEnabled),

    Eclair.HorizontalLine(),

    Eclair.TextBox(checkboxText),
    Eclair.TextBox(checkBoxState),
             
    Eclair.Text("Enabled"),
    Eclair.Toggle(checkboxEnabled)
])
    .alignment(Eclair.Alignment().start())
    .gap("8px")
    .write()
    `
}