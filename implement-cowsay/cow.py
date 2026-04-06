import cowsay
import argparse

parser = argparse.ArgumentParser(
    prog= "cowsay",
    description= "Make animals say things",
)

parser.add_argument("--animal",help= " The animal to be saying things.", default="cow",choices = cowsay.char_names)
parser.add_argument("message", nargs="+",help="The message to say")
args = parser.parse_args();

message = " ".join(args.message)

animal = args.animal;

output =cowsay.get_output_string(animal,message)
print(output)
