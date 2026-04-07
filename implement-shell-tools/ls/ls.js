const fs = require("fs");
const files = fs.readdirSync(".");

for (let file of files) {
  console.log(file);
}