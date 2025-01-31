document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        document.getElementById('loading').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loading').style.display = 'none';
            document.body.classList.add('show-content');
        }, 500);
    }, 1500);

    const toggleThemeBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        toggleThemeBtn.innerHTML = '☀ Mode Terang';
    }

    toggleThemeBtn.addEventListener('click', function() {
        if (document.body.classList.contains('dark-mode')) {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
            toggleThemeBtn.innerHTML = '🌙 Mode Gelap';
        } else {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
            toggleThemeBtn.innerHTML = '☀ Mode Terang';
        }
    });
 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    document.querySelector('form')?.addEventListener('submit', function(e) {
        const name = document.querySelector('input[name="name"]');
        const email = document.querySelector('input[name="email"]');
        const message = document.querySelector('textarea[name="message"]');

        if (!name.value || !email.value || !message.value) {
            e.preventDefault();
            alert('Harap isi semua field sebelum mengirim pesan.');
        }
    });

    const fadeElements = document.querySelectorAll('.fade-in');
    const fadeInOnScroll = () => {
        fadeElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.9) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    window.addEventListener('scroll', fadeInOnScroll);
    fadeInOnScroll();
});

function openQRIS(amount) {
    document.getElementById("qris-amount").innerText = "Rp " + amount;
    document.getElementById("qris-popup").style.display = "flex";

    let timeLeft = 120;
    const timer = document.getElementById("timer");

    const countdown = setInterval(function () {
        if (timeLeft <= 0) {
            clearInterval(countdown);
            closeQRIS();
        } else {
            timer.innerText = timeLeft;
            timeLeft--;
        }
    }, 1000);

    const qrisImage = document.getElementById("qris-image").src;
    document.getElementById("download-qris").href = qrisImage;

    document.getElementById("send-wa").onclick = function() {
        sendProofToWhatsApp(amount);
    };
}

function closeQRIS() {
    document.getElementById("qris-popup").style.display = "none";
}


function sendProofToWhatsApp(amount) {
    const phoneNumber = "6283854833221"; // Ganti dengan nomor Wa lu
    const message = `Halo, saya telah melakukan pembayaran sebesar Rp ${amount} melalui QRIS. Berikut adalah bukti pembayaran saya.`;
    const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(waLink, "_blank");
}

let currentPage = 1;
const totalPages = 2; 

function nextPage() {
    if (currentPage < totalPages) {       
        document.getElementById('page' + currentPage).style.display = 'none';
        currentPage++;

        document.getElementById('page' + currentPage).style.display = 'block';
        
        if (currentPage === totalPages) {
            document.getElementById('nextBtn').style.display = 'none';
        }

document.getElementById('prevBtn').style.display = 'inline-block';
    }
}

function prevPage() {
    if (currentPage > 1) {
        
        document.getElementById('page' + currentPage).style.display = 'none';
        currentPage--;

       
        document.getElementById('page' + currentPage).style.display = 'block';

        
        if (currentPage === 1) {
            document.getElementById('prevBtn').style.display = 'none';
        }
       document.getElementById('nextBtn').style.display = 'inline-block';
    }
}

function getResponse() {
    let userText = document.getElementById("userInput").value;
    let responseDiv = document.getElementById("response");

    if (userText.trim() === "") {
        responseDiv.innerHTML = "⚠️ Harap masukkan teks!";
        responseDiv.style.display = "block";
        return;
    }

    responseDiv.innerHTML = "⏳ Sedang memproses...";
    responseDiv.style.display = "block";

    fetch(`https://website-restapii.vercel.app/luminai?text=${encodeURIComponent(userText)}`)
        .then(response => response.json())
        .then(data => {
            responseDiv.innerHTML = `💬 ${data.message.result || "Tidak ada respons dari server."}`;
        })
        .catch(error => {
            responseDiv.innerHTML = "❌ Terjadi kesalahan. Coba lagi nanti.";
            console.error("Error:", error);
        });
}
