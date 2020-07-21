const { readFileSync, writeFileSync } = require('fs');
const path = require('path');
const ana = require('.');

const IGNORES = [
  'beian-domain',
  'awth',
  'auto-deployer',
  'coding-net',
  'wulian',
  'mmonit',
  'nativescript-icam',
  '@dwing/common',
  '@dwing/mysql',
  '@dwing/redis',
  '@airx/sdk',
  '@airx/authcode',
  'coding-deploy',
  '@airx/proto',
  '@airx/swagger-hook',
  '@airdwing/babylon',
  '@airdwing/babel-eslint',
  '@airx/i18n',
  '@airx/request',
  '@dwing/port',
  'mock-redis',
  'mockredis',
  'lslint',
  'edd',
  'hdd',
  'z-curve'
];

(async () => {
  const result = await ana('willin');
  const md = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const item of result) {
    if (!IGNORES.includes(item.name)) {
      md.push(`\n## ${item.name}\n`);
      md.push(item.images);
    }
  }
  const template = readFileSync(path.join(__dirname, '../.template.md'), 'utf-8');

  writeFileSync(path.join(__dirname, '../README.md'), template.replace('<!-- DATA -->', md.join('\n')));
})();
