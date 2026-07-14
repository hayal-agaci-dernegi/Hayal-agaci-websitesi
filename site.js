document.addEventListener("DOMContentLoaded", function() {
    const gozlemci = new IntersectionObserver((eslesmeler) => {
        eslesmeler.forEach((eslesme) => {
            if (eslesme.isIntersecting) {
                eslesme.target.classList.add('goster');
            }
        });
    });

    const gizliOgeler = document.querySelectorAll('.gizli');
    gizliOgeler.forEach((oge) => gozlemci.observe(oge));
});

document.addEventListener("DOMContentLoaded", function() {
    let sonKaydirmaKonumu = 0;
    const header = document.querySelector('header');

    window.addEventListener('scroll', function() {
        let mevcutKaydirma = window.pageYOffset || document.documentElement.scrollTop;
        
        if (mevcutKaydirma > sonKaydirmaKonumu && mevcutKaydirma > 100) {
            header.classList.add('gizle'); 
        } else {
            header.classList.remove('gizle'); 
        }
        
        sonKaydirmaKonumu = mevcutKaydirma;
    });
});

// Wheel event listener kaldırıldı — tarayıcının doğal scroll davranışı kullanılıyor

const slider = document.getElementById('scrollWrapper');
if (slider) {
    let isDown = false;
    let startX;
    let currentX = 0; 
    let speed = 1;

    function render() {
        if (!isDown) {
            currentX -= speed;
            if (Math.abs(currentX) >= slider.scrollWidth / 2) {
                currentX = 0;
            }
            slider.style.transform = `translateX(${currentX}px)`;
        }
        requestAnimationFrame(render);
    }

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - currentX;
        slider.parentElement.style.cursor = 'grabbing';
    });

    window.addEventListener('mouseup', () => {
        isDown = false;
        slider.parentElement.style.cursor = 'grab';
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        currentX = e.pageX - startX;
        
        if (currentX > 0) currentX = -(slider.scrollWidth / 2);
        if (Math.abs(currentX) >= slider.scrollWidth / 2) currentX = 0;

        slider.style.transform = `translateX(${currentX}px)`;
    });

    render();
}

const animasyonluKartlar = document.querySelectorAll('.gizli-sol, .gizli-sag');
if (animasyonluKartlar.length > 0) {
    const observerAyarlari = { root: null, threshold: 0.15, rootMargin: "0px" };

    const animasyonObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('goster-animasyon');
            } else {
                entry.target.classList.remove('goster-animasyon');
            }
        });
    }, observerAyarlari);

    animasyonluKartlar.forEach(kart => { animasyonObserver.observe(kart); });
}

if (window.location.hash) {
    document.documentElement.style.scrollBehavior = 'auto';
    setTimeout(function() {
        document.documentElement.style.scrollBehavior = 'smooth';
    }, 500);
}

document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        const lightbox = document.getElementById('resim-lightbox');
        if (lightbox && lightbox.style.display === 'flex') {
            lightbox.style.display = 'none';
        }
    }
});

document.addEventListener('contextmenu', function(event) {
    let resimMi = event.target.tagName && event.target.tagName.toLowerCase() === 'img';
    let galeriKutusuMu = event.target.closest && event.target.closest('.galeri-kare') !== null;
    let buyutmeEkraniMi = (event.target.closest && event.target.closest('#resim-lightbox') !== null) || event.target.id === 'lightbox-resmi';
    let kartResmiMi = event.target.closest && event.target.closest('.kart-resim') !== null;
    let heroResmiMi = event.target.closest && event.target.closest('.detay-hero-resim') !== null;
    let anasayfaResmiMi = event.target.id === 'logo' || event.target.id === 'anaresim' || event.target.id === 'hakkimizda_resim' || (event.target.classList && event.target.classList.contains('item'));

    if (resimMi || galeriKutusuMu || buyutmeEkraniMi || kartResmiMi || heroResmiMi || anasayfaResmiMi) {
        event.preventDefault(); 
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === "F12" || event.keyCode === 123) { event.preventDefault(); }
    if (event.ctrlKey && event.shiftKey && (event.key === "I" || event.key === "i")) { event.preventDefault(); }
    if (event.ctrlKey && event.shiftKey && (event.key === "J" || event.key === "j")) { event.preventDefault(); }
    if (event.ctrlKey && (event.key === "U" || event.key === "u")) { event.preventDefault(); }
});

document.addEventListener('dragstart', function(e) {
    if (e.target.tagName && e.target.tagName.toLowerCase() === 'img') {
        e.preventDefault();
    }
});
