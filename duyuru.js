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
        document.getElementById("kisa-duyuru-metni").textContent = veri.kisa;
        document.getElementById("tam-duyuru-metni").textContent = veri.tam;
        document.getElementById("oto-duyuru").style.display = "block";
        duyuruEkrandaVarMi = true;
    }

    // === 2. MANUEL (İSTEĞE BAĞLI) DUYURU KONTROLÜ ===
    const manuelKisaBaslik = ""; 
    const manuelTamMetin = "";   

    if (manuelKisaBaslik.trim() !== "" || manuelTamMetin.trim() !== "") {
        document.getElementById("manuel-kisa-metin").textContent = manuelKisaBaslik;
        document.getElementById("manuel-tam-metin").textContent = manuelTamMetin;
        document.getElementById("man-duyuru").style.display = "block";
        duyuruEkrandaVarMi = true;
    }

    // === 3. ANA KASA KONTROLÜ ===
    if (anaKasa) {
        if (duyuruEkrandaVarMi) {
            anaKasa.style.display = "block";
        } else {
            anaKasa.style.display = "none";
        }
    }

    // === 4. KUSURSUZ YUMUŞAK AÇILIŞ/KAPANIŞ MOTORU ===
    const duyuruOzetleri = document.querySelectorAll('.duyuru-akordeon summary');
    
    duyuruOzetleri.forEach(ozet => {
        ozet.addEventListener('click', function(e) {
            e.preventDefault(); 
            const kutu = this.parentElement;
            const icerik = kutu.querySelector('.duyuru-tam-metin-alanı');
            
            if (!kutu.classList.contains('aktif')) {
                // AÇILMA İŞLEMİ
                kutu.setAttribute('open', 'true');
                
                // Tarayıcının takılmasını (kare atlamasını) önlemek için render bekletiyoruz
                requestAnimationFrame(() => {
                    kutu.classList.add('aktif');
                    // İçeriğin gerçek yüksekliğini hesaplayıp animasyonu o değere kilitliyoruz
                    icerik.style.maxHeight = icerik.scrollHeight + 50 + "px"; 
                });
            } else {
                // KAPANMA İŞLEMİ
                kutu.classList.remove('aktif');
                // max-height'i sıfırlayarak kapanıştaki o büyük takılmayı yok ediyoruz
                icerik.style.maxHeight = "0px"; 
                
                setTimeout(() => {
                    if (!kutu.classList.contains('aktif')) {
                        kutu.removeAttribute('open');
                    }
                }, 400); // CSS animasyon süresiyle birebir aynı olmalı (0.4s)
            }
        });
    });
});

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
        bottom: "-100px",
        left: "50%",
        transform: "translateX(-50%)",
        background: "white",
        padding: "15px 25px",
        borderRadius: "12px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        borderLeft: "5px solid #d9534f",
        zIndex: "999999",
        transition: "bottom 0.5s ease",
        fontFamily: "inherit"
    });

    document.body.appendChild(uyariKutusu);

    window.addEventListener("offline", () => {
        uyariKutusu.style.bottom = "30px";
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
            uyariKutusu.style.bottom = "-100px";
            setTimeout(() => {
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
// SERVICE WORKER (ÇEVRİMDIŞI NÖBETÇİ) KAYDI
// ==========================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('Nöbetçi aktif.');
        }).catch(function(err) {
            console.log('Kayıt başarısız: ', err);
        });
    });
}