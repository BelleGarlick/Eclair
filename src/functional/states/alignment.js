/// TITLE Eclair Alignment State
/// EXTENDS functional.states.state:EclairState
/// DESC This class inherits the functionality of a normal Eclair State, but is designed for alignment and has functions for doing so. 

Eclair.Alignment = function() {
    return new EclairAlignmentState();
}

/// ```javascript
/// Eclair.VStack([...])
///     .alignment(Eclair.Alignment().center())
/// ```
class EclairAlignmentState extends EclairState {
    
    /// METHOD constructor
    /// DESC Construct an Alignment state object which defaults to centered alignment.
    /// ```javascript
    ///     Eclair.Alignment()
    /// ```
    constructor() {
        super("center")
    }
    
    /// METHOD .start
    /// DESC Align items to the start of the flow direction (often the left or top).
    /// ```javascript
    /// Eclair.VStack([...])
    ///     .alignment(Eclair.Alignment().start())
    /// ```
    start() {this.value("start"); return this;}
    
    /// METHOD .center
    /// DESC Align items to the center of the flow direction.
    /// ```javascript
    /// Eclair.VStack([...])
    ///     .alignment(Eclair.Alignment().center())
    /// ```
    center() {this.value("center"); return this;}
    
    /// METHOD .end
    /// DESC Align items to the end of the flow direction (often the right or bottom).
    /// ```javascript
    /// Eclair.VStack([...])
    ///     .alignment(Eclair.Alignment().end())
    /// ```
    end() {this.value("end"); return this;}
}
