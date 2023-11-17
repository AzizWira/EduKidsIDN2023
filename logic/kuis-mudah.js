let currentQuestion = 0;
let score = 0;
let wrongAnswer = 0;
let unansweredQuestions = 0;
let timer; // Variable to store the timer
const questionarea = document.getElementById("question-area");
const card1 = document.getElementById("card-1");
const card2 = document.getElementById("card-2");
const card3 = document.getElementById("card-3");

let questions = [
    {
      question: "What is shown in the picture?",
      image: "../assets/assets-mudah/cat.jpg",
      answers: [
        { option: "Cat", correct: true },
        { option: "Dog", correct: false },
        { option: "Bird", correct: false },
        { option: "Fish", correct: false },
      ],
    },
    // question strowbery
    {
      question: "What is shown in the picture?",
      image: "../assets/assets-mudah/apple.jpg",
      answers: [
        { option: "Apple", correct: true },
        { option: "Strowbery", correct: false },
        { option: "Banana", correct: false },
        { option: "Orange", correct: false },
      ],
    },
    {
      question: "What is this vehicle called?",
      image: "../assets/assets-mudah/motorcycle.jpg",
      answers: [
        { option: "Car", correct: false },
        { option: "Bicycle", correct: false },
        { option: "Motorcycle", correct: true },
        { option: "Bus", correct: false },
      ],
    },
    {
      question: "What flies in the sky?",
      image: "../assets/assets-mudah/plane.jpg",
      answers: [
        { option: "Bird", correct: false },
        { option: "Butterfly", correct: false },
        { option: "Plane", correct: true },
        { option: "Kite", correct: false },
      ],
    },
    {
      question: "What is this traditional Indonesian vehicle?",
      image: "../assets/assets-mudah/becak.jpg",
      answers: [
        { option: "Car", correct: false },
        { option: "Bicycle", correct: false },
        { option: "Motorcycle", correct: false },
        { option: "Becak", correct: true },
      ],
    },
    {
      question: "What is this person doing?",
      image: "../assets/assets-mudah/work.svg",
      answers: [
        { option: "Eating", correct: false },
        { option: "Sleeping", correct: false },
        { option: "Working", correct: true },
        { option: "Playing", correct: false },
      ],
    },
    {
      question: "What is this person doing?",
      image: "../assets/assets-mudah/singing.svg",
      answers: [
        { option: "Talking", correct: false },
        { option: "Reading", correct: false },
        { option: "Singing", correct: true },
        { option: "Dancing", correct: false },
      ],
    },
  {
    question: "What is this person doing?",
    image: "../assets/assets-mudah/driving.svg",
    answers: [
      { option: "Cooking", correct: false },
      { option: "Driving", correct: true },
      { option: "Swimming", correct: false },
      { option: "Running", correct: false },
    ],
  },
  {
    question: "What is this person riding?",
    image: "../assets/assets-mudah/bicycle.svg",
    answers: [
      { option: "Motorcycle", correct: false },
      { option: "Bicycle", correct: true },
      { option: "Scooter", correct: false },
      { option: "Skateboard", correct: false },
    ],
  },
  {
    question: "What is this person doing?",
    image: "../assets/assets-mudah/studying.svg",
    answers: [
      { option: "Playing", correct: false },
      { option: "Studying", correct: true },
      { option: "Sleeping", correct: false },
      { option: "Eating", correct: false },
    ],
  },
];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function highlightCorrectAnswer() {
  const correctOptionIndex = questions[currentQuestion].answers.findIndex(
    (answer) => answer.correct === true
  );
  const correctButton = document.querySelector(
    `#option${correctOptionIndex + 1}`
  );
  correctButton.classList.add("correct");
}

shuffleArray(questions);

function highlightCorrectAnswerNotAnswer() {
  const correctOptionIndex = questions[currentQuestion].answers.findIndex(
    (answer) => answer.correct === true
  );
  const correctButton = document.querySelector(
    `#option${correctOptionIndex + 1}`
  );
  correctButton.classList.add("overtime");
}

function highlightinCorrectAnswer(isCorrect, selectedOption) {
  const correctOptionIndexTrue = questions[currentQuestion].answers.findIndex(
    (answer) => answer.correct === true
  );

  const correctButtonTrue = document.querySelector(
    `#option${correctOptionIndexTrue + 1}`
  );

  correctButtonTrue.classList.add("correct");

  if (!isCorrect) {
    const selectedButton = document.querySelector(
      `#option${selectedOption + 1}`
    );
    selectedButton.classList.add("incorrect");
  }
}

