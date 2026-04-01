import { promises as fs } from "node:fs";
import { program } from "commander";

program
  .name("cat")
  .description("my own cat program")
  .option("-n", "number all lines")
  .option("-b" , "number non-empty lines")
  .argument("<paths...>", "The file path to process");
program.parse();

const paths = program.args;
const options = program.opts();

if (paths.length === 0) {
  console.error("Expected at least one argument (a path)");
  process.exit(1);
}

let lineNumber = 1;

for (const path of paths) {
  try {
    const content = await fs.readFile(path, "utf-8");
    if(options.b)
    {
       const lines = content.split("\n");

      if (lines[lines.length - 1] === "") {
        lines.pop();
      }
      for(const line of lines)
      {
        if(line.trim()!=="")
        {
          process.stdout.write(`     ${lineNumber} ${line}\n`);
          lineNumber++;
        }
        else {process.stdout.write("\n");}
      }

    }
     else if (options.n) {
      const lines = content.split("\n");

      if (lines[lines.length - 1] === "") {
        lines.pop();
      }

      for (const line of lines) {
        process.stdout.write(`     ${lineNumber} ${line}\n`);
        lineNumber++;
      }
    } else {
      process.stdout.write(content);
    }
  } catch (error) {
    console.error(error.message);
  }
}
