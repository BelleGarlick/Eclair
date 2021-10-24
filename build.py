import os
import shutil
import uglipyjs


DOC_SRC_LINK = "https://github.com/SamGarlick/Eclair/tree/main/src/"
BUILD_ORDER_FILE = "build.txt"
SOURCE_DIR = "src"
DOC_DIR = "docs"
OUTPUT = "eclair.js"
OUTPUT_TEST = "test.html"


SHARED_DOC = {}


def parse_file(breadcrumbs_path, text):
    source_code = ""
    source_doc = ""
    test_code = []
    
    test_cases = False
    for line in text.split("\n"):
        if line.lstrip()[0:3] == "///":
            source_doc += line.lstrip()[4:] + "\n"
            
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
             
    if len(source_doc.replace("\n", "").strip()) == 0:
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
    


def parse_doc(breadcrumbs, documentation):
    def create_default_shared_data():
        return {
            "active": False,
            "func": "",
            "wildcard": None,
            "raw": []
        }
    
    lines = []
    shared = create_default_shared_data()
    
    for line in documentation.split("\n"):
        if line[:6] == "SHARED":
            args = line.split(" ")[1:]
            shared["active"] = True
            shared["func"] = args[0]
            if len(args) > 1:
                shared["wildcard"] = " ".join(args[1:])
            
        elif line[:10] == "WILDCARD":
            if shared["wildcard"] is not None:
                shared["raw"] += [line]
                lines += [shared["wildcard"]]
            else:
                print(f"\033[31mMISSING WILD CARD FOR DOC {breadcrumbs}.{shared['func']}")
            
        elif line[:10] == "END-SHARED":
            SHARED_DOC[breadcrumbs + "." + shared["func"]] = shared["raw"]
            shared = create_default_shared_data()
            
        elif line[:7] == "INCLUDE":
            args = line.split(" ")
            func = args[1]
            wildcard = None
            if len(args) > 2:
                wildcard = " ".join(args[2:])
            
            if func in SHARED_DOC:
                func_code = SHARED_DOC[func]
                for func_line in func_code:
                    if func_line[:10] == "WILDCARD":
                        if wildcard is None:
                            print(f"\033[31mMissing wild card in include path: {breadcrumbs}")
                        lines.append(wildcard)
                    else:
                        lines.append(func_line)
                    
            else:
                print(f"\033[31mUnknown doc include. Check your path: {func}")
                
        else:
            lines.append(line)
            
            if shared["active"]:
                shared["raw"].append(line)

    lines.append(f"<br/>Source: [_{breadcrumbs}_]({DOC_SRC_LINK}{breadcrumbs.replace('.', '/')}.js)")
    
    return "\n".join(lines)


def build_from_dir(directory, documentation_path, breadcrumbs=None):
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
                                parse_doc(breadcrumbs_path, source_doc)
                            )

            path = os.path.join(directory, path)
            if os.path.isdir(path):
                sub_dir_source, sub_dir_test_cases = build_from_dir(path, doc_path, breadcrumbs + [sub])
                dir_source += sub_dir_source + "\n"
                test_cases += sub_dir_test_cases
                
    return f"{dir_source}\n", test_cases



def compile_test_cases(test_cases):
    code = "<!--This file is auto generated from source code.-->\n<script src='eclair.js'></script>\n<script>"
    ui_code = """
        let headingStyle = eclair.Style()
            .fontWeight(700)
        eclair.VStack([
            eclair.VStack([
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
            ui_code += f"eclair.Text('{test_element['name']}').addStyle(headingStyle), eclair.VStack(["
            
            for test_case in test_element["tests"]:
                test_code += f"console.log('{test_case['name']}')\n"
                evaluations = 0
                
                for line in test_case["code"]:
                    if line[:7] == "**eval(":
                        evaluations += 1
                        ui_code += f"eclair.Text('{test_case['name']} - {evaluations}'),"
                        test_code += f"evaluate('{test_case['name']}', {evaluations}, " + line[7:] + "\n"
                    else:
                        test_code += line + "\n"
                    
            ui_code += "]).padding('16px').gap('16px').width('100%').alignment(eclair.Alignment().start()).background('#eeeeee'),"
            
            
    ui_code += "]).gap('16px').alignment(eclair.Alignment().start()).css('width:100%;max-width:400px')]).write()"
            
    return code + ui_code + test_code + "</script>"



if __name__ == "__main__":
    # Build eclair.
    print("=" * 20 + "\nBuilding eclair.\n" + "=" * 20)
    
    shutil.rmtree(DOC_DIR)
    os.mkdir(DOC_DIR)
    
    # Get path to sources dir
    file_path = os.path.abspath(__file__)
    sources_path = os.path.join(os.path.dirname(file_path), SOURCE_DIR)
    doc_path = os.path.join(os.path.dirname(file_path), DOC_DIR)
    
    # Source code
    eclair_source, eclair_test_cases = build_from_dir(sources_path, doc_path)
    
    with open(OUTPUT, "w+") as file:
        file.write(eclair_source)
        
    with open(OUTPUT_TEST, "w+") as file:
        file.write(compile_test_cases(eclair_test_cases))
        
#    print(uglipyjs.compile(eclair_source, {'mangle':False}))
    
    
    