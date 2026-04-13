const fs = require("fs");
const args = process.argv.slice(2);
let showAll = false;
let dir = ".";

for(let arg of args) {
    if(arg === "-a") {
        showAll = true;
    } else if(!arg.startsWith("-")) {
        dir = arg;
    }
}

let files = fs.readdirSync(dir);

if(!showAll) {
    files = files.filter(file => !file.startsWith("."));
}

for(let file of files) {
    console.log(file);
}