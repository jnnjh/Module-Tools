#!/usr/bin/env node

const fs = require('fs');

function countFile(file, options) {
  try {
    const data = fs.readFileSync(file, 'utf8');

    const lines = data.split('\n').length;
    const words = data.split(/\s+/).filter(Boolean).length;
    const bytes = Buffer.byteLength(data, 'utf8');

    const results = [];
    if (options.lines) results.push(lines);
    if (options.words) results.push(words);
    if (options.bytes) results.push(bytes);

    console.log(`${results.join('\t')}\t${file}`);
  } catch (err) {
    console.error(`wc: ${file}: ${err.code === 'ENOENT' ? 'No such file or directory' : 'An error occurred'}`);
    process.exit(1);
  }
}

function main() {
  const args = process.argv.slice(2);
  const options = {
    lines: false,
    words: false,
    bytes: false,
  };

  const files = [];

  args.forEach((arg) => {
    if (arg === '-l') {
      options.lines = true;
    } else if (arg === '-w') {
      options.words = true;
    } else if (arg === '-c') {
      options.bytes = true;
    } else {
      files.push(arg);
    }
  });

  if (files.length === 0) {
    console.error('Usage: wc [-l | -w | -c] <file>...');
    process.exit(1);
  }

  files.forEach((file) => {
    countFile(file, options);
  });
}

main();