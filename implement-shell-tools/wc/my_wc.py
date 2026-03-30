import argparse

parser = argparse.ArgumentParser(
    prog="wc",
    description="Counts lines, words, and bytes in text files."
)

parser.add_argument("-l", "--lines", action="store_true", help="Print the line counts")
parser.add_argument("-w", "--words", action="store_true", help="Print the word counts")
parser.add_argument("-c", "--bytes", action="store_true", help="Print the byte counts")
parser.add_argument("paths", nargs="+", help="One or more files to process")

args = parser.parse_args()

if not (args.lines or args.words or args.bytes):
    args.lines = args.words = args.bytes = True

total_lines = total_words = total_bytes = 0

for path in args.paths:
    try:
        with open(path, "rb") as file:
            content = file.read()
    except Exception as e:
        print(f"wc: {path}: {e}")
        continue

    lines = content.count(b'\n')
    words = len(content.decode('utf-8', errors='ignore').split())
    byte_count = len(content)

    if args.lines:
        print(f"{lines:>8}", end=" ")
    if args.words:
        print(f"{words:>8}", end=" ")
    if args.bytes:
        print(f"{byte_count:>8}", end=" ")
    
    print(f"{path}")

    total_lines += lines
    total_words += words
    total_bytes += byte_count

if len(args.paths) > 1:
    if args.lines:
        print(f"{total_lines:>8}", end=" ")
    if args.words:
        print(f"{total_words:>8}", end=" ")
    if args.bytes:
        print(f"{total_bytes:>8}", end=" ")
    print("total")
