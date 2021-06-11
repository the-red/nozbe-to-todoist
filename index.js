#!/usr/bin/env node

const stringify = require('csv-stringify/lib/sync.js');
const fs = require('fs');
const path = require('path');
const json = require(path.resolve(process.argv[2]));

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

  const todoistFileName = `dist/todoist-${project.name}.csv`;
  fs.writeFileSync(todoistFileName, stringify(todoistTemplate, opts));
  console.log(todoistFileName);
});
