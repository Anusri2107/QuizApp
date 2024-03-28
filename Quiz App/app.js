const questions = [
    {
        question: "What does HTML stands for?",
        answers: [
            {text: "HyperText Markup Language" , correct: true},
            {text: "HyperText Machine Language" , correct: false},
            {text: "HyperText Marking Language" , correct: false},
            {text: "HighText Marking Language" , correct: false},
        ]
    },
    {
        question: "Which of the following is used to read an HTML page and render it?",
        answers: [
            {text: "Web server" , correct: false},
            {text: "Web network" , correct: false},
            {text: "Web matrix" , correct: false},
            {text: "Web browser" , correct: true},
        ]
    },
    {
        question: "Which element is used for or styling HTML5 layout?",
        answers: [
            {text: "JavaScript" , correct: false},
            {text: "JQuery" , correct: false},
            {text: "CSS" , correct: true},
            {text: "PHP" , correct: false},
        ]
    },
    {
        question: "What does CSS stands for?",
        answers: [
            {text: "Central Style Sheets" , correct: false},
            {text: "Cascading Style Sheets" , correct: true},
            {text: "Central Simple Sheets" , correct: false},
            {text: "Cascading Simple Sheets" , correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answers");
const nextButton = document.getElementById("next");

let currentQuestion = 0;
let score = 0;

function startQuiz(){
    currentQuestion=0;
    score=0;
    nextButton.innerHTML = "NEXT";
    showQuestion();
}

function showQuestion(){
    resetButtons();

    let currentQuestionindex = questions[currentQuestion];
    let questionNumber =  currentQuestion+1;
    questionElement.innerHTML = questionNumber + ". " + currentQuestionindex.question;

    currentQuestionindex.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
    
        button.addEventListener("click", selectAnswer);
    });

}

function resetButtons(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selected = e.target;
    const isCorrect = selected.dataset.correct === "true";
    if(isCorrect){
        selected.classList.add("correct");
        score++;
    }
    else{
        selected.classList.add("incorrect");
    }


    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetButtons();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Restart Quiz";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestion++;
    if(currentQuestion<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestion < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});

startQuiz();