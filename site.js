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
// AKILLI DUYURU VE AKORDEON SİSTEMİ
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    const panel = document.getElementById("duyuru-kart-sistemi");
    const kisaMetin = document.getElementById("kisa-duyuru-metni");
    const tamMetin = document.getElementById("tam-duyuru-metni");
    const okSimgesi = document.querySelector(".acilis-oku");

    if(panel && kisaMetin) {
        fetch("duyuru.txt")
            .then(res => res.text())
            .then(data => {
                const mesaj = data.trim();
                
                if (mesaj.length > 0) {
                    panel.style.display = "block";
                    tamMetin.textContent = mesaj;
                    
                    if (mesaj.length > 60) {
                        kisaMetin.textContent = mesaj.substring(0, 60) + "...";
                        if(okSimgesi) okSimgesi.style.display = "block";
                    } else {
                        kisaMetin.textContent = mesaj;
                        if(okSimgesi) okSimgesi.style.display = "none"; 
                        document.querySelector(".duyuru-akordeon").style.pointerEvents = "none";
                    }
                } else {
                    panel.style.display = "none";
                }
            })
            .catch(() => {
                panel.style.display = "none";
            });
    }
});

// ==========================================
// HAREKETLİ İSTATİSTİK SAYAÇLARI
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    const sayaclar = document.querySelectorAll('.sayac');
    let sayacBasladi = false;

    // Kullanıcı sayfanın o kısmına geldiğinde çalışmasını sağlar
    const sayacGozlemci = new IntersectionObserver((eslesmeler) => {
        eslesmeler.forEach((eslesme) => {
            if (eslesme.isIntersecting && !sayacBasladi) {
                sayacBasladi = true; // Sadece bir kere çalışması için kilit
                
                sayaclar.forEach((sayac) => {
                    const hedef = parseInt(sayac.getAttribute('data-hedef'));
                    const hiz = 100; // Sayma hızı (sayı küçüldükçe hızlanır)
                    const artis = hedef / hiz;

                    const guncelle = () => {
                        // Sayıdaki noktaları temizleyip matematiksel işleme sokuyoruz
                        const mevcutStr = sayac.innerText.replace(/\./g, '');
                        const mevcut = parseInt(mevcutStr) || 0;

                        if (mevcut < hedef) {
                            // Sayıyı artır ve binlik ayraç (nokta) koyarak ekrana yaz
                            sayac.innerText = Math.ceil(mevcut + artis).toLocaleString('tr-TR');
                            setTimeout(guncelle, 20); // 20 milisaniyede bir tekrarla
                        } else {
                            // İşlem bitince tam hedef sayısını yazıp bırak
                            sayac.innerText = hedef.toLocaleString('tr-TR');
                        }
                    };
                    guncelle();
                });
            }
        });
    }, { threshold: 0.5 }); // Tablonun yarısı ekrana girince başlat

    const skorTablosu = document.getElementById('skortablosu');
    if(skorTablosu) sayacGozlemci.observe(skorTablosu);
});

// ==========================================
// FAALİYET HARİTASI KODLARI
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    var haritaKutusu = document.getElementById('harita');
    
    // Eğer harita kutusu o sayfada varsa çalıştır
    if(haritaKutusu) {
        // Haritayı Adıyaman merkez koordinatlarına odakla ve başlangıçta tekerlek yakınlaştırmasını KAPAT
        var harita = L.map('harita', {
            scrollWheelZoom: false
        }).setView([37.7636, 38.2773], 12);

        // Haritanın üzerine TIKLANDIĞINDA tekerlek yakınlaştırmasını AÇ
        harita.on('click', function() { 
            harita.scrollWheelZoom.enable(); 
        });

        // Fare haritanın DIŞINA ÇIKTIĞINDA tekerlek yakınlaştırmasını tekrar KAPAT
        harita.on('mouseout', function() { 
            harita.scrollWheelZoom.disable(); 
        });

        // Ücretsiz harita görünümünü yükle
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap - Hayal Ağacı Derneği'
        }).addTo(harita);

        // 1. İĞNE: Enkaz Kütüphanesi
        var enkazPin = L.marker([37.7640, 38.2780]).addTo(harita);
        enkazPin.bindPopup(`
            <b style="font-size: 16px;">Enkaz Kütüphanesi</b><br>
            Adıyaman Merkez Halk Kütüphanesi<br><br>
            <a href="EnkazKutuphanesi.html" style="background: rgb(134, 220, 84); color: white; padding: 5px 10px; text-decoration: none; border-radius: 5px; display: inline-block;">Hikayesini Oku</a>
        `);

        // 2. İĞNE: K1 Konteyner Kent
        var k1Pin = L.marker([37.7500, 38.2600]).addTo(harita);
        k1Pin.bindPopup(`
            <b style="font-size: 16px;">K1 Konteyner Kent</b><br>
            Çocuklarımız için umut alanı.<br><br>
            <a href="K1 Konteynerkent.html" style="background: rgb(134, 220, 84); color: white; padding: 5px 10px; text-decoration: none; border-radius: 5px; display: inline-block;">Sayfaya Git</a>
        `);
        
        // 3. İĞNE: Muhammed Işıkbulanoğlu Kütüphanesi (Zey Köyü)
        var zeyPin = L.marker([37.8000, 38.2000]).addTo(harita);
        zeyPin.bindPopup(`
            <b style="font-size: 16px;">Muhammed Işıkbulanoğlu</b><br>
            Zey Köy Okulu<br><br>
            <a href="Muhammed Işıkbulanoğlu.html" style="background: rgb(134, 220, 84); color: white; padding: 5px 10px; text-decoration: none; border-radius: 5px; display: inline-block;">Sayfaya Git</a>
        `);
    }
});

