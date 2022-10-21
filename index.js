// TODO: Include packages needed for this application
import inquirer from 'inquirer';
// const inquirer = require('inquirer');
// const js = require('fs');
import fs from 'fs';
// TODO: Create an array of questions for user input
const prjSpecs = [
    {
        type: 'input',
        name: 'prjDescription',
        message: "Please enter a short description of your project: {What, Why and How}: ",
        validate: (answer)=> {
            if(answer ==''){
                return 'Please enter a short description of your project. '
            }
            return true
        }
    },
    {
        type: 'input',
        name: 'prjInstallSteps',
        message: 'What are the steps required to intall your project? ',
        validate: (answer) => {
            if (answer ==""){
                return 'Please enter the steps the user will need to install your project.'
            }
            return true
        }
    },
    {
        type: 'input',
        name: 'prjCredits',
        message: 'List your collaborators',
    },
    {
        type: 'input',
        name: 'prjUsage',
        message: 'Enter instructions and examples for use',
    },
    {
        type: 'input',
        name: 'prjImage',
        message: 'Please enter the URL for a screenshot of your project',
        default: 'https://via.placeholder.com/250'
    },

    {
        type: 'input',
        name: 'prjFeatures',
        message: 'List any features you want to highlight',
    },

    {
        type: 'list',
        name: 'prjLicense',
        message: 'Under what license would you like to list your project',
        choices: ['Apache License 2.0', 'GNU GPLv3', 'MIT','ISC License','GNU GPLv2'],
        default: 'MIT'
    }    
]


inquirer
    .prompt(prjSpecs)
    .then(answers => {
        console.info('README ME Questions : ', answers);
        // renderLicenseLink(answers);
        writeToFile(answers);
        renderLicenseLink(answers);

    });

// TODO: Create a function to write README file
function writeToFile({
    prjDescription,
    prjInstallSteps,
    prjCredits,
    prjUsage,
    prjImage,
    prjFeatures,
    // prjLicense
}) {
    fs.writeFile('README.md',
   `## Description
   ${prjDescription}
   ## Table of Conents
   - [Installation](#Installation)
   - [Usage](#usage)
   - [Credits](#credit)
   
   ## Installation
   ${prjInstallSteps}
   ## Usage
   ${prjUsage}
   ![appscreen](${prjImage})
   ## Credit
   ${prjCredits}
   ## Features
   ${prjFeatures}` 
   
   ,
   
   function (err){
    if (err) throw err;
   }
   )
}
    
function renderLicenseLink({prjLicense}) {
    let prjLicenseUrl = ''
    switch(prjLicense) {
        case 'Apache License 2.0':
            prjLicenseUrl = "![Apache License](https://img.shields.io/badge/license-GNU-blue)";
            break;
        case 'GNU GPLv3':
            prjLicenseUrl = "![GNU GPLv3]https://img.shields.io/badge/license-GNU%20GPLv3-blue)";
            break;
        case 'MIT' :
            prjLicenseUrl = "![MIT](https://img.shields.io/badge/license-MIT-blue)";
            break;
        case 'ISC License' :
            prjLicenseUrl = "![ISC License]https://img.shields.io/badge/license-ISC-blue)";
            break;
        case 'GNU GPLv2' :
            prjLicenseUrl = "![GNU GPLv2](https://img.shields.io/badge/license-GNU%20GPLv2-blue)";
            break;
        default:
            prjLicenseUrl = "";

    } 
    appendLicense(prjLicense,prjLicenseUrl)
}

function appendLicense(prjLicense,prjLicenseUrl){
  if (prjLicenseUrl.length > 0) {
    fs.appendFile('README.md',
   `
    ## License
    ${prjLicenseUrl}`,
    function (err) {
        if (err) throw err;
    });
    }
}

// TODO: Create a function to initialize app
function init() {}

// Function call to initialize app
init();
