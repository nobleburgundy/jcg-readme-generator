const inquirer = require("inquirer");
const fs = require("fs");

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
    name: "email",
    message: "Email address (used in Questions section for contact): ",
    validate: (value) => {
      if (value) return true;
      return "Email address is required.";
    },
  },
  {
    type: "input",
    name: "repository",
    message: "Enter the name of the repository: ",
    validate: (value) => {
      if (value) return true;
      return "Repository name is required.";
    },
  },
  {
    type: "input",
    name: "title",
    message: "What is the title of your application?",
    validate: (value) => {
      if (value) return true;
      return "Title is required.";
    },
  },
  {
    type: "input",
    name: "description",
    message: "Please enter a description: ",
    validate: (value) => {
      if (value) return true;
      return "Description is required.";
    },
  },
  {
    type: "editor",
    name: "installation",
    message: "Enter the installation instructions: ",
    validate: (value) => {
      if (value) return true;
      return "Installation instructions are required.";
    },
  },
  {
    type: "editor",
    name: "usage",
    message: "Usage information: ",
  },
  {
    type: "input",
    name: "contributing",
    default: `Contributions are welcome. If you are interested in contributing to this project, please open a pull request. Bug fixes, feature requests, and documentation updates/fixes are all encouraged.`,
    message: "Contribution Guidelines (press Enter for default text): ",
  },
  {
    type: "editor",
    name: "tests",
    default: "No tests available at this time",
    message: "Test instructions (default is 'No tests available at this time' if left blank): ",
  },
  {
    type: "list",
    name: "license",
    choices: ["MIT", "GNU GPLv3", "Mozilla Public License 2.0", "Apache License 2.0", "Other"],
  },
  {
    type: "confirm",
    name: "add_credits",
    message: "Would you like to add Credits to the README?",
    filter: function (value) {
      console.log(value);
      this.credits = "";
    },
  },
  {
    type: "editor",
    name: "credits",
    message: "Add credits: ",
    when: (answers) => answers.add_credits,
    filter: (value) => {
      return `\n## Credits\n\n${value}`;
    },
  },
  {
    type: "confirm",
    name: "add_badges",
    message: "Would you like to add some cool badges to your README?",
  },
  {
    type: "input",
    name: "username",
    message: "Your github username: ",
    when: (answers) => answers.add_badges,
    validate: (value) => {
      if (value) return true;
      return "Github username is required to use badges.";
    },
  },
  {
    type: "checkbox",
    name: "badges",
    when: (answers) => answers.username,
    choices: ["Top Language", "Code Size", "Repo Size", "Lines of Code", "Travis Build Status"],
  },
  {
    type: "confirm",
    name: "toc_confirm",
    message: "Would you like to add a Table of Contents to the beginning of the REAMDE?",
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

const licenseBadgeGenerator = (answers, color) => {
  const licenseKey =
    answers.license === "MIT" ? "mit" : answers.license.toLowerCase().substring(0, answers.license.indexOf(" "));
  const licenseURLMap = {
    mit: `[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?color=${color})](https://github.com/${answers.username}/${answers.repository}/blob/master/LICENSE)`,
    gnu: `[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-${color}.svg)](https://opensource.org/licenses/)`,
    mozilla: `[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-${color}.svg)](https://opensource.org/licenses/MPL-2.0)`,
    apache: `[![License](https://img.shields.io/badge/License-Apache%202.0-${color}.svg)](https://opensource.org/licenses/Apache-2.0)`,
    other: "",
  };

  return licenseURLMap[licenseKey];
};

const badgeGenerator = (answers, color = "blue") => {
  const baseURL = "https://img.shields.io";
  const badgeObject = {
    "Top Language": `![Top Language](${baseURL}/github/languages/top/${answers.username}/${answers.repository}?color=${color})`,
    "Code Size": `![Code Size](${baseURL}/github/languages/code-size/${answers.username}/${answers.repository}?color=${color})`,
    "Repo Size": `![Repo Size](${baseURL}/github/repo-size/${answers.username}/${answers.repository}?color=${color})`,
    "Lines of Code": `![Lines of Code](${baseURL}/tokei/lines/github/${answers.username}/${answers.repository}?color=${color})`,
    "Travis Build Status": `[![Build Status](https://travis-ci.com/${answers.username}/${answers.repository}.svg?branch=main)](https://travis-ci.com/nobleburgundy/pwa-budget)`,
  };

  let badgeString = "";
  if (answers.badges) {
    answers.badges.forEach((element) => {
      badgeString += badgeObject[element] + "\n";
    });
  }

  return badgeString;
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

const tableOfContentsGenerator = (answers) => {
  let tocString = "";
  if (answers.toc_confirm) {
    tocString = "\n\n## Table of Contents\n";
    const sectionArr = [
      "descrtiption",
      "installation",
      "usage",
      "credits",
      "license",
      "contributing",
      "tests",
      "questions",
    ];
    sectionArr.forEach((section) => {
      if (answers[section]) {
        tocString += `\n- [${capitalize(section)}](#${section})`;
      }
    });
    console.log(tocString);
  }
  return tocString;
};

const capitalize = (word) => {
  return word[0].toUpperCase() + word.substring(1);
};

// readme string template
// TODO - handle optional sections better
const readmeString = (answers) => {
  if (!answers.credits) {
    answers.credits = "";
  }
  return `# ${answers.title}
${badgeGenerator(answers)} ${licenseBadgeGenerator(answers, "red")}
${tableOfContentsGenerator(answers)}

## Description 

${answers.description}

## Installation

${answers.installation}

## Usage 

${answers.usage}
${answers.credits}
## License

Licensed under the ${answers.license} license.

${licenseBadgeGenerator(answers, "red")}

## Contributing

${answers.contributing}

## Tests

${answers.tests}

## Questions? 

Please contact me via email at ${answers.email} with any questions.
`;
};
