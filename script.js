const paragraphs = [
"The quick brown fox jumps over the lazy dog.",
"Technology is transforming the way people work and communicate.",
"Practice typing daily to improve speed and accuracy.",
"Web development combines creativity and logical thinking.",
"Artificial intelligence is changing modern software systems."
];

const homeScreen = document.getElementById("homeScreen");
const testScreen = document.getElementById("testScreen");
const resultScreen = document.getElementById("resultScreen");

const startBtn = document.getElementById("startBtn");
const retryBtn = document.getElementById("retryBtn");

const paragraph = document.getElementById("paragraph");
const typingInput = document.getElementById("typingInput");

let timer;
let timeLeft = 60;
let totalTime = 60;
let started = false;
let errors = 0;

startBtn.addEventListener("click", startTest);
retryBtn.addEventListener("click", resetApp);

function showScreen(screen){
homeScreen.classList.remove("active");
testScreen.classList.remove("active");
resultScreen.classList.remove("active");

screen.classList.add("active");
}

function startTest(){

showScreen(testScreen);

const randomText =
paragraphs[Math.floor(Math.random()*paragraphs.length)];

paragraph.innerHTML = randomText
.split("")
.map(char => `<span>${char}</span>`)
.join("");

typingInput.value="";
typingInput.focus();

timeLeft =
parseInt(document.getElementById("duration").value);

totalTime=timeLeft;

document.getElementById("timer").textContent=timeLeft;

started=false;
errors=0;

clearInterval(timer);
}

typingInput.addEventListener("input",()=>{

if(!started){
startTimer();
started=true;
}

const chars = paragraph.querySelectorAll("span");
const typed = typingInput.value;

let correct=0;
errors=0;

chars.forEach((char,index)=>{

if(typed[index]==null){

char.classList.remove(
"correct",
"incorrect"
);

}
else if(typed[index]===char.innerText){

char.classList.add("correct");
char.classList.remove("incorrect");

correct++;

}
else{

char.classList.add("incorrect");
char.classList.remove("correct");

errors++;
}

});

document.getElementById("errors").textContent=errors;

let accuracy =
typed.length>0
? ((correct/typed.length)*100).toFixed(1)
:100;

document.getElementById("accuracy").textContent=
accuracy;

document.getElementById("cpm").textContent=
correct;

let elapsed =
(totalTime-timeLeft)/60;

if(elapsed<=0){
elapsed=1/60;
}

let wpm =
Math.round((correct/5)/elapsed);

document.getElementById("wpm").textContent=
wpm;

document.getElementById("progressFill").style.width=
Math.min(
(typed.length/chars.length)*100,
100
)+"%";
});

function startTimer(){

timer=setInterval(()=>{

timeLeft--;

document.getElementById("timer").textContent=
timeLeft;

if(timeLeft<=0){

clearInterval(timer);

finishTest();

}

},1000);

}

function finishTest(){

showScreen(resultScreen);

const wpm=
document.getElementById("wpm").textContent;

const accuracy=
document.getElementById("accuracy").textContent;

document.getElementById("finalWpm").textContent=
wpm;

document.getElementById("finalAccuracy").textContent=
accuracy+"%";

document.getElementById("finalErrors").textContent=
errors;

let best=
localStorage.getItem("bestWpm") || 0;

if(Number(wpm)>Number(best)){
best=wpm;
localStorage.setItem("bestWpm",best);
}

document.getElementById("bestScore").textContent=
best;

document.getElementById("finalBest").textContent=
best;
}

function resetApp(){

document.getElementById("bestScore").textContent=
localStorage.getItem("bestWpm") || 0;

showScreen(homeScreen);
}

document.getElementById("bestScore").textContent=
localStorage.getItem("bestWpm") || 0;