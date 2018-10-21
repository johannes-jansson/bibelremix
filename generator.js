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
  console.log(prefix.join(','));
  let possibilities = chain[prefix.join(',')];
  console.log(possibilities);
  if (!possibilities || possibilities[0] === undefined) {
    return prefix;
  }
  possibilities = shuffle(possibilities);
  // console.log(possibilities);
  prefix.push(possibilities[0]);
  console.log(prefix);
  const newPrefix = [prefix[1], prefix[2]];
  console.log(newPrefix);
  return [prefix[0]].concat(walkChain(newPrefix, chain));
};

const generateText = (startPhrase, wordChain) =>
  walkChain(startPhrase.split(' '), wordChain);

// console.log(generateText('the pobble', testChain));
console.log(generateText('and the', testChain));
// console.log(generateText('pobble who', testChain));


// const processFile = (fname) => {
//   console.log(fname);
// };
