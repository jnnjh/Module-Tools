
import argparse
import cowsay

def main():
    animals = sorted(cowsay.char_names)

    parser = argparse.ArgumentParser(
        prog='cowsay',
        description='Make animals say things'
    )
    parser.add_argument(
        '--animal',
        choices=animals,
        default='cow',
        help='The animal to be saying things.'
    )
    parser.add_argument(
        'message',
        nargs='+',
        help='The message to say.'
    )

    args = parser.parse_args()
    text = " ".join(args.message)

    getattr(cowsay, args.animal)(text)

if __name__ == '__main__':
    main()
