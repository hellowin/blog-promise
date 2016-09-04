'use strict';

const promiseA = Promise.resolve(1 + 1);
const promiseB = Promise.resolve('Hello I\'m string');
const promiseFail = Promise.reject(new Error('fake error'));

let resultA, resultB, resultFail;

Promise.resolve()
  .then(() => promiseA).then(resA => (resultA = resA)).catch(err => (resultA = 'error in A'))
  .then(() => promiseB).then(resB => (resultB = resB)).catch(err => (resultB = 'error in B'))
  .then(() => promiseFail).then(resFail => (resultFail = resFail)).catch(err => (resultFail = 'error in Fail'))
  .then(() => console.log(
    'result A: ', resultA, '\n',
    'result B: ', resultB, '\n',
    'result Fail: ', resultFail
  ));
