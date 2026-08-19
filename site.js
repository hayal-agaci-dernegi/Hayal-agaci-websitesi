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

// ==========================================
// HAREKETLİ İSTATİSTİK SAYAÇLARI
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    const sayaclar = document.querySelectorAll('.sayac');
    let sayacBasladi = false;

    const sayacGozlemci = new IntersectionObserver((eslesmeler) => {
        eslesmeler.forEach((eslesme) => {
            if (eslesme.isIntersecting && !sayacBasladi) {
                sayacBasladi = true; 
                
                sayaclar.forEach((sayac) => {
                    const hedef = parseInt(sayac.getAttribute('data-hedef'));
                    const hiz = 100; 
                    const artis = hedef / hiz;

                    const guncelle = () => {
                        const mevcutStr = sayac.innerText.replace(/\./g, '');
                        const mevcut = parseInt(mevcutStr) || 0;

                        if (mevcut < hedef) {
                            sayac.innerText = Math.ceil(mevcut + artis).toLocaleString('tr-TR');
                            setTimeout(guncelle, 20); 
                        } else {
                            sayac.innerText = hedef.toLocaleString('tr-TR');
                        }
                    };
                    guncelle();
                });
            }
        });
    }, { threshold: 0.5 }); 

    const skorTablosu = document.getElementById('skortablosu');
    if(skorTablosu) sayacGozlemci.observe(skorTablosu);
});

// ==========================================
// FAALİYET HARİTASI KODLARI
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    var haritaKutusu = document.getElementById('harita');
    
    if(haritaKutusu) {
        var harita = L.map('harita', {
            scrollWheelZoom: false
        }).setView([37.7636, 38.2773], 12);

        harita.on('click', function() { 
            harita.scrollWheelZoom.enable(); 
        });

        harita.on('mouseout', function() { 
            harita.scrollWheelZoom.disable(); 
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap - Hayal Ağacı Derneği'
        }).addTo(harita);

        var enkazPin = L.marker([37.7640, 38.2780]).addTo(harita);
        enkazPin.bindPopup(`
            <b style="font-size: 16px;">Enkaz Kütüphanesi</b><br>
            Adıyaman Merkez Halk Kütüphanesi<br><br>
            <a href="EnkazKutuphanesi.html" style="background: rgb(134, 220, 84); color: white; padding: 5px 10px; text-decoration: none; border-radius: 5px; display: inline-block;">Hikayesini Oku</a>
        `);

        var k1Pin = L.marker([37.7500, 38.2600]).addTo(harita);
        k1Pin.bindPopup(`
            <b style="font-size: 16px;">K1 Konteyner Kent</b><br>
            Çocuklarımız için umut alanı.<br><br>
            <a href="K1 Konteynerkent.html" style="background: rgb(134, 220, 84); color: white; padding: 5px 10px; text-decoration: none; border-radius: 5px; display: inline-block;">Sayfaya Git</a>
        `);
        
        var zeyPin = L.marker([37.8000, 38.2000]).addTo(harita);
        zeyPin.bindPopup(`
            <b style="font-size: 16px;">Muhammed Işıkbulanoğlu</b><br>
            Zey Köy Okulu<br><br>
            <a href="Muhammed Işıkbulanoğlu.html" style="background: rgb(134, 220, 84); color: white; padding: 5px 10px; text-decoration: none; border-radius: 5px; display: inline-block;">Sayfaya Git</a>
        `);
    }
});

// ==========================================
// AKILLI VE MANUEL UYUMLU KARANLIK MOD SİSTEMİ
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    const themeBtn = document.createElement("div");
    themeBtn.id = "theme-toggle-btn";
    
    // Butonun CSS geçişini hazırlıyoruz ki mekanik zıplamada kaymak gibi görünsün
    themeBtn.style.transition = "transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), background-color 0.3s ease";
    document.body.appendChild(themeBtn);

    themeBtn.innerHTML = `
        <svg id="theme-svg" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2">
            <mask id="moon-mask">
                <rect x="0" y="0" width="100%" height="100%" fill="white" />
                <circle id="mask-circle" cx="24" cy="4" r="8" fill="black" />
            </mask>
            <circle id="main-circle" cx="12" cy="12" r="5" fill="currentColor" mask="url(#moon-mask)" />
            <g id="sun-rays" stroke="currentColor" style="transition: 0.6s ease; transform-origin: center;">
                <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </g>
        </svg>
    `;

    const mainCircle = document.getElementById('main-circle');
    const sunRays = document.getElementById('sun-rays');
    const maskCircle = document.getElementById('mask-circle');

    const applyTheme = (mode) => {
        if (mode === 'dark') {
            document.body.classList.add('dark-mode');
            sunRays.style.opacity = "1";
            sunRays.style.transform = "rotate(0deg) scale(1)";
            mainCircle.setAttribute('r', '5');
            maskCircle.setAttribute('cx', '25'); 
        } else {
            document.body.classList.remove('dark-mode');
            sunRays.style.opacity = "0";
            sunRays.style.transform = "rotate(-45deg) scale(0.5)";
            mainCircle.setAttribute('r', '9');
            maskCircle.setAttribute('cx', '18'); 
        }
    };

    const kayitliMod = localStorage.getItem("theme");

    if (kayitliMod) {
        applyTheme(kayitliMod);
    } else {
        const mevcutSaat = new Date().getHours();
        
        if (mevcutSaat >= 19 || mevcutSaat < 7) {
            applyTheme("dark");
        } else {
            applyTheme("light");
        }
    }

    themeBtn.addEventListener("click", () => {
        const newMode = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
        applyTheme(newMode);
        localStorage.setItem("theme", newMode);
    });
});

// ==========================================
// HAYAL AĞACI - YAPRAK ÜRETİCİ
// ==========================================
function yaprakUret() {
    if (window.balonModuAktif) return;

    var logoAlani = document.getElementById('isim_logo');
    if (!logoAlani) return;

    var yaprak = document.createElement('div');
    yaprak.classList.add('hayal-yaprak');

    yaprak.style.left = Math.random() * 80 + 10 + '%'; 
    var dususSuresi = (Math.random() * 2 + 3);
    var ruzgarSuresi = (Math.random() * 1 + 1); 
    
    yaprak.style.animationDuration = dususSuresi + 's, ' + ruzgarSuresi + 's';
    logoAlani.appendChild(yaprak);

    setTimeout(function() {
        yaprak.remove();
    }, dususSuresi * 1000);
}

setInterval(yaprakUret, 1200);

