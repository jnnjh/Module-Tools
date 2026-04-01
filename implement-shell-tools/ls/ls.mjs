import { promises as fs } from "node:fs";
import { program } from "commander";

program
  .name("ls ")
  .description("ls implementation")
  .argument("[path]", "The path to process")
  .option("-1, --one-per-line", "one file per line")
  .option("-a", "show hidden files");
program.parse();

const path = program.args[0] || ".";
const options = program.opts();
try {
  const files = await fs.readdir(path);
         
  for(const file of files)
  {
    if(!options.a && file.startsWith("."))continue;

    console.log(file);
  }
} catch (error) {
  console.error(error.message);
}
