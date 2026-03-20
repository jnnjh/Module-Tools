#!/usr/bin/env python3
import sys
import os

global_line_counter = 1

def print_file(file_path, options):
    global global_line_counter
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        lines = content.split("\n")
        if lines and lines[-1] == "":
            lines.pop()

        for line in lines:
            prefix = ""

            should_number = (
                options["number_mode"] == "all" or
                (options["number_mode"] == "non-empty" and line.strip() != "")
            )

            if should_number:
                prefix = f"{global_line_counter:6}\t"
                global_line_counter += 1

            sys.stdout.write(prefix + line + "\n")

    except Exception as e:
        print(f"cat: {file_path}: {e}", file=sys.stderr)
        sys.exit(1)


def main():
    global global_line_counter
    args = sys.argv[1:]

    options = {"number_mode": "off"}
    files = []

    for arg in args:
        if arg == "-n":
            options["number_mode"] = "all"
        elif arg == "-b":
            options["number_mode"] = "non-empty"
        else:
            files.append(arg)

    if not files:
        print("cat: missing file operand", file=sys.stderr)
        sys.exit(1)

    for file_path in files:
        global_line_counter = 1
        print_file(file_path, options)


if __name__ == "__main__":
    main()
