document.addEventListener("DOMContentLoaded", function () {
    // 1. Türkiye'deki Özel Günler ve Bilgileri (Ay-Gün formatında)
    const ozelGunler = {
        "01-01": {
            kisa: "Yılbaşı Tatili 🎆",
            tam: "Yeni yılın ilk günü! Herkese sağlık, mutluluk ve başarı dolu bir yıl dileriz. Bugün resmi tatildir."
        },
        "03-18": {
            kisa: "18 Mart Çanakkale Zaferi 🇹🇷",
            tam: "Çanakkale Zaferi'nin yıl dönümünde, başta Gazi Mustafa Kemal Atatürk olmak üzere tüm şehitlerimizi rahmet ve minnetle anıyoruz."
        },
        "04-23": {
            kisa: "23 Nisan Ulusal Egemenlik ve Çocuk Bayramı 🎈",
            tam: "TBMM'nin açılışının yıl dönümü ve dünyadaki tek çocuk bayramı kutlu olsun! Bugün resmi tatildir."
        },
        "05-01": {
            kisa: "1 Mayis Emek ve Dayanışma Günü 🛠️",
            tam: "Tüm işçi ve emekçilerin Emek ve Dayanışma Günü kutlu olsun! Bugün resmi tatildir."
        },
        "05-19": {
            kisa: "19 Mayıs Atatürk'ü Anma, Gençlik ve Spor Bayramı 🏃‍♂️🇹🇷",
            tam: "Gazi Mustafa Kemal Atatürk'ün Samsun'a çıkışının ve milli mücadelenin başlamasının yıl dönümü kutlu olsun! Bugün resmi tatildir."
        },
        "07-15": {
            kisa: "15 Temmuz Demokrasi ve Milli Birlik Günü 🕊️",
            tam: "Demokrasi ve Milli Birlik Günü'nde vatan uğruna canını feda eden tüm şehitlerimizi saygıyla anıyoruz. Bugün resmi tatildir."
        },
        "08-30": {
            kisa: "30 Ağustos Zafer Bayramı ⚔️🇹🇷",
            tam: "Büyük Taarruz'un zaferle sonuçlandığı bu şanlı günü gururla kutluyoruz. Başta Atatürk olmak üzere tüm kahramanlarımıza minnettarız. Bugün resmi tatildir."
        },
        "10-29": {
            kisa: "29 Ekim Cumhuriyet Bayramı 📜🇹🇷",
            tam: "Cumhuriyetimizin kuruluş yıl dönümü kutlu olsun! En büyük bayramımızdır. Bugün resmi tatildir."
        },
        "11-10": {
            kisa: "10 Kasım Atatürk'ü Anma Günü 🖤",
            tam: "Cumhuriyetimizin kurucusu Gazi Mustafa Kemal Atatürk'ü, aramızdan ayrılışının yıl dönümünde saygı, sevgi ve özlemle anıyoruz."
        }
    };

    // 2. Bugünün Tarihini Al (GG-AA formatına getirmek için)
    const bugun = new Date();
    const gun = String(bugun.getDate()).padStart(2, '0');
    const ay = String(bugun.getMonth() + 1).padStart(2, '0'); // Ocak 0'dan başladığı için +1 yapıyoruz
    const bugununTarihi = `${ay}-${gun}`; // Örn: "10-29"

    // 3. Kontrol Et ve DOM'u Güncelle
    if (ozelGunler[bugununTarihi]) {
        const veri = ozelGunler[bugununTarihi];
        
        // Elementleri Seç
        const duyuruSistemi = document.getElementById("duyuru-kart-sistemi");
        const kisaMetinElemani = document.getElementById("kisa-duyuru-metni");
        const tamMetinElemani = document.getElementById("tam-duyuru-metni");

        // İçerikleri Yaz
        kisaMetinElemani.textContent = veri.kisa;
        tamMetinElemani.textContent = veri.tam;

        // Gizli olan sistemi görünür yap
        duyuruSistemi.style.display = "block"; 
    }
});