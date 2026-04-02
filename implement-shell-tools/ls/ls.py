import argparse
import os 

parser = argparse.ArgumentParser(
                    prog='ls command',
                    description='list directory contents')

parser.add_argument("-1", "--one", help="Force output to be one entry per line.", default = None, action="store_true")
parser.add_argument("-a", help="Include directory entries whose names begin with a dot (.).", default = None, action="store_true")
parser.add_argument("paths", nargs="*", help="The file to search")

args = parser.parse_args()
cwd = os.getcwd()

def list_docs(dir_to_procccess):
    try:
        documents = [document for document in os.listdir(dir_to_procccess)]
        doc_to_output = []
        for doc in documents:
                if not args.a and doc.startswith("."): 
                    continue
                else:
                    doc_to_output.append(doc)
        doc_to_output.sort()
        if args.one:
            for doc in doc_to_output:
                print(doc)
        else:
            print(' '.join(doc_to_output))
    except FileNotFoundError:
        print(f"Error: Directory '{dir_to_procccess}' not found.")
    except NotADirectoryError:
        print(f"Error: '{dir_to_procccess}' is not a directory.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

if args.paths:
    for directory in args.paths:
        try:
            dir_to_procccess = os.path.join(cwd, directory)
            list_docs(dir_to_procccess)
        except Exception as e:
            print(f"An unexpected error occurred: {e}")
else:
    list_docs(cwd)