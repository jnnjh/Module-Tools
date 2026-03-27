import { promises as fs } from "node:fs";

const args = process.argv.slice(2);
console.log(args)

const showLines = args.includes("-l");
const showWords = args.includes("-w");
const showChars = args.includes("-c");
const paths = args.filter(arg => !arg.startsWith("-")) || ".";
console.log(paths)

// const direct = await fs.readdir(path);

// console.log(direct);
let totalLines = 0;
let totalWords = 0;
let totalchars = 0;

if(showLines){
    for (const path of paths){
    const content = await fs.readFile(path, "utf-8"); 
    const lines = content.split("\n").length;

    totalLines += lines;
    }
    console.log("line: ", totalLines);
}
else if(showWords){
    for (const path of paths){
    const content = await fs.readFile(path, "utf-8");
    const words = content.split(/\s+/).filter(Boolean).length;

    totalWords += words;
    }
    console.log("words: ", totalWords);
}
else if(showChars){
    for (const path of paths){
    const content = await fs.readFile(path, "utf-8");
    const char = content.length; 

    totalchars += char;
    }
    console.log("chars", totalchars)
}
else{
    for (const path of paths){
    const content = await fs.readFile(path, "utf-8");
    const lines = content.split("\n").length;
    const words = content.split(/\s+/).filter(Boolean).length;
    const char = content.length; 

    totalLines += lines;
    totalWords += words;
    totalchars += char;
    }
console.log("lines: ", totalLines, " words", totalWords, " char:", totalchars)
}


