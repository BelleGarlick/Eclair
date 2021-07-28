class EclairSlider extends EclairCustomTagComponent {
    constructor(progressValue) {
        super("input")
        
        let overrideOnInput = null;
        
        this.setAttr("type", "range")
        this.addStyle(eclair.styles.Slider)
        
        let self = this
        this._updateCallback("onInput", e => {
            if (self.overrideOnCreate != null) {
                overrideOnCreate(self)
            }
        })
        
        // Attach slider value to the callback
        this.setAttr("value", progressValue)
        if (progressValue instanceof EclairState) {
            progressValue.addCallback(this.id() + "-value", function(state) {
                self.setAttr("value", state.value())
                self.getElement(elem => {elem.value = state.value()})
            }, true)
           
            this._updateCallback("onInput", e => {
                e.getElement(elem => {progressValue.value(elem.value)})
                
                if (self.overrideOnCreate != null) {
                    overrideOnCreate(self)
                }
            })
        } 
    }
    
    name(_name) {
        this.bindState(_name, "name", value => {
            this.setAttr("name", value)
        })
        return this;
    }
    
    min(_min) {
        this.bindState(_min, "min", value => {
            this.setAttr("min", value);
        }, state => {return state.number()})
        
        return this;
    }
    
    max(_max) {
        this.bindState(_max, "max", value => {
            this.setAttr("max", value);
        }, state => {return state.number()})
        
        return this;
    }
    
    step(_step) {
        this.bindState(_step, "step", value => {
            this.setAttr("step", value);
        }, state => {return state.number()})
        
        return this;
    }
    
    onInput(callback) {
        this.overrideOnInput = callback;
        return this;
    }
}
   