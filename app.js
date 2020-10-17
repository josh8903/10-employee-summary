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

// runs initialy, manager prompt
console.log(`\n  ! Welcome to Employee Summary - a simple Node CLI app\n  ! that quickly creates a team interface in HTML!\n\n  ! Now adding new Manager`)
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
        console.log(`  ! ${response.name} added`)
        employees.push(new Manager(response.name, response.id, response.email, response.officeNumber))
        if (response.nextType === "Intern") {
            console.log(`  ! Now adding new ${response.nextType}`)
            inquirer
                .prompt(internPrompt)
                .then(nextIntern);
        }
        if (response.nextType === "Engineer") {
            console.log(`  ! Now adding new ${response.nextType}`)
            inquirer
                .prompt(engineerPrompt)
                .then(nextEngineer);
        }
        if (response.nextType === "DONE") {
            fs.writeFile(outputPath, render(employees), function(err) {
                if (err) throw err;
                console.log(`  ! Writing to ${outputPath}`);
            });
        }
    });

// runs if add intern selected
const nextIntern = function(response) {
    console.log(`  ! ${response.name} added`)
    employees.push(new Intern(response.name, response.id, response.email, response.school))
    if (response.nextType === "Intern") {
        console.log(`  ! Now adding new ${response.nextType}`)
        inquirer
            .prompt(internPrompt)
            .then(nextIntern);
    }
    if (response.nextType === "Engineer") {
        console.log(`  ! Now adding new ${response.nextType}`)
        inquirer
            .prompt(engineerPrompt)
            .then(nextEngineer);
    }
    if (response.nextType === "DONE") {
        fs.writeFile(outputPath, render(employees), function(err) {
            if (err) throw err;
            console.log(`  ! Writing to ${outputPath}`);
        });
    }
}

// runs if add engineer selected
const nextEngineer = function(response) {
    console.log(`  ! ${response.name} added`)
    employees.push(new Engineer(response.name, response.id, response.email, response.github))
    if (response.nextType === "Intern") {
        console.log(`  ! Now adding new ${response.nextType}`)
        inquirer
            .prompt(internPrompt)
            .then(nextIntern);
    }
    if (response.nextType === "Engineer") {
        console.log(`  ! Now adding new ${response.nextType}`)
        inquirer
            .prompt(engineerPrompt)
            .then(nextEngineer);
    }
    if (response.nextType === "DONE") {
        fs.writeFile(outputPath, render(employees), function(err) {
            if (err) throw err;
            console.log(`  ! Writing to ${outputPath}`);
        });
    }
}

// intern prompt
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
            "DONE"
        ]
    }
];

// engineer prompt
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