// ==========================================
// ZİYARETÇİ HAFIZASI VE KARŞILAMA (YENİLENEN SİSTEM)
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        var karsilamaKutusu = document.getElementById('ziyaretci-karsilama');
        var mesajAlani = document.getElementById('karsilama-mesaji');
        var muzikCalar = document.getElementById('muzik-calar-kapsayici'); 
        
        if (!karsilamaKutusu || !mesajAlani) return;

        // V3 anahtarını kullanıyoruz ki eski hatalı kayıtlar sistemi bozmasın
        var ziyaretDurumu = localStorage.getItem('hayalAgaciZiyaretV3');

        if (!ziyaretDurumu) {
            mesajAlani.innerHTML = "🌱 Hayal Ağacı'na Hoş Geldiniz! Destekleriniz bizim için çok değerli.";
            localStorage.setItem('hayalAgaciZiyaretV3', 'evet');

            // Sadece ilk girişte kutuyu ekrana alıyoruz
            karsilamaKutusu.style.bottom = "30px";
            
            // Eğer müzik çalar varsa onu da kutunun üstüne itiyoruz
            if (muzikCalar) muzikCalar.style.bottom = "110px";

            // 6 Saniye sonra kendi kendine kapanmasını sağla
            setTimeout(karsilamayiKapat, 6000);
        } else {
            // ZİYARETÇİ DAHA ÖNCE GİRMİŞSE KUTUYU DİREKT HTML'DEN SİL (KESİN ÇÖZÜM)
            karsilamaKutusu.remove();
        }
    }, 2000); 
});

function karsilamayiKapat() {
    var karsilamaKutusu = document.getElementById('ziyaretci-karsilama');
    var muzikCalar = document.getElementById('muzik-calar-kapsayici'); 
    
    if (karsilamaKutusu) {
        karsilamaKutusu.style.bottom = "-100px"; 
    }
    
    // Müzik çaları asıl yerine geri gönder
    if (muzikCalar) {
        muzikCalar.style.bottom = "20px";
    }
}

// ==========================================
// AKILLI VE GERÇEK ZAMANLI GECE MODU
// ==========================================
function akilliGeceModuKontrol() {
    const body = document.body;
    const icon = document.getElementById('dark-mode-icon');
    const kayitliMod = localStorage.getItem('theme');
    
    if (kayitliMod) {
        if (kayitliMod === 'dark') {
            body.classList.add('dark-mode');
            if(icon) icon.textContent = '☀️';
        }
    } else {
        const suAn = new Date();
        const saat = suAn.getHours();
        
        if (saat >= 20 || saat < 6) {
            body.classList.add('dark-mode');
            if(icon) icon.textContent = '☀️';
        }
    }
}
document.addEventListener('DOMContentLoaded', akilliGeceModuKontrol);

function toggleDarkMode() {
    const body = document.body;
    const icon = document.getElementById('dark-mode-icon');
    
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        icon.textContent = '☀️';
        localStorage.setItem('theme', 'dark'); 
    } else {
        icon.textContent = '🌙';
        localStorage.setItem('theme', 'light'); 
    }
}

// ==========================================
// DERNEK ŞARKISI MÜZİK ÇALAR KONTROLÜ
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    const sesDosyasi = document.getElementById("dernek-sarkisi");
    const oynatDuraklatBtn = document.getElementById("oynat-duraklat-btn");
    const playIkon = document.getElementById("play-ikon");
    const pauseIkon = document.getElementById("pause-ikon");
    const ilerlemeAlani = document.getElementById("muzik-ilerleme-alani");
    const ilerlemeCubugu = document.getElementById("ilerleme-cubugu");
    const gecenSure = document.getElementById("gecen-sure");
    const kalanSure = document.getElementById("kalan-sure");

    if(!sesDosyasi || !oynatDuraklatBtn) return;

    // CSS Geçişi (Mekanik Çarpışma için)
    const muzikCalarKapsayici = document.getElementById("muzik-calar-kapsayici");
    if(muzikCalarKapsayici) {
        muzikCalarKapsayici.style.transition = "bottom 0.6s cubic-bezier(0.25, 1, 0.5, 1), margin-bottom 0.4s cubic-bezier(0.25, 1, 0.5, 1)";
    }

    let oynuyorMu = false;

    function formatZaman(saniye) {
        if (isNaN(saniye)) return "0:00";
        const dk = Math.floor(saniye / 60);
        const sn = Math.floor(saniye % 60);
        return dk + ":" + (sn < 10 ? "0" + sn : sn);
    }

    oynatDuraklatBtn.addEventListener("click", function() {
        if (oynuyorMu) {
            sesDosyasi.pause();
            playIkon.style.display = "block";
            pauseIkon.style.display = "none";
            ilerlemeAlani.classList.remove("acik"); 
        } else {
            sesDosyasi.play().catch(e => console.log("Tarayıcı engeli: " + e));
            playIkon.style.display = "none";
            pauseIkon.style.display = "block";
            ilerlemeAlani.classList.add("acik"); 
        }
        oynuyorMu = !oynuyorMu;
    });

    sesDosyasi.addEventListener("timeupdate", function() {
        const yuzde = (sesDosyasi.currentTime / sesDosyasi.duration) * 100;
        ilerlemeCubugu.value = yuzde || 0;
        gecenSure.textContent = formatZaman(sesDosyasi.currentTime);
        kalanSure.textContent = "-" + formatZaman(sesDosyasi.duration - sesDosyasi.currentTime);
        
        ilerlemeCubugu.style.background = `linear-gradient(to right, rgb(134, 220, 84) ${yuzde}%, #e0e0e0 ${yuzde}%)`;
    });

    ilerlemeCubugu.addEventListener("input", function() {
        const yeniZaman = (ilerlemeCubugu.value / 100) * sesDosyasi.duration;
        sesDosyasi.currentTime = yeniZaman;
    });

    sesDosyasi.addEventListener("ended", function() {
        oynuyorMu = false;
        playIkon.style.display = "block";
        pauseIkon.style.display = "none";
        ilerlemeAlani.classList.remove("acik");
        ilerlemeCubugu.value = 0;
        sesDosyasi.currentTime = 0;
    });

    sesDosyasi.addEventListener("loadedmetadata", function() {
        kalanSure.textContent = "-" + formatZaman(sesDosyasi.duration);
    });
});

