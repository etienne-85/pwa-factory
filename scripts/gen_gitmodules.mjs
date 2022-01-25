/**
 * create configuration for .gitmodules from a list of repositories
 * 
 * usage:
 *  node gen_gitmodules.mjs file
 * 
 * where file contains the modules and should be formatted as below:
 * github.com:user/repo.git 
 * gitlab.com:user/repo.git 
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
        // let chunks = line.split(' ')
        // const url = chunks[chunks.length - 1]
        let chunks = line.split('@')
        const repo_url = chunks.length > 1 ? chunks[1] : line
        chunks = repo_url.split('/')
        let repo_name = chunks[chunks.length - 1]
        repo_name = repo_name.split('.')[0]

        const line1 = `[submodule "src/modules/${repo_name}"]\n`
        const line2 = `  path = src/modules/${repo_name}\n`
        const line3 = `  url = git@${repo_url}\n`

        content += line1 + line2 + line3;
    });
    console.log(content)
} catch (err) {
    console.error(err);
}
