import { promises as fs } from "node:fs";
import { program } from "commander";

program
  .name("list files and directories")
  .option("-a", "show hidden files")
  .option("-1", "force displaying each item in a new line")
  .argument("[paths...]", "path of directory");

program.parse();

const showHiddenFiles = program.opts()["a"];
const showFilesInLines = program.opts()["1"];
const paths = program.args.length ? program.args : ["."];

const fetchedDirectories = await fetchDirectoriesFunc(paths);

console.log(formatDisplay(fetchedDirectories));

function formatDisplay(fetchedDirectories) {
  const controlDisplaying = fetchedDirectories.map((directoryFilesInArray) => {
    const joiner = showFilesInLines ? `\n\r` : `  `;
    const showFolderName =
      fetchedDirectories.length > 1
        ? `${directoryFilesInArray.folderName}:\n\r`
        : "";

    return `${showFolderName}${directoryFilesInArray.files.join(joiner)}`;
  });
  return controlDisplaying.join("\n\r\n\r");
}

// returns array of objects, like: [{folderName: [file1, file2]}]
async function fetchDirectoriesFunc(directories) {
  const result = [];

  for (const folderName of directories) {
    let files = await fs.readdir(folderName);

    // sort by name + but those starting with . at the end
    files.sort((a, b) => {
      const isHiddenA = a.startsWith(".");
      const isHiddenB = b.startsWith(".");

      if (isHiddenA !== isHiddenB) {
        return isHiddenA ? 1 : -1;
      }

      const cleanA = a.replace(/^\.+/, "");
      const cleanB = b.replace(/^\.+/, "");

      return cleanA.localeCompare(cleanB);
    });

    if (showHiddenFiles) {
      files.unshift(".", "..");
    } else {
      files = files.filter((fileName) => !fileName.startsWith("."));
    }

    result.push({
      folderName,
      files,
    });
  }

  return result;
}
