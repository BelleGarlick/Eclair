class EclairView extends EclairComponent {
    constructor(elements) {
        super()
        this.elements = elements;
    }
    
    build () {                
        let code = ""
        for (let e = 0; e < this.elements.length; e++) {
             code += this.elements[e].build();
        }
        
        return this.wrapHTML(`<div>` + code + "</div>");
    }
}

class EclairScrollView extends EclairComponent {
    constructor(elements) {
        super()
        this.elements = elements;
        this.overflow("auto")
        this.width("100%")
        this.height("100%")
    }
    
    build () {
        let code = ""
        for (let e = 0; e < this.elements.length; e++) {
             code += this.elements[e].build();
        }
        return this.wrapHTML("<div>" + code + "</div>");
    }
}

class EclairVBox extends EclairComponent {
    constructor(elements) {
        super()
        
        this._spacing = 0
        this.elements = elements;
        this.getStyleSheet()["table-layout"] = "fixed"
        this.getStyleSheet()["max-width"] = "100%"
        this.setAttr("border", 0)
            .setAttr("cellspacing", 0)
            .setAttr("cellpadding", 0)
            .textAlign("center")
            .margin("0px auto")
            .width("100%")
    }
    
    spacing(space) {
        this._spacing = space;
        return this;
    }
    
    align(_align) {
        this.textAlign(_align)
        return this
    }
    
    build () {
        let code = "<table>"
        for (let e = 0; e < this.elements.length; e++) {
            if (e > 0 && this._spacing > 0) {
                code += "<tr><td style='height:"+ this._spacing +"px'></td></tr>"
            }
            code += "<tr><td>" + this.elements[e].build() + "</td></tr>";
        }
        return this.wrapHTML(code + "</table>");
    }
}

class EclairHBox extends EclairComponent {
    constructor(elements) {
        super()
        
        this._spacing = 0
        this.elements = elements;
        this.getStyleSheet()["table-layout"] = "fixed"
        this.setAttr("border", 0)
        this.setAttr("cellspacing", 0)
        this.setAttr("cellpadding", 0)
        this.textAlign("center")
        this.width("100%")
            .margin("0px auto")
    }
    
    spacing(space) {
        this._spacing = space;
        return this;
    }
    
    build () {
        let code = "<table>"
        for (let e = 0; e < this.elements.length; e++) {
            if (e > 0 && this._spacing > 0) {
                code += "<td style='width:"+ this._spacing +"px'></td>"
            }
            code += "<td>" + this.elements[e].build() + "</td>";
        }
        return this.wrapHTML(code + "</table>");
    }
}