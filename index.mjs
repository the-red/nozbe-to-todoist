import stringify from 'csv-stringify/lib/sync.js';
import json from './data.json';
import fs from 'fs';

fs.mkdirSync('dist', { recursive: true });

const project = stringify(json.project, { header: true, bom: true });
const task = stringify(json.task, { header: true, bom: true });
fs.writeFileSync(`dist/project.csv`, project);
fs.writeFileSync(`dist/task.csv`, task);

json.project.forEach((project) => {
  project.id, project.name;

  const taskObj = json.task
    .filter((_) => _.project_id === project.id)
    .map((_) => {
      return {
        TYPE: 'task',
        CONTENT: _.name,
        DESCRIPTION: _.comments.map((_) => _.body).join('\n'),
        PRIORITY: _.next || '4',
        INDENT: '1',
        AUTHOR: '',
        RESPONSIBLE: '',
        DATE: _.datetime,
        DATE_LANG: '',
        TIMEZONE: '',
      };
    });
  const todoist = stringify(taskObj, { header: true, bom: true });
  fs.writeFileSync(`dist/todoist-${project.name}.csv`, todoist);
});
