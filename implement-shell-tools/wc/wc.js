import { promises as fs } from "node:fs";
import { program } from "commander";

program
  .name("print newline, word, and byte counts for each file")
  .option("-l", "count lines")
  .option("-w", "count words")
  .option("-c", "count bytes")
  .argument("<paths...>", "file name");

program.parse();

const opts = program.opts();
const flags = Object.keys(opts);
const columns = flags.length > 0 ? flags : ["l", "w", "c"];
const paths = program.args;

async function getFilesData(paths) {
  let output = [];

  for (const filename of paths) {
    try {
      const file = await fs.stat(filename);

      if (file.isFile()) {
        const fileContent = await fs.readFile(filename, "utf-8");
        const lineCount = (fileContent.match(/\n/g) || []).length;
        const wordCount = fileContent
          .trim()
          .split(/\s+/)
          .filter(Boolean).length;
        const fileSize = file.size;

        output.push([filename, lineCount, wordCount, fileSize]);
      } else {
        output.push([filename, `wc: ${filename}: Is a directory`]);
      }
    } catch (err) {
      output.push([filename, `wc: ${filename} ${err.message}`]);
    }
  }

  return output;
}

function displayWcOutput(output, columns) {
  const results = output.filter((entry) => entry.length === 4);

  const totalLines = results.reduce((sum, e) => sum + e[1], 0);
  const totalWords = results.reduce((sum, e) => sum + e[2], 0);
  const totalBytes = results.reduce((sum, e) => sum + e[3], 0);

  const allRows =
    results.length > 1
      ? [...results, ["total", totalLines, totalWords, totalBytes]]
      : results;

  const colMap = { l: 1, w: 2, c: 3 };
  const w = columns.map((col) =>
    Math.max(...allRows.map((e) => String(e[colMap[col]]).length)),
  );

  const formatRow = (entry) =>
    columns
      .map((col, i) => String(entry[colMap[col]]).padStart(w[i]))
      .join(" ");

  for (const entry of output) {
    if (entry.length === 2) {
      console.log(entry[1]);
    } else {
      console.log(`${formatRow(entry)} ${entry[0]}`);
    }
  }

  if (results.length > 1) {
    const totalsRow = ["total", totalLines, totalWords, totalBytes];
    console.log(`${formatRow(totalsRow)} total`);
  }
}

displayWcOutput(await getFilesData(paths), columns);
