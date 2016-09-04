'use strict';

const fs = require('fs');

const promiseA = new Promise((resolve, reject) => {
  fs.readFile('A.txt', 'utf8', (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
})
.catch(err => console.log('no worries, already handled'));

const promiseB = new Promise((resolve, reject) => {
  fs.readFile('B.txt', 'utf8', (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
})
.catch(err => console.log('no worries, already handled'));

const promiseC = new Promise((resolve, reject) => {
  fs.readFile('C.txt', 'utf8', (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
})
.catch(err => console.log('no worries, already handled'));

const promiseD = new Promise((resolve, reject) => {
  fs.readFile('D.txt', 'utf8', (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
})
.catch(err => console.log('no worries, already handled'));


const promiseFail = new Promise((resolve, reject) => {
  fs.readFile('XXX.txt', 'utf8', (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
})
.catch(err => console.log('no worries, already handled'));

// run success only
Promise.all([promiseA, promiseB, promiseC, promiseD])
  .then(ress => {
    console.log('result A: ', ress[0]);
    console.log('result B: ', ress[1]);
    console.log('result C: ', ress[2]);
    console.log('result D: ', ress[3]);
  })
  .catch(err => console.log(err));

// run all
Promise.all([promiseA, promiseB, promiseC, promiseD, promiseFail])
  .then(ress => {
    console.log('result A: ', ress[0]);
    console.log('result B: ', ress[1]);
    console.log('result C: ', ress[2]);
    console.log('result D: ', ress[3]);
    console.log('result E: ', ress[4]);
  })
  .catch(err => console.log(err));
