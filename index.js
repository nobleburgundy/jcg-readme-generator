const inquirer = require("inquirer");
const fs = require("fs");

// Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions
const questions = [
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
  })
  .catch((error) => {
    console.error(error);
  });
