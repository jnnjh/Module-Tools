#!/bin/bash

set -euo pipefail

# TODO: Write a command to output input.txt removing any line which contains a number.
sed '/[0-9]/d' input.txt
# The output should contain 6 lines.
