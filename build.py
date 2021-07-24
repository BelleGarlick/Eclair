import os

BUILD_ORDER_FILE = "build.txt"
SOURCE_DIR = "src"
DOC_DIR = "docs"
OUTPUT = "eclair.js"


def parse_file(breadcrumbs_path, text):
    source_code = ""
    source_doc = ""
    
    for line in text.split("\n"):
        if line.lstrip()[0:3] == "///":
            source_doc += line[4:] + "\n"
            
        elif line.lstrip()[0:2] == "//":
            line = line.lstrip("/").lstrip(" ")
            if line[:5] == "PRINT":
                print(line[5:].lstrip(" "))
                
        else:
            source_code += line + "\n"
             
    return source_code, source_doc


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
    
    
    for sub in subs:
        path = os.path.join(directory, sub)
        doc_path = os.path.join(documentation_path, sub)
        
        if os.path.exists(path):
            if path[-3:] == ".js":
                breadcrumbs_path = '.'.join(breadcrumbs + [sub[:-3]])
                print(f"Parsing: {breadcrumbs_path}")
                with open(path) as file:
                    source_code, source_doc = parse_file(breadcrumbs_path, file.read())
                    
                    dir_source += f"\n// {breadcrumbs_path}\n"
                    dir_source += source_code
                    
                    if len(source_doc) > 0:
                        os.makedirs(documentation_path, exist_ok=True)
                        with open(doc_path[:-2] + "md", "w+") as doc_file:
                            doc_file.write(source_doc)

            path = os.path.join(directory, path)
            if os.path.isdir(path):
                dir_source += build_from_dir(path, doc_path, breadcrumbs + [sub]) + "\n"
                
    return f"{dir_source}\n"
    


if __name__ == "__main__":
    # Build eclair.
    print("=" * 20 + "\nBuilding eclair.\n" + "=" * 20)
    
    # Get path to sources dir
    file_path = os.path.abspath(__file__)
    sources_path = os.path.join(os.path.dirname(file_path), SOURCE_DIR)
    doc_path = os.path.join(os.path.dirname(file_path), DOC_DIR)
    
    # Source code
    eclair_source = build_from_dir(sources_path, doc_path)
    
    
    with open(OUTPUT, "w+") as file:
        file.write(eclair_source)
    
    
    