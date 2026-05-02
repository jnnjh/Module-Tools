import os
import sys

args = sys.argv[1:]

show_all = False
directory = "."

for arg in args:
    if arg == "-a":
        show_all = True
    elif not arg.startswith("-"):
        directory = arg

files = os.listdir(directory)

if not show_all:
    files = [f for f in files if not f.startswith(".")]

for file in files:
    print(file)