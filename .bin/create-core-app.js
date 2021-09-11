#!/usr/bin/env node

const { spawn } = require("child_process");
const fs = require("fs");

let folderName = '.';

if (process.argv.length >= 3) {
  folderName = process.argv[2];
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
  }
}

const clone = spawn("git", ["clone", "https://github.com/edgar0011/create-core-app.git", folderName]);

clone.on("close", code => {
  if (code !== 0) {
    console.error("Cloning the template failed!")
    process.exit(code);
  } else {
    console.log("🦀 Core + 🕸 App = ❤");
  }
});
