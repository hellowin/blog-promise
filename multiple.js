'use strict';

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

// variable outside promise scope
let resultA = null;
let resultB = null;
let resultFail = null;

promiseA
  .then(resA => {
    resultA = resA;
    return promiseB;
  })
  .then(resB => {
    resultB = resB;
    return promiseFail;
  })
  .then(resFail => {
    // remember this never happend
    resultFail = resFail;
  })
  .catch(err => console.log('no worries, go ahead'))
  .then(() => {
    // here we have resultA, resultB, but resultFail still null;
    console.log('resA: ', resultA);
    console.log('resB: ', resultB);
    console.log('resFail: ', resultFail);
  });

// Id error, write string 'error' instead of null
let resultA2 = null;
let resultB2 = null;
let resultFail2 = null;

promiseA
  .then(resA     => (resultA2 = resA))
  .catch(errA    => (resultA2 = 'error'))

  .then(()       => promiseB)
  .then(resB     => (resultB2 = resB))
  .catch(errB    => (resultB2 = 'error'))

  .then(()       => promiseFail)
  .then(resFail  => (resultFail2 = resFail))
  .catch(errFail => (resultFail2 = 'error'))

  .then(()       => {
    console.log('resA: ', resultA2);
    console.log('resB: ', resultB2);
    console.log('resFail: ', resultFail2);
  });
