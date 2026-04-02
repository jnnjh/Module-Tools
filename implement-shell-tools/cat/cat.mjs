import { readFile, stat } from 'node:fs/promises';
import { program } from 'commander';

program
  .name('cat')
  .description('Prints contents of files')
  .option('-n, --number-all-lines', 'Number all output lines')
  .option('-b, --number-non-blank', 'Number non-blank output lines')
  .argument('<files...>', 'Files to read');

program.parse();

const { numberAllLines, numberNonBlank } = program.opts();
const files = program.args;

let lineNumber = 1;

for (const file of files) {
  try {
    const fileStat = await stat(file);
    if (fileStat.isDirectory()) {
      console.error(`cat: ${file}: Is a directory`);
      continue;
    }

    const content = await readFile(file, 'utf-8');
    const lines = content.split('\n');

    for (const line of lines) {
      const shouldNumber = (numberAllLines && !numberNonBlank) || (numberNonBlank && line.trim() !== '');
      if (shouldNumber) {
        console.log(`${lineNumber.toString().padStart(6)}  ${line}`);
        lineNumber++;
      } else {
        console.log(line);
      }
    }
  } catch (err) {
    console.error(`cat: ${file}: ${err.message}`);
  }
}
