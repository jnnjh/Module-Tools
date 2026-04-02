import argparse

parser = argparse.ArgumentParser(
                    prog='Cat Command',
                    description='Display and concatenate files contents')

parser.add_argument("-n", help="Number the output lines, starting at 1.", default = None, action="store_true")
parser.add_argument("-b", help="Number the non-blank output lines, starting at 1.", default = None, action="store_true")
parser.add_argument("paths", nargs="+", help="The file to search")

args = parser.parse_args()

for path in args.paths:
    try:
        with open(path, "r") as f:
            content = f.read()
        if args.n or args.b :
            counter = 1
            arr = content.split('\n')[:-1]
            for line in arr:
                if args.b and not line:
                    print(line)
                    continue
                print(counter, line)
                counter += 1
    except FileNotFoundError:
        print(f"Error: File '{path}' not found.")
    except Exception as e:
        print(f"An error occurred: {e}")