import argparse

def wc(path, count_lines, count_words, count_bytes):
    """Count lines, words, and bytes for a single file."""
    try:
        with open(path, 'r') as f:
            content = f.read()
        lines = content.splitlines()
        words = content.split()
        bytes_ = len(content.encode('utf-8'))

        # Determine what to show
        if not any([count_lines, count_words, count_bytes]):
            count_lines = count_words = count_bytes = True

        parts = []
        if count_lines: parts.append(str(len(lines)))
        if count_words: parts.append(str(len(words)))
        if count_bytes: parts.append(str(bytes_))

        print(' '.join(parts), path)

        return (len(lines) if count_lines else 0,
                len(words) if count_words else 0,
                bytes_ if count_bytes else 0)
    except FileNotFoundError:
        print(f"wc: {path}: No such file or directory")
        return (0, 0, 0)
    except IsADirectoryError:
        print(f"wc: {path}: Is a directory")
        return (0, 0, 0)

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-l', action='store_true', help='Count lines')
    parser.add_argument('-w', action='store_true', help='Count words')
    parser.add_argument('-c', action='store_true', help='Count bytes')
    parser.add_argument('paths', nargs='+', help='Files to count')
    args = parser.parse_args()

    total_lines = total_words = total_bytes = 0
    multiple_files = len(args.paths) > 1

    for path in args.paths:
        l, w, b = wc(path, args.l, args.w, args.c)
        total_lines += l
        total_words += w
        total_bytes += b

    if multiple_files:
        parts = []
        if args.l or not any([args.l, args.w, args.c]): parts.append(str(total_lines))
        if args.w or not any([args.l, args.w, args.c]): parts.append(str(total_words))
        if args.c or not any([args.l, args.w, args.c]): parts.append(str(total_bytes))
        print(' '.join(parts), 'total')

if __name__ == "__main__":
    main()