// ==========================================
// AKILLI TAKVİM VE TEMA SİSTEMİ (BAĞIMSIZ MODÜL)
// ==========================================
;(function () {
    'use strict';

    function annelerGunu(yil) {
        var d = new Date(yil, 4, 1);
        var ilkPazar = (d.getDay() === 0) ? 1 : (8 - d.getDay());
        return ilkPazar + 7;
    }

    function babalarGunu(yil) {
        var d = new Date(yil, 5, 1);
        var ilkPazar = (d.getDay() === 0) ? 1 : (8 - d.getDay());
        return ilkPazar + 14;
    }

    function kutupHaftaAraligi(yil) {
        var d = new Date(yil, 2, 31);
        while (d.getDay() !== 1) d.setDate(d.getDate() - 1);
        return { baslangic: d.getDate(), bitis: d.getDate() + 6 };
    }

    /* KESİN ÇÖZÜM: Linkten gelen test tarihlerini takvimin merkezine okutuyoruz */
    var bugun = new Date();
    var urlArama = new URLSearchParams(window.location.search);
    var testAy = urlArama.get('ay');
    var testGun = urlArama.get('gun');

    var ay    = testAy ? parseInt(testAy) : (bugun.getMonth() + 1);
    var gun   = testGun ? parseInt(testGun) : bugun.getDate();
    var yil   = bugun.getFullYear();

    var gunBilgisi = null;

    if      (ay === 4  && gun === 23) {
        gunBilgisi = { tema:'tema-milli', serit:'serit-milli', animasyon:'balon', mesaj:'🎈 23 Nisan Ulusal Egemenlik ve Çocuk Bayramı Kutlu Olsun!' };
    }
    else if (ay === 5  && gun === 19) {
        gunBilgisi = { tema:'tema-milli', serit:'serit-milli', animasyon:'balon', mesaj:'19 Mayıs Atatürk\'ü Anma, Gençlik ve Spor Bayramı!' };
    }
    else if (ay === 7  && gun === 15) {
        gunBilgisi = { tema:'tema-milli', serit:'serit-milli', animasyon:'balon', mesaj:'15 Temmuz Demokrasi ve Milli Birlik Günü.' };
    }
    else if (ay === 8  && gun === 30) {
        gunBilgisi = { tema:'tema-milli', serit:'serit-milli', animasyon:'balon', mesaj:'30 Ağustos Zafer Bayramı Kutlu Olsun!' };
    }
    else if (ay === 10 && gun === 29) {
        gunBilgisi = { tema:'tema-milli', serit:'serit-milli', animasyon:'balon', mesaj:'Cumhuriyetimizin Doğum Günü Kutlu Olsun!' };
    }
    else if (ay === 2  && gun === 6 ) {
        gunBilgisi = { tema:'tema-matem', serit:'serit-matem', animasyon:'yaprak', mesaj:'⌛ 6 Şubat: Unutmadık, Unutmayacağız. Acımız baki.' };
    }
    else if (ay === 3  && gun === 12) {
        gunBilgisi = { tema:'tema-matem', serit:'serit-matem', animasyon:'yaprak', mesaj:'📖 İstiklal Marşı\'mızın Kabulü ve Mehmet Akif Ersoy\'u Anma Günü.' };
    }
    else if (ay === 3  && gun === 18) {
        gunBilgisi = { tema:'tema-matem', serit:'serit-matem', animasyon:'yaprak', mesaj:'18 Mart Çanakkale Zaferi ve Şehitleri Anma Günü.' };
    }
    else if (ay === 8  && gun === 17) {
        gunBilgisi = { tema:'tema-matem', serit:'serit-matem', animasyon:'yaprak', mesaj:'⌛ 17 Ağustos 1999: Sesinizi hala duyuyoruz.' };
    }
    else if (ay === 9  && gun === 19) {
        gunBilgisi = { tema:'tema-matem', serit:'serit-matem', animasyon:'yaprak', mesaj:'🎖️ Kahraman Gazilerimizin Günü Kutlu Olsun.' };
    }
    else if (ay === 11 && gun === 10) {
        gunBilgisi = { tema:'tema-matem', serit:'serit-matem', animasyon:'yaprak', mesaj:'🖤 Ulu Önder Atatürk\'ü Saygı, Özlem ve Minnetle Anıyoruz.' };
    }
    else if (ay === 12 && gun === 21) {
        gunBilgisi = { tema:'tema-matem', serit:'serit-matem', animasyon:'yaprak', mesaj:'🌙 En Uzun Gece: Hayallerimiz karanlığı aydınlatmaya yeter.' };
    }
    else if (ay === 8  && gun === 12) {
        gunBilgisi = { tema:'tema-beyza', serit:'serit-beyza', animasyon:'yaprak', mesaj:'🤍 12 Ağustos: Beyza\'nın doğum günü. Hatırası hayallerimizde yaşıyor.' };
    }
    else if (ay === 3  && gun === 22) {
        gunBilgisi = { tema:'tema-doga', serit:'serit-doga', animasyon:'yaprak', mesaj:'💧 22 Mart Dünya Su Günü: Suyu koru, hayatı koru.' };
    }
    else if (ay === 4  && gun === 4 ) {
        gunBilgisi = { tema:'tema-doga', serit:'serit-doga', animasyon:'yaprak', mesaj:'🐾 4 Nisan Sokak Hayvanları Farkındalık Günü: Onlar da yaşamayı hak ediyor.' };
    }
    else if (ay === 6  && gun === 5 ) {
        gunBilgisi = { tema:'tema-doga', serit:'serit-doga', animasyon:'yaprak', mesaj:'🌍 5 Haziran Dünya Çevre Günü: Doğamıza sahip çıkalım.' };
    }
    else if (ay === 9  && gun === 8 ) {
        gunBilgisi = { tema:'tema-doga', serit:'serit-doga', animasyon:'yaprak', mesaj:'📚 8 Eylül Dünya Okuma Yazma Günü: Bilgi özgürleştirir.' };
    }
    else if (ay === 10 && gun === 4 ) {
        gunBilgisi = { tema:'tema-doga', serit:'serit-doga', animasyon:'yaprak', mesaj:'🐾 4 Ekim Dünya Hayvanları Koruma Günü: Onların sesi olalım.' };
    }
    else if (ay === 11 && gun === 11) {
        gunBilgisi = { tema:'tema-doga', serit:'serit-doga', animasyon:'yaprak', mesaj:'🌳 11 Kasım Ağaçlandırma Günü: Geleceğe kök salalım.' };
    }
    else if (ay === 3 && gun >= kutup.baslangic && gun <= kutup.bitis) {
        gunBilgisi = { tema:'tema-doga', serit:'serit-doga', animasyon:'yaprak', mesaj:'📖 Kütüphaneler Haftası: Bilgiye açık kapılar hiçbir zaman kapanmaz.' };
    }
    else if (ay === 1  && gun === 1 ) {
        gunBilgisi = { tema:'tema-vefa', serit:'serit-vefa', animasyon:'yaprak', mesaj:'🎊 Yeni Yıl Kutlu Olsun! Hayallerimiz bu yıl da büyüsün.' };
    }
    else if (ay === 3  && gun === 8 ) {
        gunBilgisi = { tema:'tema-vefa', serit:'serit-vefa', animasyon:'yaprak', mesaj:'💐 8 Mart Dünya Kadınlar Günü: Güçlü kadınlara saygıyla.' };
    }
    else if (ay === 5  && gun === 1 ) {
        gunBilgisi = { tema:'tema-vefa', serit:'serit-vefa', animasyon:'yaprak', mesaj:'✊ 1 Mayıs Emek ve Dayanışma Günü Kutlu Olsun!' };
    }
    else if (ay === 5  && gun === annG) {
        gunBilgisi = { tema:'tema-vefa', serit:'serit-vefa', animasyon:'yaprak', mesaj:'🌸 Anneler Günü Kutlu Olsun! Emekleriniz için teşekkürler.' };
    }
    else if (ay === 6  && gun === babG) {
        gunBilgisi = { tema:'tema-vefa', serit:'serit-vefa', animasyon:'yaprak', mesaj:'👨‍👧 Babalar Günü Kutlu Olsun! Sığınaklarımız, kahramanlarımız.' };
    }
    else if (ay === 10 && gun === 1 ) {
        gunBilgisi = { tema:'tema-vefa', serit:'serit-vefa', animasyon:'yaprak', mesaj:'🌼 1 Ekim Dünya Yaşlılar Günü: Tecrübelerine değer veriyoruz.' };
    }
    else if (ay === 11 && gun === 20) {
        gunBilgisi = { tema:'tema-vefa', serit:'serit-vefa', animasyon:'yaprak', mesaj:'🧒 20 Kasım Dünya Çocuk Hakları Günü: Her çocuk değerlidir.' };
    }
    else if (ay === 11 && gun === 24) {
        gunBilgisi = { tema:'tema-vefa', serit:'serit-vefa', animasyon:'yaprak', mesaj:'🎓 24 Kasım Öğretmenler Günü: Aydınlatan ellere minnetle.' };
    }
    else if (ay === 12 && gun === 3 ) {
        gunBilgisi = { tema:'tema-vefa', serit:'serit-vefa', animasyon:'yaprak', mesaj:'♿ 3 Aralık Dünya Engelliler Günü: Engel değil, fırsat eşitliği.' };
    }
    else if (ay === 12 && gun === 5 ) {
        gunBilgisi = { tema:'tema-vefa', serit:'serit-vefa', animasyon:'yaprak', mesaj:'🤝 5 Aralık Dünya Gönüllüler Günü: Birlikte daha güçlüyüz.' };
    }

    var BALON_RENKLERI = [
        '#FF6B6B','#FF8C42','#FFCB47','#62D9A5','#4EC8D6',
        '#6A9FFF','#C77DFF','#FF6FA8','#FF9DE2','#A3E87E'
    ];

    function rastgeleBalonRengi() {
        return BALON_RENKLERI[Math.floor(Math.random() * BALON_RENKLERI.length)];
    }

    function tamEkranBalonOlustur() {
        var balon   = document.createElement('div');
        balon.className = 'akilli-balon-tam';
        var boyut   = Math.random() * 55 + 25;         
        var sol     = Math.random() * 93;               
        var sure    = Math.random() * 3.5 + 3;          
        var gecikme = Math.random() * 4.5;              
        var surus   = (Math.random() - 0.5) * 110;     
        var rot     = (Math.random() - 0.5) * 32;

        balon.style.cssText =
            'width:'           + boyut          + 'px;' +
            'height:'          + (boyut * 1.25) + 'px;' +
            'left:'            + sol            + 'vw;' +
            'background-color:' + rastgeleBalonRengi()  + ';' +
            '--sure:'          + sure           + 's;'  +
            '--gecikme:'       + gecikme        + 's;'  +
            '--surus:'         + surus          + 'px;' +
            '--rot:'           + rot            + 'deg;';

        document.body.appendChild(balon);
        setTimeout(function () { balon.remove(); }, (sure + gecikme + 0.7) * 1000);
    }

    function logoBalonOlustur() {
        var logo = document.getElementById('isim_logo');
        if (!logo) return;

        var balon   = document.createElement('div');
        balon.className = 'logo-balon';
        var boyut   = Math.random() * 22 + 13;         
        var sol     = Math.random() * 76 + 10;          
        var sure    = Math.random() * 2 + 2.5;          
        var gecikme = Math.random() * 1.6;
        var surus   = (Math.random() - 0.5) * 72;

        balon.style.cssText =
            'width:'           + boyut          + 'px;' +
            'height:'          + (boyut * 1.25) + 'px;' +
            'left:'            + sol            + '%;'  +
            'background-color:' + rastgeleBalonRengi()  + ';' +
            '--sure:'          + sure           + 's;'  +
            '--gecikme:'       + gecikme        + 's;'  +
            '--surus:'         + surus          + 'px;';

        logo.appendChild(balon);
        setTimeout(function () { balon.remove(); }, (sure + gecikme + 0.5) * 1000);
    }

    function baslatBalonSistemi() {
        var yol = window.location.pathname;
        var anaSayfaMi = yol === '/' ||
                         yol.endsWith('/index.html') ||
                         yol === '/index.html';

        var bugunStr    = yil + '-' + ay + '-' + gun;
        var depoAnahtari = 'hayalAgaciBalonGunu';
        var kaydedilenGun = localStorage.getItem(depoAnahtari);
        var ilkZiyaretMi  = (kaydedilenGun !== bugunStr);

        if (anaSayfaMi && ilkZiyaretMi) {
            localStorage.setItem(depoAnahtari, bugunStr); 
            var gecenSure = 0;
            var asama1    = setInterval(function () {
                for (var i = 0; i < 3; i++) tamEkranBalonOlustur();
                gecenSure += 200;
                if (gecenSure >= 5000) {
                    clearInterval(asama1);
                    setInterval(logoBalonOlustur, 1600);
                }
            }, 200);
        } else {
            setInterval(logoBalonOlustur, 1600);
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        if (!gunBilgisi) return; 

        var header = document.querySelector('header');

        document.body.classList.add(gunBilgisi.tema);

        var serit = document.createElement('div');
        serit.id        = 'akilli-takvim-serit';
        serit.className = gunBilgisi.serit;
        serit.textContent = gunBilgisi.mesaj;
        if (header) header.appendChild(serit);

        if (gunBilgisi.animasyon === 'balon') {
            window.balonModuAktif = true; 
            baslatBalonSistemi();
        }
    });

}());

