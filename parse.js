const WHITE_SPACE = /\s/;
const SYMBOL_REG = /\(|\)|;|,/;
const NUMBER_REG = /\d/;
const NAME_REG = /[a-zA-Z]/;

function tokenizer(input) {
  let currentIndex = 0;
  const tokens = [];
  debugger;
  while (currentIndex < input.length) {
    let char = input[currentIndex];

    if (SYMBOL_REG.test(char)) {
      tokens.push({
        type: 'symbol',
        value: char,
      });
      currentIndex++;
      continue;
    }

    if (WHITE_SPACE.test(char)) {
      currentIndex++;
      continue;
    }

    if (NUMBER_REG.test(char)) {
      let value = '';

      while (NUMBER_REG.test(char)) {
        value += char;
        char = input[++currentIndex];
      }
      tokens.push({
        type: 'number',
        value,
      });
      continue;
    }

    if (NAME_REG.test(char)) {
      let value = '';
      while (NAME_REG.test(char)) {
        value += char;
        char = input[++currentIndex];
      }
      tokens.push({
        type: 'name',
        value,
      });
      continue;
    }
  }

  return tokens;
}

console.log(tokenizer('(add 2 (subtract 4 2))'));
