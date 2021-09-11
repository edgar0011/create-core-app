#!/usr/bin/env node

const { spawn, exec } = require("child_process");
const fs = require("fs");
var npm = require('npm')

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
    exec(`cd ${folderName} && pwd`, (error, stdout, stderr) => {
    // exec(`cd ${folderName} && npm install`, (error, stdout, stderr) => {
    // exec(`pwd`, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`)
        return
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`)
        return
      }
      console.log(stdout);
      console.log("...installing");

      npm.commands.install([], function (error, data) {
        if (error){
          console.error("Installing the template failed!")
          process.exit(code);
          return
        }
        console.log("🦀 Core + 🕸 App = ❤");
        // command succeeded, and data might have some info
      })

      // const clone2 = spawn('yarn');
      // clone2.on("close", code => {
      //   if (code !== 0) {
      //     console.error("Installing the template failed!")
      //     process.exit(code);
      //   } else {
      //     console.log("🦀 Core + 🕸 App = ❤");
      //   }
      // });
    });
  }
});
