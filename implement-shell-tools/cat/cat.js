const fs = require("fs");
const args = process.argv.slice(2);
let numberLines = false;
let numberNonEmpty = false;
let files = [];

for(let arg of args) {
	if(arg === "-n") {
		numberLines = true;
	} else if(arg === "-b") {
		numberLines = true;
	} else {
		files.push(arg);
	}
}

let lineNumber = 1;

for(let file of files) {
	const content = fs.readFileSync(file, "utf-8");
	const lines = content.split("\n");

	for(let line of lines) {
		if(numberNonEmpty) {
			if(line.trim() !== "") {
				console.log(`${lineNumber++} ${line}`);
			} else {
				console.log("");
			}
		} else if(numberLines) {
			console.log(`${lineNumber++} ${line}`);
		} else {
			console.log(line);
		}
	}
}