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
            return "ode";
    }
}

let firstNumber;
let secondNumber;
let sign;
let answer;

let display = document.querySelector(".screen");

function showNumber(num){
    if(display.textContent == "0"){
        display.textContent = "";
    }
    if(display.textContent == answer){display.textContent = "";}
    display.textContent += num.textContent;
}

function showOperator(ope){
    if(isNaN(parseInt(display.textContent[display.textContent.length-1]))){
        return;
    }
    else if(firstNumber){
        secondNumber = Number(display.textContent.slice((display.textContent.indexOf(sign)+1)));
        let temp = operate(sign, firstNumber, secondNumber);
        firstNumber = temp;
        sign = ope.textContent;
        display.textContent = firstNumber + sign;
    }
    else{
        firstNumber = Number(display.textContent);
        sign = ope.textContent;
        display.textContent += sign;
    }
}

function showDot(d){
    if(display.textContent.includes(d.textContent)){
        if(sign){
            if((display.textContent.slice((display.textContent.indexOf(sign)+1))).includes(d.textContent)){
                return;
            }
            else{display.textContent += d.textContent;}
        }
        else{return;}
    }
    else{display.textContent += d.textContent;}
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

let numbers = document.querySelectorAll(".number");
numbers.forEach(number => {
    number.addEventListener("click", ()=>{showNumber(number)});
}); 

let operators = document.querySelectorAll(".operator");
operators.forEach(operator => {
    operator.addEventListener("click", () => {showOperator(operator)});
});

let dot = document.querySelector(".point");
dot.addEventListener("click", () => {showDot(dot)});

let equal = document.querySelector(".equal");
equal.addEventListener("click", showAnswer);

const clear = document.querySelector("#clear");
clear.addEventListener("click", clearAll);

const del = document.querySelector("#delete");
del.addEventListener("click", backspace);

