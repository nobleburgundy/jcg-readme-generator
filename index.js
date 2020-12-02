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
    name: "repository",
    message: "Enter the name of the repository: ",
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
    message: "Usage Information: ",
  },
  {
    type: "input",
    name: "contribution",
    message: "Contribution Guidelines: ",
  },
  {
    type: "input",
    name: "tests",
    message: "Test instructions: ",
  },
  {
    type: "rawlist",
    name: "license",
    choices: ["MIT", "GNU GPLv3", "Mozilla Public License 2.0", "Apache License 2.0", "Other"],
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
  {
    type: "checkbox",
    name: "badges",
    choices: ["Top Language", "Code Size", "Repo Size", "Lines of Code", "No badges please"],
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

const licenseBadgeGenerator = (answers) => {
  const licenseKey = answers.license.toLowerCase().substring(0, answers.license.indexOf(" "));

  const licenseURLMap = {
    mit: `[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/${answers.username}/${answers.repository}/blob/master/LICENSEs)`,
    gnu:
      "[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)",
    mozilla:
      "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)",
    apache:
      "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)",
    other: "",
  };

  return licenseURLMap[licenseKey];
};

const badgeGenerator = (badgeArray) => {
  // Lines of Code https://img.shields.io/tokei/lines/github/${answers.username}/${answers.repository}
  const baseURL = "https://img.shields.io/tokei";
  const badgeObject = {
    linesOfCode: `${baseURL}/lines/github/${answers.username}/${answers.repository}`,
    topLanguage: `${baseURL}/languages/top/github/${answers.username}/${answers.repository}`,
    codeSize: `${baseURL}/languages/code-size/${answers.username}/${answers.repository}`,
  };
};

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

## Installation

${answers.installation}


## Usage 

${answers.howToUse}


## Credits

${answers.credits}


## License

${licenseBadgeGenerator(answers)}

---

## Badges

${answers.badges}

## Contributing

${answers.contributing}

## Tests

${answers.tests}

---`;
};
