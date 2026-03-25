import { program } from "commander";
import { promises as fs } from "node:fs";

program.argument("<files...>").parse();

for (const file of program.args) {
  const stat = await fs.stat(file);

  if (stat.isDirectory()) {
    console.error(`cat: ${file}: Is a directory`);
    continue;
  }

  const content = await fs.readFile(file, "utf-8");
  process.stdout.write(content);
}
