// WARN Needs binding for states so that it can change and everything is modified.
class EclairForEach extends EclairComponent {
    constructor(state, objectFunction) {
        super("foreach")
        
        this.state = null
        this.objectFunction = objectFunction;
        
        if (state instanceof EclairState) {
            this.state = state
        } else if (state instanceof Array) {
            this.state = eclair.State(state)
        }
    }
    
    build() {
        let objectHTML = "<span>"
        for (let i = 0; i < this.state.length(); i++) {
            objectHTML += this.objectFunction(this.state.get(i)).compile()
        }
        
        return objectHTML + "</span>"
    }
}