// ==========================================
// TERS MANTIKLI & YUMUŞAK EVRİLEN KARANLIK MOD
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    const themeBtn = document.createElement("div");
    themeBtn.id = "theme-toggle-btn";
    document.body.appendChild(themeBtn);

    // Temiz SVG Yapısı (İç içe geçme hatası giderilmiş)
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
            // GECE MODUNDA GÜNEŞ GÖRÜNSÜN
            sunRays.style.opacity = "1";
            sunRays.style.transform = "rotate(0deg) scale(1)";
            mainCircle.setAttribute('r', '5');
            maskCircle.setAttribute('cx', '25'); // Maskeyi tamamen dışarı at (leke kalmasın)
        } else {
            document.body.classList.remove('dark-mode');
            // AYDINLIK MODDA AY GÖRÜNSÜN
            sunRays.style.opacity = "0";
            sunRays.style.transform = "rotate(-45deg) scale(0.5)";
            mainCircle.setAttribute('r', '9');
            maskCircle.setAttribute('cx', '18'); // Maskeyi içeri al (hilal yap)
        }
    };

    const saved = localStorage.getItem("theme") || "light";
    applyTheme(saved);

    themeBtn.addEventListener("click", () => {
        const newMode = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
        applyTheme(newMode);
        localStorage.setItem("theme", newMode);
    });
});

// ==========================================
// AKILLI BAŞA DÖN BUTONU KONTROLÜ (KADEMELİ GEÇİŞ)
// ==========================================

window.addEventListener('scroll', function() {
    var btn = document.getElementById("basa-don-btn");
    var inilenMesafe = window.scrollY || document.documentElement.scrollTop;
    
    // 100 piksellik bir kaydırmadan sonra işlem başlasın
    if (inilenMesafe > 100) {
        btn.style.visibility = "visible";
        
        // 100px ile 500px arası kaydırmada saydamlığı 0'dan 1'e doğru yavaşça artır
        var saydamlik = (inilenMesafe - 100) / 400; 
        
        // Saydamlık 1'i (Tam görünürlüğü) geçmesin
        if (saydamlik > 1) { saydamlik = 1; } 
        
        btn.style.opacity = saydamlik;
    } else {
        // En yukarıdayken tamamen gizle
        btn.style.opacity = "0";
        btn.style.visibility = "hidden";
    }
});

function basaDon() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}  

// ==========================================
// HAYAL AĞACI - YAPRAK ÜRETİCİ
// ==========================================
function yaprakUret() {
    // === AKILLI TAKVİM: Milli bayramlarda yaprak dökme, balon modu devrede ===
    if (window.balonModuAktif) return;

    var logoAlani = document.getElementById('isim_logo');
    
    // Eğer o sayfada logo yoksa (örn: 404 sayfası) hata vermemesi için kontrol
    if (!logoAlani) return;

    var yaprak = document.createElement('div');
    yaprak.classList.add('hayal-yaprak');

    // Yaprağın sağdan/soldan hangi hizadan düşeceğini rastgele belirle
    yaprak.style.left = Math.random() * 80 + 10 + '%'; 
    
    // Rüzgar hızını ve düşüş süresini her yaprak için biraz farklı yap (Daha doğal durur)
    var dususSuresi = (Math.random() * 2 + 3); // 3 ile 5 saniye arası
    var ruzgarSuresi = (Math.random() * 1 + 1); // 1 ile 2 saniye arası
    
    yaprak.style.animationDuration = dususSuresi + 's, ' + ruzgarSuresi + 's';

    // Yaprağı logomuzun olduğu kutuya ekle
    logoAlani.appendChild(yaprak);

    // Düşüş bittikten sonra yaprağı koddan temizle (Sitenin şişmesini engeller)
    setTimeout(function() {
        yaprak.remove();
    }, dususSuresi * 1000);
}

// Her 1.2 saniyede bir yeni bir yaprak dök (Süreyi azaltırsanız sonbahar gibi çok yaprak döker)
setInterval(yaprakUret, 1200);

// ==========================================
// ZİYARETÇİ HAFIZASI VE KARŞILAMA (AKILLI ASANSÖR GÜNCELLEMESİ)
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    // Sitenin tam yüklenmesi ve Preloader'ın bitmesi için 2 saniye bekletiyoruz
    setTimeout(function() {
        var karsilamaKutusu = document.getElementById('ziyaretci-karsilama');
        var mesajAlani = document.getElementById('karsilama-mesaji');
        var muzikCalar = document.getElementById('muzik-calar-kapsayici'); // Müzik çaları sisteme tanıttık
        
        if (!karsilamaKutusu || !mesajAlani) return;

        var ziyaretDurumu = localStorage.getItem('hayalAgaciZiyaret');

        if (!ziyaretDurumu) {
            mesajAlani.innerHTML = "🌱 Hayal Ağacı'na Hoş Geldiniz! Destekleriniz bizim için çok değerli.";
            localStorage.setItem('hayalAgaciZiyaret', 'evet');
        } else {
            mesajAlani.innerHTML = "💚 Tekrar Hoş Geldiniz! Sizi yeniden görmek ne güzel.";
        }

        // Karşılama kutusunu ekranın içine al
        karsilamaKutusu.style.bottom = "30px";
        
        // EĞER MÜZİK ÇALAR VARSA, ONU DA KUTUNUN ÜSTÜNE (110px) İT
        if (muzikCalar) {
            muzikCalar.style.bottom = "110px";
        }

        // 6 Saniye sonra kendi kendine kapanmasını sağla
        setTimeout(karsilamayiKapat, 6000);
    }, 2000); 
});

