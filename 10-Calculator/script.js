const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');

let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('number')) {
            inputNumber(button.textContent);
        } else if (button.classList.contains('operator')) {
            inputOperator(button.dataset.action);
        } else if (button.classList.contains('equal')) {
            calculate();
        } else if (button.classList.contains('clear')) {
            clear();
        }
    });
});

function inputNumber(num) {
    if (waitingForSecondValue) {
        display.value = num;
        waitingForSecondValue = false;
    } else {
        display.value = display.value === '0' ? num : display.value + num;
    }
}

function inputOperator(op) {
    firstValue = parseFloat(display.value);
    operator = op;
    waitingForSecondValue = true; 
    switch (op) {
        case 'add':
            display.value += " + ";
            break;
        case 'subtract':
            display.value += " - ";
            break;
        case 'multiply':
            display.value += " * "; 
            break;
        case 'divide':
            display.value += " / ";
            break;
    }
} 

function calculate() {
    const secondValue = parseFloat(display.value);

    if (operator && firstValue != null) {
        let result;
        switch (operator) {
            case 'add':
                result = firstValue + secondValue;
                break;
            case 'subtract':
                result = firstValue - secondValue;
                break;
            case 'multiply':
                result = firstValue * secondValue;
                break;
            case 'divide':
                result = firstValue / secondValue;
                break;
            default:
                result = 0; 
        }

        display.value = result;
        firstValue = null; 
    }
}

function clear() {
    display.value = '0';
    firstValue = null;
    operator = null;
    waitingForSecondValue = false;
}

