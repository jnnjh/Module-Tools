const fs = require("fs");

// input from terminal
const args = process.argv.slice(2);

// flags
const showAll = args.includes("-a");

// get folder (default = current folder)
const folder = args.filter((arg) => !arg.startsWith("-"))[0] || ".";

// read directory
const files = fs.readdirSync(folder);

// loop and print
for (let i = 0; i < files.length; i++) {
  const file = files[i];

  // skip hidden files unless -a is used
  if (!showAll && file.startsWith(".")) {
    continue;
  }

  console.log(file);
}
