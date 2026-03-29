import argparse
import cowsay

parser = argparse.ArgumentParser(
    prog="cowsay",
    description="program to make animal say things"
)

# to fetch animals names
animals = cowsay.char_names

parser.add_argument(
    "--animal",
    choices=animals,
    help="Animals to be saying things.",
    default="cow"
)

parser.add_argument(
    "message",
    nargs="+",
    help="The message to say."
)

args = parser.parse_args()

# get the correct animal function by name
animal_func = getattr(cowsay, args.animal)

animal_func(" ".join(args.message))
