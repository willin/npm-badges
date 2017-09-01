const request = require('superagent');
const cheerio = require('cheerio');
const { getDefer } = require('@dwing/common');

module.exports = (username) => {
  const deferred = getDefer();
  request.get(`https://www.npmjs.com/~${username}`).end((err, res) => {
    if (err) {
      deferred.reject(err);
    }
    const $ = cheerio.load(res.text);
    const arr = [];
    $('.collaborated-packages li a').each((i, ele) => {
      const item = $(ele).text();
      arr.push({
        name: item,
        images: `![npm](https://img.shields.io/npm/v/${item}.svg) ![npm](https://img.shields.io/npm/dm/${item}.svg) ![npm](https://img.shields.io/npm/dt/${item}.svg)`
      });
    });
    arr.sort((x, y) => (x.name > y.name ? 1 : -1));
    deferred.resolve(arr);
  });
  return deferred.promise;
};