// ==========================================
// ALTERNATİF 1: OKUMA İLERLEME MOTORU
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    const kapsayici = document.createElement("div");
    kapsayici.id = "okuma-cubugu-kapsayici";
    const cubuk = document.createElement("div");
    cubuk.id = "okuma-cubugu";
    kapsayici.appendChild(cubuk);
    document.body.appendChild(kapsayici);

    window.addEventListener("scroll", function() {
        const inilenMesafe = document.documentElement.scrollTop || document.body.scrollTop;
        const toplamMesafe = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const yuzde = (inilenMesafe / toplamMesafe) * 100;
        cubuk.style.width = yuzde + "%";
    });
});

// ==========================================
// 4. SİSTEM: TAKILMAYAN AKILLI GEÇİŞ MOTORU (ANKRAJ DÜZELTMESİ)
// ==========================================
(function() {
    function loaderiKapat() {
        const loader = document.getElementById('preloader');
        if (loader) {
            loader.style.opacity = "0";
            loader.style.visibility = "hidden";
            setTimeout(() => {
                loader.classList.add('gizli-loader');
            }, 400);
        }
    }

    window.addEventListener('load', loaderiKapat);
    window.addEventListener('pageshow', loaderiKapat); 
    document.addEventListener('DOMContentLoaded', loaderiKapat);

    document.addEventListener("click", function(e) {
        const link = e.target.closest("a");
        if (!link) return;

        const hedefRaw = link.getAttribute("href");
        const hedefTab = link.getAttribute("target");

        if (!hedefRaw || hedefRaw.startsWith("mailto:") || hedefRaw.startsWith("tel:") || hedefTab === "_blank") return;

        const tamHedef = link.href;
        const suAnkiSayfa = window.location.origin + window.location.pathname;
        const hedefSayfa = tamHedef.split('#')[0]; 

        if (suAnkiSayfa === hedefSayfa && tamHedef.includes("#")) {
            return;
        }

        const loader = document.getElementById('preloader');
        if (loader) {
            e.preventDefault();
            loader.classList.remove('gizli-loader');
            loader.style.display = "flex";
            loader.style.opacity = "1";
            loader.style.visibility = "visible";

            setTimeout(() => {
                window.location.href = hedefRaw;
            }, 200);
        }
    });
})();

