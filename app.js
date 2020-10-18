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

// base prompt
const promptAll = [{
        type: "input",
        message: "Name:",
        name: "name",
        validate: answer => {
            if (answer !== "") {
                return true;
            }
            return "Please enter at least one character.";
        }
    },
    {
        type: "input",
        message: "Employee ID:",
        name: "id",
        validate: answer => {
            if (answer !== "") {
                return true;
            }
            return "Please enter at least one character.";
        }
    },
    {
        type: "input",
        message: "E-mail:",
        name: "email",
        validate: answer => {
            const pass = answer.match(
                /\S+@\S+\.\S+/
            );
            if (pass) {
                return true;
            }
            return "Please enter a valid email address.";
        }
    }
];

// prompt addon - manager
const promptManager = {
    type: "input",
    message: "Office number:",
    name: "officeNumber",
    validate: answer => {
        if (answer !== "") {
            return true;
        }
        return "Please enter at least one character.";
    }
};

// prompt addon - intern
const promptIntern = {
    type: "input",
    message: "School:",
    name: "school",
    validate: answer => {
        if (answer !== "") {
            return true;
        }
        return "Please enter at least one character.";
    }
};

// prompt addon - engineer
const promptEngineer = {
    type: "input",
    message: "Github:",
    name: "github",
    validate: answer => {
        if (answer !== "") {
            return true;
        }
        return "Please enter at least one character.";
    }
};

// prompt addon - choose next
const promptNext = {
    type: "list",
    message: "What type of employee would you like to add next?",
    name: "next",
    choices: [
        "Intern",
        "Engineer",
        "DONE"
    ]
};

// initialize 
function init() {
    console.log(`\n- - - - - - - - - - - - - - -\nWelcome to Employee Summary!\nA Node CLI app that quickly\nassembles a work team HTML UI!\n- - - - - - - - - - - - - - -\n\n! Adding new manager ->`)
    let prompt = promptAll.slice()
    prompt.push(promptManager, promptNext)
    inquirer
        .prompt(prompt)
        .then(function(response) {
            console.log(`! Added ${response.name}\n`)
            employees.push(new Manager(response.name, response.id, response.email, response.officeNumber))
            next(response)
        })
}

// next choice handler
function next(response) {
    if (response.next === "Intern") {
        intern()
    }
    if (response.next === "Engineer") {
        engineer()
    }
    if (response.next === "DONE") {
        if (!fs.existsSync(OUTPUT_DIR)) {
            console.log(`! Creating output directory ${OUTPUT_DIR}`)
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFile(outputPath, render(employees), function(err) {
            console.log(`! Writing to file ${outputPath}\n! END\n`)
            if (err) throw err
        })
    }
}

// add intern
function intern() {
    console.log(`! Adding new intern ->`)
    let prompt = promptAll.slice()
    prompt.push(promptIntern, promptNext)
    inquirer
        .prompt(prompt)
        .then(function(response) {
            console.log(`! Added ${response.name}\n`)
            employees.push(new Intern(response.name, response.id, response.email, response.school))
            next(response)
        })
}

// add engineer
function engineer() {
    console.log(`! Adding new engineer ->`)
    let prompt = promptAll.slice();
    prompt.push(promptEngineer, promptNext)
    inquirer
        .prompt(prompt)
        .then(function(response) {
            console.log(`! Added ${response.name}\n`)
            employees.push(new Engineer(response.name, response.id, response.email, response.github))
            next(response)
        })
}

init()