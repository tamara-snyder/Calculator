const divide = (x, y) => y == 0 ? 'Error! Press C' : parseFloat(x) / parseFloat(y),

multiply = (x, y) => parseFloat(x) * parseFloat(y),

subtract = (x, y) => parseFloat(x) - parseFloat(y),

add = (x, y) => parseFloat(x) + parseFloat(y),

percent = (x) => parseFloat(x) * 0.01;

// Elements
const clear = document.getElementById('clear'),
negative = document.getElementById('negative'),
decimal = document.getElementById('decimal'),
result = document.getElementById('result'),
numbers = document.querySelectorAll('.number'),
operators = document.querySelectorAll('.operator');

let isPositive = true,
hasDecimal = false,
operatorLastPushed = false,
calculatedLast = false;

// Operators
const division = document.getElementById('divide');
const multiplication = document.getElementById('multiply');
const subtraction = document.getElementById('subtract');
const addition = document.getElementById('add');
const percentage = document.getElementById('percent');
const equals = document.getElementById('calculate');

// Stored values
let stored1 = '',
stored2 = '',
op = '';

// Event Listeners
clear.addEventListener('click', function() {
  reset();
});
negative.addEventListener('click', function() {
  if (isPositive) {
    result.innerHTML = '-' + result.innerHTML;
    isPositive = false;
  } else {
    result.innerHTML = result.innerHTML.replace('-', '');
    isPositive = true;
  }
});
equals.addEventListener('click', function() {
  stored2 = result.innerHTML;
  calculate(stored1, stored2);
});
percentage.addEventListener('click', function() {
  stored1 = result.innerHTML;
  result.innerHTML = percent(stored1);
})

// Functions
function input() {
  setNumbers();
  setOps();
}

function setNumbers() {
    numbers.forEach(number => {
      number.addEventListener('click', function() {
        clear.innerHTML = 'C';
        if (operatorLastPushed && stored1 !== '' || calculatedLast) { 
          result.innerHTML = number.innerHTML;
          stored2 = result.innerHTML;
          operatorsReset();
          calculatedLast = false;
          return operatorLastPushed = false;
        }
        // Gets rid of starting 0 when number is clicked:
        if (number.id === 'decimal') {
          if (result.innerHTML.includes('.'))
            return result.innerHTML;
        }
        if (result.innerHTML[0] === '0') {
          return result.innerHTML = result.innerHTML.replace('0', '' + number.innerHTML);
        } else if (result.innerHTML.length < 9)
          return result.innerHTML += number.innerHTML;
      });
  });
}

function setOps() {
  operators.forEach(operator => {
    operator.addEventListener('click', function() {
      if (stored1 !== '' && stored2 !== '')
        calculate(stored1, stored2);
      operatorsReset();
      operatorLastPushed = true;
      this.style.transition = '0.4s';
      this.style.backgroundColor = 'white';
      this.style.color = 'orange';
      stored1 = result.innerHTML;
      op = operator.id;
      console.log(op);
    });
  });
}

function reset() {
  setTimeout(function() {
    operatorsReset();
    clear.innerHTML = 'AC';
    result.innerHTML = '0';
    stored1 = '';
    stored2 = '';
  }, 100);
}

const operatorsReset = () => {
  operators.forEach(operator => {
    operator.style.transition = '0.4s';
    operator.style.color = 'white';
    operator.style.backgroundColor = 'orange';
    operatorLastPushed = false;
  });
}

function calculate(x, y) {
  let answer;
  console.log(op, x, y);
  switch(op) {
    case 'divide':
      answer = divide(x, y);
      break;
    case 'multiply':
      answer = multiply(x, y);
      break;
    case 'subtract':
      answer = subtract(x, y);
      break;
    case 'add':
      answer = add(x, y);
      break;
  }
  if (typeof answer !== 'string') {
    stored1 = answer.toString();
    operatorsReset();
    stored2 = '';
    op = '';
    calculatedLast = true;
    if (answer.toString().length > 9) {
      answer = parseFloat(answer).toExponential(4);
    }
  }
  return result.innerHTML = answer;
}

input();