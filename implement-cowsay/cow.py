import argparse
import cowsay

# Get the list of animals from cowsay
available_animals = cowsay.char_names

parser = argparse.ArgumentParser(prog="cow.py", description="Make animals say things")

parser.add_argument(
    "--animal",
    choices=available_animals,
    default="cow",
    help="The animal to be saying things.",
)
parser.add_argument("message", nargs="+", help="The message to say.")

args = parser.parse_args()

# Combine words into a single message string
full_message = " ".join(args.message)

print(cowsay.get_output_string(args.animal, full_message))
