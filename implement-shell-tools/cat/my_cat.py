import argparse

parser = argparse.ArgumentParser(
    prog="cat",
    description="Read, display, and concatenate text files.",
)

parser.add_argument("-n", "--number", action="store_true", help="Number all output lines.")
parser.add_argument("-b", "--number-nonblank", action="store_true", help="Number non-blank output lines.")
parser.add_argument("paths", nargs="+", help="The file(s) to read.")

args = parser.parse_args()

for path in args.paths:
    try:
        with open(path, mode='r', encoding='utf-8') as f:
            lines = f.readlines()
    except Exception as err:
        print(f"Error reading file '{path}': {err}")
        continue

    line_num = 1

    for line in lines:
        should_number = False
        if args.number_nonblank and line.strip():
            should_number = True
        elif args.number and not args.number_nonblank:
            should_number = True

        if should_number:
            print(f"{line_num:6}\t{line}", end="")
            line_num += 1
        else:
            print(line, end="")

    