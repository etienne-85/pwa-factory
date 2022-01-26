/**
 * create checkout script for from a list of repositories
 * 
 * usage:
 *  node gen_checkout_script.mjs file
 * 
 * where file contains the modules and should be formatted as below:
 * github.com/user/repo.git 
 * gitlab.com/user/repo.git 
 */
// import data from '../../modules.txt'
import fs from "fs";

// const writeFile = (content) => {
//     try {
//         fs.writeFileSync('./.gitmodules', content)
//         //file written successfully
//     } catch (err) {
//         console.error(err)
//     }
// }
// console.log(data)
let content = ""

try {
    const [, , modulesIndexFile] = process.argv;
    const data = fs.readFileSync(modulesIndexFile, 'UTF-8');

    // split the contents by new line
    const lines = data.split(/\r?\n/);

    // print all lines
    lines.filter(line => line.length > 0).forEach((line) => {
        // check for credentials provided
        const lineSplit = line.split('@')
        // let logCI = lineSplit.length > 1 ? "using authentication" : "no credentials provided"
        // console.log(process.env.CI ? logCI : "local environement => ssh clone mode")
        // transform any credentials vars in env var here for safety purpose
        line = line.replace(/GIT_USR/, "$GIT_USR")
        line = line.replace(/GIT_PWD/, "$GIT_PWD")
        line = process.env.CI || lineSplit.length === 1 ? line : lineSplit[1]
        line = process.env.CI ? line : line.replace(/\//, ":")
        const clone_method = process.env.CI ? 'https://' : 'git@'
        content += `git clone ${clone_method}${line}\n`;
    });
    console.log(content)
} catch (err) {
    console.error(err);
}
