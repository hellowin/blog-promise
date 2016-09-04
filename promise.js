const fs = require('fs');

const promiseAsync = new Promise((resolve, reject) => {
  fs.readFile('A.txt', 'utf8', (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

promiseAsync
  .then(res => console.log('hasil async: ', res))
  .catch(err => console.log('error', err));

const promiseSync = new Promise(resolve => {
  resolve('hasil');
});

promiseSync
  .then(res => console.log('hasil sync: ', res));
