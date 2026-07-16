document.addEventListener("DOMContentLoaded", function () {
    // === 1. OTOMATİK ÖZEL GÜN DUYURULARI ===
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

    if (ozelGunler[bugununTarihi]) {
        const veri = ozelGunler[bugununTarihi];
        const duyuruSistemi = document.getElementById("duyuru-kart-sistemi");
        if (duyuruSistemi) {
            document.getElementById("Ali Ders Çalışıyor").textContent = veri.kisa;
            document.getElementById("Ali'nin yarın sınavı var o sınavı verirse Memlekete Dönüyor").textContent = veri.tam;
            duyuruSistemi.style.display = "block"; 
        }
    }

    // === 2. MANUEL (İSTEĞE BAĞLI) DUYURU SİSTEMİ ===
    // Sadece duyuru yapmak istediğinizde aşağıdaki tırnakların içine metni giriniz.
    // İşiniz bittiğinde içlerini tamamen temizleyip ("") kaydederseniz ekrandan kalkar.
    const manuelKisaBaslik = ""; // Örn: "Acil Toplantı Duyurusu ⚠️"
    const manuelTamMetin = "";   // Örn: "Değerli üyelerimiz, bu hafta sonu dernek binasında olağanüstü toplantı yapılacaktır."

    const manuelDuyuruSistemi = document.getElementById("manuel-duyuru-sistemi");
    if (manuelDuyuruSistemi) {
        if (manuelKisaBaslik.trim() !== "" || manuelTamMetin.trim() !== "") {
            document.getElementById("manuel-kisa-metin").textContent = manuelKisaBaslik;
            document.getElementById("manuel-tam-metin").textContent = manuelTamMetin;
            manuelDuyuruSistemi.style.display = "block";
        } else {
            manuelDuyuruSistemi.style.display = "none";
        }
    }
});