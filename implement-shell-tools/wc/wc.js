const fs = require("fs");
const file = process.argv[2];
const content = fs.readFileSync(file, "utf-8");
const lines = content.split("\n").length;
const words = content.trim().split(/\s+/).length;
const bytes = Buffer.byteLength(content, "utf-8");

console.log(`${lines} ${words} ${bytes} ${file}`);