import process from "node:process";
import { promises as fs } from "node:fs";
import { Command } from "commander";

const program = new Command();

program
  .name("wc")
  .description("A simple node implementation of the word count utility")
  .argument("[files...]", "Files to process")
  .option("-l, --lines", "print the newline counts")
  .option("-w, --words", "print the word counts")
  .option("-c, --bytes", "print the byte counts")
  .action(async (filePaths, options) => {
    const noFlagsProvided = !options.lines && !options.words && !options.bytes;
    const shouldShowAllStats = noFlagsProvided;

    const allFileStats = [];

    for (const filePath of filePaths) {
      try {
        const fileStats = await calculateFileStats(filePath);
        allFileStats.push(fileStats);
        printFormattedReport(fileStats, options, shouldShowAllStats);
      } catch (error) {
        console.error(`wc: ${filePath}: No such file or directory`);
        process.exitCode = 1;
      }
    }

    if (allFileStats.length > 1) {
      const grandTotals = {
        lineCount: allFileStats.reduce((sum, stat) => sum + stat.lineCount, 0),
        wordCount: allFileStats.reduce((sum, stat) => sum + stat.wordCount, 0),
        byteCount: allFileStats.reduce((sum, stat) => sum + stat.byteCount, 0),
        displayName: "total"
      };
      printFormattedReport(grandTotals, options, shouldShowAllStats);
    }
  });

async function calculateFileStats(filePath) {
  const fileBuffer = await fs.readFile(filePath);
  const fileContent = fileBuffer.toString();

  const lines = fileContent.split("\n").length - 1;
  const words = fileContent.split(/\s+/).filter(word => word.length > 0).length;
  const bytes = fileBuffer.length;

  return {
    lineCount: lines,
    wordCount: words,
    byteCount: bytes,
    displayName: filePath
  };
}

function printFormattedReport(stats, options, shouldShowAllStats) {
  const outputColumns = [];
  const formatColumn = (count) => String(count).padStart(4);

  if (shouldShowAllStats || options.lines) outputColumns.push(formatColumn(stats.lineCount));
  if (shouldShowAllStats || options.words) outputColumns.push(formatColumn(stats.wordCount));
  if (shouldShowAllStats || options.bytes) outputColumns.push(formatColumn(stats.byteCount));

  console.log(`${outputColumns.join("")} ${stats.displayName}`);
}

program.parse(process.argv);