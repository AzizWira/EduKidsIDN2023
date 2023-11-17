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
      question: 'What is a "bicycle"?',
      image: "../assets/assets-sedang/bicycle.jpg",
      answers: [
        { option: "A farming tool used for weeding crops", correct: false },
        { option: "A vehicle with two wheels", correct: true },
        { option: "The name of a fictional character in a science fiction movie", correct: false },
        { option: "A type of kitchen knife used for cutting meat", correct: false },
      ],
    },
    {
      question: "What is a boat?",
      image: "../assets/assets-sedang/boat.png",
      answers: [
        { option: "a sea transportation", correct: true },
        { option: "A farming tool used for weeding crops", correct: false },
        { option: "The name of a fictional character in a science fiction movie", correct: false },
        { option: "A type of kitchen knife used for cutting meat", correct: false },
      ],
    },
    {
      question: "What is a elephant?",
      image: "../assets/assets-sedang/elephant.png",
      answers: [
        { option: "the underwater reptile", correct: false },
        { option: "the flying mammal", correct: false },
        { option: "the small insect", correct: false },
        { option: "the big animal", correct: true },
      ],
    },
    {
      question: "Look at that train, the train has a ___ color?",
      image: "../assets/assets-sedang/train.png",
      answers: [
        { option: "Yellow", correct: true },
        { option: "Green", correct: false },
        { option: "Blue", correct: false },
        { option: "Red", correct: false },
      ],
    },
    {
      question: "look at that bus, it has ___ wheels?",
      image: "../assets/assets-sedang/bus.png",
      answers: [
        { option: "Two", correct: false },
        { option: "Six", correct: false },
        { option: "Eight", correct: false },
        { option: "Four", correct: true },
      ],
    },
    {
      question: "I want to be a ____________ when I grow up.",
      image: "../assets/assets-sedang/doctor.png",
      answers: [
        { option: "chef", correct: false },
        { option: "astronaut", correct: false },
        { option: "doctor", correct: true },
        { option: "professional skateboarder", correct: false },
      ],
    },
    {
      question: "The sun is shining brightly in the ____________.",
      image: "../assets/assets-sedang/sky.png",
      answers: [
        { option: "shoe", correct: false },
        { option: "sky", correct: true },
        { option: "bathtub", correct: false },
        { option: "backpack", correct: false },
      ],
    },
  {
    question: "She loves to play the ____________ every day.",
    image: "../assets/assets-sedang/piano.png",
    answers: [
      { option: "piano", correct: true },
      { option: "soccer", correct: false },
      { option: "guitar", correct: false },
      { option: "basketball", correct: false },
    ],
  },
  {
    question: "My favorite ____________ is chocolate.",
    image: "../assets/assets-sedang/flavor.png",
    answers: [
      { option: "animal", correct: false },
      { option: "flavor", correct: true },
      { option: "color ", correct: false },
      { option: "hobby", correct: false },
    ],
  },
  {
    question: "We are going to the ____________ to buy some fruits.",
    image: "../assets/assets-sedang/market.png",
    answers: [
      { option: "library", correct: false },
      { option: "market", correct: true },
      { option: "garden", correct: false },
      { option: "school", correct: false },
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

  startTimer(30, timerDisplay); // set waktu

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
  }, 1500);
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
      window.location.href = "kuis-sulit.html";
    };
  } else {
    btnUlangi.textContent = "Ulangi";
    btnUlangi.onclick = function () {
      window.location.href = "kuis-sedang.html";
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
}, 15000);
