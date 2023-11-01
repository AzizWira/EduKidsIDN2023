// fungsi untuk tabbar
const buttons = document.querySelectorAll('.nav-content button');
const sections = document.querySelectorAll('.section');

function showSection(sectionId) {
    sections.forEach((section) => {
        if (section.id === sectionId) {
            section.style.display = 'flex';
        } else {
            section.style.display = 'none';
        }
    });
}

function showAllSections() {
    sections.forEach((section) => {
        section.style.display = 'flex';
    });
}

function setInitialState() {
    showAllSections();
}

setInitialState();

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        const targetId = button.getAttribute('data-target');
        if (targetId === 'pageSemua') {
            showAllSections();
        } else {
            showSection(targetId);
        }

        // Hapus kelas "active" dari semua tombol
        buttons.forEach((btn) => {
            btn.classList.remove('active');
        });

        // Tambahkan kelas "active" ke tombol yang diklik
        button.classList.add('active');
    });
});

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
        penjelasan: 'Kata yang digunakan untuk mengucapkan selamat tinggal kepada seseorang.',
    },
    {
        inggris: "Thank you",
        terjemahan: "Terima kasih",
        penjelasan: 'Ungkapan terima kasih kepada seseorang.',
    },
    {
        inggris: "Please",
        terjemahan: "Tolong",
        penjelasan: 'Kata sopan yang digunakan untuk meminta sesuatu dengan baik.',
    },
    {
        inggris: "I",
        terjemahan: "Saya",
        penjelasan: 'Kata ganti orang pertama tunggal yang mengacu pada diri sendiri.',
    },
    {
        inggris: "You",
        terjemahan: "Anda",
        penjelasan: 'Kata ganti orang kedua yang digunakan untuk merujuk kepada seseorang yang diajak bicara.',
    },
    {
        inggris: "They",
        terjemahan: "Mereka",
        penjelasan: 'Kata ganti orang ketiga jamak yang digunakan untuk merujuk kepada sekelompok orang atau benda.',
    },
    {
        inggris: "We",
        terjemahan: "Kami/Kita",
        penjelasan: 'Kata ganti orang pertama jamak yang mengacu pada diri sendiri dan orang lain.',
    },
    {
        inggris: "Book",
        terjemahan: "Buku",
        penjelasan: 'Objek yang digunakan untuk membaca dan memperoleh informasi.',
    },
    {
        inggris: "Dog",
        terjemahan: "Anjing",
        penjelasan: 'Binatang peliharaan yang sering dikaitkan dengan kesetiaan.',
    },
    {
        inggris: "Cat",
        terjemahan: "Kucing",
        penjelasan: 'Binatang peliharaan yang sering menjadi teman manusia.',
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
