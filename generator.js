const fs = require('fs');

// const test = 'And the Golden Grouse And the Pobble who';

const textToWordChain = (s) => {
  const l = s.toLowerCase().split(' ');
  l.push(undefined);
  const map = {};
  for (let i = 0; i < l.length - 1; i++) {
    const key = [l[i], l[i + 1]];
    if (!map[key]) {
      map[key] = [];
    }
    map[key].push(l[i + 2]);
  }
  return map;
};

// const testChain = textToWordChain(test);
// console.log(testChain);

// const chainToText = (chain) => {
//   console.log(chain);
// };

const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const verbose = false;
const walkChain = (result, chain) => {
  const prefix = result[result.length - 2] + ',' + result[result.length - 1];
  let possibilities = chain[prefix];
  if (verbose) console.log(possibilities);
  if (!possibilities || possibilities[0] === undefined || result.length > 10) {
    return result;
  }
  possibilities = shuffle(possibilities);
  result.push(possibilities[0]);
  if (verbose) console.log(result);
  return walkChain(result, chain);
};

const generateText = (startPhrase, wordChain) =>
  walkChain(startPhrase.split(' '), wordChain);

// console.log(generateText('the pobble', testChain));
// console.log(generateText('and the', testChain));
// console.log(generateText('pobble who', testChain));

const processFile = fname =>
  textToWordChain(fs.readFileSync('resources/' + fname, 'utf8'));

// const processFileAsync = (fname) => {
//   fs.readFile('resources/' + fname, 'utf8', (err, data) => {
//     if (!err) {
//       return textToWordChain(data);
//     }
//     return {};
//   });
// };

// const files = ['gospel.txt'];
// let chain = {};
// for (let i = 0; i < files.length; i++) {
//   chain = processFile(files[i]);
// }
// console.log(chain);

const chain = processFile('gospel.txt');
console.log(generateText('då sade', chain));
