function add(number1, number2){
    return Number(number1) + Number(number2);
}

function subtract(number1, number2){
    return Number(number1) - Number(number2);
}

function multiply(number1, number2){
    return Number(number1) * Number(number2);
}

function divide(number1, number2){
    return Number(number1) / Number(number2);
}

function operate(operator, number1, number2){
    switch(operator){
        case '+':
            return add(number1,number2);
        case '-':
            return subtract(number1,number2);
        case 'x':
            return multiply(number1,number2);
        case '/':
            return divide(number1,number2);
        default:
            return "Something went wrong!";
    }
}

let firstNumber;
let secondNumber;
let sign;
let answer;

let display = document.querySelector(".screen");

let numbers = document.querySelectorAll(".number");
numbers.forEach(number => {
    number.addEventListener("click", ()=>{
        if(display.textContent == "0"){
            display.textContent = "";
        }
        if(display.textContent == answer){display.textContent = "";}
        display.textContent += number.textContent;
    });
}); 

let operators = document.querySelectorAll(".operator");
operators.forEach(operator => {
    operator.addEventListener("click", () => {
        firstNumber = Number(display.textContent);
        sign = operator.textContent;
        display.textContent += sign;
    });
});

let equal = document.querySelector(".equal");
equal.addEventListener("click", () => {
    secondNumber = Number(display.textContent.slice((display.textContent.indexOf(sign)+1)));
    answer = operate(sign, firstNumber, secondNumber);
    display.textContent = answer;
});

const clear = document.querySelector("#clear");
clear.addEventListener("click", () => {
    display.textContent = "0";
    firstNumber = undefined;
    secondNumber = undefined;
    sign = undefined;
    answer = undefined;
});