#!/usr/bin/env node

const fs = require('fs');

function listFiles(directory, options) {
  try {
    const files = fs.readdirSync(directory, { withFileTypes: true });

    files.forEach((file) => {
      if (!options.all && file.name.startsWith('.')) {
        return; // Skip hidden files unless -a is specified
      }
      console.log(`${directory}/${file.name}`);
    });
  } catch (err) {
    console.error(`ls: cannot access '${directory}': ${err.code === 'ENOENT' ? 'No such file or directory' : 'An error occurred'}`);
    process.exit(1);
  }
}

function main() {
  const args = process.argv.slice(2);
  const options = {
    all: false,
  };

  const directories = [];

  args.forEach((arg) => {
    if (arg === '-1') {
      // -1 is the default behavior, so no action needed
    } else if (arg === '-a') {
      options.all = true;
    } else {
      directories.push(arg);
    }
  });

  if (directories.length === 0) {
    directories.push('.');
  }

  directories.forEach((directory) => {
    listFiles(directory, options);
  });
}

main();