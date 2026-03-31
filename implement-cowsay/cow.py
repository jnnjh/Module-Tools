import cowsay
import argparse

parser = argparse.ArgumentParser(
    prog="cowsay",
    description="Make animals say things"
)

parser.add_argument("--animal", choices=cowsay.char_names, help="The animal to be saying things.")
parser.add_argument("message", nargs="+", help="The message to say.")

args = parser.parse_args()

message = " ".join(args.message)

if (args.animal):
    print(cowsay.get_output_string(args.animal, message))
else:
    print(cowsay.get_output_string('cow', message))