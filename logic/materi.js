// fungsi untuk tabbar
const buttons = document.querySelectorAll(".nav-content button");
const sections = document.querySelectorAll(".section");

function showSection(sectionId) {
  sections.forEach((section) => {
    if (section.id === sectionId) {
      section.style.display = "flex";
    } else {
      section.style.display = "none";
    }
  });
}

function showAllSections() {
  sections.forEach((section) => {
    section.style.display = "flex";
  });
}

function setInitialState() {
  showAllSections();
}

setInitialState();

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const targetId = button.getAttribute("data-target");
    if (targetId === "pageSemua") {
      showAllSections();
    } else {
      showSection(targetId);
    }

    // Hapus kelas "active" dari semua tombol
    buttons.forEach((btn) => {
      btn.classList.remove("active");
    });

    // Tambahkan kelas "active" ke tombol yang diklik
    button.classList.add("active");
  });
});

// start kosakata
const data_kosakata = [
  {
    inggris: "He",
    terjemahan: "Dia - Untuk Laki-Laki",
    penjelasan: 'Gunakan "he" ketika bicara tentang seorang laki-laki.',
  },
  {
    inggris: "Hello",
    terjemahan: "Halo",
    penjelasan: "Kata sapaan yang digunakan untuk menyapa seseorang.",
  },
  {
    inggris: "She",
    terjemahan: "Dia - Untuk Perempuan",
    penjelasan: 'Gunakan "she" ketika bicara tentang seorang perempuan.',
  },
  {
    inggris: "Goodbye",
    terjemahan: "Selamat Tinggal",
    penjelasan:
      "Kata yang digunakan untuk mengucapkan selamat tinggal kepada seseorang.",
  },
  {
    inggris: "Thank you",
    terjemahan: "Terima kasih",
    penjelasan: "Ungkapan terima kasih kepada seseorang.",
  },
  {
    inggris: "Please",
    terjemahan: "Tolong",
    penjelasan: "Kata sopan yang digunakan untuk meminta sesuatu dengan baik.",
  },
  {
    inggris: "I",
    terjemahan: "Saya",
    penjelasan:
      "Kata ganti orang pertama tunggal yang mengacu pada diri sendiri.",
  },
  {
    inggris: "You",
    terjemahan: "Anda",
    penjelasan:
      "Kata ganti orang kedua yang digunakan untuk merujuk kepada seseorang yang diajak bicara.",
  },
  {
    inggris: "They",
    terjemahan: "Mereka",
    penjelasan:
      "Kata ganti orang ketiga jamak yang digunakan untuk merujuk kepada sekelompok orang atau benda.",
  },
  {
    inggris: "We",
    terjemahan: "Kami/Kita",
    penjelasan:
      "Kata ganti orang pertama jamak yang mengacu pada diri sendiri dan orang lain.",
  },
  {
    inggris: "Book",
    terjemahan: "Buku",
    penjelasan: "Objek yang digunakan untuk membaca dan memperoleh informasi.",
  },
  {
    inggris: "Dog",
    terjemahan: "Anjing",
    penjelasan: "Binatang peliharaan yang sering dikaitkan dengan kesetiaan.",
  },
  {
    inggris: "Cat",
    terjemahan: "Kucing",
    penjelasan: "Binatang peliharaan yang sering menjadi teman manusia.",
  },
];

const kosakataContainer = document.getElementById("kosakata");

const fillKosakata = data_kosakata.map(
  (data) => `
    <div class="fill">
        <h4>${data.inggris}</h4>
        <p>Terjemahan : <span>${data.terjemahan}</span></p>
        <p>Penjelasan: <span>${data.penjelasan}</span></p>
    </div>
  `
);

kosakataContainer.innerHTML = fillKosakata.join("");
// end kosakata

// start tenses
data_tenses = [
  {
    tenses:
      "Present Tense (Tense Sebagai Waktu Sekarang): Digunakan untuk menggambarkan peristiwa yang sedang berlangsung saat ini atau situasi yang umum atau berulang.",
    contoh: "I am reading a book. (Saya sedang membaca sebuah buku.)",
  },
  {
    tenses:
      "Past Tense (Tense Sebagai Waktu Lampau): Digunakan untuk menggambarkan peristiwa atau situasi yang terjadi di masa lampau.",
    contoh: "I am reading a book. (Saya sedang membaca sebuah buku.)",
  },
  {
    tenses:
      "Present Tense (Tense Sebagai Waktu Sekarang): Digunakan untuk menggambarkan peristiwa yang sedang berlangsung saat ini atau situasi yang umum atau berulang.",
    contoh: "She watched a movie last night. (Dia menonton film semalam.)",
  },
  {
    tenses:
      "Future Tense (Tense Sebagai Waktu Masa Depan): Digunakan untuk menggambarkan peristiwa yang akan terjadi di masa depan.",
    contoh:
      "We will visit the zoo tomorrow. (Kami akan mengunjungi kebun binatang besok.)",
  },
  {
    tenses:
      "Present Continuous Tense (Tense Kini Berlangsung): Digunakan untuk menggambarkan peristiwa yang sedang berlangsung atau rencana masa depan.",
    contoh: "They are playing in the park. (Mereka sedang bermain di taman.)",
  },
  {
    tenses:
      "Past Continuous Tense (Tense Lampau yang Sedang Berlangsung): Digunakan untuk menggambarkan peristiwa yang sedang berlangsung di masa lampau.",
    contoh:
      "I was studying when he called. (Saya sedang belajar ketika dia menelepon.)",
  },
  {
    tenses:
      "Future Continuous Tense (Tense Masa Depan yang Sedang Berlangsung): Digunakan untuk menggambarkan peristiwa yang akan berlangsung di masa depan dan akan berlangsung dalam jangka waktu tertentu.",
    contoh:
      "At 10 AM tomorrow, we will be having a meeting. (Jam 10 pagi besok, kami akan mengadakan pertemuan.)",
  },
];

