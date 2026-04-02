import argparse
import os 
import re

parser = argparse.ArgumentParser(
                    prog='wc command',
                    description='word, line, character, and byte count')

parser.add_argument("-c", "--bytes", help="The number of bytes in each input file is written to the standard output.", default = None, action="store_true")
parser.add_argument("-l", "--lines", help="The number of lines in each input file is written to the standard output.", default = None, action="store_true")
parser.add_argument("-w", "--words", help="The number of words in each input file is written to the standard output.", default = None, action="store_true")
parser.add_argument("paths", nargs="+", help="The file to search")

args = parser.parse_args()
cwd = os.getcwd()


def count_lines(content):
    return len(content.splitlines())
    
def count_words(content):
    return len(re.findall("[a-zA-Z\-\.'/]+", content))

def count_bytes(content):
    return len(content.encode('utf-8'))

def process_file_content(content, path):
    if not args.lines and not args.words and not args.bytes:
        global no_options
        no_options = True
        lines_in_file = count_lines(content)
        words_in_file = count_words(content)
        bytes_in_file = count_bytes(content)
        print(lines_in_file, words_in_file, bytes_in_file, path)
        return {'lines': lines_in_file, 'words':words_in_file, 'bytes':bytes_in_file}
    output = {}
    if args.lines:
        output['lines'] = count_lines(content)
    if args.words:
        output['words'] = count_words(content)
    if args.bytes:
        output['bytes'] = count_bytes(content)
    print(' '.join([ str(val) for val in output.values()]), path)
    return output

total_lines, total_words, total_bytes = 0, 0, 0
for path in args.paths:
    try:
        file_path_to_procccess = os.path.join(cwd, path)
        if os.path.isfile(file_path_to_procccess) : 
            with open(file_path_to_procccess, 'r') as f:
                file_content = f.read()
                dict_output = process_file_content(file_content, path)
                total_lines += dict_output['lines'] if args.lines or no_options else 0
                total_words += dict_output['words'] if args.words or no_options else 0
                total_bytes += dict_output['bytes'] if args.bytes or no_options else 0
        elif os.path.isdir(file_path_to_procccess):
            print(f"{path}: Is a directory")
    except FileNotFoundError:
        print(f"Error: File '{file_path_to_procccess}' not found.")
    except Exception as e:
            print(f"An unexpected error occurred: {e}")

if len(args.paths) > 1:
    if no_options:
        print(total_lines, total_words, total_bytes, 'total')
    else:
        total_output_line = []
        if args.lines: total_output_line.append(str(total_lines))
        if args.words: total_output_line.append(str(total_words))
        if args.bytes: total_output_line.append(str(total_bytes))
        print(' '.join(total_output_line), 'total')