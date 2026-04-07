const fs = require("fs");
const args = process.argv.slice(2);

let dir = ".";

for(let arg of args) {
    if(!arg.startsWith("-")) {
        dir = arg;
    }
}

const files = fs.readdirSync(dir);

for(let file of files) {
    console.log(file);
}