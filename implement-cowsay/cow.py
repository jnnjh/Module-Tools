import argparse
import cowsay

def main():
    supported_animals = cowsay.char_names 

    parser = argparse.ArgumentParser(description="Make an animal say something")
    parser.add_argument("message", nargs="+", help="The message to say")
    parser.add_argument("--animal", choices=supported_animals, default="cow",
                        help="The animal to be saying things")
    
    args = parser.parse_args()

    message_text = " ".join(args.message)

    say_function = getattr(cowsay, args.animal)
    say_function(message_text)

if __name__ == "__main__":
    main()


