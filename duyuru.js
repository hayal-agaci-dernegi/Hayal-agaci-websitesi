document.addEventListener("DOMContentLoaded", function () {
    const ozelGunler = {
        "01-01": { kisa: "Yılbaşı Tatili 🎆", tam: "Yeni yılın ilk günü! Herkese sağlık, mutluluk ve başarı dolu bir yıl dileriz. Bugün resmi tatildir." },
        "03-18": { kisa: "18 Mart Çanakkale Zaferi 🇹🇷", tam: "Çanakkale Zaferi'nin yıl dönümünde, başta Gazi Mustafa Kemal Atatürk olmak üzere tüm şehitlerimizi rahmet ve minnetle anıyoruz." },
        "04-23": { kisa: "23 Nisan Ulusal Egemenlik ve Çocuk Bayramı 🎈", tam: "TBMM'nin açılışının yıl dönümü ve dünyadaki tek çocuk bayramı kutlu olsun! Bugün resmi tatildir." },
        "05-01": { kisa: "1 Mayis Emek ve Dayanışma Günü 🛠️", tam: "Tüm işçi ve emekçilerin Emek ve Dayanışma Günü kutlu olsun! Bugün resmi tatildir." },
        "05-19": { kisa: "19 Mayıs Atatürk'ü Anma, Gençlik ve Spor Bayramı 🏃‍♂️🇹🇷", tam: "Gazi Mustafa Kemal Atatürk'ün Samsun'a çıkışının ve milli mücadelenin başlamasının yıl dönümü kutlu olsun! Bugün resmi tatildir." },
        "07-15": { kisa: "15 Temmuz Demokrasi ve Milli Birlik Günü 🕊️", tam: "Demokrasi ve Milli Birlik Günü'nde vatan uğruna canını feda eden tüm şehitlerimizi saygıyla anıyoruz." },
        "08-30": { kisa: "30 Ağustos Zafer Bayramı ⚔️🇹🇷", tam: "Büyük Taarruz'un zaferle sonuçlandığı bu şanlı günü gururla kutluyoruz. Başta Atatürk olmak üzere tüm kahramanlarımıza minnettarız. Bugün resmi tatildir." },
        "10-29": { kisa: "29 Ekim Cumhuriyet Bayramı 📜🇹🇷", tam: "Cumhuriyetimizin kuruluş yıl dönümü kutlu olsun! En büyük bayramımızdır. Bugün resmi tatildir." },
        "11-10": { kisa: "10 Kasım Atatürk'ü Anma Günü 🖤", tam: "Cumhuriyetimizin kurucusu Gazi Mustafa Kemal Atatürk'ü, aramızdan ayrılışının yıl dönümünde saygı, sevgi ve özlemle anıyoruz." }
    };

    const bugun = new Date();
    const gun = String(bugun.getDate()).padStart(2, '0');
    const ay = String(bugun.getMonth() + 1).padStart(2, '0'); 
    const bugununTarihi = `${ay}-${gun}`;

    const anaKasa = document.getElementById("duyuru-kart-sistemi");
    let duyuruEkrandaVarMi = false;

    // === 1. OTOMATİK DUYURU KONTROLÜ ===
    if (ozelGunler[bugununTarihi]) {
        const veri = ozelGunler[bugununTarihi];
        const kisaMetinEl = document.getElementById("kisa-duyuru-metni");
        const tamMetinEl = document.getElementById("tam-duyuru-metni");
        const otoDuyuruEl = document.getElementById("oto-duyuru");
        
        if (kisaMetinEl && tamMetinEl && otoDuyuruEl) {
            kisaMetinEl.textContent = veri.kisa;
            tamMetinEl.textContent = veri.tam;
            otoDuyuruEl.style.display = "block";
            duyuruEkrandaVarMi = true;
        }
    }

    // === 2. MANUEL (İSTEĞE BAĞLI) DUYURU KONTROLÜ ===
    const manuelKisaBaslik = "deneme"; 
    const manuelTamMetin = "deneme";   

    if (manuelKisaBaslik.trim() !== "" || manuelTamMetin.trim() !== "") {
        const manKisaEl = document.getElementById("manuel-kisa-metin");
        const manTamEl = document.getElementById("manuel-tam-metin");
        const manDuyuruEl = document.getElementById("man-duyuru");
        
        if (manKisaEl && manTamEl && manDuyuruEl) {
            manKisaEl.textContent = manuelKisaBaslik;
            manTamEl.textContent = manuelTamMetin;
            manDuyuruEl.style.display = "block";
            duyuruEkrandaVarMi = true;
        }
    }

    // === 3. ANA KASA KONTROLÜ ===
    if (anaKasa) {
        if (duyuruEkrandaVarMi) {
            anaKasa.style.display = "block";
        } else {
            anaKasa.style.display = "none";
        }
    }

    // === 4. KESİN ÇÖZÜM: YUMUŞAK AÇILIŞ/KAPANIŞ MOTORU ===
    const duyuruOzetleri = document.querySelectorAll('.duyuru-ozet');
    
    duyuruOzetleri.forEach(ozet => {
        ozet.addEventListener('click', function() {
            const kutu = this.parentElement;
            const icerik = kutu.querySelector('.duyuru-tam-metin-alanı');
            
            if (!kutu.classList.contains('aktif')) {
                // AÇILMA: İçeriğin net pikselini ölç ve aç
                kutu.classList.add('aktif');
                icerik.style.maxHeight = icerik.scrollHeight + "px"; 
            } else {
                // KAPANMA: Önce yüksekliği mevcut boyuta sabitle ki tarayıcı nereden kapanacağını bilsin
                icerik.style.maxHeight = icerik.scrollHeight + "px"; 
                
                // Çok kısa bir süre bekleyip boyu sıfırla (Pürüzsüz kapanışın sırrı)
                setTimeout(() => {
                    kutu.classList.remove('aktif');
                    icerik.style.maxHeight = "0"; 
                }, 10);
            }
        });
    });
});