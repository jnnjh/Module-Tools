import sys

args = sys.argv[1:]

mode = "all"
files = []

for arg in args:
    if arg == "-l":
        mode = "lines"
    elif arg == "-w":
        mode = "words"
    elif arg == "-c":
        mode = "bytes"
    else:
        files.append(arg)

for file in files:
    with open(file, "r", encoding="utf-8") as f:
        content = f.read()

    lines = len(content.split("\n"))
    words = len(content.strip().split())
    bytes_count = len(content.encode("utf-8"))

    if mode == "lines":
        print(f"{lines} {file}")
    elif mode == "words":
        print(f"{words} {file}")
    elif mode == "bytes":
        print(f"{bytes_count} {file}")
    else:
        print(f"{lines} {words} {bytes_count} {file}")