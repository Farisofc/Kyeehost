document.addEventListener('DOMContentLoaded', function() {
    // 🔹 Animasi Loading dengan Delay
    setTimeout(() => {
        document.getElementById('loading').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loading').style.display = 'none';
            document.body.classList.add('show-content'); // Menampilkan konten dengan animasi
        }, 500);
    }, 1500);

    // 🔹 Mode Gelap/Terang
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

    // 🔹 Smooth Scroll untuk Navigasi Menu
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 🔹 Konfirmasi sebelum Pembelian
    document.querySelectorAll('.buy-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Apakah Anda yakin ingin membeli produk ini?')) {
                window.location.href = this.href;
            }
        });
    });

    // 🔹 Validasi Form Kontak
    document.querySelector('form')?.addEventListener('submit', function(e) {
        const name = document.querySelector('input[name="name"]');
        const email = document.querySelector('input[name="email"]');
        const message = document.querySelector('textarea[name="message"]');

        if (!name.value || !email.value || !message.value) {
            e.preventDefault();
            alert('Harap isi semua field sebelum mengirim pesan.');
        }
    });

    // 🔹 Efek Fade-in pada Elemen saat Scroll
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