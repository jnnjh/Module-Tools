import process from "node:process";
import { promises as fs } from "node:fs";
import { program } from "commander";

program
  .option("-1, --one-per-line", "list one file per line")
  .option("-a, --all", "do not ignore entries starting with .")
  .parse();

const cliOptions = program.opts();
const cliArguments = program.args;

async function runLsCommand() {
  try {
    // determine directory path (use current directory when none provided)
    let directoryPath;
    if (cliArguments.length === 0) {
      directoryPath = ".";
    } else {
      directoryPath = cliArguments[0];
    }

    // read directory entries
    const directoryEntries = await fs.readdir(directoryPath);

    // filter out dotfiles unless --all was provided
    const visibleEntries = [];
    if (cliOptions.all) {
      for (const name of directoryEntries) {
        visibleEntries.push(name);
      }
    } else {
      for (const name of directoryEntries) {
        if (!name.startsWith(".")) {
          visibleEntries.push(name);
        }
      }
    }

    // build output
    let outputString = "";
    if (cliOptions.onePerLine) {
      for (const name of visibleEntries) {
        outputString += name + "\n";
      }
      // if there are no entries, outputString stays empty
    } else {
      for (let i = 0; i < visibleEntries.length; i++) {
        if (i > 0) {
          outputString += "  ";
        }
        outputString += visibleEntries[i];
      }
      if (outputString !== "") {
        outputString += "\n";
      }
    }

    process.stdout.write(outputString);
  } catch (err) {
    console.error("Error reading directory:", err);
    process.exitCode = 1;
  }
}

runLsCommand();
