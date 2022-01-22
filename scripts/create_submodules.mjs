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
    const [, , filepath] = process.argv;
    const data = fs.readFileSync(filepath, 'UTF-8');

    // split the contents by new line
    const lines = data.split(/\r?\n/);

    // print all lines
    lines.filter(line => line.length > 0).forEach((line) => {
        let chunks = line.split(' ')
        const repo_url = chunks[chunks.length - 1]
        chunks = repo_url.split('/')
        let repo_name = chunks[chunks.length - 1]
        repo_name = repo_name.split('.')[0]
        const str1 = `[submodule "src/modules/${repo_name}"]`
        const str2 = `  path = src/modules/${repo_name}`
        const str3 = `  url = ${repo_url}`

        content += str1 + "\n" + str2 + "\n" + str3 + "\n";
    });
    console.log(content)
} catch (err) {
    console.error(err);
}
// data.compilerOptions.strict = false

// writeFile(content)