const tensesContainer = document.getElementById("tenses");

const fillTenses = data_tenses.map(
  (data, index) => `
    <div class="fill">
    <p>
      ${index + 1}.
      <span
        >${data.tenses}</span
      >
    </p>
    <li>
      Contoh:
      <span
        >${data.contoh}</span
      >
    </li>
  </div>
    `
);

tensesContainer.innerHTML = fillTenses.join("");
// end tenses

// start percakapan
data_percakapan = [
  {
    tema: "Berkenalan (Introducing Yourself):",
    a: "Hi, I'm Sarah. (Hai, saya Sarah.)",
    b: "Nice to meet you, Sarah. I'm Kalam. (Senang bertemu denganmu, Sarah. Saya Kalam.)",
    penjelasan:
      "Dalam percakapan berkenalan, kita pertama-tama menyebutkan nama kita dan kemudian merespons dengan kalimat sambutan. 'Nice to meet you' adalah ungkapan umum untuk menunjukkan senangnya bertemu seseorang.",
  },
];

const percakapanContainer = document.getElementById("percakapan");

const fillPercakapan = data_percakapan.map(
  (data) => `
    <div class="fill">
    <h4>${data.tema}</h4>
    <p>A : <span>${data.a}</span></p>
    <p>
      B :
      <span
        >${data.b}</span
      >
    </p>
    <p class="penjelasan">
      Penjelasan:
      <span
        >${data.penjelasan}</span
      >
    </p>
  </div>
    `
);

percakapanContainer.innerHTML = fillPercakapan.join("");
// end percakapan

// start pengucapan
data_pengucapan = [
  {
    index: 0,
    teks: "“Hello, My name is Jenni”",
    audio: "../assets/audio/Hello my name is jen.mp3",
  },
  {
    index: 1,
    teks: "“Hello, My name is Jenni”",
    audio: "../assets/audio/Excuse me can i try it on.mp3",
  },
];

const pengucapanContainer = document.getElementById("pengucapan");

const fillPengucapan = data_pengucapan.map(
  (data) => `
  <div class="fill">
  <h4>${data.teks}</h4>
  <div class="sound">
    <img src="../assets/btn_play_sound.svg" alt="" class="btn-audio" data-index="${data.index}"/>
    <h4>Dengarkan suara berikut</h4>
  </div>
</div>
    `
);

pengucapanContainer.innerHTML = fillPengucapan.join("");

// Tambahkan event listener untuk setiap tombol audio
const audioButtons = document.querySelectorAll(".btn-audio");
audioButtons.forEach((button) => {
  button.addEventListener("click", playAudio);
});

function playAudio(event) {
  const index = event.target.getAttribute("data-index");
  const audioPath = data_pengucapan[index].audio;

  // Buat elemen audio
  const audioElement = new Audio(audioPath);

  // Putar audio
  audioElement.play();
}
// end percakapan

// start kalimat
data_kalimat = [
  {
    judul: "Subjek dan Predikat:",
    isi: "Setiap kalimat dalam bahasa Inggris memiliki dua komponen utama:subjek (subject) dan predikat (predicate). Subjek adalah apa atau siapa yang kalimat itu bicarakan, dan predikat adalah tindakan atau keadaan yang dilakukan subjek.",
    contoh:
      "Subjek: She (Dia) Predikat: is reading a book (sedang membaca sebuah buku).",
  },
];

const kalimatContainer = document.getElementById("pembentukan-kalimat");

const fillKalimat = data_kalimat.map(
  (data, index) => `
  <div class="fill">
  <h4>${index + 1}. <span>${data.judul}</span></h4>
  <p>
    ${data.isi}.
  </p>
  <p>Contoh :</p>
  <p>
    ${data.contoh}
  </p>
</div>
    `
);

kalimatContainer.innerHTML = fillKalimat.join("");
// end kalimat
