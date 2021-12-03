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

let cache = '';
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

const createNumPad = function() {
    const container = document.getElementById("numpad-container");
    for (let i = 0; i < 3; i++) {
        let row = document.createElement("div");
        row.className = "row";

        for (let j = 1; j <= 3; j++) {
            let cell = document.createElement("button");
            cell.className = "num-button";
            cell.innerText = (3 * i) + j;
            cell.onclick = (e) => {
                cache += e.target.innerText;
            };
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
    clearButton.className = "num-button";
    clearButton.innerText = 'C';

    topRow.appendChild(clearButton);
    container.insertBefore(topRow, container.firstChild);

    let bottomRow = document.createElement("div");
    bottomRow.className = "row";

    let zeroButton = document.createElement("button");
    zeroButton.className = "num-button";
    zeroButton.innerText = 0;

    let decimalButton = document.createElement("button");
    decimalButton.className = "num-button";
    decimalButton.innerText = '.';

    let negativeButton = document.createElement("button");
    negativeButton.className = "num-button";
    negativeButton.innerText = '+/-';


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
        container.appendChild(cell);
    })
};


createNumPad();
createOperatorPad();