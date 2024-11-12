const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "shark", correct: false },
            { text: "blue whale", correct: true },
            { text: "elephant", correct: false },
            { text: "giraffe", correct: false },
        ]
    },
    {
        question: "Which is the smallest bird in the world?",
        answers: [
            { text: "sparrow", correct: false },
            { text: "hummingbird", correct: true },
            { text: "crow", correct: false },
            { text: "peacock", correct: false },
        ]
    },
    {
        question: "What is the capital of India?",
        answers: [
            { text: "Uttar Pradesh", correct: false },
            { text: "Delhi", correct: true },
            { text: "Noida", correct: false },
            { text: "Uttarakhand", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-button");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.style.display = "none";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        alert("Quiz completed! Your score is " + score + "/" + questions.length);
        startQuiz();
    }
});

startQuiz();
