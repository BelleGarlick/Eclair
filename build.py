import os

BUILD_ORDER_FILE = "build.txt"
SOURCE_DIR = "src"
OUTPUT = "eclair.js"


def parse_file(text):
    output_text = ""
    for line in text.split("\n"):
        if line.lstrip()[0:2] == "//":
            line = line.lstrip("/").lstrip(" ")
            if line[:5] == "PRINT":
                print(line[5:].lstrip(" "))
                
        else:
            output_text += line + "\n"
    return output_text


def build_from_dir(directory):
    dir_source = f"// {directory}\n"
    
    subs = sorted(os.listdir(directory))
    if BUILD_ORDER_FILE in subs:
        with open(os.path.join(directory, BUILD_ORDER_FILE)) as file:
            build_order = [f.replace("\n", "") for f in file.readlines()]
            
        subs.remove(BUILD_ORDER_FILE)
        
        for file in subs:
            if file not in build_order:
                build_order.append(file)
                
        subs = build_order
        
        print(subs)
    
    
    for path in subs:
        path = os.path.join(directory, path)
        if os.path.exists(path):
            if path[-3:] == ".js":
                print(path)
                with open(path) as file:
                    dir_source += f"// {path}\n"
                    dir_source += parse_file(file.read())

            path = os.path.join(directory, path)
            if os.path.isdir(path):
                dir_source += build_from_dir(path) + "\n"
                
    return f"{dir_source}\n"
    


if __name__ == "__main__":
    # Build eclair.
    print("Building eclair.")
    
    # Get path to sources dir
    file_path = os.path.abspath(__file__)
    sources_path = os.path.join(os.path.dirname(file_path), SOURCE_DIR)
    
    # Source code
    eclair_source = build_from_dir(sources_path)
    
    
    with open(OUTPUT, "w+") as file:
        file.write(eclair_source)
    
    
    