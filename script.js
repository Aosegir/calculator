let num1, num2, operand, lastPressed;
let calculation = {};

/* -- OPERATOR FUNCTIONS -- */

const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;

function operate(num1, num2, operator) {
    switch(operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        default:
            alert("Error!");
            break;
    };
}


/* -- NUMBER BUTTONS -- */

const numbers = document.querySelectorAll('.number');
const mainDisplay = document.getElementById('main-display');

numbers.forEach((number) => {
    number.addEventListener('click', () => {
        if(mainDisplay.textContent == 0) {
            mainDisplay.textContent = number.textContent;
        } else {
            mainDisplay.textContent += number.textContent;
        }
        lastPressed = number.textContent;
    });
});

// for gathering values for operation: mainDisplay.textContent?


/* -- OPERATOR BUTTONS -- */

const operators = document.querySelectorAll('.operator');

operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        console.log(typeof operator);
        if(mainDisplay.textContent) {
            if(num1) {
                num2 = mainDisplay.textContent;
                mainDisplay.textContent = operate(num1, num2, operand);
            } else {
                num1 = mainDisplay.textContent;
                operand = operator.textContent;
                mainDisplay.textContent = 0;
            }
        }
        console.log(mainDisplay.textContent);
        console.log(num1, num2, operand);
    });
});

const equals = document.getElementById('equals');

equals.addEventListener('click', () => {

});


/* -- MISC. BUTTONS -- */

const reset = document.getElementById('reset');

reset.addEventListener('click', () => {
    num1, num2, operand = null;
    mainDisplay.textContent = 0;
});



/*
3 types - numbers, operators, equals
    equals - easiest
        requires a preexisting variable and an operand
        run operate (preexisting variable, display, operand)

        NUMBER -> OPERAND -> EQUALS
        operate value becomes display

            EQUALS
            run operate (preexisting variable, display, operand)

            10 + 1 = 11 -> 6 = 7 -> 9 = 10
        
        


*/