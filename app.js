const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const employeeArray = [];

function employeeType() {
  inquirer
    .prompt({
      type: "list",
      choices: ["Engineer", "Intern", "None"],
      name: "entryChoice",
      message: "What Type of Team Member Do You Want to Add?",
    })
    .then((response) => {
      if (response.entryChoice === "Engineer") {
        engineer();
      } else if (response.entryChoice === "Intern") {
        intern();
      } else {
        createHtml();
      }
    });
}

function engineer() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "engineerName",
        message: "What is the Engineer's Name?",
        validate: (answer) => {
          if ((answer = "")) {
            return "Please Enter a Valid Name.";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "engineerId",
        message: "What is the Engineer's ID Number?",
        validate: (answer) => {
          if (isNaN(answer)) {
            return "Please Enter a Valid ID Number.";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "engineerEmail",
        message: "What is the Engineer's Email Address?",
        validate: (answer) => {
          if (answer === "" || !emailRegexp.test(answer)) {
            return "Please Enter a Valid Email Address.";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "engineerGitHub",
        message: "What is the Engineer's GitHub Profile?",
        validate: (answer) => {
          if ((answer = "")) {
            return "Please Enter a Valid GitHub Profile.";
          }
          return true;
        },
      },
    ])
    .then((data) => {
      engineerInfo = new Engineer(
        data.engineerName,
        data.engineerId,
        data.engineerEmail,
        data.engineerGitHub
      );
      employeeArray.push(engineerInfo);
      employeeType();
    });
}

function intern() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "internName",
        message: "What is the Intern's Name?",
        validate: (answer) => {
          if ((answer = "")) {
            return "Please Enter a Valid Name.";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "internID",
        message: "What is the Intern's ID Number?",
        validate: (answer) => {
          if (isNaN(answer)) {
            return "Please Enter a Valid ID Number.";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "internEmail",
        message: "What is the Intern's Email Address?",
        validate: (answer) => {
          if (answer === "" || !emailRegexp.test(answer)) {
            return "Please Enter a Valid Email Address.";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "internSchool",
        message: "What is the Intern's School?",
        validate: (answer) => {
          if ((answer = "")) {
            return "Please Enter a Valid School Name.";
          }
          return true;
        },
      },
    ])
    .then((data) => {
      internInfo = new Intern(
        data.internName,
        data.internID,
        data.internEmail,
        data.internSchool
      );
      employeeArray.push(internInfo);
      employeeType();
    });
}

function createHtml() {
  let html = render(employeeArray);

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, {
      recursive: true,
    });
  }

  fs.writeFileSync(outputPath, html);
}

inquirer
  .prompt([
    {
      type: "input",
      name: "managerName",
      message: "What is the Team Manager's Name?",
      validate: (answer) => {
        if ((answer = "")) {
          return "Please Enter a Valid Name.";
        }
        return true;
      },
    },
    {
      type: "input",
      name: "managerId",
      message: "What is the Team Manager's ID Number?",
      validate: (answer) => {
        if (isNaN(answer)) {
          return "Please Enter a Valid ID Number.";
        }
        return true;
      },
    },
    {
      type: "input",
      name: "managerEmail",
      message: "What is the Team Manager's Email Address?",
      validate: (answer) => {
        if (answer === "" || !emailRegexp.test(answer)) {
          return "Please Enter a Valid Email Address.";
        }
        return true;
      },
    },
    {
      type: "input",
      name: "managerOffice",
      message: "What is the Team Manager's Office Number?",
      validate: (answer) => {
        if (isNaN(answer)) {
          return "Please Enter a Valid ID Number.";
        }
        return true;
      },
    },
  ])
  .then((data) => {
    managerInfo = new Manager(
      data.managerName,
      data.managerId,
      data.managerEmail,
      data.managerOffice
    );
    employeeArray.push(managerInfo);
  })
  .then(() => {
    employeeType();
  });
