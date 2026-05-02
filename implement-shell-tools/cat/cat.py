import sys

args = sys.argv[1:]

number_lines = False
number_non_empty = False
files = []

for arg in args:
    if arg == "-n":
        number_lines = True
    elif arg == "-b":
        number_lines = True
        number_non_empty = True
    else:
        files.append(arg)

line_number = 1

for file in files:
    with open(file, "r", encoding="utf-8") as f:
        lines = f.read().split("\n")

    for line in lines:
        if number_non_empty:
            if line.strip() != "":
                print(f"{line_number} {line}")
                line_number += 1
            else:
                print("")
        elif number_lines:
            print(f"{line_number} {line}")
            line_number += 1
        else:
            print(line)