// MENÜ MOTORU
document.addEventListener("DOMContentLoaded", function() {
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const anaNav = document.querySelector("header nav");
    
    if(!hamburgerBtn || !anaNav) return;

    let tamEkranMenu = document.getElementById("tam-ekran-menu");
    if (!tamEkranMenu) {
        tamEkranMenu = document.createElement("div");
        tamEkranMenu.id = "tam-ekran-menu";
        const menuIcerik = anaNav.querySelector("ul").cloneNode(true);
        tamEkranMenu.appendChild(menuIcerik);
        document.body.appendChild(tamEkranMenu);

        const linkler = tamEkranMenu.querySelectorAll("a");
        linkler.forEach((link, index) => {
            link.style.setProperty('--i', index);
            link.addEventListener("click", () => {
                hamburgerBtn.classList.remove("aktif");
                tamEkranMenu.classList.remove("acik");
                document.body.classList.remove("menu-acik-kilit");
            });
        });
    }

    hamburgerBtn.addEventListener("click", function() {
        this.classList.toggle("aktif");
        tamEkranMenu.classList.toggle("acik");
        document.body.classList.toggle("menu-acik-kilit");
    });
});

// ==========================================
// AKILLI VİDEO ALGILAYICI VE HOVER MOTORU
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    const videolar = document.querySelectorAll('.medya-karti video');
    
    videolar.forEach(video => {
        video.muted = true;
        video.setAttribute('playsinline', ''); 
        
        const kart = video.closest('.medya-karti');
        kart.classList.add('video-karti'); 
        
        const oynatBtn = document.createElement('div');
        oynatBtn.className = 'zarif-oynat-butonu';
        oynatBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
        kart.appendChild(oynatBtn);

        kart.addEventListener('mouseenter', () => {
            let playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => { });
            }
        });
        
        kart.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0; 
        });
    });
});

// ==========================================
// AKILLI HIZ SENSÖRÜ (LITE MOD MOTORU) v2
// ==========================================
(function() {
    let sayfaYuklendi = false;

    window.addEventListener('load', function() {
        sayfaYuklendi = true;
    });

    function liteModuAktifEt() {
        if (document.body.classList.contains('lite-mod')) return;

        document.body.classList.add('lite-mod');
        console.log("Sistem Uyarısı: Bağlantı gerçekten yavaş, Lite Mod (Hızlı Sürüm) aktif edildi.");

        document.querySelectorAll('video').forEach(vid => {
            vid.pause();
            vid.removeAttribute('src');
            vid.load();
        });
    }

    const HIZESIGI_MBPS = 0.5; 
    const TEST_URL = 'https://www.google.com/images/phd/px.gif'; 

    async function hizOlc() {
        try {
            const baslangic = performance.now();
            const yanit = await fetch(TEST_URL + '?nocache=' + Date.now(), {
                cache: 'no-store',
                mode: 'no-cors' 
            });
            const bitis = performance.now();
            const sureSaniye = (bitis - baslangic) / 1000;

            const blob = await yanit.blob().catch(() => ({ size: 43 }));
            const boyutBit = (blob.size || 43) * 8;
            const hizMbps = (boyutBit / 1_000_000) / sureSaniye;

            console.log(`Hız testi: ${hizMbps.toFixed(3)} Mbps (${sureSaniye.toFixed(2)}s)`);
            return hizMbps;
        } catch (e) {
            console.warn("Hız testi başarısız:", e);
            return 0;
        }
    }

    const SAYFA_YÜKLEME_LIMITI_MS = 8000; 

    Promise.all([
        hizOlc(),

        new Promise(resolve => {
            if (sayfaYuklendi) return resolve(true);
            const zamanAsimi = setTimeout(() => resolve(false), SAYFA_YÜKLEME_LIMITI_MS);
            window.addEventListener('load', () => {
                clearTimeout(zamanAsimi);
                resolve(true);
            }, { once: true });
        })
    ]).then(([hizMbps, sayfaHizliYuklendi]) => {
        const hizYavas = hizMbps < HIZESIGI_MBPS;
        const yuklemeyavas = !sayfaHizliYuklendi;

        if (hizYavas && yuklemeyavas) {
            liteModuAktifEt();
        } else {
            console.log(`Hız testi geçti. Hız: ${hizMbps.toFixed(2)} Mbps | Sayfa hızlı yüklendi: ${sayfaHizliYuklendi}`);
        }
    });
})();

// ==========================================
// AKILLI VİDEO VE YÜKLEME ÇUBUĞU MOTORU
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    const videolar = document.querySelectorAll('.medya-karti video');
    
    videolar.forEach(video => {
        video.muted = true;
        video.setAttribute('playsinline', ''); 
        video.setAttribute('preload', 'none'); 
        
        const kart = video.closest('.medya-karti');
        kart.classList.add('video-karti'); 
        
        const oynatBtn = document.createElement('div');
        oynatBtn.className = 'zarif-oynat-butonu';
        oynatBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
        kart.appendChild(oynatBtn);

        const ilerlemeAlani = document.createElement('div');
        ilerlemeAlani.className = 'video-ilerleme-alani';
        const tamponCubugu = document.createElement('div');
        tamponCubugu.className = 'video-tampon-cubugu';
        ilerlemeAlani.appendChild(tamponCubugu);
        kart.appendChild(ilerlemeAlani);

        kart.addEventListener('mouseenter', () => {
            let playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => { });
            }
        });
        
        kart.addEventListener('mouseleave', () => {
            video.pause();
        });

        video.addEventListener('progress', function() {
            if (video.buffered.length > 0 && video.duration > 0) {
                const yuklenenSaniye = video.buffered.end(video.buffered.length - 1);
                const toplamSaniye = video.duration;
                
                const yuzde = (yuklenenSaniye / toplamSaniye) * 100;
                tamponCubugu.style.width = yuzde + '%';
            }
        });
    });
});

