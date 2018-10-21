// const fs = require('fs');

// Transforms a string into a word chain
const textToWordChain = (s) => {
  const l = s.replace(/['"”]+/g, '').split(' ');
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

// Walks the chain!
const walkChain = (result, chain) => {
  const prefix = result[result.length - 2] + ',' + result[result.length - 1];
  const possibilities = chain[prefix];
  if (
    !possibilities
    || possibilities[0] === undefined
    || result.length > 100
  ) {
    return result;
  }
  result.push(possibilities[Math.floor(Math.random() * possibilities.length)]);
  return walkChain(result, chain);
};

// Wrapper for walkChain
const generateText = (startPhrase, wordChain) =>
  walkChain(startPhrase.split(' '), wordChain);

// Creates wordChain from filename
// const processFile = fname =>
//   textToWordChain(fs.readFileSync('resources/' + fname, 'utf8'));

// const chain = processFile('gospel.txt');
// console.log(generateText('Så älskade', chain).join(' '));

// eslint-disable-next-line no-undef
const chain = textToWordChain(text);

document.addEventListener('click', function (event) {
  if (!event.target.matches('#generate-button')) return;
  event.preventDefault();
  const userPrefix = document.getElementById('input-prefix').value;
  const verse = generateText(userPrefix, chain).join(' ');
  document.getElementById('textplace').innerHTML = '<p>' + verse + '</p>';
});
