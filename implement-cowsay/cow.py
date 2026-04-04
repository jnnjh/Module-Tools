import cowsay
import argparse

parser = argparse.ArgumentParser(
    prog="cowsay",
    description="Make animals say things.",
)

animals = cowsay.char_names

parser.add_argument("--animal", choices=animals, help=f"The animal to be saying things.", default="cow")
parser.add_argument("message", nargs="+", help="The message to say.")

args = parser.parse_args()

animal = args.animal
message = " ".join(args.message)

if animal in animals:
    say = getattr(cowsay, animal)
    say(message)