function karsilamayiKapat() {
    var karsilamaKutusu = document.getElementById('ziyaretci-karsilama');
    var muzikCalar = document.getElementById('muzik-calar-kapsayici'); // Müzik çaları tekrar tanıttık
    
    if (karsilamaKutusu) {
        karsilamaKutusu.style.bottom = "-100px"; // Kutuyu tekrar ekranın altına sakla
    }
    
    // KUTU GİTTİĞİNDE MÜZİK ÇALARI ESKİ YERİNE (20px) GERİ İNDİR
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
    
    // 1. Kullanıcının manuel tercihi var mı?
    if (kayitliMod) {
        if (kayitliMod === 'dark') {
            body.classList.add('dark-mode');
            if(icon) icon.textContent = '☀️';
        }
    } 
    // 2. Tercih yoksa saate bak
    else {
        const suAn = new Date();
        const saat = suAn.getHours();
        
        // Akşam 20:00'den sonra veya sabah 06:00'dan önceyse
        if (saat >= 20 || saat < 6) {
            body.classList.add('dark-mode');
            if(icon) icon.textContent = '☀️';
            console.log("Otomatik Gece Modu: Aktif (Saat: " + saat + ")");
        }
    }
}

// Sayfa açıldığında bu kontrolü çalıştır
document.addEventListener('DOMContentLoaded', akilliGeceModuKontrol);

