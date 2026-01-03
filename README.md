# HangiKredi Super App 🚀

Merhaba, ben **Tamer Köşe**. Bu projeyi, modern mobil uygulama geliştirme standartlarını ve "Super App" vizyonunu yansıtmak amacıyla geliştirdim. Kullanıcıların hem **yemek siparişi** verebileceği hem de **market alışverişi** yapabileceği, uçtan uca eksiksiz bir deneyim sunan bu uygulama, temiz kod mimarisi ve kullanıcı dostu arayüzü ile dikkat çekmektedir.

![React Native](https://img.shields.io/badge/React_Native-0.73+-61DAFB.svg)
![Expo](https://img.shields.io/badge/Expo-50+-000020.svg)
![Redux](https://img.shields.io/badge/Redux_Toolkit-Enabled-764ABC.svg)

## 🌟 Proje Özellikleri

Geliştirdiğim bu uygulamada aşağıdaki temel modülleri hayata geçirdim:

### 🥘 Yemek Siparişi
- Restoran menülerini listeleme ve filtreleme
- Detaylı ürün sayfaları (İçerik, Kalori bilgisi)
- Adet seçimi ve özelleştirilmiş sepet deneyimi

### 🛒 Market Alışverişi
- Geniş ürün yelpazesi, marka ve kategori bazlı gösterim
- Hızlı ve pratik sepete ekleme akışı
- Market ihtiyaçlarına özel sepet yönetimi

### 👤 Profil & Hesap Yönetimi
- **Adreslerim:** Kayıtlı teslimat adreslerinin yönetimi
- **Siparişlerim:** Geçmiş siparişlerin detaylı takibi ve durum sorgulama
- **Ödeme Yöntemleri:** Kredi kartı ekleme, listeleme ve yönetme
- **Güvenli Giriş/Çıkış:** Firebase Authentication ile güvenli oturum yönetimi

### 💳 Ödeme & Checkout
- Adres seçimi (Ev/İş)
- Ödeme yöntemi belirleme (Kredi Kartı, Kapıda Ödeme, Yemek Kartı)
- Yeni kart ekleme formu ve simüle edilmiş sipariş tamamlama akışı

---

## 🛠 Kullandığım Teknolojiler

Projeyi geliştirirken ölçeklenebilirlik, performans ve sürdürülebilirlik ilkelerini göz önünde bulundurarak şu teknolojileri tercih ettim:

| Teknoloji | Kullanım Amacı |
|-----------|------|
| **React Native (Expo)** | Cross-platform mobil uygulama geliştirme |
| **Redux Toolkit** | Global state (Sepet, Kullanıcı vb.) yönetimi |
| **React Navigation** | Stack ve Tab tabanlı gelişmiş sayfa yönlendirmeleri |
| **Firebase** | Authentication ve Backend servisleri |
| **React Native Toast Message** | Modern kullanıcı bildirimleri |
| **Lucide React Native** | Uygulama genelinde tutarlı ve şık ikon kullanımı |
| **Custom Theme System** | Merkezi renk, tipografi ve stil yönetimi |

---

## 📂 Proje Mimarisi

Kodun okunabilirliğini ve yönetilebilirliğini artırmak için modüler bir klasör yapısı kurguladım:

```
src/
├── components/          # Yeniden kullanılabilir UI bileşenleri (Skeleton, Toast vb.)
├── constants/           # Tema, Renkler ve Global Sabitler
├── navigation/          # Navigasyon Stack ve Tab yapılandırmaları
├── redux/               # Redux Slices (marketCart, yemekCart) ve Store
├── screens/             # Uygulamatüm Ekranları
│   ├── auth/            # Giriş ekranları
│   ├── home/            # Ana sayfa
│   ├── yemek/           # Yemek modülü ekranları
│   ├── market/          # Market modülü ekranları
│   ├── profile/         # Profil ve detay ekranları
│   └── checkout/        # Ödeme akışı ekranları
└── services/            # API ve Auth servisleri
```

---

## 🚀 Kurulum ve Çalıştırma

Projeyi yerel ortamınızda incelemek ve çalıştırmak için:

### 1. Projeyi Klonlayın
```bash
git clone https://github.com/tamerkose/hangikredi-case.git
cd hangikredi-case
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Uygulamayı Başlatın
```bash
npx expo start
```
Terminalde çıkan QR kodu telefonunuzdaki **Expo Go** uygulamasıyla okutarak veya bir emülatör seçerek uygulamayı deneyimleyebilirsiniz.

---

## 🎨 Tasarım Yaklaşımım

- **Minimalizm:** Karmaşadan uzak, içeriğe odaklanan temiz arayüzler tasarladım.
- **Tutarlılık:** Oluşturduğum `Theme.js` dosyası üzerinden tüm renk ve tipografi hiyerarşisini yönettim.
- **Kullanıcı Deneyimi:** Skeleton loading, hızlı geçişler ve bilgilendirici toast mesajları ile akıcı bir deneyim sağladım.

---

## 🧪 Test

Proje kapsamındaki testleri çalıştırmak için:

```bash
npm test
```

---
*Geliştirici: Tamer Köşe*
