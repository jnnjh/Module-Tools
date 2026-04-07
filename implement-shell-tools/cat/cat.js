const fs = require("fs");
const files = process.argv.slice(2);

for (let file of files) {
  const content = fs.readFileSync(file, "utf-8");
  console.log(content);
}