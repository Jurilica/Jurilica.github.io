import { Timer } from "./timer.js";
const TEXT_DISPLAY = document.getElementById('textDisplay');
const TEXT_INPUT = document.getElementById('textInput');
const TIMER = document.getElementById('Timer');
const WPM = document.getElementById('WPM');
const BUTTON = document.getElementById('Button');
let numberOfwords = 0;  // number of words typed
TIMER.innerText = 0 + " seconds";
WPM.innerText = "- WPM";

let timer = new Timer();
timer.Tick = () =>  {
    TIMER.innerText = getTime() + " seconds";
    WPM.innerText = Math.round(numberOfwords/(getTime() / 60)) + ' WPM';
};
setText();


//fetching quote form api
function getText(){
    return fetch('https://api.quotable.io/random')
         .then(response => response.json())
         .then(data => data.content);
}

 //displaying text in TEXT_DISPLAY
 async function setText(){
     const text = await getText();  //waitnig for fetching to be done
     TEXT_DISPLAY.innerText = '';   //setting deufalt value for TEXT_DISPLAY
     TEXT_INPUT.value = null;       //setting deufalt value for TEXT_INPUT
     splitText(text);
 }

//spliting text on the characters
 function splitText(text){
     text.split('').forEach((element,index) => {
         const span = document.createElement('span');   //create span for every character so every character can be modified separately
         span.classList.add('active');                  //add class active on every character
         if(element === '’'){
            element = '\'';
         }
         span.innerText = element;                      //adding charcter in the span with class 'active'
         TEXT_DISPLAY.appendChild(span);
       });
 }

 // if button 'Next' is clicked restart and get new quote
BUTTON.addEventListener('click', () => {
    reset();
    setText();
});

TEXT_INPUT.addEventListener('input',() =>{                          //for every keypress
    const arrayText = TEXT_DISPLAY.querySelectorAll('.active');     //putting all the emelents with class active in the arry
    const arrayInput = TEXT_INPUT.value.split('');                  //splitting input valur on the characters so we can compare input and display text
    let wholeWord = 0;                                              //checkng if the whole word is written corectly
    let done = true;                                                // cheking if the quote is done
    if(!timer.Enable){
        timer.Start();
    }


    //going trough text and comparing input and display text
    arrayText.forEach((element,index) => {
        if(arrayInput[index] == null){                          //character isn't written
            element.classList.remove('correct');
            element.classList.remove('incorrect');
            done = false;
        }else if(element.innerText === arrayInput[index]){      // comparing characters on the same spot in the arry
            element.classList.add('correct');
            element.classList.remove('incorrect');
            wholeWord++;
        } else{
            element.classList.remove('correct');
            element.classList.add('incorrect');
            done = false;
            wholeWord--;
        }
        if(wholeWord === index + 1 && element.innerText === ' ' && arrayInput[index] === ' '){ //checking if whole word is writen

            for(let i = 0 ; i < wholeWord; i++){
                arrayText[i].classList.remove('active');
            }
            numberOfwords++;
            TEXT_INPUT.placeholder = '';
            TEXT_INPUT.value = null;
        }

    });

    //if done reset all values
    if(done){
        TEXT_INPUT.disabled = true;
        TEXT_INPUT.value = null;
        TEXT_INPUT.placeholder = "Click next";
        numberOfwords = 0;
        if(timer.Enable){
            timer.Stop();
        }
    }
});


//for timer => tick
function getTime(){
    return Math.floor((new Date() - timer.startTime) / 1000);
}




function reset(){
    TEXT_INPUT.disabled = false;
    TEXT_INPUT.value = null;
    TEXT_INPUT.placeholder = "Start typing";
    TEXT_INPUT.focus();
    numberOfwords = 0;
    if(timer.Enable){
        timer.Stop();
    }
    TIMER.innerText = 0 + " seconds";
    WPM.innerText = "- WPM";
}
