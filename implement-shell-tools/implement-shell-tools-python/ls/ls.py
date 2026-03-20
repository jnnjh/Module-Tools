#!/usr/bin/env python3
import sys
import os

def list_directory(path, show_all, one_per_line):
    try:
        entries = os.listdir(path)
        if show_all:
            # Add . and .. when -a is used
            entries = [".", ".."] + entries
        else:
            entries = [e for e in entries if not e.startswith(".")]

        entries.sort(key=lambda x: (x not in (".", ".."), x))

        for e in entries:
            print(e)

    except Exception as e:
        print(f"Error reading directory {path}: {e}", file=sys.stderr)
        sys.exit(1)


def main():
    args = sys.argv[1:]

    show_all = "-a" in args
    one_per_line = "-1" in args

    dirs = [a for a in args if a not in ("-a", "-1")]

    if not dirs:
        dirs = [os.getcwd()]

    for i, path in enumerate(dirs):
            if os.path.isdir(path):
                if len(dirs) > 1:
                    print(f"{path}:")
                list_directory(path, show_all, one_per_line)
                if len(dirs) > 1 and i < len(dirs) - 1:
                    print("")
            else:
                print(path)


if __name__ == "__main__":
    main()
