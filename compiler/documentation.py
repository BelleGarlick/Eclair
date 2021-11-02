
class DocumentationBuilder:
    def __init__(self, doc_url, src_url):
        self.tree = {}
        
        self.doc_url = doc_url
        self.src_url = src_url
        
    def __parse_source_doc(self, breadcrumbs, documentation):
        shared_data = {
            "extends": None,
            "methods": []
        }
        
        documentation_data = {
            "title": None,
            "extends": None,
            "description": None,
            "shared_styles": [],
            "lines": [],
            "methods": []
        }

        def new_method(method_name):
            return {
                "method": method_name,
                "description": None,
                "args": [],
                "lines": []
            }

        current_method = None
        for line in documentation:
            if current_method is None:
                if line[:5] == "TITLE": documentation_data["title"] = line[6:]
                elif line[:7] == "EXTENDS": 
                    documentation_data["extends"] = line[8:]
                    shared_data["extends"] = line[8:].split(":")[0]
                elif line[:4] == "DESC": documentation_data["description"] = line[5:]
                elif line[:12] == "SHARED-STYLE": documentation_data["shared_styles"].append("\n" + line[13:])
                elif line[:6] == "METHOD": 
                    current_method = new_method(line[7:])
                    shared_data["methods"].append(line[7:])
                else: documentation_data["lines"].append(line)
            else:
                if line[:6] == "METHOD":
                    documentation_data["methods"].append(current_method)
                    current_method = new_method(line[7:])
                    shared_data["methods"].append(line[7:])
                elif line[:4] == "DESC": current_method["description"] = line[5:]
                elif line[:3] == "ARG": current_method["args"].append("\n" + line[4:])
                else: current_method["lines"].append(line)


        if current_method is not None:
            documentation_data["methods"].append(current_method)
            
        self.tree[breadcrumbs] = shared_data
        
        return documentation_data
    
    def buildMDFile(self, breadcrumbs, documentation, documentation_data):
        current_methods = set()

        if documentation_data["title"] is None:
            print("\033[31mMissng src doc for: " + breadcrumbs)

        else:
            if documentation_data["extends"] is not None:
                extends_breadcrumbs, class_name = documentation_data["extends"].split(":")
                documentation = ["# " + documentation_data["title"] + f" [extends [{class_name}]({self.doc_url}{extends_breadcrumbs.replace('.', '/')}.md)]"]
            else:
                documentation = ["# " + documentation_data["title"]]

            documentation.append(f"Source: [_{breadcrumbs}_]({self.src_url}{breadcrumbs.replace('.', '/')}.js)<br/><br/>")

            if documentation_data["description"] is not None:
                documentation += [documentation_data["description"]]

            for style in documentation_data["shared_styles"]:
                tokens = style.split(":")
                documentation += ["**" + tokens[0] + "** " + tokens[1]]

            for line in documentation_data["lines"]:
                documentation += [line]

            for method in documentation_data["methods"]:
                current_methods.add(method["method"])
                documentation += ["### " + method["method"]]
                documentation += [method["description"]]

                for arg in method["args"]:  
                    documentation += [arg]

                for line in method["lines"]:  
                    documentation += [line]

            # Iteratively print out parent class methods
            parent = documentation_data["extends"]
            if parent is not None:
                parent_id = parent.split(":")[0]
                
                while parent_id in self.tree:
                    inherits = []
                    for method in self.tree[parent_id]["methods"]:
                        if method not in current_methods:
                            inherits += [f" - [{method}()]({self.doc_url}{parent_id.replace('.', '/')}.md#{method.replace('.', '')})"]
                            current_methods.add(method)
                            
                    if len(inherits) > 0:
                        documentation += ["\n### Inherits from: " + parent_id] + inherits
                    parent_id = self.tree[parent_id]["extends"]
            
            return "\n".join(documentation)

        return ""
    
    
    def parse(self, breadcrumbs, documentation):
        documentation_data = self.__parse_source_doc(breadcrumbs, documentation)
        return self.buildMDFile(breadcrumbs, documentation, documentation_data)