// #!/user/sokol/AppData/Roaming/npm/node_modules/nodealexmozg node
// //#!/C:/ProgramData/Microsoft/Windows/Start_Menu/Programs Node


const fs = require("fs");
const { lstatSync } = require('fs');
const yargs = require("yargs");
const path = require("path");
const readline = require("readline");
const inquirer = require("inquirer");
const { resolve } = require("path");
const { rawListeners } = require("process");

let executionDirectory = process.cwd();
console.log(executionDirectory);

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

//_______________________________________________________________________________________
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// rl.question("Please enter the path to the file: ", function (inputedPath) {
//     console.log('no end!', inputedPath);
//     filePath = path.join(__dirname, inputedPath);
//     console.log('current path = ', filePath);
//     fs.promises.readFile(filePath, 'utf8', (_err, data) => {
//         console.log(data);
//     }).then
//     rl.close();
// });

//Хорошее решение!
// const question = async (question) => new Promise(resolve => rl.question(question, resolve));
// (async () => {
//     const filePath = await question('Enter file path: ');
//     const encoding = await question('Enter code: ');
//     const data = fs.readFileSync(filePath, encoding);
//     console.log(data);
//     rl.close();
// })();

// rl.on("close", function () {
//     console.log('yes end');
//     process.exit(0);
// });

//____________________________________________________________________________


// const isFile = fileName => {
//     return fs.lstatSync(fileName).isFile();
// }

// //const list = fs.readdirSync(__dirname).filter(isFile);
//const list = fs.readdirSync(executionDirectory).filter(isFile);
//const list = fs.readdirSync(executionDirectory);

// inquirer
//     .prompt([{
//         name: "fileName",
//         type: "list", //input, number, list, confirm, checkbox, password
//         message: "Choose file: ",
//         choices: list, //['a','b','c','d',...]
//     }])
//     .then((answer) => {
//         console.log(answer.fileName);
//         //const filePath = path.join(__dirname, answer.fileName);
//         const filePath = path.join(executionDirectory, answer.fileName);
//         //const filePath = path.resolve(executionDirectory, answer.fileName)

//         fs.readFile(filePath, 'utf8', (err, data) => {
//             console.log(data);
//         });
//     });

class ListItem {
    constructor(path, fileName) {
        this.path = path;
        this.fileName = fileName;
    }
    get isDir() {
        return fs.lstatSync(this.path).isDirectory();
    }
}

//let executionDirectory = options.positional;

const run = async () => {
    //const list = fs.readdir(executionDirectory);
    //const items = list.map(fileName => new ListItem(path.join(executionDirectory, fileName), fileName));

    const item = await inquirer
        .prompt([
            {
                name: "fileName",
                type: "list",
                message: `Choose: ${executionDirectory}`,
                choices: items.map(item => ({ name: item.fileName, value: item }))
            }
        ])
        .then(answer => answer.fileName);


    if (item.isDir) {
        executionDirectory = item.path;
        return await run();
    } else {
        const data = fs.readFile(item.path, 'utf-8');

        if (!options.p) console.log(data);
        else {
            const regExp = new RegExp(options.p, '127');
            console.log(data.match(regExp));
        }
    }
}

run();