const quizData = [
    {
      question: "Who is the founder of Microsoft?",
      options: [
        "C.V. Raman",
        "Steve Henry",
        "Bill Gates",
        "Milan",
      ],
      answer: "Bill Gates",
    },
    {
      question: "Which data structure follows the Last In, First Out (LIFO) principle?",
      options: [
        "Queue",
        "Stack",
        "Linked List",
        "Tree",
      ],
      answer: "Stack",
    },
    {
      question: "What is the binary representation of the decimal number 25?",
      options: ["11001", "10001", "11101", "11010"],
      answer: "11001",
    },
    {
      question: "Which of the following is NOT a type of network topology?",
      options: ["Star", "Mesh", "Loop", "Bus"],
      answer: "Loop",
    },
    {
      question: "Which of the following is a fundamental principle of Object-Oriented Programming (OOP)?",
      options: [
        "Encapsulation",
        "Abstraction",
        "Inheritance",
        "All of the above",
      ],
      answer: "All of the above",
    },
  ];

  const quizContainer = document.getElementById("quiz-container");
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const submitBtn = document.getElementById("submit-btn");
  const resultElement = document.getElementById("result");
  const scoreElement = document.getElementById("score");

  let currentQuestionIndex = 0;
  let score = 0;

  function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {
      const optionElement = document.createElement("div");
      optionElement.classList.add("option");
      optionElement.textContent = option;
      optionElement.addEventListener("click", () => selectAnswer(option));
      optionsElement.appendChild(optionElement);
    });
  }

  function selectAnswer(selectedOption) {
    const currentQuestion = quizData[currentQuestionIndex];
    if (selectedOption === currentQuestion.answer) {
      resultElement.textContent = "Correct!";
      resultElement.style.color = "#28a745";
      score++;
    } else {
      resultElement.textContent = "Incorrect!";
      resultElement.style.color = "#dc3545";
    }
    scoreElement.textContent = `Score: ${score}`;
    submitBtn.disabled = true;
    nextQuestion();
  }

  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
      loadQuestion();
      resultElement.textContent = "";
      submitBtn.disabled = false;
    } else {
      endQuiz();
    }
  }

  function endQuiz() {
  const quizCompleteContainer = document.createElement('div');
  quizCompleteContainer.classList.add('quiz-complete-container');

  const quizCompleteContent = document.createElement('div');
  quizCompleteContent.classList.add('quiz-complete-content');
  
  const quizCompleteTitle = document.createElement('h2');
  quizCompleteTitle.textContent = 'Quiz Complete';

  const scoreText = document.createElement('p');
  scoreText.textContent = 'Your final score is ';
  
  const scoreSpan = document.createElement('span');
  scoreSpan.textContent = score;
  scoreSpan.classList.add('score');

  const totalText = document.createElement('span');
  totalText.textContent = ' out of ';
  totalText.classList.add('total');

  const totalSpan = document.createElement('span');
  totalSpan.textContent = quizData.length;
  totalSpan.classList.add('total');

  const scoreContainer = document.createElement('p');
  scoreContainer.appendChild(scoreText);
  scoreContainer.appendChild(scoreSpan);
  scoreContainer.appendChild(totalText);
  scoreContainer.appendChild(totalSpan);

  const playAgainButton = document.createElement('button');
  playAgainButton.textContent = 'Play Again';
  playAgainButton.classList.add('play-again-btn');
  playAgainButton.addEventListener('click', () => {
      window.location.reload();
  });

  quizCompleteContent.appendChild(quizCompleteTitle);
  quizCompleteContent.appendChild(scoreContainer);
  quizCompleteContent.appendChild(playAgainButton);
  quizCompleteContainer.appendChild(quizCompleteContent);
  quizContainer.innerHTML = '';
  quizContainer.appendChild(quizCompleteContainer);

  animateScore();
}

function animateScore() {
  const scoreSpan = document.querySelector('.score');
  const finalScore = score;
  let currentScore = 0;
  const scoreAnimation = setInterval(() => {
      if (currentScore <= finalScore) {
          scoreSpan.textContent = currentScore;
          currentScore++;
      } else {
          clearInterval(scoreAnimation);
      }
  }, 50);
}

submitBtn.addEventListener("click", nextQuestion);
loadQuestion();