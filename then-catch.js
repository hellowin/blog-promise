const fs = require('fs');

const promiseA = new Promise((resolve, reject) => {
  fs.readFile('A.txt', 'utf8', (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

const promiseB = new Promise((resolve, reject) => {
  fs.readFile('B.txt', 'utf8', (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

const promiseFail = new Promise((resolve, reject) => {
  fs.readFile('XXX.txt', 'utf8', (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

promiseA
  .then(resA => {
    console.log('hasil A: ', resA);
    return promiseB;
  })
  .then(resB => {
    console.log('hasil B: ', resB);
    return promiseFail;
  })
  .then(resFail => {
    console.log('hasil fail: ', resFail);
  })
  .catch(err => console.log('error: ', err));
