const ana = require('./');
const { readFileSync, writeFileSync } = require('fs');
const path = require('path');

(async () => {
  const result = await ana('willin');
  const md = [];
  for (const item of result) {
    md.push(`\n## ${item.name}\n`);
    md.push(item.images);
  }
  const template = readFileSync(path.join(__dirname, '../.template.md'), 'utf-8');

  writeFileSync(path.join(__dirname, '../README.md'), template.replace('===DATA===', md.join('\n')));
})();
