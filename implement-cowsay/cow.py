#!/usr/bin/env python3
import cowsay
import argparse

def main():

    animals = cowsay.char_names

    # Set up command-line argument parsing
    parser = argparse.ArgumentParser( prog="cowsay", description="Make animals say things")
    parser.add_argument(
        "--animal",
        choices=animals,
        default="cow",
        help="The animal to be saying things."
    )
    parser.add_argument(
        "message",
        nargs="+",
        help="The message to say."
    )

    args = parser.parse_args()

    message = " ".join(args.message)

    say_function = getattr(cowsay, args.animal)
    say_function(message)

if __name__ == "__main__":
    main()
