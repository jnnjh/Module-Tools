import os
import argparse

parser = argparse.ArgumentParser(
    prog="ls",
    description="List directory contents."
)

parser.add_argument("-1", "--one-per-line", action="store_true", help="List one file per line")
parser.add_argument("-a", "--all", action="store_true", help="Include hidden files (those starting with .)")
parser.add_argument("paths", nargs="*", default=["."], help="Directory path(s) to list")

args = parser.parse_args()

for path in args.paths:
    try:
        entries = os.listdir(path)
    except Exception as e:
        print(f"ls: cannot access '{path}': {e}")
        continue

    if not args.all:
        entries = [entry for entry in entries if not entry.startswith(".")]

    entries.sort()

    if args.one_per_line:
        for entry in entries:
            print(entry)
    else:
        print("  ".join(entries))
