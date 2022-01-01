const fs = require("fs");
const yargs = require("yargs");
const path = require("path");
const inquirer = require("inquirer");


let executionDirectory = process.cwd();

const options = yargs
    .positional('d', {
        describe: 'Path to directory',
        default: process.cwd(),
    })
    .positional('p', {
        describe: 'Pattern',
        default: '',
    })
    // .usage("Usage: -p <path>")
    // .option("p", { alias: "path", describe: "Path to file", type: "string", demandOption: true })
    .argv;

let proba = () => {

    let list = fs.readdirSync(executionDirectory);

    inquirer
        .prompt([{
            name: "fileName",
            type: "list", //input, number, list, confirm, checkbox, password
            message: "Choose file: ",
            choices: list, //['a','b','c','d',...]
        }])
        .then((answer) => {

            //const filePath = path.join(__dirname, answer.fileName);
            let filePath = path.join(executionDirectory, answer.fileName);

            //const filePath = path.resolve(executionDirectory, answer.fileName)

            if (fs.lstatSync(filePath).isDirectory()) {
                executionDirectory = filePath;
                console.log('это директория', filePath);

                return proba();
            } else {
                fs.readFile(filePath, 'utf8', (err, data) => {
                    console.log(data);
                });
            }
        });
};

proba();