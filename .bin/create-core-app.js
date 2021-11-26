#!/usr/bin/env node

const inquirer = require("inquirer");
const { spawn, exec } = require("child_process");
const fs = require("fs");
const shell = require('shelljs')

let folderName = './__create-core-app';
const folderSet = false
if (process.argv.length >= 3) {
  folderName = process.argv?.[2];
  folderSet  = true
}



const prompts = [
  {
    type: "input",
    message: "Target folder name:",
    name: "folderName",
    default: folderName,
  },
  {
    type: "list",
    message: "Package installer:",
    name: "installer",
    choices: ["npm", "yarn"],
    default: "npm",
  },
]

if (folderSet) {
  prompts.shift()
}

(async function () {
  const answers = await inquirer.prompt(prompts);


  if (answers.folderName) {
    folderName = answers.folderName;
  }
      // folder
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
  }


  const gitClonExec = shell.exec(`git clone https://github.com/edgar0011/create-core-app.git ${folderName}`);

  const cdExec = shell.cd(folderName);

  // TODO inquirer npm or yarn
  const npmiExec = shell.exec(`${answers.installer} install`, { silent: false }, function(code, stdout, stderr) {
    console.log(stdout);
  });
  console.log('npmiExec');
  console.log(npmiExec.stdout);

})()
