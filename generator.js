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
    || result.length > 30
  ) {
    return result;
  }
  result.push(possibilities[Math.floor(Math.random() * possibilities.length)]);
  return walkChain(result, chain);
};

// Wrapper for walkChain
const generateText = (startPhrase, wordChain) =>
  walkChain(startPhrase.split(' '), wordChain).join(' ').replace(/[.!:][^.!:]*?$/g, '') + '.';

// Creates wordChain from filename
// const processFile = fname =>
//   textToWordChain(fs.readFileSync('resources/' + fname, 'utf8'));

// const chain = processFile('gospel.txt');
// console.log(generateText('Så älskade', chain));

// eslint-disable-next-line no-undef
const chain = textToWordChain(text);

document.addEventListener('click', function (event) {
  if (event.target.matches('#generate-button')) {
    event.preventDefault();
    const userPrefix = document.getElementById('input-prefix').value;
    const verse = generateText(userPrefix, chain);
    document.getElementById('textplace').innerHTML = '<p>' + verse + '</p>';
    document.getElementById('more-button').style.display = 'inline';
  }
  if (event.target.matches('#more-button')) {
    console.log('test');
    event.preventDefault();
    const currentText = document.getElementById('textplace').innerHTML.replace(/<p>/g, '').replace(/<\/p>/g, '');
    let userPrefix = currentText.split(' ');
    userPrefix = userPrefix[userPrefix.length - 2] + ' ' + userPrefix[userPrefix.length - 1];
    let verse = generateText(
      userPrefix.substring(0, userPrefix.length - 1),
      chain,
    );
    verse = verse.split(' ');
    verse.shift();
    verse.shift();
    verse = verse.join(' ');
    verse = verse.charAt(0).toUpperCase() + verse.slice(1);
    document.getElementById('textplace').innerHTML = '<p>' + currentText + ' ' + verse + '</p>';
  }
});
