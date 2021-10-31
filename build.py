import os
import shutil
import uglipyjs

DOC_DOC_LINK = "https://github.com/SamGarlick/Eclair/tree/main/docs/"
DOC_SRC_LINK = "https://github.com/SamGarlick/Eclair/tree/main/src/"
BUILD_ORDER_FILE = "build.txt"
SOURCE_DIR = "src"
DOC_DIR = "docs"
OUTPUT = "Eclair.js"
OUTPUT_TEST = "test.html"


SHARED_DOC = {}


class DocumentationBuilder:
    def __init__(self):
        self.tree = {}
        
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
                elif line[:12] == "SHARED-STYLE": documentation_data["shared_styles"].append(line[13:])
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
                elif line[:3] == "ARG": current_method["args"].append(line[4:])
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
                documentation = ["# " + documentation_data["title"] + f"__extends [{class_name}]({DOC_DOC_LINK}{extends_breadcrumbs.replace('.', '/')}.md)__<br/>"]
            else:
                documentation = ["# " + documentation_data["title"]]

            documentation.append(f"\nSource: [_{breadcrumbs}_]({DOC_SRC_LINK}{breadcrumbs.replace('.', '/')}.js)")

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
                            inherits += [f" - [{method}()]({DOC_DOC_LINK}{parent_id.replace('.', '/')}.md#{method.replace('.', '')})"]
                            current_methods.add(method)
                            
                    if len(inherits) > 0:
                        documentation += ["\n### Inherits from: " + parent_id] + inherits
                    parent_id = self.tree[parent_id]["extends"]
            
            return "\n".join(documentation)

        return ""
    
    
    def parse(self, breadcrumbs, documentation):
        documentation_data = self.__parse_source_doc(breadcrumbs, documentation)
        return self.buildMDFile(breadcrumbs, documentation, documentation_data)


def parse_file(breadcrumbs_path, text):
    source_code = ""
    source_doc = []
    test_code = []
    
    test_cases = False
    for line in text.split("\n"):
        if line.lstrip()[0:3] == "///":
            source_doc += [line.lstrip()[4:]]
            
        elif line.lstrip()[0:2] == "//":
            line = line.lstrip().lstrip("/").lstrip(" ")
            if line[:5] == "PRINT":
                print("\033[0m" + line[5:].lstrip(" "))
            if line[:4] == "WARN":
                print(f"\033[33m" + line[4:].lstrip(" "))
            if line[:4] == "TODO":
                print(f"\033[36m" + line[4:].lstrip(" "))
                    
        elif line[:3] == "***" or test_cases:
            test_cases = True
            test_code.append(line)
        
        else:
            source_code += line + "\n"
             
    if len("".join(source_doc).strip()) == 0:
        print("\033[31mMissng src doc for: " + breadcrumbs_path)
        
    for i in range(10):
        source_code.replace("\n\n", "\n")
        
    test_code = parse_tests(breadcrumbs_path, test_code)
                
    return source_code, source_doc, test_code 


def parse_tests(breadcrumbs_path, lines):
    test_cases = []
    
    test_index = 0
    c_test = []
    for line in lines:
        if line[:8] == "*** TEST":
            if len(c_test) > 0:
                test_index += 1
                test_cases += [{
                    "name": breadcrumbs_path + ": " + str(test_index),
                    "code": c_test
                }]
                c_test = []
        else:
            c_test += [line]
            
    if len(c_test) > 0:
        test_index += 1
        test_cases += [{
            "name": breadcrumbs_path + ": " + str(test_index),
            "code": c_test
        }]
        c_test = []
            
            
    return {"name": breadcrumbs_path, "tests": test_cases}
    


