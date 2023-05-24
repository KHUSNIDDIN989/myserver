const fs = require("fs");

const readFile = (fileName) => {
  return JSON.parse(fs.readFileSync(process.cwd() + `/db/${fileName}.json`, "utf8"));
};

const writeFile = (fileName, content) => {
  fs.writeFileSync(process.cwd() + `/db/${fileName}.json`, JSON.stringify(content, null, 4), "utf8");
};

module.exports = {
  readFile,
  writeFile,
};
