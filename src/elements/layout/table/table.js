
class EclairTable extends EclairView {
    constructor(elements, objectFunc) {
        super(elements, objectFunc)
        
        this._elementTag = "table"
    }
}

class EclairTableRow extends EclairView {
    constructor(elements, objectFunc) {
        super(elements, objectFunc)
        
        this._elementTag = "tr"
    }
}

class EclairTableCell extends EclairView {
    constructor(elements, objectFunc) {
        super(elements, objectFunc)
        
        this._elementTag = "td"
    }
}