import argparse
from email import message
import cowsay

def main():
#Get the list of animals from cowsay library
    animals = sorted(cowsay.char_names)
    parser = argparse.ArgumentParser(
        prog="cowsay",
        description= "Make animal say things"
    )

    parser.add_argument(
        "--animal",
        choices=animals,
        default="cow",
        help="The animal to say the message."
    )
    parser.add_argument(
        "message",
        nargs="+",
        help="The message to be said by the animal."
    )

    args = parser.parse_args()
    # Join message list into a single string
    text = " ".join(args.message)
    # Default animal is "cow" if not specified
    print(cowsay.get_output_string(args.animal, text))

if __name__ == "__main__":
    main()