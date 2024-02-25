let object = {
    resetDisplay: false,
    operatorLastPressed: "",
    savedValueLeft: 0,
    savedValueRight: 0,
    mainDisplay: 0,
    lastPressedEquals: false,
};


/* -- OPERATOR FUNCTIONS -- */

const add = (num1, num2) => Number(num1) + Number(num2);
const subtract = (num1, num2) => Number(num1) - Number(num2);
const multiply = (num1, num2) => Number(num1) * Number(num2);
const divide = (num1, num2) => Number(num1) / Number(num2);

function operate(num1, num2, operator) {
    switch(operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '÷':
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
        if(mainDisplay.textContent == 0 || object["resetDisplay"]) {
            mainDisplay.textContent = number.textContent;
            object["resetDisplay"] = false;
        } else {
            mainDisplay.textContent += number.textContent;
        }
        object["lastPressedEquals"] = false;
    });
});


/* -- OPERATOR BUTTONS -- */


const operators = document.querySelectorAll('.operator');

operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        if(object['lastPressedEquals']) {
            object["operatorLastPressed"] = "";
        }
        console.log(object["operatorLastPressed"]);
        if(object["operatorLastPressed"]) {
            object["savedValueRight"] = mainDisplay.textContent;
            mainDisplay.textContent = 
            operate(object["savedValueLeft"], object["savedValueRight"]
            , object["operatorLastPressed"]);
            object["savedValueLeft"] = mainDisplay.textContent;
        }
        if(mainDisplay.textContent > 0) {
            object["savedValueLeft"] = mainDisplay.textContent;
        }

        object["operatorLastPressed"] = operator.textContent;

        object["resetDisplay"] = true;
        object["lastPressedEquals"] = false;
    });
});

let equals = document.getElementById('equals');

equals.addEventListener('click', () => {
    console.log(object["savedValueLeft"], object["operatorLastPressed"]
    , object["savedValueRight"]);
    if(object["lastPressedEquals"]) {
        if(object["operatorLastPressed"]) {
            mainDisplay.textContent = 
            operate(object["savedValueLeft"], object["savedValueRight"]
            , object["operatorLastPressed"]);
            object["savedValueLeft"] = mainDisplay.textContent;
            object["resetDisplay"] = true;
        }
    } else {
        if(object["operatorLastPressed"]) {
            object["savedValueRight"] = mainDisplay.textContent;
            mainDisplay.textContent = 
            operate(object["savedValueLeft"], object["savedValueRight"]
            , object["operatorLastPressed"]);
            object["resetDisplay"] = true;
            object["savedValueLeft"] = mainDisplay.textContent;
        }
        object["lastPressedEquals"] = true;
    }
});


/* -- MISC. BUTTONS -- */

const reset = document.getElementById('reset');

reset.addEventListener('click', () => {
    window.location.reload();
});

const polarity = document.getElementById('polarity');

polarity.addEventListener('click', () => {
    mainDisplay.textContent = -mainDisplay.textContent;
    object["savedValueLeft"] = mainDisplay.textContent;
});

const divideBy100 = document.getElementById('divide-by-100');

divideBy100.addEventListener('click', () => {
    mainDisplay.textContent /= 100;
    object["savedValueLeft"] = mainDisplay.textContent;
});