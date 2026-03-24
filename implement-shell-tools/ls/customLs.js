import { program } from "commander";
import { promises as fs } from "node:fs";
import process from "node:process";

program
  .name("Custom-ls")
  .description("Custom-ls-that-works-like-ls")
  .option("-1, --oneFile", "Showing one file per line")
  .option("-a, --showHidden", "Showing hidden files")
  .argument("[path]", "The file path to process");

program.parse();

const argumentsArray = program.args;

const path = argumentsArray[0] || "./";

async function formatFileName(base, fileName) {
  try {
    const fullPath = `${base.endsWith("/") ? base : base + "/"}${fileName}`;
    const stats = await fs.stat(fullPath);
    if (stats.isDirectory()) {
      return `\x1b[1;34m${fileName}\x1b[0m`;
    }
    return fileName;
  } catch (error) {
    return fileName;
  }
}

try {
  const files = await fs.readdir(path);

  const sortedFiles = files.sort((a, b) => {
    const cleanA = a.replace(/^\./, "");
    const cleanB = b.replace(/^\./, "");
    return cleanA.localeCompare(cleanB, undefined, { sensitivity: "base" });
  });

  const options = program.opts();

  let renderingFiles = [];

  if (options.showHidden) {
    renderingFiles = [".", "..", ...sortedFiles];
  } else {
    renderingFiles = sortedFiles.filter((file) => !/^\./.test(file));
  }

  if (options.oneFile) {
    for (let file of renderingFiles) {
      console.log(await formatFileName(path, file));
    }
  } else {
    const formatted = await Promise.all(
      renderingFiles.map((fileName) => {
        return formatFileName(path, fileName);
      }),
    );
    console.log(formatted.join(" "));
  }
} catch (error) {
  const stats = await fs.stat(path).catch(() => null);
  if (stats && stats.isFile()) {
    console.log(path);
  } else {
    console.log(
      `Can't access to this path: ${path} - No such file or directory`,
    );
    process.exit(1);
  }
}
