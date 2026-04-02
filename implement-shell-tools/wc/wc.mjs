import { program } from "commander";
import { readFileSync, existsSync } from "fs";
import process from "process";

program
  .name("wc")
  .description("Count lines, words, and characters in files")
  .argument("[files...]", "Files to process")
  .option("-l, --lines", "Count lines")
  .option("-w, --words", "Count words")
  .option("-c, --chars", "Count characters (bytes)");

program.parse(process.argv);

const options = program.opts();
const files = program.args.length ? program.args : ["/dev/stdin"];

// Determine active counts
const activeCounts = {
  lines: options.lines || (!options.words && !options.chars),
  words: options.words || (!options.lines && !options.chars),
  chars: options.chars || (!options.lines && !options.words),
};

function countFile(filePath) {
  let content = "";
  try {
    if (filePath === "/dev/stdin") {
      content = readFileSync(process.stdin.fd, "utf8");
    } else {
      if (!existsSync(filePath)) {
        console.error(`wc: ${filePath}: No such file or directory`);
        return null;
      }
      content = readFileSync(filePath, "utf8");
    }
  } catch (error) {
    console.error(`wc: ${filePath}: ${error.message}`);
    return null;
  }

  const lineCount = (content.match(/\n/g) || []).length;
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const charCount = Buffer.byteLength(content, "utf8");

  return {
    file: filePath,
    lines: activeCounts.lines ? lineCount : null,
    words: activeCounts.words ? wordCount : null,
    chars: activeCounts.chars ? charCount : null,
  };
}

function formatCounts(result) {
  const output = [];
  if (result.lines !== null) output.push(result.lines.toString().padStart(8));
  if (result.words !== null) output.push(result.words.toString().padStart(8));
  if (result.chars !== null) output.push(result.chars.toString().padStart(8));
  return output.join(" ");
}

const results = [];
let totalLines = 0, totalWords = 0, totalChars = 0;
const hasMultipleFiles = files.length > 1;

for (const file of files) {
  const result = countFile(file);
  if (result) {
    results.push(result);
    if (result.lines !== null) totalLines += result.lines;
    if (result.words !== null) totalWords += result.words;
    if (result.chars !== null) totalChars += result.chars;
  }
}

// Print per-file results
results.forEach(result => console.log(`${formatCounts(result)} ${result.file}`));

// Print totals if more than one file
if (hasMultipleFiles && results.length > 0) {
  const total = {
    file: "total",
    lines: activeCounts.lines ? totalLines : null,
    words: activeCounts.words ? totalWords : null,
    chars: activeCounts.chars ? totalChars : null,
  };
  console.log(`${formatCounts(total)} total`);
}
