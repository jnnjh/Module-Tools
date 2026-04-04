import { program } from "commander";
import { promises as fs } from "node:fs";

program
  .name("cat")
  .description("concatenate and print files")
  .option("-n, --number", "number all output lines")
  .option("-b, --number-nonblank", "number nonempty output lines")
  .argument("<paths...>", "the file paths to process");

program.parse();

const options = program.opts();
const paths = program.args;

const numberAll = options.number;
const numberNonBlank = options.numberNonblank;

const shouldNumberAll = numberNonBlank ? false : numberAll;

let lineNumber = 1;
let nonBlankNumber = 1;

for (const filePath of paths) {
  try {
    const content = await fs.readFile(filePath, "utf8");
    process.stdout.write(formatContent(content));
  } catch (error) {
    process.exitCode = 1;
    process.stderr.write(`cat: ${filePath}: ${error.message}\n`);
  }
}

function formatContent(text) {
  const normalized = text.replace(/\r\n/g, "\n");
  const endsWithNewline = normalized.endsWith("\n");
  const lines = endsWithNewline
    ? normalized.slice(0, -1).split("\n")
    : normalized.split("\n");

  const output = [];

  for (const line of lines) {
    if (numberNonBlank) {
      if (line === "") {
        output.push("");
      } else {
        output.push(`${String(nonBlankNumber++).padStart(6, " ")}\t${line}`);
      }
    } else if (shouldNumberAll) {
      output.push(`${String(lineNumber++).padStart(6, " ")}\t${line}`);
    } else {
      output.push(line);
    }
  }

  let result = output.join("\n");

  if (endsWithNewline) {
    result += "\n";
  }

  return result;
}