def build_from_dir(doc_builder, directory, documentation_path, breadcrumbs=None):
    dir_source = ""
    breadcrumbs = [] if breadcrumbs is None else breadcrumbs
    
    subs = sorted(os.listdir(directory))
    if BUILD_ORDER_FILE in subs:
        with open(os.path.join(directory, BUILD_ORDER_FILE)) as file:
            build_order = [f.replace("\n", "") for f in file.readlines()]
            
        subs.remove(BUILD_ORDER_FILE)
        
        for file in subs:
            if file not in build_order:
                build_order.append(file)
                
        subs = build_order
    
    test_cases = []
    for sub in subs:
        path = os.path.join(directory, sub)
        doc_path = os.path.join(documentation_path, sub)
        
        if os.path.exists(path):
            if path[-3:] == ".js":
                breadcrumbs_path = '.'.join(breadcrumbs + [sub[:-3]])
                print(f"\033[32m{breadcrumbs_path}")
                with open(path) as file:
                    source_code, source_doc, source_test = parse_file(breadcrumbs_path, file.read())
                    test_cases += [source_test]
                    
                    dir_source += f"\n// {breadcrumbs_path}\n"
                    dir_source += source_code
                    
                    if len(source_doc) > 0:
                        os.makedirs(documentation_path, exist_ok=True)
                        with open(doc_path[:-2] + "md", "w+") as doc_file:
                            doc_file.write(
                                doc_builder.parse(breadcrumbs_path, source_doc)
                            )

            path = os.path.join(directory, path)
            if os.path.isdir(path):
                sub_dir_source, sub_dir_test_cases = build_from_dir(doc_builder, path, doc_path, breadcrumbs + [sub])
                dir_source += sub_dir_source + "\n"
                test_cases += sub_dir_test_cases
                
    return f"{dir_source}\n", test_cases



def compile_test_cases(test_cases):
    code = "<!--This file is auto generated from source code.-->\n<script src='Eclair.js'></script>\n<script>"
    ui_code = """
        let headingStyle = Eclair.Style()
            .fontWeight(700)
        Eclair.VStack([
            Eclair.VStack([
    """
    test_code = """
    function evaluate(test_name, evaluations, val_a, val_b) {
        if (val_a == val_b) {
            console.log(test_name + ": evaluation " +evaluations+ " - passed!")
        } else {
            console.log(test_name + ": evaluation " +evaluations+ " - failed!")
        }
    }
    """
    
    for test_element in test_cases:
        if len(test_element["tests"]) > 0:
            ui_code += f"Eclair.Text('{test_element['name']}').addStyle(headingStyle), Eclair.VStack(["
            
            for test_case in test_element["tests"]:
                test_code += f"console.log('{test_case['name']}')\n"
                evaluations = 0
                
                for line in test_case["code"]:
                    if line[:7] == "**eval(":
                        evaluations += 1
                        ui_code += f"Eclair.Text('{test_case['name']} - {evaluations}'),"
                        test_code += f"evaluate('{test_case['name']}', {evaluations}, " + line[7:] + "\n"
                    else:
                        test_code += line + "\n"
                    
            ui_code += "]).padding('16px').gap('16px').width('100%').alignment(Eclair.Alignment().start()).background('#eeeeee'),"
            
            
    ui_code += "]).gap('16px').alignment(Eclair.Alignment().start()).css('width:100%;max-width:400px')]).write()"
            
    return code + ui_code + test_code + "</script>"



if __name__ == "__main__":
    # Build Eclair.
    print("=" * 20 + "\nBuilding Eclair.\n" + "=" * 20)
    
    shutil.rmtree(DOC_DIR)
    os.mkdir(DOC_DIR)
    
    doc_builder = DocumentationBuilder()
    
    # Get path to sources dir
    file_path = os.path.abspath(__file__)
    sources_path = os.path.join(os.path.dirname(file_path), SOURCE_DIR)
    doc_path = os.path.join(os.path.dirname(file_path), DOC_DIR)
    
    # Source code
    eclair_source, eclair_test_cases = build_from_dir(doc_builder, sources_path, doc_path)
    
    with open(OUTPUT, "w+") as file:
        file.write(eclair_source)
        
    with open(OUTPUT_TEST, "w+") as file:
        file.write(compile_test_cases(eclair_test_cases))
        
    print("\033[31mBuild.py missing args in documentation.")
        
#    print(uglipyjs.compile(eclair_source, {'mangle':False}))
    
    
    