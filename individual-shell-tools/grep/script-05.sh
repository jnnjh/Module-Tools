#!/bin/bash

set -euo pipefail
grep -B 1 "cure" dialogue.txt

# TODO: Write a command to output every line in dialogue.txt that contains the string "cure", as well as the line before that line.
# The output should contain two pairs of two lines of text (with a separator between them).
