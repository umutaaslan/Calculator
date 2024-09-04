const buttons = document.querySelectorAll(".sections button");
const display = document.querySelector(".display > p");
const upperDisplay = document.querySelector(".upper-display");
const writables = "1234567890.-+*/AAA(x)ʸC=";

function operate(a, operator, b){
    a = Number(a);
    b = Number(b);
    switch(operator){
        case '+':
            return a+b;
        case '-':
            return a-b;
        case '/':
            return a/b;
        case '*':
            return a*b;
        case "(x)ʸ":
            return a**b;
        case "Log":
            return Math.log(b) / Math.log(a);
    }
}

let num1 = "";
let num2 = "";
let currOperator = "";
let goWSecondNumber = false;
let isResultHaved = false;
buttons.forEach(button => {
        button.addEventListener("click", e => {
            if(writables.slice(0, 10).includes(button.textContent)) {
                // numbers pressed
                if(goWSecondNumber){
                    num2 += button.textContent;
                    display.textContent = num2;
                }
                else{
                    num1 += button.textContent;
                    display.textContent = num1;
                }
                isResultHaved = false;
            }
            
            if(writables.slice(10, 11).includes(button.textContent)) {
                // . pressed
                if (goWSecondNumber && num2.includes(".")) return;
                else if(!goWSecondNumber && num1.toString().includes(".")) return;
                else if(num1 !== "" || num2 !== ""){
                    if(goWSecondNumber){
                        num2 += ".";
                        display.textContent = num2;
                    }
                    else{
                        num1 += ".";
                        display.textContent = num1;
                    }
                }
            }
    
            if(writables.slice(11, 22).includes(button.textContent)) {
                // operators pressed
                if(goWSecondNumber === false) {
                    currOperator = button.textContent;
                    goWSecondNumber = true;
                    upperDisplay.textContent = num1;
                    display.textContent = "";
                    upperDisplay.setAttribute("style", "margin: 0; font-weight: 400; font-size: 10px; opacity: .5; position: relative; padding: 6px 0 6px 0;");
                    display.style = "padding-bottom: 4px";
                }
                else if (goWSecondNumber) {
                    if(!isResultHaved){
                        let result;
                        result = Math.round(operate(num1, currOperator, num2) * 1000) / 1000;
                        upperDisplay.textContent += ` ${currOperator} ${num2}`; 
                        num1 = result;
                        num2 = "";
                        display.textContent = result;
                        currOperator = button.textContent;
                    }
                }
                if(upperDisplay.textContent == undefined || upperDisplay.textContent === ""){
                    currOperator = button.textContent;
                    upperDisplay.textContent = num1;
                    display.textContent = "";
                    upperDisplay.setAttribute("style", "margin: 0; font-weight: 400; font-size: 10px; opacity: .5; position: relative; padding: 6px 0 6px 0;");
                    display.style = "padding-bottom: 4px";
                }
                

            }
    
            if(writables.slice(22, 23).includes(button.textContent)){
                // C pressed
                num1 = "";
                num2 = "";
                currOperator = "";
                goWSecondNumber = false;
                isResultHaved = false;
                upperDisplay.textContent = "";
                display.textContent = "";
            }
    
            if(writables.slice(23, 24).includes(button.textContent)) {
                // = pressed
                let result;
                if(num2 == undefined || num2 === ""){
                    result = num1;
                }
                else{
                    result = Math.round(operate(num1, currOperator, num2) * 1000) / 1000;
                }
                upperDisplay.textContent += ` ${currOperator} ${num2}`; 
                num1 = result;
                num2 = "";
                display.textContent = result;
                goWSecondNumber = false;
                isResultHaved = true;
            }
            if(button.textContent === "+/-"){
                if(goWSecondNumber){
                    num2 = -num2;
                    display.textContent = num2;
                }
                else{
                    num1 = -num1;
                    display.textContent = num1;
                }
            }
        });
    })
                





























