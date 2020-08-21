const divide = (x, y) => x / y;

const multiply = (x, y) => x * y;

const subtract = (x, y) => x - y;

const add = (x, y) => x + y;

const percent = (x) => x * 0.01;

// Elements
const clear = document.getElementById('clear');
const negative = document.getElementById('negative');
const decimal = document.getElementById('decimal');
const result = document.getElementById('result');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');

let isPositive = true;
let hasDecimal = false;

// Operators
const division = document.getElementById('divide');
const multiplication = document.getElementById('multiply');
const subtraction = document.getElementById('subtract');
const addition = document.getElementById('add');
const percentage = document.getElementById('percent');
const calculate = document.getElementById('calculate');

// Stored values
let stored1 = '';
let stored2 = '';
let gettingInput1 = true;
let gettingInput2 = false;


function reset() {
  setTimeout(function() {
    operatorsReset();
    result.innerHTML = '0';
    stored1 = '';
    stored2 = '';
  }, 100);
}

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
})

// Functions
const operatorsReset = () => {
  operators.forEach(operator => {
    operator.style.transition = '0.4s';
    operator.style.color = 'white';
    operator.style.backgroundColor = 'orange';
  });
}

function input() {
  setNumbers();
  operators.forEach(operator => {
    operator.addEventListener('click', function() {
      operatorsReset();
      this.style.transition = '0.4s';
      this.style.backgroundColor = 'white';
      this.style.color = 'orange';
      stored1 = result.innerHTML;
      gettingInput1 = false;
      gettingInput2 = true;
    });
  });
}

function setNumbers() {
    numbers.forEach(number => {
      number.addEventListener('click', function() {
        // get rid of starting 0 when number is clicked
        if (number.id === 'decimal') {
          if (result.innerHTML.includes('.'))
            return result.innerHTML;
        }
        if (result.innerHTML[0] === '0' || result.innerHTML[1] === '0') {
          return result.innerHTML = result.innerHTML.replace('0', '' + number.innerHTML);
        } else if (result.innerHTML.length < 9)
          //result.innerHTML = result.innerHTML.replace(/./g, number.innerHTML);
          return result.innerHTML += number.innerHTML;
      });
  });
}

input();
/*function calculate(x, y) {
  parseFloat(x.replace(/,/g,'')); 
  parseFloat(y.replace(/,/g,''));
}*/