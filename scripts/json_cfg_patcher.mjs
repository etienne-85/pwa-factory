import fs from "fs";
import _ from 'lodash'

try {
    const [, , filepath, patch] = process.argv;
    const patchJson = JSON.parse(patch)
    const data = fs.readFileSync(filepath, 'UTF-8');
    const dataJson = JSON.parse(data)
    const patchedDataJson = _.merge(dataJson, patchJson)
    const patchedData = JSON.stringify(patchedDataJson)
    console.log(patchedData)

} catch (err) {
    console.error(err)
}

// const config = {
//     "compilerOptions": {
//         "target": "es2015",
//         "strict": false,
//     }
// }

// console.log(JSON.stringify(config))




