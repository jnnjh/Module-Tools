import argparse
import cowsay

def main():
    # Set up argument parser
    parser = argparse.ArgumentParser(description="Make animals say things")
    parser.add_argument("message", nargs="+", help="The message to say.")
    parser.add_argument(
        "--animal",
        choices=cowsay.char_names,
        default="cow",
        help="The animal to be saying things.",
    )

    args = parser.parse_args()

    # Combine the message into a single string
    message = " ".join(args.message)

    # Get the animal function dynamically
    animal_function = getattr(cowsay, args.animal, cowsay.cow)

    # Print the message using the selected animal
    print(animal_function(message))

if __name__ == "__main__":
    main()