// ==========================================
// LITE MOD İSTEĞE BAĞLI MEDYA MOTORU
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    const videolar = document.querySelectorAll('.medya-karti video');
    const isLiteMode = document.body.classList.contains('lite-mod');

    videolar.forEach(video => {
        const kart = video.closest('.medya-karti');
        
        if (isLiteMode) {
            video.setAttribute('preload', 'none');
            
            const indirBtn = document.createElement('button');
            indirBtn.className = 'lite-indir-btn';
            indirBtn.innerHTML = '<span>📥</span> Medyayı Görüntüle';
            kart.appendChild(indirBtn);

            indirBtn.addEventListener('click', function(e) {
                e.stopPropagation(); 
                
                indirBtn.innerHTML = '<span>⏳</span> Yükleniyor...';
                
                video.setAttribute('preload', 'auto');
                video.load();
                
                video.addEventListener('canplaythrough', () => {
                    kart.classList.add('yuklendi');
                    indirBtn.style.display = 'none';
                    video.play();
                }, { once: true });
            });
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const dilBtn = document.getElementById('dil-btn');
    if (!dilBtn) return;

    let mevcutDil = localStorage.getItem('ha-dil') || 'tr';
    dilUygula(mevcutDil);

    dilBtn.addEventListener('click', function() {
        mevcutDil = (mevcutDil === 'tr') ? 'en' : 'tr';
        localStorage.setItem('ha-dil', mevcutDil);
        dilUygula(mevcutDil);
    });

    function dilUygula(dil) {
        document.querySelectorAll('[data-tr][data-en]').forEach(el => {
            el.innerHTML = el.getAttribute('data-' + dil);
        });
        dilBtn.textContent = (dil === 'tr') ? 'EN' : 'TR';
        document.documentElement.lang = dil;
    }
});

// ==========================================
// İLETİŞİM FORMU KONTROLÜ VE ARKA PLAN GÖNDERİMİ (AJAX)
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    const iletisimFormu = document.getElementById('hayal-iletisim-formu');
    
    if (!iletisimFormu) return; 

    iletisimFormu.addEventListener('submit', function(e) {
        e.preventDefault(); 

        const form = e.target;
        const mesajKutusu = document.getElementById('mesaj').value.toLocaleLowerCase('tr-TR');
        const adKutusu = document.getElementById('ad').value.toLocaleLowerCase('tr-TR');
        
        const yasakliKelimeler = [
            "amk", "aq", "mk", "awq", "amq", "sg", "oç", "oc", "pic", "s.g",
            "amcık", "siktir", "orospu", "fahişe", "pezevenk", "gavat", "göt", "götoş", 
            "yarrak", "yarak", "dalyarak", "yavşak", "kahpe", "sürtük", "piç", "amına", 
            "koyim", "koyam", "sokam", "sikeyim", "sikem", "sikim", "sikiş", "ibne", 
            "ipne", "şerefsiz", "haysiyetsiz", "namussuz", "kanıbozuk", "veledizina", 
            "puşt", "yavsak", "dangalak", "sik", "am", "orospucoçocuğu", "sikik", "sikme",
            "fuck", "shit", "bitch", "cunt", "asshole", "motherfucker", "dick", "cock", 
            "pussy", "whore", "slut", "faggot", "fag", "nigger", "nigga", "retard", 
            "wanker", "bastard", "douchebag",
            "cyka", "blyat", "suka", "bliad", "pizdec", "pizdet", "naxui", "hui", 
            "xuy", "chmo", "pidar", "pidaras", "pidor", "shluha", "сука", "блять", 
            "пиздец", "хуй", "пидор", "шлюха",
            "akp", "chp", "mhp", "hdp", "dem", "tayyip", "erdoğan", "kılıçdaroğlu", 
            "bahçeli", "apo", "feto", "fetö", "pkk", "kürdistan", "faşist", "komünist", 
            "şeriat", "terörist", "ypg", "dhkpc", "ışid"
        ]; 
        
        const temizMesaj = mesajKutusu.replace(/[.,!?]/g, '').split(/\s+/);
        const temizAd = adKutusu.replace(/[.,!?]/g, '').split(/\s+/);
        
        const mesajdaVarMi = temizMesaj.some(kelime => yasakliKelimeler.includes(kelime));
        const addaVarMi = temizAd.some(kelime => yasakliKelimeler.includes(kelime));

        if (mesajdaVarMi || addaVarMi) {
            alert("Lütfen derneğimize yakışır, daha nazik ve uygun bir dil kullanınız. Mesajınız gönderilmedi.");
            return false;
        }

        const btn = form.querySelector('.gonder-btn');
        const orijinalMetin = btn.innerHTML;
        btn.innerHTML = "⌛ Gönderiliyor...";
        btn.style.opacity = "0.7";
        btn.style.pointerEvents = "none";

        const formData = new FormData(form);

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: formData
        })
        .then(async (response) => {
            if (response.status === 200) {
                window.location.href = "tesekkur.html";
            } else {
                alert("Sunucu kaynaklı bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
                btn.innerHTML = orijinalMetin;
                btn.style.opacity = "1";
                btn.style.pointerEvents = "auto";
            }
        })
        .catch(error => {
            alert("Bağlantı hatası. Lütfen internetinizi kontrol edin.");
            btn.innerHTML = orijinalMetin;
            btn.style.opacity = "1";
            btn.style.pointerEvents = "auto";
        });
    });
});

var bugun = new Date();

var urlArama = new URLSearchParams(window.location.search);
var testAy = urlArama.get('ay');
var testGun = urlArama.get('gun');

var ay    = testAy ? parseInt(testAy) : (bugun.getMonth() + 1);
var gun   = testGun ? parseInt(testGun) : bugun.getDate();
var yil   = bugun.getFullYear();

function hesapAdiKopyala(btn) {
    const hesapAdi = document.getElementById('hesap-adi').innerText;
    navigator.clipboard.writeText(hesapAdi).then(() => {
        btn.textContent = '✅ Kopyalandı';
        btn.classList.add('kopyalandi');
        setTimeout(() => { btn.textContent = '📋 Kopyala'; btn.classList.remove('kopyalandi'); }, 2500);
    });
}

function ibanKopyala(btn) {
    const iban = document.getElementById('iban-no').innerText;
    navigator.clipboard.writeText(iban).then(() => {
        btn.textContent = '✅ Kopyalandı';
        btn.classList.add('kopyalandi');
        setTimeout(() => { btn.textContent = '📋 Kopyala'; btn.classList.remove('kopyalandi'); }, 2500);
    });
}

function adresiKopyala(btn) {
    const adres = "Hayal Ağacı Derneği\n[Adresinizi buraya ekleyin]\nAdıyaman / TÜRKİYE";
    navigator.clipboard.writeText(adres).then(() => {
        btn.textContent = '✅ Kopyalandı';
        btn.classList.add('kopyalandi');
        setTimeout(() => { btn.textContent = '📋 Kopyala'; btn.classList.remove('kopyalandi'); }, 2500);
    });
}

// ==========================================
// BAŞA DÖN BUTONU VE KAYDIRMA KONTROLÜ
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    const basaDonBtn = document.getElementById("basa-don-btn");

    if (basaDonBtn) {
        window.addEventListener("scroll", function() {
            if (window.scrollY > 100) {
                basaDonBtn.style.opacity = "1";
                basaDonBtn.style.visibility = "visible";
            } else {
                basaDonBtn.style.opacity = "0";
                basaDonBtn.style.visibility = "hidden";
            }
        });
    }
});

function basaDon() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

const internetUyarisi = document.getElementById('internet-uyarisi');

function baglantiDurumunuGuncelle() {
    if (internetUyarisi) {
        if (navigator.onLine) {
            internetUyarisi.style.display = 'none';
        } else {
            internetUyarisi.style.display = 'block'; 
        }
    }
}

window.addEventListener('load', baglantiDurumunuGuncelle);
window.addEventListener('online', baglantiDurumunuGuncelle);
window.addEventListener('offline', baglantiDurumunuGuncelle);

