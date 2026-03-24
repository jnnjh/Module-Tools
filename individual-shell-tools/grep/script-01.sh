#!/bin/bash

set -euo pipefail

# TODO: Write a command to output every line in dialogue.txt said by the Doctor.
grep '^Doctor:' dialogue.txt
# The output should contain 6 lines.
