#!/bin/bash

set -euo pipefail

# TODO: Write a command to output just the names of each player along with the number of times they've played the game.
# Your output should contain 6 lines, each with one word and one number on it.
# The first line should be "Ahmed 3".

awk '{ count=0; for(column=3; column<=NF; column++) count++; print $1, count }' scores-table.txt
