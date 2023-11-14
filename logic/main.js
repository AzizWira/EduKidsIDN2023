document.addEventListener("DOMContentLoaded", function () {
  const passwordInput = document.getElementById("password");
  const konfirmasiInput = document.getElementById("konfirmasi");
  const togglePasswordButton = document.getElementById("togglePassword");
  const toggleKonfirmasiButton = document.getElementById("toggleKonfirmasi");

  togglePasswordButton.addEventListener("click", function () {
    // Periksa tipe input saat ini
    const isPasswordType = passwordInput.type === "password";

    // Ganti tipe input sesuai dengan status sebelumnya
    passwordInput.type = isPasswordType ? "text" : "password";

    // Ganti gambar mata sesuai dengan status sebelumnya
    togglePasswordButton.innerHTML = `<img src="../assets/${
      isPasswordType ? "eye" : "eye-slash"
    }-icon.svg" alt="">`;
  });

  toggleKonfirmasiButton.addEventListener("click", function () {
    // Periksa tipe input saat ini
    const isPasswordType = konfirmasiInput.type === "password";

    // Ganti tipe input sesuai dengan status sebelumnya
    konfirmasiInput.type = isPasswordType ? "text" : "password";

    // Ganti gambar mata sesuai dengan status sebelumnya
    toggleKonfirmasiButton.innerHTML = `<img src="../assets/${
      isPasswordType ? "eye" : "eye-slash"
    }-icon.svg" alt="">`;
  });
});

function toggleForm(formType) {
    if (formType === 'register') {
      document.getElementById('formRegister').style.display = 'flex';
      document.getElementById('formlogin').style.display = 'none';
    } else {
      document.getElementById('formRegister').style.display = 'none';
      document.getElementById('formlogin').style.display = 'flex';
    }
  }
