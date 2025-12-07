// script.js

// 📌 Variabel Global
const WHATSAPP_NUMBER = '6285806865727'; // Ganti dengan nomor WhatsApp Anda
const API_WA = `https://wa.me/085806865727?text=`;

document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Toggle (untuk responsif)
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 2. Fitur Pemesanan WhatsApp (di semua halaman)
    const whatsappButtons = document.querySelectorAll('.btn-whatsapp');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productName = e.target.dataset.product || e.target.closest('a').dataset.product;
            if (productName) {
                const message = `Halo, saya ingin pesan ${productName}.`;
                const encodedMessage = encodeURIComponent(message);
                window.open(API_WA + encodedMessage, '_blank');
            } else {
                // Untuk tombol 'Pesan via WhatsApp' di Home (tanpa produk spesifik)
                const defaultMessage = "Halo, saya tertarik dengan produk Kopi Nusantara. Bisakah saya mendapatkan informasi lebih lanjut?";
                window.open(API_WA + encodeURIComponent(defaultMessage), '_blank');
            }
            e.preventDefault(); // Mencegah navigasi default jika ini adalah link
        });
    });

    // 3. Fitur Form Kontak (Hanya di kontak.html)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleFormSubmission(contactForm);
        });
    }

    // 4. Fitur Countdown Timer (Hanya di promo.html)
    const countdownElement = document.getElementById('countdown-timer');
    if (countdownElement) {
        startCountdown(countdownElement);
    }
});

// --- FUNGSI SPESIFIK ---

/**
 * Menangani validasi dan simulasi pengiriman form kontak.
 * @param {HTMLFormElement} form - Elemen form.
 */
function handleFormSubmission(form) {
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const messageDisplay = document.getElementById('form-message');

    // Reset notifikasi
    messageDisplay.style.display = 'none';
    messageDisplay.classList.remove('success-message', 'error-message');

    // Validasi Sederhana
    if (!nameInput.value || !phoneInput.value || !emailInput.value) {
        showMessage('Semua field wajib diisi!', 'error');
        return;
    }

    if (!validateEmail(emailInput.value)) {
        showMessage('Format Email tidak valid!', 'error');
        return;
    }

    if (!validatePhone(phoneInput.value)) {
        showMessage('Format Nomor HP tidak valid!', 'error');
        return;
    }

    // Simulasi Pengiriman Berhasil
    showMessage('Pesan berhasil dikirim! (Simulasi tanpa Backend)', 'success');
    form.reset();
}

/**
 * Menampilkan notifikasi form.
 * @param {string} message - Pesan yang akan ditampilkan.
 * @param {('success'|'error')} type - Tipe notifikasi.
 */
function showMessage(message, type) {
    const messageDisplay = document.getElementById('form-message');
    messageDisplay.textContent = message;
    messageDisplay.classList.add(`${type}-message`);
    messageDisplay.style.display = 'block';

    // Hilangkan pesan setelah 5 detik
    setTimeout(() => {
        messageDisplay.style.display = 'none';
    }, 5000);
}

/**
 * Validasi format email.
 */
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * Validasi format nomor HP sederhana (hanya angka).
 */
function validatePhone(phone) {
    const re = /^\d{8,15}$/; // Minimal 8, maksimal 15 digit angka
    return re.test(String(phone).replace(/\D/g, '')); // Hapus non-digit sebelum validasi
}


/**
 * Memulai countdown timer.
 * @param {HTMLElement} element - Elemen untuk menampilkan timer.
 */
function startCountdown(element) {
    // Tentukan tanggal akhir promo (misalnya: 7 hari dari sekarang)
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);
    // Tambahkan 2 jam untuk demo waktu lokal jika diperlukan
    // endDate.setHours(endDate.getHours() + 2);

    const updateTimer = () => {
        const now = new Date().getTime();
        const distance = endDate.getTime() - now;

        // Perhitungan waktu
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Tampilkan hasil
        if (distance < 0) {
            clearInterval(timerInterval);
            element.innerHTML = "PROMO TELAH BERAKHIR!";
        } else {
            element.innerHTML = `
                <span>${days} Hari</span>
                <span>${hours} Jam</span>
                <span>${minutes} Menit</span>
                <span>${seconds} Detik</span>
            `;
        }
    };

    // Panggil updateTimer setiap 1 detik
    updateTimer(); // Panggil pertama kali segera
    const timerInterval = setInterval(updateTimer, 1000);
}