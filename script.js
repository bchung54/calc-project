const display = (answer) => {
    if (isNaN(answer)) {
        answer = "Bless you!";
        document.querySelector("#display").innerText = answer;
        return null;
    }
    if (answer.toString().length > 9) answer = answer.toExponential();
    if (answer >= 10 ** 18) answer = "idek";
    document.querySelector("#display").innerText = answer;
};

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

const cache = Array(4).fill('');

const clearCache = () => cache.splice(0, 3, '', '', '');

const isAnyCacheEmpty = () => cache.some((item) => item === '');
// const sumArr = function(arr) {
// 	return arr.reduce((total, item) => total + item, 0);
// };

// const multiplyArr = function(arr) {
//   return arr.reduce((product, item) => product * item, 1);
// };

// const power = function(x, y) {
// 	return x ** y;
// };

// const factorial = function(number) {
// 	// if (number <= 1) {
//   //   return multiply([number]);
//   // } else {
//   //   return multiply(Array.from(Array(number), (_, index) => index + 1));
//   // }
//   return number <= 1 ? 1: multiply(Array.from(Array(number), (_, index) => index + 1));
// };

const numButtonFunction = function(node) {
    node.onclick = (e) => {
        const digit = e.target.innerText;

        if (cache[3] === '=' && !isAnyCacheEmpty()) {
            clearCache();
            cache[0] += digit;
            display(cache[0]);
        } else if (cache[1]) {
            cache[2] += digit;
            display(cache[2]);
        } else {
            cache[0] += digit;
            display(cache[0]);
        }
    }
};

const operatorButtonFunction = function(node) {

    // evaluates expression whenever an operator is pressed after full cache
    node.addEventListener("click", (e) => {
        if (!isAnyCacheEmpty()) {
            let answer = Math.round(operate(cache[1], parseFloat(cache[0]), parseFloat(cache[2])) * 10 ** 7) / (10 ** 7);
            display(answer);
            cache[0] = answer.toString();
            if (e.target.innerText !== '=') cache[2] = '';
        }
    });

    // place operator into cache[1] if there is first input number and no second input number
    if (node.innerText !== '=') {
        node.addEventListener("click", (e) => {
            if (cache[0] && !cache[2]) {
                cache[1] = e.target.innerText;
            }
        });
    }

    // caches input to be used as previous input for next button click
    node.addEventListener("click", (e) => cache[3] = e.target.innerText);
};

const createNumPad = function() {
    const container = document.getElementById("numpad-container");
    for (let i = 0; i < 3; i++) {
        let row = document.createElement("div");
        row.className = "row";

        for (let j = 1; j <= 3; j++) {
            let cell = document.createElement("button");
            cell.className = "num-button";
            cell.innerText = (3 * i) + j;
            numButtonFunction(cell);
            row.appendChild(cell);
        }

        if (i == 0) {
            container.appendChild(row);
        } else {
            container.insertBefore(row, container.firstChild);
        }
    };

    let topRow = document.createElement("div");
    topRow.className = "row";

    let clearButton = document.createElement("button");
    clearButton.id = "clear-button";
    clearButton.innerText = 'C';
    clearButton.onclick = () => {
        clearCache();
        display(0);
    }

    topRow.appendChild(clearButton);
    container.insertBefore(topRow, container.firstChild);

    let bottomRow = document.createElement("div");
    bottomRow.className = "row";

    let zeroButton = document.createElement("button");
    zeroButton.className = "num-button";
    zeroButton.innerText = 0;
    numButtonFunction(zeroButton);

    let decimalButton = document.createElement("button");
    decimalButton.id = "decimal-button";
    decimalButton.innerText = '.';

    let negativeButton = document.createElement("button");
    negativeButton.id = "negative-button";
    negativeButton.innerText = '(-)';


    bottomRow.appendChild(zeroButton);
    bottomRow.appendChild(decimalButton);
    bottomRow.appendChild(negativeButton);
    container.appendChild(bottomRow);
};

const createOperatorPad = function() {
    const container = document.getElementById("operator-container");
    const operators = ['/', '*', '-', '+', '='];
    operators.forEach(item => {
        let cell = document.createElement("button");
        cell.className = "operator-button";
        cell.innerText = item;
        operatorButtonFunction(cell);
        container.appendChild(cell);
    });
};


createNumPad();
createOperatorPad();