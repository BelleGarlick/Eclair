from jsmin import jsmin

class ScriptBuilder:
    def __init__(self, modules=["*"], uglify=True):
        self.output = ""
        
        self.modules = [m.split(".") for m in modules]
        self.uglify = uglify
        
    def parse(self, breadcrumbs, code):
        valid = False
        for module in self.modules:
            if module[0] == "*":
                valid = True
                
        if valid:
            self.output += code.rstrip()
        
    def save(self, path):
        output = self.output
        
        if self.uglify:
            output = jsmin(output, quote_chars="'\"`")
            
        with open(path, "w+") as file:
            file.write(output)