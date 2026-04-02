import { program } from "commander";
import { promises as fs } from "fs";
import process from "process";

program
  .name("ls")
  .description("Lists the files in a directory")
  .option("-1, --one", "One per line")
  .option("-a, --all", "Include files starting with dot")
  .argument("<path>", "Directory to list");

program.parse(process.argv);

const args = program.args;
const opts = program.opts();

if (args.length !== 1) {
  console.error("Expected 1 argument");
  process.exit(1);
}

try {
  let files = await fs.readdir(args[0]);
  if (!opts.all) {
    files = files.filter(f => !f.startsWith('.'));
  }

  files.sort();

  if (opts.one) {
    console.log(files.join('\n'));
  } else {
    console.log(files.join(' '));
  }
} catch (err) {
  console.error(`ls: cannot access '${args[0]}': ${err.message}`);
}
