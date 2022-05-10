// Variables
const numButtons = document.querySelectorAll('.num-button');
const operators = document.querySelectorAll('.operator-button');
const equalButton = document.querySelector('.equals-button');
const clearButton = document.querySelector('#clear-button');
const negativeButton = document.querySelector('#negative');
const decimalButton = document.querySelector('#decimal');
const backspaceButton = document.querySelector('#backspace-button');

// Math functions
const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => y === 0 ? undefined : x / y;
const operate = function(operator, x, y) {
    switch (operator) {
        case '+':
            return add(x, y);
        case '-':
            return subtract(x, y);
        case '*':
            return multiply(x, y);
        case '/':
            return divide(x, y);
    }
};

// Cache and supporting functions
var num1 = '';
var num2 = '';
var operator = '';
var evaluated = false;
var number;

function assignNumberToEdit() {Boolean(operator) ? number = num2 : number = num1};

function clearCache() {
    num1 = '';
    num2 = '';
    operator = '';
    evaluated = false;
};

// Display function
const display = (answer) => {
    if (isNaN(answer)) {
        if (answer == '.') {
            document.querySelector("#display").textContent = answer;
            return null;
        }
        answer = "Bless you!";
        document.querySelector("#display").textContent = answer;
        return null;
    }
    if (answer.toString().length > 9) answer = answer.toExponential();
    if (answer >= 10 ** 8) answer = "¯\\_(ツ)_/¯";
    document.querySelector("#display").textContent = answer;
};

// Calculator functions
function numFunction(digit) {
        if (evaluated) {
            // if previous expression has been evaluated, number pressed will replace num1 in cache
            evaluated = false;
            num1 = digit;
            display(num1);
            
        } else if (Boolean(operator)) {
            // if operator has been selected, number pressed will add to num2 in cache
            Boolean(num2) ? num2 += digit : num2 = digit;
            display(num2);

        } else {
            // add number pressed to num1 in cache
            num1 += digit;
            display(num1);
        };
};

function operatorFunction(operation) {
    if (Boolean(num1)) {
        operator = operation;
        num2 = '';
        evaluated = false;
    };
};

function equalFunction() {
    if (Boolean(operator) && Boolean(num1) && Boolean(num2)) {
        evaluated = true;
        let answer = Math.round(operate(operator, parseFloat(num1), parseFloat(num2)) * 10 ** 7) / (10 ** 7);
        display(answer);
        num1 = answer.toString();
    }
};

function decimalFunction() {
    assignNumberToEdit();

    if (!number.includes('.')) {
        if (!number) {
            number = "0.";
        } else {
            number += '.';
        }
    };

    display(number);
    Boolean(operator) ? num2 = number : num1  = number;
};

function negativeFunction() {
    assignNumberToEdit();

    if (number[0] == '-') {
        number = number.substring(1);
    } else {
        number = '-' + number;
    };

    display(number);
    Boolean(operator) ? num2 = number : num1 = number;
};

function backspaceFunction() {
    assignNumberToEdit();

    if (Boolean(number)) {
        number = number.slice(0,-1);
        Boolean(number) ? display(number) : display(0);
        Boolean(operator) ? num2 = number : num1 = number;
    }
};

function clearCalcFunction() {
    clearCache();
    display(0);
};

// Function to add click eventlistener to number buttons
const addNumClickListener = (node) => {
    node.addEventListener("click", (event) => {
        numFunction(event.target.textContent);
    });
};

// Function to add click eventlistener to operator buttons
const addOperatorClickListener = (node) => {
    node.addEventListener("click", (event) => {
        operatorFunction(event.target.textContent);
    });
};

// Add function eventlisteners to each button
numButtons.forEach(addNumClickListener);
operators.forEach(addOperatorClickListener);
equalButton.addEventListener("click", equalFunction);
decimalButton.addEventListener("click", decimalFunction);
negativeButton.addEventListener("click", negativeFunction);
backspaceButton.addEventListener("click", backspaceFunction);
clearButton.addEventListener("click", clearCalcFunction);


// Keyboard eventlistener
window.addEventListener("keydown", function(event) {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    };

    const key = event.key;

    // Digit cases
    if (parseInt(key) + 1) {
        numFunction(key);
    } else{
        switch (key) {
            // Operator cases
            case '+':
            case '-':
            case '*':
            case '/':
                operatorFunction(key);
                break;
            
            // Equals cases
            case '=':
            case "Enter":
                equalFunction();
                break;
            // Decimal case
            case '.':
                decimalFunction();
                break;
            // Negative case
            case '_':
                negativeFunction();
                break;
            // Backspace cases
            case "Backspace":
            case "Delete":
                backspaceFunction(event);
                break;
            // Clear case
            case "Escape":
                clearCalcFunction();
                break;
            default:
                console.log(key);
                return;
        }
    };
  
    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
  }, true);
  // the last option dispatches the event to the listener first,
  // then dispatches event to window