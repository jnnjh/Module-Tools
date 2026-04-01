// get CLI arguments
const args = process.argv.slice(2);

// flags
const showLines = args.includes("-l");
const showWords = args.includes("-w");
const showBytes = args.includes("-c");

// get files (remove flags)
const files = args.filter((arg) => !arg.startsWith("-"));

// helper functions
function countLines(text) {
  return text.split("\n").length - 1;
}

function countWords(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function countBytes(text) {
  return Buffer.byteLength(text, "utf8");
}

// loop through files
for (let i = 0; i < files.length; i++) {
  const file = files[i];

  try {
    const content = fs.readFileSync(file, "utf8");

    const lines = countLines(content);
    const words = countWords(content);
    const bytes = countBytes(content);

    let output = "";

    // if no flag → show all
    if (!showLines && !showWords && !showBytes) {
      output = `${lines} ${words} ${bytes} ${file}`;
    } else {
      if (showLines) output += `${lines} `;
      if (showWords) output += `${words} `;
      if (showBytes) output += `${bytes} `;
      output += file;
    }

    console.log(output.trim());
  } catch (err) {
    console.error(`wc: cannot open ${file}`);
  }
}
