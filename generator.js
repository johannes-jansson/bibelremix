const test = 'And the Golden Grouse And the Pobble who';

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

const testChain = textToWordChain(test);
console.log(testChain);

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

const walkChain = (prefix, chain) => {
  const result = prefix.split(',');
  console.log(result);
  let possibilities = chain[prefix];
  console.log(possibilities);
  if (!possibilities || possibilities[0] === undefined) {
    return result;
  }
  possibilities = shuffle(possibilities);
  // console.log(possibilities);
  result.push(possibilities[0]);
  console.log(result);
  const newPrefix = result[1] + ',' + result[2];
  console.log(newPrefix);
  return [result[0]].concat(walkChain(newPrefix, chain));
};

console.log(walkChain('the,pobble', testChain));
console.log(walkChain('and,the', testChain));
// console.log(walkChain('pobble,who', testChain));

// const generateText = (startPhrase, wordChain) => {
//   console.log(startPhrase);
//   console.log(wordChain);
// };

// const processFile = (fname) => {
//   console.log(fname);
// };
