class EclairAlignmentState extends EclairState {
    constructor() {
        super("center")
    }
    
    start() {this.value("start"); return this;}
    center() {this.value("center"); return this;}
    end() {this.value("end"); return this;}
}