// let currentOperator = "";
// let firstNum = 0;
// let secondNum = 0;
// let newNum1 = 0;
// let lastResult = "";
// let j = 1;
// buttons.forEach(button => {
//     button.addEventListener("click", e => {
//         if(writables.slice(0, 10).includes(button.textContent)) {
//             // numbers pressed
//             display.textContent += button.textContent;
//         }
        
//         if(writables.slice(10, 11).includes(button.textContent)) {
//             // . pressed
//         }

//         if(writables.slice(11, 22).includes(button.textContent)) {
//             // operators pressed
            
//             if(upperDisplay.textContent == undefined  || upperDisplay.textContent == ""){
//                 firstNum = display.textContent;
//                 console.log(firstNum)
//                 upperDisplay.textContent = display.textContent;
//                 display.textContent = "";
//                 currentOperator = button.textContent;
//             }
//             else if(upperDisplay.textContent != undefined && upperDisplay.textContent !== "" && display.textContent != undefined && display.textContent !== ""){
//                 currentOperator = button.textContent;
//                 newNum1 = display.textContent;
//                 display.textContent = "";
//                 if (j % 2 === 0) showOperation();
//                 upperDisplay.textContent = `${lastResult}`;
//                 j++;
//             }
//             else {
//                 secondNum = display.textContent;
//                 upperDisplay.textContent += ` ${currentOperator} ${display.textContent}`
//                 showOperation();
//                 currentOperator = button.textContent;
//             }
            
//         }

//         if(writables.slice(22, 23).includes(button.textContent)){
//             // C pressed 
//         }

//         if(writables.slice(23, 24).includes(button.textContent)) {
//             // = pressed
//             if(upperDisplay.textContent == undefined  || upperDisplay.textContent == "") return;
//             secondNum = display.textContent;
//             upperDisplay.textContent += ` ${currentOperator} ${display.textContent}`
//             console.log(upperDisplay.textContent)
//             showOperation();
//         }

//         upperDisplay.setAttribute("style", "margin: 0; font-weight: 400; font-size: 10px; opacity: .5; position: relative; padding: 6px 0 6px 0;");
//         display.style = "padding-bottom: 4px";
//     });
// })


// function showOperation(){
//     if(newNum1 !== 0) {
//         firstNum = lastResult;
//         secondNum = newNum1;
//     }
//     if(currentOperator === "Log"){
//         upperDisplay.textContent = `Log base ${firstNum} of ${secondNum}`;
//     }
//     if(currentOperator === "(x)ʸ"){
//         upperDisplay.textContent = `${firstNum} power ${secondNum}`;
//     }
//     display.textContent = Math.round(operate(firstNum, currentOperator, secondNum));
//     lastResult = Math.round(operate(firstNum, currentOperator, secondNum));

// }

// let currentOperator = "";
// buttons.forEach(button => {
//     button.addEventListener("click", e => {
//         if(display.textContent.includes(".") && button.textContent === "."){
//             return;
//         }
//         if(writables.includes(button.textContent)){
//                 display.textContent += button.textContent;
//             if (button.classList.contains("operator")) {
//                 if((upperDisplay.textContent == null || upperDisplay.textContent === " ")){
//                     upperDisplay.innerText += `${display.textContent.slice(0, -1)}`;
//                 }
//                 else if (button.classList.contains("resultSign")){
//                     let result = operate(upperDisplay.textContent, currentOperator, display.textContent.slice(0, -1));
//                     upperDisplay.innerText += ` ${currentOperator} ${display.textContent.slice(0, -1)}`;
//                     display.textContent = result;
                    
//                 }
//                 upperDisplay.setAttribute("style", "margin: 0; font-weight: 400; font-size: 10px; opacity: .5; position: relative; padding: 6px 0 6px 0;");
//                 display.style = "padding-bottom: 4px";
//                 currentOperator = button.textContent;
//             }
            
//         }
        
//     })
// })
 