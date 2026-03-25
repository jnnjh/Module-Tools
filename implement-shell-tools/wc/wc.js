import { program } from "commander";
import process from "node:process";
import { promises as fs } from "node:fs";

let showLineCount = true;
let showWordCount = true;
let showByteCount = true;

program
  .name("wc")
  .description(
    "Print the number of lines, word and bytes for each file and a total if there are multiple files",
  )
  .option("-l, --lines", "Print the number of lines")
  .option("-w, --words", "Print the number of words")
  .option("-c, --bytes", "Print the number of bytes")
  .argument("<path>", "The file path")
  .allowExcessArguments();
program.parse();

const argv = program.args;

if (Object.keys(program.opts()).length >= 1) {
  showLineCount = program.opts().lines;
  showWordCount = program.opts().words;
  showByteCount = program.opts().bytes;
}

const stringArr = [];
for (const path of argv) {
  stringArr.push(await fs.readFile(path, "utf-8"));
}

let lines = 0;
let words = 0;
let bytes = 0;

const infoArr = [];
for (let i = 0; i < stringArr.length; i++) {
  const arr = [];
  const line = stringArr[i].split("\n").length;
  const wc = stringArr[i].split(" ").flatMap((l) =>
    l
      .split("\n")
      .map((l, i, a) => (i < a.length - 1 ? l + "\n" : l))
      .filter((l) => l.trim() !== ""),
  ).length;
  const lineByte = new Blob([stringArr[i]]).size;
  if (showLineCount) {
    arr.push(line - 1);
    lines += line - 1;
  }
  if (showWordCount) {
    arr.push(wc);
    words += wc;
  }
  if (showByteCount) {
    arr.push(lineByte);
    bytes += lineByte;
  }
  arr.push(argv[i]);
  infoArr.push(arr.join(" "));
}

if (infoArr.length > 1) {
  const totalArr = ["total"];
  if (showByteCount) totalArr.unshift(bytes);
  if (showWordCount) totalArr.unshift(words);
  if (showLineCount) totalArr.unshift(lines);
  infoArr.push(totalArr.join(" "));
}
console.log(infoArr.join("\n"));
