const questions = [
    {
        question: "The largest animal in the world is...",
        answer: [
            {text: "elephant", correct: false},
            {text: "whale", correct: true},
            {text: "mom", correct: false},
            {text: "Shark", correct: false},
        ]
    }, {
        question: "The fastest animal in the world is...",
        answer: [
            {text: "tigers", correct: false},
            {text: "dogs", correct: false},
            {text: "humans", correct: false},
            {text: "cheetahs", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next");

let currentQuestionIndex = 0;
let Score = 0;

function startQuiz(){ 
currentQuestionIndex = 0;
Score = 0;
nextButton.innerHTML = "Next";
showQuestion();
}
function showQuestion(){
resetState();
let currentQuestion = questions[currentQuestionIndex];
let questionNo = currentQuestionIndex + 1;
questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

currentQuestion.answer.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if (answer.correct){
        button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
});
}

function resetState(){
nextButton.style.display = "none";
while(answerButton.firstChild){
    answerButton.removeChild(answerButton.firstChild);
}
}

function selectAnswer(e){
const selectedBtn = e.target;
const isCorrect = selectedBtn.dataset.correct==="true";
if (isCorrect) {
    selectedBtn.classList.add("correct");
    Score++;
}else {
    selectedBtn.classList.add("incorrect");
}
Array.from(answerButton.children).forEach(button => {
    if(button.dataset.correct==="true"){
        button.classList.add("correct");
    } 
    button.disabled = true;
});
nextButton.style.display="block";
}

function showScore(){
resetState();
questionElement.innerHTML = `You scored ${Score} out of ${questions.length}`;
nextButton.innerHTML = "Play again";
nextButton.style.display = 'block';
}

function handleNextButton(){
currentQuestionIndex++;
if (currentQuestionIndex < questions.length) {
    showQuestion();
}else {
    showScore();
}
}

nextButton.addEventListener("click", ()=>{
if (currentQuestionIndex < questions.length) {
    handleNextButton();
} else {
    startQuiz();
}
});

startQuiz();
