const fs = require("fs");
const args = process.argv.slice(2);
let mode = "all";
let files = [];

for(let arg of args) {
    if(arg === "-l") {
        mode = "lines";
    } else if(arg === "-w") {
        mode = "words";
    } else if(arg === "-c") {
        mode = "bytes";
    } else {
        files.push(arg);
    }
}

for(let file of files) {
    const content = fs.readFileSync(file, "utf-8");
    const lines = content.split("\n").length;
    const words = content.trim().split(/\s+/).length;
    const bytes = Buffer.byteLength(content, "utf-8");

    if(mode === "lines") {
        console.log(`${lines} ${file}`);
    } else if(mode === "words") {
        console.log(`${words} ${file}`);
    } else if (mode === "bytes") {
        console.log(`${bytes} ${file}`);
    } else {
        console.log(`${lines} ${words} ${bytes} ${file}`);
    }
}