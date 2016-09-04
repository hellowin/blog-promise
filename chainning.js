'use strict';

const fs = require('fs');

const promise = new Promise((resolve, reject) => {
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
})

// 1. editing success result with sync process
promise
  .then(res => {
    const newRes = res + 'additional string';
    return newRes;
  })
  .then(res => console.log(res))

// 2. editing success result with async process using external variable
let result = null;
promise
  .then(res => (result = res))
  .then(() => promiseB)
  .then(res => (result = result + res))
  .then(res => console.log(res));

// 3. editing success result with async process without external variable
promise
  .then(resA => {
    // result A is available here

    // chain promise B in particular
    return promiseB.then(resB => {
      // here we have both result A and B
      const result = resA + resB;
      return result;
    });
  })
  .then(res => console.log(res));

// 4. handling error internally using sync process
promise
  .catch(errA => {
    // doing something when promise A error
    // this example modification with sync process
    return 'A is error';
  })
  .then(resA => {
    return promiseB
      .catch(errB => 'B is error')
      .then(resB => resA + resB);
  })
  .then(resAB => {
    return promiseFail
      .catch(errFail => 'Fail is always error')
      .then(resFail => resAB + resFail);
  })
  .then(res => {
    console.log(res);
  });
