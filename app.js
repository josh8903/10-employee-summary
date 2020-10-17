const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { getUnpackedSettings } = require("http2");

const employees = [];

const internPrompt = [{
        type: "input",
        message: "Intern's name:",
        name: "name"
    },
    {
        type: "input",
        message: "Intern's employee ID:",
        name: "id"
    },
    {
        type: "input",
        message: "Intern's e-mail:",
        name: "email"
    },
    {
        type: "input",
        message: "Intern's school:",
        name: "school",
    },
    {
        type: "list",
        message: "What type of employee would you like to add next?",
        name: "nextType",
        choices: [
            "Intern",
            "Engineer",
            "Done"
        ]
    }
];

const engineerPrompt = [{
        type: "input",
        message: "Engineer's name:",
        name: "name"
    },
    {
        type: "input",
        message: "Engineer's employee ID:",
        name: "id"
    },
    {
        type: "input",
        message: "Engineer's e-mail:",
        name: "email"
    },
    {
        type: "input",
        message: "Engineers's github:",
        name: "github",
    },
    {
        type: "list",
        message: "What type of employee would you like to add next?",
        name: "nextType",
        choices: [
            "Intern",
            "Engineer",
            "DONE"
        ]
    }
];

const nextIntern = function(response) {
    employees.push(new Intern(response.name, response.id, response.email, response.school))
    if (response.nextType === "Intern") {
        inquirer
            .prompt(internPrompt)
            .then(nextIntern);
    }
    if (response.nextType === "Engineer") {
        inquirer
            .prompt(engineerPrompt)
            .then(nextEngineer);
    }
    if (response.nextType === "DONE") {
        fs.writeFile(outputPath, render(employees), function(err) {
            if (err) throw err;
            console.log("Generating HTML!");
        });
    }
}

const nextEngineer = function(response) {
    employees.push(new Engineer(response.name, response.id, response.email, response.github))
    if (response.nextType === "Intern") {
        inquirer
            .prompt(internPrompt)
            .then(nextIntern);
    }
    if (response.nextType === "Engineer") {
        inquirer
            .prompt(engineerPrompt)
            .then(nextEngineer);
    }
    if (response.nextType === "DONE") {
        fs.writeFile(outputPath, render(employees), function(err) {
            if (err) throw err;
            console.log("Generating HTML!");
        });
    }
}

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
inquirer
    .prompt([{
            type: "input",
            message: "Manager's name:",
            name: "name"
        },
        {
            type: "input",
            message: "Manager's employee ID:",
            name: "id"
        },
        {
            type: "input",
            message: "Manager's e-mail:",
            name: "email"
        },
        {
            type: "input",
            message: "Manager's office number:",
            name: "officeNumber",
        },
        {
            type: "list",
            message: "What type of employee would you like to add next?",
            name: "nextType",
            choices: [
                "Intern",
                "Engineer",
                "DONE"
            ]
        }

    ])
    .then(function(response) {
        employees.push(new Manager(response.name, response.id, response.email, response.officeNumber))
        if (response.nextType === "Intern") {
            inquirer
                .prompt(internPrompt)
                .then(nextIntern);
        }
        if (response.nextType === "Engineer") {
            inquirer
                .prompt(engineerPrompt)
                .then(nextEngineer);
        }
        if (response.nextType === "DONE") {
            render(employees)
            fs.writeFile(outputPath, render(employees), function(err) {
                if (err) throw err;
                console.log("Generating HTML!");
            });
        }
    });





// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```