function startTimer(duration, display) {
  clearInterval(timer); // Menghentikan timer sebelumnya (jika ada)

  let start = Date.now(),
    diff,
    hours,
    minutes,
    seconds;

  function updateTimer() {
    diff = duration - (((Date.now() - start) / 1000) | 0);

    hours = Math.floor((diff / 3600) % 24);
    minutes = Math.floor((diff / 60) % 60);
    seconds = Math.floor(diff % 60);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = hours + ":" + minutes + ":" + seconds;

    if (diff <= 0) {
      handleUnansweredQuestions();
      selectAnswer(false, undefined); // Panggil fungsi selectAnswer dengan jawaban salah
    }
  }

  updateTimer();
  timer = setInterval(updateTimer, 1000);
}

function loadQuestion() {
  let question = questions[currentQuestion];
  let indexQuestion = document.getElementById("index-question");
  let questionElement = document.getElementById("question");
  let answersElement = document.getElementById("answers");
  let questionImageElement = document.getElementById("questionImage");
  const timerDisplay = document.getElementById("timer");

  const answerLetters = ["A", "B", "C", "D"];
  
  indexQuestion.innerHTML = `Soal ${currentQuestion + 1} / ${questions.length}`;
  questionElement.innerHTML = question.question;
  questionImageElement.src = question.image;
  answersElement.innerHTML = "";

  startTimer(2, timerDisplay); // set waktu

  // Shuffle the order of answer options
  shuffleArray(question.answers);

  questionarea.classList.add("fade-in");

  for (let i = 0; i < question.answers.length; i++) {
    answersElement.innerHTML += `
        <button id="option${i + 1}" class="btn" onclick="selectAnswer(${
      question.answers[i].correct
    }, ${i})">
          <span>${answerLetters[i]}</span><span>${
      question.answers[i].option
    }</span>
        </button>
      `;
  }
}

function selectAnswer(isCorrect, selectedOption) {
  clearInterval(timer);

  if (selectedOption === undefined) {
    highlightCorrectAnswerNotAnswer();
    wrongAnswer++;
  } else if (selectedOption !== undefined && !isCorrect) {
    highlightinCorrectAnswer(isCorrect, selectedOption);
    wrongAnswer++;
  } else if (selectedOption !== undefined && isCorrect) {
    highlightCorrectAnswer();
    score++;
  }

  disableButtons();

  setTimeout(() => {
    currentQuestion++;

    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      handleUnansweredQuestions();
      displayResult();
    }
  }, 2000);
}

function disableButtons() {
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.disabled = true;
  });
}

function displayResult() {
  clearInterval(timer);

  const scoreElement = document.getElementById("score");
  const wrongAnswersElement = document.getElementById("wrongAnswers");

  scoreElement.textContent = score;
  wrongAnswersElement.textContent = wrongAnswer;

  const popupResult = document.getElementById("popup-result");
  const conBtnResult = document.querySelector(".con-btn-result");
  const btnKembali = document.createElement("button");
  const btnUlangi = document.createElement("button");

  btnKembali.textContent = "Kembali ke halaman utama";
  btnKembali.onclick = function () {
    window.location.href = "../loggedIn/index.html";
  };

  if (score >= 8) {
    btnUlangi.textContent = "Lanjut";
    btnUlangi.onclick = function () {
      window.location.href = "kuis-sedang.html";
    };
  } else {
    btnUlangi.textContent = "Ulangi";
    btnUlangi.onclick = function () {
      window.location.href = "kuis-mudah.html";
    };
  }

  conBtnResult.innerHTML = "";
  conBtnResult.appendChild(btnKembali);
  conBtnResult.appendChild(btnUlangi);

  popupResult.style.display = "block";
  questionarea.style.display = "none";
  card2.style.display = "none";
  card3.style.display = "flex";
}

function submitQuiz() {
  displayResult();
}

function handleUnansweredQuestions() {
  if (!timer) {
    unansweredQuestions += questions.length - currentQuestion;
  }
}

window.addEventListener("unload", handleUnansweredQuestions);

setTimeout(() => {
  loadQuestion();
  card1.style.display = "none";
  card2.style.display = "flex";
}, 1000);
