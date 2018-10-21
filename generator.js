const test = 'And the Golden Grouse And the Pobble who';

// const wordChain = (wordTransitions) => {
//   console.log(wordTransitions);
// };

const textToWordChain = (s) => {
  const l = s.toLowerCase().split(' ');
  const map = {};
  for (let i = 0; i < l.length - 2; i++) {
    const key = [l[i], l[i + 1]];
    if (!map[key]) {
      map[key] = [];
    }
    map[key].push(l[i + 2]);
  }
  return map;
};

console.log(textToWordChain(test));

// const chainToText = (chain) => {
//   console.log(chain);
// };

// const walkChain = (prefix, chain) => {
//   console.log(prefix);
//   console.log(chain);
// };

// const generateText = (startPhrase, wordChain) => {
//   console.log(startPhrase);
//   console.log(wordChain);
// };

// const processFile = (fname) => {
//   console.log(fname);
// };
