import process from "node:process";
import { promises as fs } from "node:fs";
import { program } from "commander";

program
  .option("-n, --number", "number all output lines")
  .option("-b, --number-nonblank", "number only non-empty lines")
  .arguments("<files...>")
  .parse();

const cliOptions = program.opts();
const filePathsToRead = program.args;

async function readAndOutputFiles() {
  try {
    const fileContents = await Promise.all(
      filePathsToRead.map((filePath) => fs.readFile(filePath, "utf-8")),
    );
    const concatenatedContent = fileContents.join("");

    if (cliOptions.number) {
      // apply -n logic: number all lines
      const contentLines = concatenatedContent.split("\n");
      const numberedOutput = contentLines
        .map((line, index) => {
          return `${String(index + 1).padStart(6)} ${line}`;
        })
        .join("\n");
      process.stdout.write(numberedOutput);
    } else if (cliOptions.numberNonblank) {
      // apply -b logic: number only non-empty lines
      const contentLines = concatenatedContent.split("\n");
      let nonblankLineNumber = 0;
      const numberedOutput = contentLines
        .map((line) => {
          if (line.trim() === "") {
            return line;
          }
          nonblankLineNumber++;
          return `${String(nonblankLineNumber).padStart(6)} ${line}`;
        })
        .join("\n");
      process.stdout.write(numberedOutput);
    } else {
      process.stdout.write(concatenatedContent);
    }
  } catch (err) {
    console.error("Error reading multiple files:", err);
    process.exitCode = 1;
  }
}

readAndOutputFiles();
