import stringify from 'csv-stringify/lib/sync.js';
import json from './data.json';
import fs from 'fs'

const outputString = stringify(json.project, { header: true, bom: true });

console.log(outputString);
fs.writeFileSync('a.csv', outputString)
