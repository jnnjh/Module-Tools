import { program } from "commander";
import process from "node:process";
import fs from "node:fs";

let vertical = false;
let showHidden = false;

program
  .name("list-directory-contents")
  .description("Shows all files and folders in a directory")
  .option("-1", "List one file/directory per line")
  .option("-a, --all", "Show hidden files")
  .argument("[path]", "Path of the directory to list (defaults to .)");

program.parse();

const argv = program.args;

vertical = program.opts()[1];
showHidden = program.opts().all;

const folderPath = argv[0] || ".";

const contents = fs.readdirSync(folderPath);

const filtered = contents.filter((f) => f[0] !== ".");

const dirArr = !showHidden ? filtered : contents;

if (!vertical) {
  console.log(dirArr.join("  "));
} else {
  for (const content of dirArr) {
    console.log(content);
  }
}
