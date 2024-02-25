let object = {
    resetDisplay: false,
    operatorLastPressed: "",
    savedValueLeft: 0,
    savedValueRight: 0,
    lastPressedEquals: false,
};


/* -- OPERATOR FUNCTIONS -- */

const add = (num1, num2) => Number(num1) + Number(num2);
const subtract = (num1, num2) => Number(num1) - Number(num2);
const multiply = (num1, num2) => Number(num1) * Number(num2);
const divide = (num1, num2) => num2 == 0 ? alert("Get bent!")
                : Number(num1) / Number(num2);

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
        // if statement ensures that leading 0 in display does not remain in display
        // unless it leads a decimal
        if((mainDisplay.textContent == 0 && !mainDisplay.textContent.includes('.'))
        || object["resetDisplay"]) {
            mainDisplay.textContent = number.textContent;
            object["resetDisplay"] = false;
        } else if (mainDisplay.textContent.length < 9) {
            mainDisplay.textContent += number.textContent;
        }
        object["lastPressedEquals"] = false;
    });
});


/* -- OPERATOR BUTTONS -- */


const operators = document.querySelectorAll('.operator');

operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        // Ensures no unnecessary operations occur after completing an equation and
        // pressing another operator
        if(object['lastPressedEquals']) {
            object["operatorLastPressed"] = "";
        }
        // This if statement is here to run an equation when user is attempting to
        // Equate multiple operations in succession without the use of =
        if(object["operatorLastPressed"]) {
            object["savedValueRight"] = mainDisplay.textContent;
            mainDisplay.textContent = 
            +operate(object["savedValueLeft"], object["savedValueRight"]
            , object["operatorLastPressed"]).toFixed(2);
            object["savedValueLeft"] = mainDisplay.textContent;
        }
        // This checks to ensure that 0 isn't being saved because that's
        // not how calculators work???
        if(mainDisplay.textContent > 0) {
            object["savedValueLeft"] = mainDisplay.textContent;
        }
        // Saving operand last pressed for use in operate()
        object["operatorLastPressed"] = operator.textContent;
        object["resetDisplay"] = true;
        object["lastPressedEquals"] = false;
    });
});

/* -- EQUALS BUTTON -- */

let equals = document.getElementById('equals');

equals.addEventListener('click', () => {
    // This check solves the previous issue of attempting to perform operate()
    // multiple times with the mainDisplay value, which caused several errors
    // and was not functioning properly
    if(!object["lastPressedEquals"]) {
        object["savedValueRight"] = mainDisplay.textContent;
        object["lastPressedEquals"] = true;
    }

    if(object["operatorLastPressed"]) {
        // +, .toFixed(2), and .substring(0,9) are all in place to ensure that
        // the display rounds large decimals and does not exceed the screen limit
        mainDisplay.textContent = 
        +operate(object["savedValueLeft"], object["savedValueRight"]
        , object["operatorLastPressed"]).toFixed(2);
        mainDisplay.textContent = mainDisplay.textContent.substring(0,9);
        object["resetDisplay"] = true;
        // Removing mainDisplay from being used in operate() function
        object["savedValueLeft"] = mainDisplay.textContent;
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

const decimal = document.getElementById('decimal');

decimal.addEventListener('click', () => {
    if(!mainDisplay.textContent.includes('.')) {
        mainDisplay.textContent += decimal.textContent;
    }
    if(object["resetDisplay"]) {
        mainDisplay.textContent = "0.";
        object["resetDisplay"] = false;
    }
});