// ==========================================
// İNTERNET KOPMA UYARI POPUP SİSTEMİ
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    const uyariKutusu = document.createElement("div");
    uyariKutusu.id = "internet-uyari-kutusu";
    uyariKutusu.innerHTML = `
        <div style="display: flex; align-items: center; gap: 15px;">
            <span style="font-size: 2rem;">📡</span>
            <div>
                <strong style="display: block; font-size: 1.1rem; color: #d9534f;">İnternet Bağlantısı Koptu</strong>
                <span style="font-size: 0.9rem; color: #555;">Bağlantı bekleniyor...</span>
            </div>
        </div>
    `;
    
    Object.assign(uyariKutusu.style, {
        position: "fixed",
        bottom: "-200px", 
        opacity: "0",     
        visibility: "hidden", 
        left: "50%",
        transform: "translateX(-50%)",
        background: "white",
        padding: "15px 25px",
        borderRadius: "12px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        borderLeft: "5px solid #d9534f",
        zIndex: "999999",
        transition: "all 0.5s ease", 
        fontFamily: "inherit",
        width: "85%", 
        maxWidth: "400px"
    });

    document.body.appendChild(uyariKutusu);

    if (!navigator.onLine) {
        uyariKutusu.style.bottom = "30px";
        uyariKutusu.style.opacity = "1";
        uyariKutusu.style.visibility = "visible";
    }

    window.addEventListener("offline", () => {
        uyariKutusu.style.bottom = "30px";
        uyariKutusu.style.opacity = "1";
        uyariKutusu.style.visibility = "visible";
    });

    window.addEventListener("online", () => {
        uyariKutusu.innerHTML = `
            <div style="display: flex; align-items: center; gap: 15px;">
                <span style="font-size: 2rem;">✅</span>
                <div>
                    <strong style="display: block; font-size: 1.1rem; color: rgb(134, 220, 84);">Bağlantı Sağlandı</strong>
                    <span style="font-size: 0.9rem; color: #555;">Kaldığınız yerden devam edebilirsiniz.</span>
                </div>
            </div>
        `;
        uyariKutusu.style.borderLeftColor = "rgb(134, 220, 84)";
        
        setTimeout(() => {
            uyariKutusu.style.bottom = "-200px";
            uyariKutusu.style.opacity = "0";
            
            setTimeout(() => {
                uyariKutusu.style.visibility = "hidden";
                uyariKutusu.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <span style="font-size: 2rem;">📡</span>
                        <div>
                            <strong style="display: block; font-size: 1.1rem; color: #d9534f;">İnternet Bağlantısı Koptu</strong>
                            <span style="font-size: 0.9rem; color: #555;">Bağlantı bekleniyor...</span>
                        </div>
                    </div>
                `;
                uyariKutusu.style.borderLeftColor = "#d9534f";
            }, 500);
        }, 3000);
    });
});

// ==========================================
// GOOGLE E-TABLOLAR İLE DİNAMİK KÜTÜPHANE VERİTABANI
// ==========================================
document.addEventListener("DOMContentLoaded", async function() {
    const kapsayici = document.getElementById('dinamik-kutuphane-listesi');
    if (!kapsayici) return;

    const csvLink = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSyPtoLrEKtvodUb3csXIrjHFrjpayp1peDrpDHZjNJRGAOVg-Y98pR6GMkZ9hAUz9snnJ68udYpQkA/pub?output=csv"; 

    try {
        const response = await fetch(csvLink);
        const veri = await response.text();
        
        const satirlar = veri.split(/\r?\n/).slice(1); 

        satirlar.forEach(satir => {
            if(satir.trim() === "") return; 

            const sutunlar = [];
            let geciciSutun = '';
            let tirnakIci = false;
            
            for(let i = 0; i < satir.length; i++) {
                let karakter = satir[i];
                if (karakter === '"') {
                    tirnakIci = !tirnakIci; 
                } else if (karakter === ',' && !tirnakIci) {
                    sutunlar.push(geciciSutun.trim());
                    geciciSutun = '';
                } else {
                    geciciSutun += karakter;
                }
            }
            sutunlar.push(geciciSutun.trim()); 

            if (sutunlar.length >= 5) {
                const resim = sutunlar[0];
                const isim = sutunlar[1];
                const konum = sutunlar[2];
                const hikaye = sutunlar[3];
                const link = sutunlar[4];

                if(isim.length > 2) {
                    const kartHTML = `
                        <div class="kutuphane-karti">
                            <div class="kart-resim">
                                <img src="${resim}" alt="${isim}">
                            </div>
                            <div class="kart-icerik">
                                <h3 class="sehit-ismi">${isim}</h3>
                                <span class="konum-bilgisi">${konum}</span>
                                <p class="kutuphane-hikayesi">${hikaye}</p>
                                <a href="${link}" class="hikaye-butonu">Hikayesini Oku</a>
                            </div>
                        </div>
                    `;
                    kapsayici.innerHTML += kartHTML;
                }
            }
        });
    } catch (hata) {
        console.log("Veritabanından veri çekilemedi: ", hata);
    }
});

// ==========================================
// MEKANİK BUTON İTME SİSTEMİ (ÇARPIŞMA SENSÖRÜ)
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    const footer = document.querySelector("footer");
    const basaDonBtn = document.getElementById("basa-don-btn");
    const muzikCalar = document.getElementById("muzik-calar-kapsayici");
    const themeBtn = document.getElementById("theme-toggle-btn");

    if(footer) {
        const gozlemci = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Footer göründüğünde yay gibi yukarı fırlat
                    if (basaDonBtn) basaDonBtn.style.marginBottom = "85px";
                    if (muzikCalar) muzikCalar.style.marginBottom = "85px";
                    if (themeBtn) themeBtn.style.marginBottom = "85px";
                } else {
                    // Footer'dan çıkınca pürüzsüzce yerine otur
                    if (basaDonBtn) basaDonBtn.style.marginBottom = "0px";
                    if (muzikCalar) muzikCalar.style.marginBottom = "0px";
                    if (themeBtn) themeBtn.style.marginBottom = "0px";
                }
            });
        }, { 
            rootMargin: "0px 0px 10px 0px", // Footer'a ramak kala tetikler
            threshold: 0.05 
        });

        gozlemci.observe(footer);
    }
});

// ==========================================
// YASAL ÇEREZ VE GİZLİLİK ONAY SİSTEMİ
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    if (!localStorage.getItem("cerezOnay")) {
        const cerezKutusu = document.createElement("div");
        cerezKutusu.id = "cerez-uyari-kutusu";
        cerezKutusu.innerHTML = `
            <div class="cerez-icerik">
                <div class="cerez-metin">
                    <strong>🍪 Gizlilik ve Çerez Politikası</strong>
                    <p>Sitemizde kullanıcı deneyimini artırmak ve tercihlerinizi hatırlamak amacıyla zorunlu çerezler kullanılmaktadır. Sitemizi kullanmaya devam ederek <a href="kvkk-gizlilik.html">Kullanım ve Gizlilik Sözleşmesi</a>'ni kabul etmiş sayılırsınız.</p>
                </div>
                <button id="cerez-onay-btn">Anladım</button>
            </div>
        `;
        document.body.appendChild(cerezKutusu);

        document.getElementById("cerez-onay-btn").addEventListener("click", function() {
            localStorage.setItem("cerezOnay", "true");
            cerezKutusu.style.bottom = "-300px"; 
            setTimeout(() => cerezKutusu.remove(), 600);
        });

        // Sayfa açıldıktan 1.5 saniye sonra alttan yumuşakça çıkar
        setTimeout(() => { cerezKutusu.style.bottom = "20px"; }, 1500);
    }
});

// ==========================================
// AKILLI MAİL SENSÖRÜ (PC İÇİN WEB GMAIL, MOBİL İÇİN UYGULAMA)
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    var mailLinkleri = document.querySelectorAll('a[href^="mailto:"]');
    
    mailLinkleri.forEach(function(link) {
        link.addEventListener('click', function(e) {
            // Kullanıcının mobil cihazdan girip girmediğini tespit eder
            var mobilMi = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
            
            if (!mobilMi) {
                // Kullanıcı bilgisayardaysa (PC) masaüstü posta uygulamasını açmasını engeller
                e.preventDefault();
                
                // Linkin içinden "mailto:" kısmını atıp sadece e-posta adresini kopyalar
                var mailAdresi = this.getAttribute('href').replace('mailto:', '').split('?')[0];
                
                // Bilgisayar için yeni sekmede doğrudan Google Gmail web ekranını açar
                window.open('https://mail.google.com/mail/?view=cm&fs=1&to=' + mailAdresi, '_blank');
            }
            // Mobil cihazlardaysa koda hiç müdahale etmez, telefonun kendi mail uygulaması standart şekilde açılır.
        });
    });
});

// ==========================================
// AKILLI CİHAZ PERFORMANS (FPS) VE DONANIM TESTİ
// ==========================================
(function() {
    window.cihazYetersiz = false; // Başlangıçta tüm cihazları güçlü kabul et

    // Sadece mobil cihazları test et (Geniş ekranlı PC'ler zaten güçlüdür)
    if (window.innerWidth > 900) return;

    // 1. AŞAMA: Donanım Kontrolü (RAM ve İşlemci)
    // Cihazın RAM'i 4GB'tan veya işlemci çekirdeği 4'ten azsa direkt zayıf cihaz kabul et
    const ram = navigator.deviceMemory || 8; 
    const cpu = navigator.hardwareConcurrency || 8;
    
    if (ram < 4 || cpu < 4) {
        window.cihazYetersiz = true;
        document.body.classList.add('cihaz-yavas');
        console.log("Sistem: Donanım düşük (RAM: " + ram + "GB). Ağır animasyonlar kapatıldı.");
        return; // Donanım kötüyse 2. aşamaya (FPS testine) gerek bile yok
    }

    // 2. AŞAMA: Canlı FPS (Ekran Yenileme Hızı) Testi
    // Telefonun kağıt üzerinde iyi olabilir ama o an ısınıp kasıyor mu? Bunu ölçüyoruz.
    let frameSayisi = 0;
    let testBaslangic = performance.now();
    
    function fpsTesti(zaman) {
        frameSayisi++;
        if (zaman - testBaslangic < 500) { // Sadece ilk yarım saniye (500ms) ölç
            requestAnimationFrame(fpsTesti);
        } else {
            let fps = frameSayisi * 2; // Yarım saniyeyi 1 saniyeye (FPS) oranla
            if (fps < 40) { // Saniyede 40 kareden az çiziyorsa cihaz kasıyordur
                window.cihazYetersiz = true;
                document.body.classList.add('cihaz-yavas');
                console.log("Sistem: FPS Düşük (" + fps + " FPS). Ağır efektler durduruldu.");
            } else {
                console.log("Sistem: Cihaz güçlü (" + fps + " FPS). Animasyonlar devrede.");
            }
        }
    }
    requestAnimationFrame(fpsTesti);
})();

// ==========================================
// AKILLI CİHAZ PERFORMANS (FPS) VE DONANIM TESTİ
// ==========================================
(function() {
    window.cihazYetersiz = false; // Başlangıçta tüm cihazları güçlü kabul et

    // Sadece mobil cihazları test et (Geniş ekranlı PC'ler zaten güçlüdür)
    if (window.innerWidth > 900) return;

    // 1. AŞAMA: Donanım Kontrolü (RAM ve İşlemci)
    const ram = navigator.deviceMemory || 8; 
    const cpu = navigator.hardwareConcurrency || 8;
    
    if (ram < 4 || cpu < 4) {
        window.cihazYetersiz = true;
        document.body.classList.add('cihaz-yavas');
        console.log("Sistem: Donanım düşük (RAM: " + ram + "GB). Ağır animasyonlar kapatıldı.");
        return; 
    }

    // 2. AŞAMA: Canlı FPS Testi
    let frameSayisi = 0;
    let testBaslangic = performance.now();
    
    function fpsTesti(zaman) {
        frameSayisi++;
        if (zaman - testBaslangic < 500) { 
            requestAnimationFrame(fpsTesti);
        } else {
            let fps = frameSayisi * 2; 
            if (fps < 40) { 
                window.cihazYetersiz = true;
                document.body.classList.add('cihaz-yavas');
                console.log("Sistem: FPS Düşük (" + fps + " FPS). Ağır efektler durduruldu.");
            } else {
                console.log("Sistem: Cihaz güçlü (" + fps + " FPS). Animasyonlar devrede.");
            }
        }
    }
    requestAnimationFrame(fpsTesti);
})();

// ==========================================
// HAYAL AĞACI - YAPRAK ÜRETİCİ (AKILLI MOTORLAR)
// ==========================================
function onYaprakUret() {
    if (window.cihazYetersiz) return;

    if (!window.balonModuAktif) {
        var logoAlani = document.getElementById('isim_logo');
        if (logoAlani) {
            var yaprak = document.createElement('div');
            yaprak.classList.add('hayal-yaprak');
            yaprak.style.left = Math.random() * 80 + 10 + '%'; 
            var dususSuresi = (Math.random() * 2 + 3); 
            var ruzgarSuresi = (Math.random() * 1 + 1.5); 
            yaprak.style.animationDuration = dususSuresi + 's, ' + ruzgarSuresi + 's';
            logoAlani.appendChild(yaprak);
            setTimeout(function() { yaprak.remove(); }, dususSuresi * 1000);
        }
    }
    setTimeout(onYaprakUret, Math.random() * 1000 + 4500); 
}

function arkaYaprakUret() {
    if (window.cihazYetersiz) return;

    if (!window.balonModuAktif && document.body.classList.contains('dark-mode')) {
        var arkaYaprak = document.createElement('div');
        arkaYaprak.classList.add('arka-plan-yaprak'); 
        var boyut = Math.random() * 20 + 20; 
        arkaYaprak.style.width = boyut + 'px';
        arkaYaprak.style.height = boyut + 'px';
        arkaYaprak.style.left = Math.random() * 94 + 'vw'; 
        var devDusus = (Math.random() * 4 + 8); 
        var devRuzgar = (Math.random() * 2 + 2); 
        arkaYaprak.style.animationDuration = devDusus + 's, ' + devRuzgar + 's';
        document.body.appendChild(arkaYaprak);
        setTimeout(function() { arkaYaprak.remove(); }, devDusus * 1000);
    }
    setTimeout(arkaYaprakUret, Math.random() * 1500 + 1000); 
}

setTimeout(onYaprakUret, 1000);
setTimeout(arkaYaprakUret, 2000);

