const WHITE_SPACE = /\s/;
const SYMBOL_REG = /\(|\)|;|,/;
const NUMBER_REG = /\d/;
const NAME_REG = /[a-zA-Z]/;

// transform token
function tokenizer(input) {
  let currentIndex = 0;
  const tokens = [];
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

// get ast
function parse(tokens) {
  const ast = {
    type: 'program',
    body: [],
  };

  let currentIndex = 0;

  function walk() {
    // 首先判断是否是数字 暂时不处理变量
    let token = tokens[currentIndex];

    if (token.type === 'number') {
      currentIndex++;
      return {
        value: token.value,
        type: 'NumberLiteral',
      };
    }

    // lisp 函数
    if (token.type === 'symbol' && token.value === '(') {
      token = tokens[++currentIndex];

      const node = {
        type: 'CallExpression',
        name: token.value,
        params: [],
      };

      token = tokens[++currentIndex];
      debugger;

      while (
        token.type !== 'symbol' ||
        (token.type === 'symbol' && token.value !== ')')
      ) {
        node.params.push(walk());
        token = tokens[currentIndex];
      }
      // 不要忘记跳过 右括号
      currentIndex++;
      return node;
    }
  }

  while (currentIndex < tokens.length) {
    ast.body.push(walk());
  }

  return ast;
}

const tokens = tokenizer('(add 2 (subtract 4 2))');
console.log(JSON.stringify(parse(tokens)), 'ast');
