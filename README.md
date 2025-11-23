# HangiKredi Case Study

React Native Expo tabanlı mobil uygulama projesi. Kullanıcıların yemek siparişi ve market alışverişi yapabileceği, sepet yönetimi ve kimlik doğrulama özelliklerine sahip bir uygulamadır.

## 📋 İçindekiler

- [Kurulum](#-kurulum)
- [Mimari Açıklamalar](#-mimari-açıklamalar)
- [Kullanılan Teknolojiler](#-kullanılan-teknolojiler)
- [Proje Yapısı](#-proje-yapısı)
- [Test](#-test)
- [Scripts](#-scripts)

## 🚀 Kurulum

### Gereksinimler

- Node.js (v16 veya üzeri)
- npm veya yarn
- Expo CLI (global olarak yüklü olmalı)
- **Test için (seçeneklerden biri):**
  - iOS Simulator (Mac için) veya Android Emulator
  - **VEYA** Expo Go uygulaması (gerçek cihazda test için - App Store/Play Store'dan indirilebilir)
- Firebase projesi ve yapılandırma bilgileri

### Adımlar

1. **Projeyi klonlayın**
   ```bash
   git clone <repository-url>
   cd hangikredi-case
   ```

2. **Bağımlılıkları yükleyin**
   ```bash
   npm install
   ```

3. **Firebase yapılandırması**
   
   Proje root dizininde `.env` dosyası oluşturun ve Firebase yapılandırma bilgilerinizi ekleyin:
   ```env
   FIREBASE_API_KEY=your_api_key
   FIREBASE_AUTH_DOMAIN=your_auth_domain
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_STORAGE_BUCKET=your_storage_bucket
   FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   FIREBASE_APP_ID=your_app_id
   FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

4. **Uygulamayı başlatın**
   ```bash
   npm start
   ```
   
   Veya platforma özel:
   ```bash
   npm run android  # Android için
   npm run ios      # iOS için
   npm run web      # Web için
   ```

### 📱 Gerçek Cihazda Test Etme (Expo Go)

Uygulamayı gerçek cihazınızda test etmek için Expo Go kullanabilirsiniz:

1. **Expo Go'yu yükleyin**
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779) (iPhone/iPad)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) (Android)

2. **Development server'ı başlatın**
   ```bash
   npm start
   ```
   
   Bu komut çalıştığında terminal'de bir QR kod görünecektir.

3. **QR kodu taratın veya manuel bağlanın**
   
   **Yöntem 1 - QR Kod ile:**
   - iOS: iPhone kamerası ile QR kodu taratın ve açılan bildirime dokunun
   - Android: Expo Go uygulamasını açın ve "Scan QR code" butonuna tıklayın
   
   **Yöntem 2 - Manuel Bağlantı:**
   - Expo Go uygulamasını açın
   - "Enter URL manually" veya "Connect to server" seçeneğini kullanın
   - Terminal'de görünen URL'yi girin (örn: `exp://192.168.1.100:8081`)

4. **Önemli Notlar**
   - ⚠️ **Aynı WiFi ağında olmalısınız**: Bilgisayarınız ve cihazınız aynı yerel ağa bağlı olmalıdır
   - Eğer QR kod çalışmazsa, terminal'de görünen URL'yi manuel olarak Expo Go'ya girebilirsiniz
   - İlk yükleme biraz zaman alabilir, sabırlı olun
   - Kod değişikliklerinde uygulama otomatik olarak yenilenecektir (Hot Reload)

### 💻 Simülatör/Emulator ile Test Etme

Uygulamayı bilgisayarınızda simülatör veya emulator kullanarak test edebilirsiniz:

#### iOS Simulator (Sadece macOS)

1. **Xcode'u yükleyin**
   - App Store'dan Xcode'u indirin ve yükleyin
   - Xcode Command Line Tools'u yükleyin: `xcode-select --install`

2. **iOS Simulator'ı başlatın**
   ```bash
   npm run ios
   ```
   
   Bu komut otomatik olarak:
   - Expo development server'ı başlatır
   - iOS Simulator'ı açar (eğer açık değilse)
   - Uygulamayı simulator'da yükler

3. **Manuel olarak simulator açmak isterseniz**
   - Xcode'u açın
   - `Xcode > Open Developer Tool > Simulator` menüsünden simulator'ı başlatın
   - Ardından `npm start` çalıştırıp terminal'de `i` tuşuna basın

#### Android Emulator

1. **Android Studio'yu yükleyin**
   - [Android Studio](https://developer.android.com/studio) indirin ve yükleyin
   - Android SDK ve emulator'ı yükleyin

2. **Android Emulator'ı başlatın**
   ```bash
   npm run android
   ```
   
   Bu komut otomatik olarak:
   - Expo development server'ı başlatır
   - Android Emulator'ı açar (eğer açık değilse)
   - Uygulamayı emulator'da yükler

3. **Manuel olarak emulator açmak isterseniz**
   - Android Studio'yu açın
   - `Tools > Device Manager` menüsünden bir emulator oluşturun veya mevcut olanı başlatın
   - Ardından `npm start` çalıştırıp terminal'de `a` tuşuna basın

#### Expo Development Server Komutları

`npm start` çalıştırdıktan sonra terminal'de şu komutları kullanabilirsiniz:
- `a` - Android emulator'da aç
- `i` - iOS simulator'da aç (sadece macOS)
- `r` - Uygulamayı yeniden yükle
- `m` - Metro bundler'ı menü modunda aç

## 🏗️ Mimari Açıklamalar

### Genel Mimari

Uygulama, modern React Native mimarisi kullanılarak geliştirilmiştir. Temel mimari katmanları:

1. **Presentation Layer (UI)**: React Native bileşenleri ve ekranlar
2. **State Management**: Redux Toolkit ile merkezi state yönetimi
3. **Navigation**: React Navigation ile sayfa yönlendirme
4. **Services**: API ve authentication servisleri
5. **Persistence**: Redux Persist ile state kalıcılığı

### Navigation Yapısı

Uygulama, hiyerarşik bir navigasyon yapısına sahiptir:

```
RootNavigator (Stack Navigator)
├── LoginScreen (Auth gerekli değilse)
└── MainTabNavigator (Auth sonrası)
    ├── HomeScreen
    ├── YemekStackNavigator
    │   ├── YemekAnaSayfa
    │   └── YemekSepet
    ├── MarketStackNavigator
    │   ├── MarketAnaSayfa
    │   └── MarketSepet
    └── ProfilScreen
```

- **RootNavigator**: Kullanıcı authentication durumuna göre Login veya MainTabs ekranını gösterir
- **MainTabNavigator**: Bottom tab navigation ile ana uygulama ekranlarına erişim sağlar
- **Stack Navigators**: Her modül (Yemek, Market) kendi stack navigator'ına sahiptir

### State Management (Redux)

Redux Toolkit kullanılarak merkezi state yönetimi yapılmaktadır:

#### Store Yapısı

```javascript
{
  yemekCart: {
    items: []
  },
  marketCart: {
    items: []
  }
}
```

#### Redux Slices

- **yemekCartSlice**: Yemek sepeti state yönetimi
- **marketCartSlice**: Market sepeti state yönetimi

Her slice şu reducer'lara sahiptir:
- `addItem`: Sepete ürün ekleme
- `removeItem`: Sepetten ürün çıkarma (quantity azaltma)
- `removeItemCompletely`: Ürünü tamamen kaldırma
- `clearCart`: Sepeti temizleme

#### Selectors

Her slice için özel selector'lar:
- `selectCartItems`: Sepetteki tüm ürünleri getirir
- `selectCartTotal`: Toplam fiyatı hesaplar
- `selectCartItemCount`: Toplam ürün adedini getirir
- `selectCartUniqueItemCount`: Benzersiz ürün sayısını getirir

#### Redux Persist

Sepet verileri `AsyncStorage` kullanılarak kalıcı hale getirilmiştir. Uygulama kapatılıp açıldığında sepet içeriği korunur.

### Authentication

Firebase Authentication kullanılarak kullanıcı kimlik doğrulama yapılmaktadır:

- `authService.js`: Authentication işlemlerini yönetir
- `onAuthStateChange`: Kullanıcı giriş/çıkış durumunu dinler
- RootNavigator, authentication durumuna göre yönlendirme yapar

### Folder Structure

```
src/
├── assets/              # Görseller ve statik dosyalar
├── components/          # Yeniden kullanılabilir bileşenler
├── config/              # Yapılandırma dosyaları (Firebase vb.)
├── navigation/          # Navigation yapılandırmaları
│   ├── RootNavigator.js
│   ├── MainTabNavigator.js
│   ├── YemekStackNavigator.js
│   └── MarketStackNavigator.js
├── redux/               # Redux store ve slices
│   ├── slices/
│   │   ├── __tests__/   # Test dosyaları
│   │   ├── marketCartSlice.js
│   │   └── yemekCartSlice.js
│   ├── middleware/
│   └── store.js
├── screens/             # Uygulama ekranları
│   ├── HomeScreen.js
│   ├── LoginScreen.js
│   ├── ProfilScreen.js
│   ├── MarketAnaSayfa.js
│   ├── MarketSepet.js
│   ├── YemekAnaSayfa.js
│   └── YemekSepet.js
├── services/            # API ve servis katmanı
│   ├── apiService.js
│   └── authService.js
└── utils/               # Yardımcı fonksiyonlar
```

## 🛠️ Kullanılan Teknolojiler

### Core Framework
- **React Native** (0.81.5): Cross-platform mobil uygulama geliştirme
- **Expo** (~54.0.25): React Native geliştirme platformu ve araç seti
- **React** (19.1.0): UI kütüphanesi

### State Management
- **Redux Toolkit** (^2.10.1): Modern Redux state yönetimi
- **React Redux** (^9.2.0): React-Redux entegrasyonu
- **Redux Persist** (^6.0.0): State kalıcılığı

### Navigation
- **React Navigation** (^6.1.9): Sayfa yönlendirme kütüphanesi
  - `@react-navigation/native` (^6.1.9)
  - `@react-navigation/native-stack` (^6.9.17)
  - `@react-navigation/bottom-tabs` (^6.5.11)

### Backend & Authentication
- **Firebase** (^12.6.0): Backend servisleri ve authentication
- **Axios** (^1.13.2): HTTP istekleri için

### Storage
- **AsyncStorage** (2.2.0): Lokal veri saklama

### UI & UX
- **React Native Safe Area Context** (~5.6.0): Güvenli alan yönetimi
- **React Native Screens** (~4.16.0): Native ekran optimizasyonu
- **React Native Toast Message** (^2.3.3): Bildirim mesajları
- **Expo Status Bar** (~3.0.8): Status bar yönetimi

### Form Management
- **React Hook Form** (^7.49.3): Form yönetimi ve validasyon

### Development Tools
- **Jest** (^29.7.0): Test framework
- **Babel Jest** (^29.7.0): Jest için Babel transform
- **React Native Dotenv** (^3.4.11): Environment variables yönetimi

## 📁 Proje Yapısı

### Redux Slices

Her slice, bağımsız bir state yönetimi modülüdür:

- **marketCartSlice**: Market sepeti için state yönetimi
- **yemekCartSlice**: Yemek sepeti için state yönetimi

### Services

- **authService.js**: Firebase authentication işlemleri
- **apiService.js**: API çağrıları için merkezi servis

### Screens

- **HomeScreen**: Ana sayfa
- **LoginScreen**: Kullanıcı giriş ekranı
- **ProfilScreen**: Kullanıcı profil ekranı
- **MarketAnaSayfa**: Market ürün listesi
- **MarketSepet**: Market sepet ekranı
- **YemekAnaSayfa**: Yemek menü listesi
- **YemekSepet**: Yemek sepet ekranı

## 🧪 Test

Proje, Jest test framework'ü kullanılarak test edilmektedir.

### Testleri Çalıştırma

```bash
# Tüm testleri çalıştır
npm test

# Watch modunda çalıştır (değişiklikleri otomatik test eder)
npm run test:watch
```

### Test Yapısı

Test dosyaları `__tests__` klasöründe organize edilmiştir:

```
src/redux/slices/__tests__/
└── marketCartSlice.test.js
```

Testler şu alanları kapsar:
- Reducer fonksiyonları (addItem, removeItem, clearCart vb.)
- Selector fonksiyonları
- State yönetimi senaryoları

## 📜 Scripts

```bash
npm start          # Expo development server'ı başlatır
npm run android    # Android emulator'de çalıştırır
npm run ios        # iOS simulator'de çalıştırır
npm run web        # Web tarayıcıda çalıştırır
npm test           # Testleri çalıştırır
npm run test:watch # Testleri watch modunda çalıştırır
```

## 📝 Notlar

- Firebase yapılandırması için `.env` dosyası oluşturulmalıdır
- Redux Persist, sadece sepet verilerini kalıcı hale getirir
- Uygulama, authentication durumuna göre otomatik yönlendirme yapar
- Test dosyaları `__tests__` klasöründe organize edilmiştir

## 👥 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add some amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje özel bir projedir.

