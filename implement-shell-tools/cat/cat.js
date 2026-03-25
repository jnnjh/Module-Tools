import { program } from "commander";
import process from "node:process";
import { promises as fs } from "node:fs";

let showNumber = false;

program
  .name("cat")
  .description("Prints the output of a file to the console")
  .option("-n, --number", "Displays the lines along with their number")
  .argument("<path>", "The file path")
  .allowExcessArguments();
program.parse();

const argv = program.args;
if (argv.length < 1) {
  console.error(
    `Expected exactly 1 or more arguments (paths) to be passed but got ${argv.length}.`,
  );
  process.exit(1);
}

showNumber = program.opts().number;

const stringArr = [];
for (const path of argv) {
  stringArr.push(await fs.readFile(path, "utf-8"));
}

const flatArr = stringArr.flatMap((l) =>
  l
    .split("\n")
    .map((l, i, a) => (i < a.length - 1 ? l + "\n" : l))
    .filter((l) => l !== ""),
);

if (!showNumber) console.log(flatArr.join(""));
else console.log(flatArr.map((l, i) => `${i + 1} ${l}`).join(""));
