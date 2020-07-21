const axios = require('axios');

const load = (username, page = '') =>
  axios.get(`https://www.npmjs.com/~${username}${page}`, {
    params: {
      perPage: 1000
    },
    headers: {
      'x-requested-with': 'XMLHttpRequest',
      'x-spiferack': 1
    }
  });

module.exports = async (username) => {
  let canLoop = true;
  const results = [];
  let page = '';
  while (canLoop) {
    // eslint-disable-next-line no-await-in-loop
    const { data: { packages: { objects = [], urls: { next = '' } = {} } = {} } = {} } = await load(username, page);
    results.push(...objects);
    if (next === '') {
      canLoop = false;
    } else {
      page = next;
    }
  }
  return results.map(({ name = '' } = {}) => ({
    name,
    images: `![npm](https://img.shields.io/npm/v/${name}.svg) ![npm](https://img.shields.io/npm/dm/${name}.svg) ![npm](https://img.shields.io/npm/dt/${name}.svg)`
  }));
};
