#!/usr/bin/env python3
import sys

def count_file_content(content):
    raw_lines = content.split("\n")
    lines = len(raw_lines) - 1 if raw_lines[-1] == "" else len(raw_lines)
    words = len(content.split())
    bytes_ = len(content.encode("utf-8"))
    return lines, words, bytes_


def print_counts(path, counts, options):
    parts = []
    if options["line"]:
        parts.append(str(counts[0]).rjust(8))
    if options["word"]:
        parts.append(str(counts[1]).rjust(8))
    if options["byte"]:
        parts.append(str(counts[2]).rjust(8))

    output = "".join(parts)
    print(f"{output} {path}")


def main():
    args = sys.argv[1:]

    options = {"line": False, "word": False, "byte": False}
    files = []

    for arg in args:
        if arg == "-l":
            options["line"] = True
        elif arg == "-w":
            options["word"] = True
        elif arg == "-c":
            options["byte"] = True
        else:
            files.append(arg)

    if not files:
        print("No files specified", file=sys.stderr)
        sys.exit(1)

    if not any(options.values()):
        options = {"line": True, "word": True, "byte": True}

    total = [0, 0, 0]
    multiple = len(files) > 1

    for path in files:
        try:
            with open(path, "r", encoding="utf-8") as f:
                content = f.read()

            counts = count_file_content(content)
            total = [t + c for t, c in zip(total, counts)]

            print_counts(path, counts, options)

        except Exception as e:
            print(f"Error reading file {path}: {e}", file=sys.stderr)
            sys.exit(1)

    if multiple:
        print_counts("total", total, options)


if __name__ == "__main__":
    main()
