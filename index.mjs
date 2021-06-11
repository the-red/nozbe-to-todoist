import stringify from 'csv-stringify/lib/sync.js';
import json from './data.json';
import fs from 'fs';

fs.mkdirSync('dist', { recursive: true });
const opts = { header: true, bom: true };

fs.writeFileSync(`dist/project.csv`, stringify(json.project, opts));
fs.writeFileSync(`dist/task.csv`, stringify(json.task, opts));

json.project.forEach((project) => {
  const todoistTemplate = json.task
    .filter((_) => _.project_id === project.id)
    .flatMap((_) => {
      const task = {
        TYPE: 'task',
        CONTENT: _.name,
        DESCRIPTION: '',
        PRIORITY: _.next || '4',
        INDENT: '1',
        AUTHOR: '',
        RESPONSIBLE: '',
        DATE: _.datetime,
        DATE_LANG: '',
        TIMEZONE: '',
      };
      const subtasks = _.comments.map((_) => ({
        TYPE: 'task',
        CONTENT: _.body,
        PRIORITY: '4',
        INDENT: '2',
      }));
      return [task, ...subtasks];
    });

  fs.writeFileSync(
    `dist/todoist-${project.name}.csv`,
    stringify(todoistTemplate, opts)
  );
});
