//Main calculation functions
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
        case '*':
            return multiply(number1,number2);
        case '/':
            return divide(number1,number2);
        default:
            return "ode";
    }
}

let firstNumber;
let secondNumber;
let sign;
let answer;

let display = document.querySelector(".screen");

//functions that choose what to send to the display
function showNumber(num){
    if(display.textContent == "0"){
        display.textContent = "";
    }
    if(display.textContent == answer){display.textContent = "";}
    display.textContent += num;
}

function showOperator(ope){
    if(isNaN(parseInt(display.textContent[display.textContent.length-1]))){
        return;
    }
    else if(firstNumber){
        secondNumber = Number(display.textContent.slice((display.textContent.indexOf(sign)+1)));
        let temp = operate(sign, firstNumber, secondNumber);
        firstNumber = temp;
        sign = ope;
        display.textContent = firstNumber + sign;
    }
    else{
        firstNumber = Number(display.textContent);
        sign = ope;
        display.textContent += sign;
    }
}

function showDot(d){
    if(display.textContent.includes(d)){
        if(sign){
            if((display.textContent.slice((display.textContent.indexOf(sign)+1))).includes(d)){
                return;
            }
            else{display.textContent += d;}
        }
        else{return;}
    }
    else{display.textContent += d;}
}

function showAnswer(){
    if((firstNumber || firstNumber == "0") && sign){
        if(display.textContent.slice((display.textContent.indexOf(sign)+1))){
            secondNumber = Number(display.textContent.slice((display.textContent.indexOf(sign)+1)));
            answer = operate(sign, firstNumber, secondNumber);
            if(answer == Infinity){
                display.textContent = "You be mumu";
            }else{
                display.textContent = Math.round(answer * 1000)/1000;
            }
            firstNumber = undefined;
        }
        else return;
    }
}

function clearAll(){
    display.textContent = "";
    firstNumber = undefined;
    secondNumber = undefined;
    sign = undefined;
    answer = undefined;
}

function backspace(){
    display.textContent = display.textContent.replace(display.textContent[display.textContent.length-1],"");
    if(display.textContent == ""){
        display.textContent = "";
    }
}

//handling click events from the user
let numbers = document.querySelectorAll(".number");
numbers.forEach(number => {
    number.addEventListener("click", ()=>{showNumber(number.textContent)});
}); 

let operators = document.querySelectorAll(".operator");
operators.forEach(operator => {
    operator.addEventListener("click", () => {showOperator(operator.textContent)});
});

let dot = document.querySelector(".point");
dot.addEventListener("click", () => {showDot(dot.textContent)});

let equal = document.querySelector(".equal");
equal.addEventListener("click", showAnswer);

const clear = document.querySelector("#clear");
clear.addEventListener("click", clearAll);

const del = document.querySelector("#delete");
del.addEventListener("click", backspace);

//adding keyboard support
document.querySelector("body").addEventListener("keydown", (pressed) => {
    if(!isNaN(pressed.key)){
        showNumber(pressed.key);
    }
    else if(pressed.key == "."){
        showDot(pressed.key);
    }
    else if(pressed.key == "+" || pressed.key == "-" || pressed.key == "*" || pressed.key == "/"){
        showOperator(pressed.key);
    }
    else if(pressed.key == "=" || pressed.key == "Enter"){
        showAnswer();
    }
    else if(pressed.key == "Backspace"){
        backspace();
    }
    else return;
});