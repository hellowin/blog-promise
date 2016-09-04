const fs = require('fs');

fs.readFile('A.txt', 'utf8', (errA, resA) => {
  fs.readFile('B.txt', 'utf8', (errB, resB) => {
    fs.readFile('C.txt', 'utf8', (errC, resC) => {
      fs.readFile('D.txt', 'utf8', (errD, resD) => {
        console.log(resA, resB, resC, resD);
      });
    });
  });
});
