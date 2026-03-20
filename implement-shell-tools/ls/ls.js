#!/usr/bin/env node
const fs = require("node:fs");
function listDirectory(dirPath, showAll, onePerLine) {
  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    const filtered = entries.filter(
      (entry) => showAll || !entry.name.startsWith("."),
    );

    if (onePerLine) {
      filtered.forEach((entry) => console.log(entry.name));
    } else {
      const names = filtered.map((entry) => entry.name);
      console.log(names.join("  "));
    }
  } catch (error) {
    console.error(`Error reading directory ${dirPath}: ${error.message}`);
    process.exitCode = 1;
  }
}
function main() {
  const args = process.argv.slice(2);
  const showAll = args.includes("-a");
  const onePerLine = args.includes("-1");
  //remove options from args
  let directories = args.filter((arg) => arg !== "-a" && arg !== "-1");

  if (directories.length === 0) {
    directories = [process.cwd()];
  }
  directories.forEach((arg, index) => {
    try {
      const stats = fs.statSync(arg);

      if (stats.isDirectory()) {
        if (directories.length > 1) {
          console.log(`${arg}:`)
        };
        listDirectory(arg, showAll, onePerLine);
        //add a blank line between directory listings if there are multiple directories
        if (directories.length > 1 && index < directories.length - 1){
          console.log(""); 
        }
          
      } else {
        console.log(arg); // single file
      }
    } catch (error) {
      console.error(`Error accessing ${arg}: ${error.message}`);
      process.exitCode = 1;
    }
  });
}
main();