// Mevcut toggleDarkMode fonksiyonunuzu koruyun (Manuel değişim için)
function toggleDarkMode() {
    const body = document.body;
    const icon = document.getElementById('dark-mode-icon');
    
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        icon.textContent = '☀️';
        localStorage.setItem('theme', 'dark'); // Kullanıcı seçimi hafızaya alınır
    } else {
        icon.textContent = '🌙';
        localStorage.setItem('theme', 'light'); // Kullanıcı seçimi hafızaya alınır
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

    let oynuyorMu = false;

    // Saniyeyi Dakika:Saniye (Örn: 2:34) formatına çevirir
    function formatZaman(saniye) {
        if (isNaN(saniye)) return "0:00";
        const dk = Math.floor(saniye / 60);
        const sn = Math.floor(saniye % 60);
        return dk + ":" + (sn < 10 ? "0" + sn : sn);
    }

    // Oynat / Duraklat Butonuna Tıklanınca
    oynatDuraklatBtn.addEventListener("click", function() {
        if (oynuyorMu) {
            sesDosyasi.pause();
            playIkon.style.display = "block";
            pauseIkon.style.display = "none";
            ilerlemeAlani.classList.remove("acik"); // Barı gizle
        } else {
            sesDosyasi.play().catch(e => console.log("Tarayıcı engeli: " + e));
            playIkon.style.display = "none";
            pauseIkon.style.display = "block";
            ilerlemeAlani.classList.add("acik"); // Barı uzatarak göster
        }
        oynuyorMu = !oynuyorMu;
    });

    // Şarkı çaldıkça çubuğu ve saniyeleri güncelle
    sesDosyasi.addEventListener("timeupdate", function() {
        const yuzde = (sesDosyasi.currentTime / sesDosyasi.duration) * 100;
        ilerlemeCubugu.value = yuzde || 0;
        gecenSure.textContent = formatZaman(sesDosyasi.currentTime);
        kalanSure.textContent = "-" + formatZaman(sesDosyasi.duration - sesDosyasi.currentTime);
        
        // Dolum efekti için arkaplanı yeşil yap
        ilerlemeCubugu.style.background = `linear-gradient(to right, rgb(134, 220, 84) ${yuzde}%, #e0e0e0 ${yuzde}%)`;
    });

    // Kullanıcı çubuğu fareyle kaydırınca (Sarma İşlemi)
    ilerlemeCubugu.addEventListener("input", function() {
        const yeniZaman = (ilerlemeCubugu.value / 100) * sesDosyasi.duration;
        sesDosyasi.currentTime = yeniZaman;
    });

    // Şarkı bittiğinde her şeyi başa sarıp kapat
    sesDosyasi.addEventListener("ended", function() {
        oynuyorMu = false;
        playIkon.style.display = "block";
        pauseIkon.style.display = "none";
        ilerlemeAlani.classList.remove("acik");
        ilerlemeCubugu.value = 0;
        sesDosyasi.currentTime = 0;
    });

    // Ses dosyası yüklendiğinde toplam süreyi yaz
    sesDosyasi.addEventListener("loadedmetadata", function() {
        kalanSure.textContent = "-" + formatZaman(sesDosyasi.duration);
    });
});
// ==========================================
// AKILLI TAKVİM VE TEMA SİSTEMİ (BAĞIMSIZ MODÜL)
// Mevcut hiçbir kodla çakışmaz.
// window.balonModuAktif → yaprakUret() zaten yukarıda kontrol ediyor.
// ==========================================
;(function () {
    'use strict';

    /* -------- YARDIMCI HESAPLAMALAR -------- */

    /** Anneler Günü: Mayıs'ın 2. Pazar'ı */
    function annelerGunu(yil) {
        var d = new Date(yil, 4, 1);
        var ilkPazar = (d.getDay() === 0) ? 1 : (8 - d.getDay());
        return ilkPazar + 7;
    }

    /** Babalar Günü: Haziran'ın 3. Pazar'ı */
    function babalarGunu(yil) {
        var d = new Date(yil, 5, 1);
        var ilkPazar = (d.getDay() === 0) ? 1 : (8 - d.getDay());
        return ilkPazar + 14;
    }

    /** Kütüphaneler Haftası: Mart'ın son haftası (son Pazartesi → +6 gün) */
    function kutupHaftaAraligi(yil) {
        var d = new Date(yil, 2, 31);
        while (d.getDay() !== 1) d.setDate(d.getDate() - 1);
        return { baslangic: d.getDate(), bitis: d.getDate() + 6 };
    }

    /* -------- BUGÜNÜN TARİH BİLGİSİ -------- */
    var bugun = new Date();
    var ay    = bugun.getMonth() + 1;
    var gun   = bugun.getDate();
    var yil   = bugun.getFullYear();

    var annG  = annelerGunu(yil);
    var babG  = babalarGunu(yil);
    var kutup = kutupHaftaAraligi(yil);

    /*
     * gunBilgisi nesnesi:
     *   tema      → body'ye eklenecek CSS sınıfı
     *   serit     → #akilli-takvim-serit'e eklenecek CSS sınıfı
     *   mesaj     → Şeritte gösterilecek metin
     *   animasyon → 'balon' | 'yaprak'  (null = varsayılan)
     */
    var gunBilgisi = null;

    /* ---- MİLLİ BAYRAMLAR (Balon + Kırmızı/Beyaz Tema) ---- */
    if      (ay === 4  && gun === 23) {
        gunBilgisi = { tema:'tema-milli', serit:'serit-milli', animasyon:'balon',
            mesaj:'🎈 23 Nisan Ulusal Egemenlik ve Çocuk Bayramı Kutlu Olsun!' };
    }
    else if (ay === 5  && gun === 19) {
        gunBilgisi = { tema:'tema-milli', serit:'serit-milli', animasyon:'balon',
            mesaj:'🇹🇷 19 Mayıs Atatürk\'ü Anma, Gençlik ve Spor Bayramı!' };
    }
    else if (ay === 7  && gun === 15) {
        gunBilgisi = { tema:'tema-milli', serit:'serit-milli', animasyon:'balon',
            mesaj:'🇹🇷 15 Temmuz Demokrasi ve Milli Birlik Günü.' };
    }
    else if (ay === 8  && gun === 30) {
        gunBilgisi = { tema:'tema-milli', serit:'serit-milli', animasyon:'balon',
            mesaj:'🇹🇷 30 Ağustos Zafer Bayramı Kutlu Olsun!' };
    }
    else if (ay === 10 && gun === 29) {
        gunBilgisi = { tema:'tema-milli', serit:'serit-milli', animasyon:'balon',
            mesaj:'🇹🇷 Cumhuriyetimizin Doğum Günü Kutlu Olsun!' };
    }

    /* ---- MATEM / SAYGI GÜNLERİ (Yaprak devam + Gri Tema) ---- */
    else if (ay === 2  && gun === 6 ) {
        gunBilgisi = { tema:'tema-matem', serit:'serit-matem', animasyon:'yaprak',
            mesaj:'⌛ 6 Şubat: Unutmadık, Unutmayacağız. Acımız baki.' };
    }
    else if (ay === 3  && gun === 12) {
        gunBilgisi = { tema:'tema-matem', serit:'serit-matem', animasyon:'yaprak',
            mesaj:'📖 İstiklal Marşı\'mızın Kabulü ve Mehmet Akif Ersoy\'u Anma Günü.' };
    }
    else if (ay === 3  && gun === 18) {
        gunBilgisi = { tema:'tema-matem', serit:'serit-matem', animasyon:'yaprak',
            mesaj:'🇹🇷 18 Mart Çanakkale Zaferi ve Şehitleri Anma Günü.' };
    }
    else if (ay === 8  && gun === 17) {
        gunBilgisi = { tema:'tema-matem', serit:'serit-matem', animasyon:'yaprak',
            mesaj:'⌛ 17 Ağustos 1999: Sesinizi hala duyuyoruz.' };
    }
    else if (ay === 9  && gun === 19) {
        gunBilgisi = { tema:'tema-matem', serit:'serit-matem', animasyon:'yaprak',
            mesaj:'🎖️ Kahraman Gazilerimizin Günü Kutlu Olsun.' };
    }
    else if (ay === 11 && gun === 10) {
        gunBilgisi = { tema:'tema-matem', serit:'serit-matem', animasyon:'yaprak',
            mesaj:'🖤 Ulu Önder Atatürk\'ü Saygı, Özlem ve Minnetle Anıyoruz.' };
    }
    else if (ay === 12 && gun === 21) {
        gunBilgisi = { tema:'tema-matem', serit:'serit-matem', animasyon:'yaprak',
            mesaj:'🌙 En Uzun Gece: Hayallerimiz karanlığı aydınlatmaya yeter.' };
    }

    /* ---- BEYZA ÖZEL ANMA GÜNÜ (12 Ağustos) ---- */
    else if (ay === 8  && gun === 12) {
        gunBilgisi = { tema:'tema-beyza', serit:'serit-beyza', animasyon:'yaprak',
            mesaj:'🤍 12 Ağustos: Dostumuz Beyza\'nın doğum günü. Hatırası hayallerimizde yaşıyor.' };
    }

    /* ---- DOĞA VE EĞİTİM GÜNLERİ (Yaprak + Yeşil Tema) ---- */
    else if (ay === 3  && gun === 22) {
        gunBilgisi = { tema:'tema-doga', serit:'serit-doga', animasyon:'yaprak',
            mesaj:'💧 22 Mart Dünya Su Günü: Suyu koru, hayatı koru.' };
    }
    else if (ay === 4  && gun === 4 ) {
        gunBilgisi = { tema:'tema-doga', serit:'serit-doga', animasyon:'yaprak',
            mesaj:'🐾 4 Nisan Sokak Hayvanları Farkındalık Günü: Onlar da yaşamayı hak ediyor.' };
    }
    else if (ay === 6  && gun === 5 ) {
        gunBilgisi = { tema:'tema-doga', serit:'serit-doga', animasyon:'yaprak',
            mesaj:'🌍 5 Haziran Dünya Çevre Günü: Doğamıza sahip çıkalım.' };
    }
    else if (ay === 9  && gun === 8 ) {
        gunBilgisi = { tema:'tema-doga', serit:'serit-doga', animasyon:'yaprak',
            mesaj:'📚 8 Eylül Dünya Okuma Yazma Günü: Bilgi özgürleştirir.' };
    }
    else if (ay === 10 && gun === 4 ) {
        gunBilgisi = { tema:'tema-doga', serit:'serit-doga', animasyon:'yaprak',
            mesaj:'🐾 4 Ekim Dünya Hayvanları Koruma Günü: Onların sesi olalım.' };
    }
    else if (ay === 11 && gun === 11) {
        gunBilgisi = { tema:'tema-doga', serit:'serit-doga', animasyon:'yaprak',
            mesaj:'🌳 11 Kasım Ağaçlandırma Günü: Geleceğe kök salalım.' };
    }
    else if (ay === 3 && gun >= kutup.baslangic && gun <= kutup.bitis) {
        gunBilgisi = { tema:'tema-doga', serit:'serit-doga', animasyon:'yaprak',
            mesaj:'📖 Kütüphaneler Haftası: Bilgiye açık kapılar hiçbir zaman kapanmaz.' };
    }

    /* ---- VEFA VE TOPLUM GÜNLERİ (Yaprak + Sıcak Tema) ---- */
    else if (ay === 1  && gun === 1 ) {
        gunBilgisi = { tema:'tema-vefa', serit:'serit-vefa', animasyon:'yaprak',
            mesaj:'🎊 Yeni Yıl Kutlu Olsun! Hayallerimiz bu yıl da büyüsün.' };
    }
    else if (ay === 3  && gun === 8 ) {
        gunBilgisi = { tema:'tema-vefa', serit:'serit-vefa', animasyon:'yaprak',
            mesaj:'💐 8 Mart Dünya Kadınlar Günü: Güçlü kadınlara saygıyla.' };
    }
    else if (ay === 5  && gun === 1 ) {
        gunBilgisi = { tema:'tema-vefa', serit:'serit-vefa', animasyon:'yaprak',
            mesaj:'✊ 1 Mayıs Emek ve Dayanışma Günü Kutlu Olsun!' };
    }
    else if (ay === 5  && gun === annG) {
        gunBilgisi = { tema:'tema-vefa', serit:'serit-vefa', animasyon:'yaprak',
            mesaj:'🌸 Anneler Günü Kutlu Olsun! Emekleriniz için teşekkürler.' };
    }
    else if (ay === 6  && gun === babG) {
        gunBilgisi = { tema:'tema-vefa', serit:'serit-vefa', animasyon:'yaprak',
            mesaj:'👨‍👧 Babalar Günü Kutlu Olsun! Sığınaklarımız, kahramanlarımız.' };
    }
    else if (ay === 10 && gun === 1 ) {
        gunBilgisi = { tema:'tema-vefa', serit:'serit-vefa', animasyon:'yaprak',
            mesaj:'🌼 1 Ekim Dünya Yaşlılar Günü: Tecrübelerine değer veriyoruz.' };
    }
    else if (ay === 11 && gun === 20) {
        gunBilgisi = { tema:'tema-vefa', serit:'serit-vefa', animasyon:'yaprak',
            mesaj:'🧒 20 Kasım Dünya Çocuk Hakları Günü: Her çocuk değerlidir.' };
    }
    else if (ay === 11 && gun === 24) {
        gunBilgisi = { tema:'tema-vefa', serit:'serit-vefa', animasyon:'yaprak',
            mesaj:'🎓 24 Kasım Öğretmenler Günü: Aydınlatan ellere minnetle.' };
    }
    else if (ay === 12 && gun === 3 ) {
        gunBilgisi = { tema:'tema-vefa', serit:'serit-vefa', animasyon:'yaprak',
            mesaj:'♿ 3 Aralık Dünya Engelliler Günü: Engel değil, fırsat eşitliği.' };
    }
    else if (ay === 12 && gun === 5 ) {
        gunBilgisi = { tema:'tema-vefa', serit:'serit-vefa', animasyon:'yaprak',
            mesaj:'🤝 5 Aralık Dünya Gönüllüler Günü: Birlikte daha güçlüyüz.' };
    }

    /* -------- BALON SİSTEMİ YARDIMCILARI -------- */
    var BALON_RENKLERI = [
        '#FF6B6B','#FF8C42','#FFCB47','#62D9A5','#4EC8D6',
        '#6A9FFF','#C77DFF','#FF6FA8','#FF9DE2','#A3E87E'
    ];

    function rastgeleBalonRengi() {
        return BALON_RENKLERI[Math.floor(Math.random() * BALON_RENKLERI.length)];
    }

    /** Tam ekran balonunu oluşturur ve DOM'a ekler */
    function tamEkranBalonOlustur() {
        var balon   = document.createElement('div');
        balon.className = 'akilli-balon-tam';
        var boyut   = Math.random() * 55 + 25;         // 25–80 px
        var sol     = Math.random() * 93;               // 0–93 vw
        var sure    = Math.random() * 3.5 + 3;          // 3–6.5 s
        var gecikme = Math.random() * 4.5;              // 0–4.5 s
        var surus   = (Math.random() - 0.5) * 110;     // ±55 px yatay
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

    /** Logo alanından zarif balon uçurur */
    function logoBalonOlustur() {
        var logo = document.getElementById('isim_logo');
        if (!logo) return;

        var balon   = document.createElement('div');
        balon.className = 'logo-balon';
        var boyut   = Math.random() * 22 + 13;         // 13–35 px (küçük, zarif)
        var sol     = Math.random() * 76 + 10;          // %10–86
        var sure    = Math.random() * 2 + 2.5;          // 2.5–4.5 s
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

    /**
     * 2 Aşamalı Balon Sistemi:
     *   Aşama 1 (0–5 sn)  → SADECE index.html'de VE günlük ilk ziyarette tam ekran patlama
     *   Aşama 2 (5+ sn)   → Her sayfada, her ziyarette logo alanından sakin uçuş (sonsuza kadar)
     */
    function baslatBalonSistemi() {
        // Hangi sayfada olduğumuzu kontrol et
        var yol = window.location.pathname;
        var anaSayfaMi = yol === '/' ||
                         yol.endsWith('/index.html') ||
                         yol === '/index.html';

        // Bugünkü tarihi anahtar olarak kullan (her bayram günü bir kez göster)
        var bugunStr    = yil + '-' + ay + '-' + gun;
        var depoAnahtari = 'hayalAgaciBalonGunu';
        var kaydedilenGun = localStorage.getItem(depoAnahtari);
        var ilkZiyaretMi  = (kaydedilenGun !== bugunStr);

        if (anaSayfaMi && ilkZiyaretMi) {
            /* ---------- AŞAMA 1: Tam ekran patlama ---------- */
            localStorage.setItem(depoAnahtari, bugunStr); // Bugünü kaydet, bir daha gösterme
            var gecenSure = 0;
            var asama1    = setInterval(function () {
                for (var i = 0; i < 3; i++) tamEkranBalonOlustur();
                gecenSure += 200;
                if (gecenSure >= 5000) {
                    clearInterval(asama1);
                    /* ---------- AŞAMA 2: Logo uçuşu ---------- */
                    setInterval(logoBalonOlustur, 1600);
                }
            }, 200);
        } else {
            /* Diğer sayfalar VEYA bugün zaten görüldü → direkt Aşama 2 */
            setInterval(logoBalonOlustur, 1600);
        }
    }

    /* -------- DOM HAZIR OLUNCA UYGULA -------- */
    document.addEventListener('DOMContentLoaded', function () {
        if (!gunBilgisi) return; // Özel bir gün değil → yaprak zaten çalışıyor, dokunma

        var header = document.querySelector('header');

        /* 1 — Tema sınıfını body'e ekle */
        document.body.classList.add(gunBilgisi.tema);

        /* 2 — Üst şerit (banner) oluştur ve header içine yerleştir */
        var serit = document.createElement('div');
        serit.id        = 'akilli-takvim-serit';
        serit.className = gunBilgisi.serit;
        serit.textContent = gunBilgisi.mesaj;
        if (header) header.appendChild(serit);

        /* 3 — Animasyon kararı */
        if (gunBilgisi.animasyon === 'balon') {
            window.balonModuAktif = true; // yaprakUret() bu flag'i kontrol ediyor
            baslatBalonSistemi();
        }
        /* 'yaprak' veya belirtilmemiş → mevcut setInterval zaten çalışıyor, elle dokunmaya gerek yok */
    });

}());

// ==========================================
// ALTERNATİF 1: OKUMA İLERLEME MOTORU
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    // Çubuğu HTML'e sizin yerinize otomatik olarak ekler
    const kapsayici = document.createElement("div");
    kapsayici.id = "okuma-cubugu-kapsayici";
    const cubuk = document.createElement("div");
    cubuk.id = "okuma-cubugu";
    kapsayici.appendChild(cubuk);
    document.body.appendChild(kapsayici);

    // Kullanıcı fareyi kaydırdıkça çubuğu doldurur
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
            // Perdeyi usulca kapatmak için önce saydamlaştır
            loader.style.opacity = "0";
            loader.style.visibility = "hidden";
            // Animasyon bittikten sonra sistemden tamamen sök
            setTimeout(() => {
                loader.classList.add('gizli-loader');
            }, 400);
        }
    }

    // SAYFA AÇILDIĞINDA: Her türlü yükleme senaryosunda kapat
    window.addEventListener('load', loaderiKapat);
    window.addEventListener('pageshow', loaderiKapat); 
    document.addEventListener('DOMContentLoaded', loaderiKapat);

    // LİNKLERE TIKLANDIĞINDA:
    document.addEventListener("click", function(e) {
        const link = e.target.closest("a");
        if (!link) return;

        const hedefRaw = link.getAttribute("href");
        const hedefTab = link.getAttribute("target");

        // Boş linkleri, yeni sekme açanları ve mailleri atla
        if (!hedefRaw || hedefRaw.startsWith("mailto:") || hedefRaw.startsWith("tel:") || hedefTab === "_blank") return;

        // Linkin gideceği tam adresi ve şu anki sayfanın adresini al
        const tamHedef = link.href;
        const suAnkiSayfa = window.location.origin + window.location.pathname;
        const hedefSayfa = tamHedef.split('#')[0]; // Adresin sonundaki # kısmını keser

        // AKILLI KONTROL: EĞER LİNK AYNI SAYFA İÇİNDE BİR BÖLÜME GİDİYORSA
        if (suAnkiSayfa === hedefSayfa && tamHedef.includes("#")) {
            // Yükleme ekranını kesinlikle açma, bırak tarayıcı usulca aşağı kaysın
            return;
        }

        // EĞER FARKLI BİR SAYFAYA (Örn: sss.html) GİDİYORSA PERDEYİ AÇ
        const loader = document.getElementById('preloader');
        if (loader) {
            e.preventDefault();
            loader.classList.remove('gizli-loader');
            loader.style.display = "flex";
            loader.style.opacity = "1";
            loader.style.visibility = "visible";

            // Tam 200ms sonra hızlıca yönlendir
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
            // Sitedeki tüm videoları bul
            const videolar = document.querySelectorAll('.medya-karti video');
            
            videolar.forEach(video => {
                // Sistemin sorunsuz çalışması için güvenlik ayarları (Sessiz ve satıriçi oynatma)
                video.muted = true;
                video.setAttribute('playsinline', ''); 
                
                const kart = video.closest('.medya-karti');
                kart.classList.add('video-karti'); // Bu kartın video olduğunu sisteme işaretle
                
                // 1. Şık oynat butonunu yoktan var et ve videonun üstüne ekle
                const oynatBtn = document.createElement('div');
                oynatBtn.className = 'zarif-oynat-butonu';
                oynatBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
                kart.appendChild(oynatBtn);

                // 2. Fare üzerine gelince videoyu başlat
                kart.addEventListener('mouseenter', () => {
                    // Sadece fare üzerindeyse oynat (Hızlı geçişlerdeki tarayıcı hatalarını önler)
                    let playPromise = video.play();
                    if (playPromise !== undefined) {
                        playPromise.catch(error => {
                            // Video otomatik oynatılamazsa sessizce yut
                        });
                    }
                });
                
                // 3. Fare çekilince videoyu durdur ve başa sar
                kart.addEventListener('mouseleave', () => {
                    video.pause();
                    video.currentTime = 0; // Bir sonraki hover için videoyu sıfırla
                });
            });
        });

        // ==========================================
// AKILLI HIZ SENSÖRÜ (LITE MOD MOTORU) v2
// ==========================================
(function() {
    let sayfaYuklendi = false;

    // Sayfa tam yüklendiğinde bayrağı kaldır
    window.addEventListener('load', function() {
        sayfaYuklendi = true;
    });

    function liteModuAktifEt() {
        // Zaten aktifse tekrar çalıştırma
        if (document.body.classList.contains('lite-mod')) return;

        document.body.classList.add('lite-mod');
        console.log("Sistem Uyarısı: Bağlantı gerçekten yavaş, Lite Mod (Hızlı Sürüm) aktif edildi.");

        // Lite modda videoların indirilmesini durdur ki kota yemesin
        document.querySelectorAll('video').forEach(vid => {
            vid.pause();
            vid.removeAttribute('src');
            vid.load();
        });
    }

    // ── GERÇEK HIZ TESTİ ──────────────────────────────────────────
    // Küçük bir görsel indirip gerçek MB/s değerini ölçüyoruz.
    // Eşik: 0.5 Mbps altı = gerçekten yavaş bağlantı.
    // Test dosyası: tarayıcı önbelleğini atlamamız için timestamp ekliyoruz.
    const HIZESIGI_MBPS = 0.5; // Bu değerin altı = yavaş
    const TEST_URL = 'https://www.google.com/images/phd/px.gif'; // ~43 byte, sadece gecikme testi
    // Daha iyi bir test için kendi sunucunuzda küçük bir dosya (örn. test-hiz.jpg ~50KB) barındırın:
    // const TEST_URL = '/test-hiz.jpg';

    async function hizOlc() {
        try {
            const baslangic = performance.now();
            const yanit = await fetch(TEST_URL + '?nocache=' + Date.now(), {
                cache: 'no-store',
                mode: 'no-cors' // cross-origin dosyalarda içerik okuma gerekmez, sadece süre
            });
            const bitis = performance.now();
            const sureSaniye = (bitis - baslangic) / 1000;

            // no-cors modunda response.blob() çalışır
            const blob = await yanit.blob().catch(() => ({ size: 43 }));
            const boyutBit = (blob.size || 43) * 8;
            const hizMbps = (boyutBit / 1_000_000) / sureSaniye;

            console.log(`Hız testi: ${hizMbps.toFixed(3)} Mbps (${sureSaniye.toFixed(2)}s)`);
            return hizMbps;
        } catch (e) {
            // Fetch tamamen başarısız olduysa (çevrimdışı vb.) yavaş say
            console.warn("Hız testi başarısız:", e);
            return 0;
        }
    }

    // ── ANA KARAR MOTORU ─────────────────────────────────────────
    // Hız testini ve sayfa yükleme süresini AYRI AYRI değerlendiriyoruz.
    // İKİSİ de sorunluysa lite mod devreye girer. Biri iyiyse girmez.
    const SAYFA_YÜKLEME_LIMITI_MS = 8000; // 8 saniyede yüklenmediyse "yavaş yükleme"

    Promise.all([
        // 1. Hız testi: asenkron ölçüm
        hizOlc(),

        // 2. Sayfa yükleme testi: 8 saniyeye kadar bekliyoruz
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

        // Her ikisi de sorunluysa: gerçekten yavaş bağlantı
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
                // Önemli: İnterneti yavaş olanları korumak için video otomatik inmesin
                video.setAttribute('preload', 'none'); 
                
                const kart = video.closest('.medya-karti');
                kart.classList.add('video-karti'); 
                
                // 1. Oynat Butonunu Ekle
                const oynatBtn = document.createElement('div');
                oynatBtn.className = 'zarif-oynat-butonu';
                oynatBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
                kart.appendChild(oynatBtn);

                // 2. YouTube Stili İlerleme Alanını Ekle
                const ilerlemeAlani = document.createElement('div');
                ilerlemeAlani.className = 'video-ilerleme-alani';
                const tamponCubugu = document.createElement('div');
                tamponCubugu.className = 'video-tampon-cubugu';
                ilerlemeAlani.appendChild(tamponCubugu);
                kart.appendChild(ilerlemeAlani);

                // 3. Fişi Tak (Üzerine gelince oynamaya/indirmeye başlasın)
                kart.addEventListener('mouseenter', () => {
                    let playPromise = video.play();
                    if (playPromise !== undefined) {
                        playPromise.catch(error => { /* Hataları yut */ });
                    }
                });
                
                // 4. Fişi Çek (Üzerinden gidince dursun)
                kart.addEventListener('mouseleave', () => {
                    video.pause();
                });

                // 5. YÜKLEME ÇUBUĞUNU DOLDURAN MATEMATİK
                video.addEventListener('progress', function() {
                    if (video.buffered.length > 0 && video.duration > 0) {
                        // Videonun inen son saniyesini al
                        const yuklenenSaniye = video.buffered.end(video.buffered.length - 1);
                        const toplamSaniye = video.duration;
                        
                        // Yüzde kaçının indiğini hesapla ve çubuğun genişliğini ayarla
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
            // 1. Lite modda videonun indirilmesini tamamen DURDUR
            video.setAttribute('preload', 'none');
            
            // 2. İndirme Butonunu Ekle
            const indirBtn = document.createElement('button');
            indirBtn.className = 'lite-indir-btn';
            indirBtn.innerHTML = '<span>📥</span> Medyayı Görüntüle';
            kart.appendChild(indirBtn);

            // 3. Butona tıklandığında öncelikli indirmeyi başlat
            indirBtn.addEventListener('click', function(e) {
                e.stopPropagation(); // Lightbox'ın hemen açılmasını engelle
                
                indirBtn.innerHTML = '<span>⏳</span> Yükleniyor...';
                
                // Videoyu sisteme tanıt ve yükle
                video.setAttribute('preload', 'auto');
                video.load();
                
                // Yükleme tamamlanınca barı göster ve videoyu aç
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
        // 1. Web3Forms'un kendi sayfasına yönlendirmesini kesin olarak engeller
        e.preventDefault(); 

        const form = e.target;
        const mesajKutusu = document.getElementById('mesaj').value.toLocaleLowerCase('tr-TR');
        const adKutusu = document.getElementById('ad').value.toLocaleLowerCase('tr-TR');
        
        // 2. Yasaklı Kelime Listesi
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
        
        // Noktalama işaretlerini sil ve kelimeleri tek tek ayır
        const temizMesaj = mesajKutusu.replace(/[.,!?]/g, '').split(/\s+/);
        const temizAd = adKutusu.replace(/[.,!?]/g, '').split(/\s+/);
        
        const mesajdaVarMi = temizMesaj.some(kelime => yasakliKelimeler.includes(kelime));
        const addaVarMi = temizAd.some(kelime => yasakliKelimeler.includes(kelime));

        if (mesajdaVarMi || addaVarMi) {
            alert("Lütfen derneğimize yakışır, daha nazik ve uygun bir dil kullanınız. Mesajınız gönderilmedi.");
            return false;
        }

        // 3. Mesaj temizse butonu meşgule al
        const btn = form.querySelector('.gonder-btn');
        const orijinalMetin = btn.innerHTML;
        btn.innerHTML = "⌛ Gönderiliyor...";
        btn.style.opacity = "0.7";
        btn.style.pointerEvents = "none";

        // 4. Verileri arka planda Web3Forms'a gönder
        const formData = new FormData(form);

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Accept': 'application/json' // Bu satır sistemi kendi sayfasında tutar efendim
            },
            body: formData
        })
        .then(async (response) => {
            if (response.status === 200) {
                // İşlem başarılı, doğrudan teşekkür sayfasına yönlendir
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

        /* -------- BUGÜNÜN TARİH BİLGİSİ -------- */
    var bugun = new Date();

    // GEÇİCİ TEST KODU (Adres çubuğundan emir alır)
    var urlArama = new URLSearchParams(window.location.search);
    var testAy = urlArama.get('ay');
    var testGun = urlArama.get('gun');

    var ay    = testAy ? parseInt(testAy) : (bugun.getMonth() + 1);
    var gun   = testGun ? parseInt(testGun) : bugun.getDate();
    var yil   = bugun.getFullYear();

        // EKSİK OLAN KOD BURASI:
        function hesapAdiKopyala(btn) {
            const hesapAdi = document.getElementById('hesap-adi').innerText;
            navigator.clipboard.writeText(hesapAdi).then(() => {
                btn.textContent = '✅ Kopyalandı';
                btn.classList.add('kopyalandi');
                setTimeout(() => { btn.textContent = '📋 Kopyala'; btn.classList.remove('kopyalandi'); }, 2500);
            });
        }

        // ZATEN VAR OLAN DİĞER KODLAR:
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