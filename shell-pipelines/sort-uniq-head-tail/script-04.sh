#!/bin/bash

set -euo pipefail

# The input for this script is the scores-table.txt file.
# TODO: Write a command to output scores-table.txt, with shows the line for the player whose first score was the second highest.
sort scores-table.txt -k3 -n -r | sed -n '2p'
# Your output should be: "Piotr Glasgow 15 2 25 11 8" (without quotes).
