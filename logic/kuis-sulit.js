let currentQuestion = 0;
let score = 0;
let wrongAnswer = 0;
let unansweredQuestions = 0;
let timer; // Variable to store the timer
const questionarea = document.getElementById("question-area");
const card1 = document.getElementById("card-1");
const card2 = document.getElementById("card-2");
const card3 = document.getElementById("card-3");
const cardsound = document.getElementById("card-sound");
let audioElement;

let questions = [
  {
    question: "What plans were they talking about to do in the park?",
    answers: [
      { option: "Picnic and kite flying", correct: true },
      { option: "Cycling and swimming", correct: false },
      { option: "Running and fishing", correct: false },
      { option: "Playing soccer", correct: false },
    ],
  },
  {
    question: "What will Lisa bring as snacks for the picnic?",
    answers: [
      { option: "Ice cream and chocolate", correct: false },
      { option: "Fruit and sandwiches", correct: true },
      { option: "Cake and French fries", correct: false },
      { option: "Pizza and soda", correct: false },
    ],
  },
  {
    question: "Where they will meet in the park?",
    answers: [
      { option: "In front of the supermarket", correct: false },
      { option: "In the pool", correct: false },
      { option: "At the park entrance", correct: true },
      { option: "At the bus stop", correct: false },
    ],
  },
  {
    question: "What are Tom's worries about the weather?",
    answers: [
      { option: "Chance of rain", correct: true },
      { option: "The hot sun", correct: false },
      { option: "Strong winds", correct: false },
      { option: "Possible thunderstorms", correct: false },
    ],
  },
  {
    question: "What Tom will take to the park?",
    answers: [
      { option: "Hat and sunglasses", correct: false },
      { option: "Bicycles and skateboards", correct: false },
      { option: "Kite", correct: true },
      { option: "Hat and sunglasses", correct: false },
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
  const timerDisplay = document.getElementById("timer");
  const audioElement = document.getElementById("backsound"); // Tambahan: Dapatkan elemen audio

  const answerLetters = ["A", "B", "C", "D"];

  indexQuestion.innerHTML = `Soal ${currentQuestion + 1} / ${questions.length}`;
  questionElement.innerHTML = question.question;
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

  // Tambahan: Mulai pemutaran audio
  audioElement.play();
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

  const scoreElementSuccess = document.getElementById("score");
  const wrongAnswersElementSuccess = document.getElementById("wrongAnswers");
  const scoreElementFailed = document.getElementById("scoreFailed");
  const wrongAnswersElementFailed = document.getElementById("wrongAnswersFailed");
  const resultTextSuccess = document.getElementById("text-result-success");
  const resultTextFailed = document.getElementById("text-result-failed");
  const certiImage = document.querySelector(".certi img");
  const buttonSuccess = document.getElementById("buttonSuccess");

  scoreElementSuccess.textContent = score;
  wrongAnswersElementSuccess.textContent = wrongAnswer;
  scoreElementFailed.textContent = score; // Sesuaikan ini dengan ID yang sesuai jika perlu
  wrongAnswersElementFailed.textContent = wrongAnswer; // Sesuaikan ini dengan ID yang sesuai jika perlu

  const popupResultSuccess = document.getElementById("popup-result-success");
  const conBtnResult = document.querySelector(".con-btn-result");
  const btnKembali = document.createElement("button");
  const btnLanjut = document.createElement("button");

  btnKembali.textContent = "Kembali ke halaman utama";
  btnKembali.onclick = function () {
    window.location.href = "../loggedIn/index.html";
  };

  if (score >= 4) {
    certiImage.src = "../assets/certi-dumy.jpg";
    resultTextSuccess.style.display = "block";
    resultTextFailed.style.display = "none";
    buttonSuccess.style.display = "block";
    btnLanjut.textContent = "Lanjut";
    btnLanjut.onclick = function () {
      window.location.href = "kuis-sulit.html";
    };
  } else {
    certiImage.src = "../assets/failedToNextLevel.svg";
    resultTextSuccess.style.display = "none";
    resultTextFailed.style.display = "block";
    buttonSuccess.style.display = "none";
    btnLanjut.textContent = "Ulangi";
    btnLanjut.onclick = function () {
      window.location.href = "kuis-sulit.html";
    };
  }

  conBtnResult.innerHTML = "";
  conBtnResult.appendChild(btnKembali);
  // conBtnResult.appendChild(btnLanjut);

  popupResultSuccess.style.display = "block";
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

function showSoundCard() {
  cardsound.style.display = "flex";
  // Tambahkan logika atau tindakan lain yang diperlukan untuk menampilkan kartu suara
}

setTimeout(() => {
  // Sembunyikan card-1 setelah 12 detik
  card1.style.display = "none";
  cardsound.style.display = "flex";
  // Jalankan fungsi showSoundCard
  showSoundCard();
}, 10000);

// Tambahkan event listener untuk setiap tombol audio
const audioButtons = document.querySelectorAll(".btn-sound");
audioButtons.forEach((button) => {
  button.addEventListener("click", playAudio);
});

function playAudio() {
  // Mendapatkan tombol yang ditekan
  const button = this;

  // Mematikan event listener untuk tombol tersebut agar tidak dapat diklik lagi
  button.removeEventListener("click", playAudio);
  const audioPath = "../assets/audio/conversation.mp3";

  // Buat elemen audio
  const audioElement = new Audio(audioPath);

  // Tampilkan elemen info
  const headerSound = document.querySelector(".header-sound");
  headerSound.style.display = "flex";

  // Tampilkan dan mulai countdown timer pada timer-sound
  const timerSoundDisplay = document.getElementById("timer-sound");
  timerSoundDisplay.style.display = "block";
  let countdown = 40;

  // Tambahkan event listener untuk memulai countdown setelah audio dimulai
  audioElement.onplay = () => {
    const countdownInterval = setInterval(() => {
      timerSoundDisplay.textContent = `00:${
        countdown < 10 ? "0" : ""
      }${countdown}`;
      countdown--;

      if (countdown < 0) {
        clearInterval(countdownInterval);
        timerSoundDisplay.style.display = "none";
        const soundCard = document.querySelector(".card-sound");
        const questionCard = document.querySelector(".card-2");
        soundCard.style.display = "none";
        questionCard.style.display = "flex";
        loadQuestion(); // Muat pertanyaan pertama setelah menampilkan card-2
      }
    }, 1000);
  };

  // Putar audio
  audioElement.play();
}
