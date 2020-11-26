const inquirer = require("inquirer");
const fs = require("fs");

// Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions
const questions = [
  {
    type: "input",
    name: "file_name",
    default: "README.md",
    message: "Enter a name for your file (hit Enter for 'README.md'?",
  },
  {
    type: "input",
    name: "directory",
    default: "./",
    message: "What directory would you like this file saved to (hit Enter for current directory)?",
  },
  {
    type: "input",
    name: "title",
    message: "What is the title of your application?",
  },
  {
    type: "input",
    name: "description",
    message: "Please enter a description: ",
  },
  {
    type: "input",
    name: "installation",
    message: "Enter the installation instructions: ",
  },
  {
    type: "input",
    name: "usage",
    message: "Usage: ",
  },
  {
    type: "input",
    name: "contribution",
    message: "Contribution Guidelines: ",
  },
  {
    type: "input",
    name: "tests",
    message: "How to run tests: ",
  },
  {
    type: "input",
    name: "username",
    message: "Your github username: ",
  },
  {
    type: "input",
    name: "email",
    message: "Email address: ",
  },
];

inquirer
  .prompt(questions)
  .then((answers) => {
    console.log(answers);
    writeReadMe(answers);
  })
  .catch((error) => {
    console.error(error);
  });

const writeReadMe = (answers) => {
  // remove trailing slash if user added it
  if (answers.directory.substring([answers.directory.length - 1]) === "/") {
    answers.directory = answers.directory.substring(0, answers.directory.length - 1);
  }
  fs.writeFile(`${answers.directory}/${answers.file_name}`, readmeString(answers), (error) => {
    error ? console.error(error) : console.log("README successfully created.");
  });
};

const readmeString = (answers) => {
  return `# ${answers.title}

## Description 

${answers.description}

If you need an example of a good README, check out [the VSCode repository](https://github.com/microsoft/vscode).


## Table of Contents (Optional)

${answers.tableOfContents}

* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)


## Installation

${answers.installation}


## Usage 

${answers.howToUse}


## Credits

${answers.credits}



## License

${answers.license} If you need help choosing a license, use [https://choosealicense.com/](https://choosealicense.com/)


---

🏆 The sections listed above are the minimum for a good README, but your project will ultimately determine the content of this document. You might also want to consider adding the following sections.

## Badges

${answers.badges}

![badmath](https://img.shields.io/github/languages/top/nielsenjared/badmath)

Badges aren't _necessary_, per se, but they demonstrate street cred. Badges let other developers know that you know what you're doing. Check out the badges hosted by [shields.io](https://shields.io/). You may not understand what they all represent now, but you will in time.


## Contributing

${answers.contributing}

## Tests

${answers.tests}


---
`;
};
