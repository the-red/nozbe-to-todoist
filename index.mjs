import stringify from 'csv-stringify/lib/sync.js';
import json from './data.json';
import fs from 'fs';

fs.mkdirSync('dist', { recursive: true });

const project = stringify(json.project, { header: true, bom: true });
const task = stringify(json.task, { header: true, bom: true });

fs.writeFileSync(`dist/project.csv`, project);
fs.writeFileSync(`dist/task.csv`, task);
