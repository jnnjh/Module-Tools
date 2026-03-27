import { promises as fs } from "node:fs";

//getting all commands 
const args = process.argv.slice(2);

const showOnePerLine = args.includes("-1"); 
const showAllFilesWithHidden = args.includes("-a");

//current path
const path = args.find(arg => !arg.startsWith("-")) || ".";
// if we do console.log("path=> ",path," args=> " ,args); it will give us this =>: path=>  sample-files  args=>  [ '-1', '-a', 'sample-files' ]

const direc = await fs.readdir(path)
// if the path is <sample-files> console.log(direc) gives us =>: [ '.hidden.txt', '1.txt', '2.txt', '3.txt', 'dir' ]

if(showOnePerLine && showAllFilesWithHidden){ 
    direc.forEach(element => {
        console.log(element)
    })
}
else if(showOnePerLine){
    const visibleFiles = direc.filter(element => !element.startsWith(".")); // filtering hidden files which starts with "."
    visibleFiles.forEach(element => {
        console.log(element)
    });
}


