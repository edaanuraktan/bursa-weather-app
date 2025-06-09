# Bursa Hava Durumu Uygulaması

Bu proje, Bursa ilinin güncel hava durumu bilgilerini ve kısa vadeli tahminleri sunan bir React Native + Expo mobil uygulamasıdır. Uygulama, arka planda otomatik görsel geçişleri ve kullanıcı dostu bir arayüz sunar.

## Gerekli Kurulumlar

Bu uygulamanın çalışabilmesi için sistemde aşağıdaki araçların yüklü olması gerekir:

- Node.js 
- npm veya yarn
- Java JDK (apk üretimi için `keytool` gereklidir)
- Expo CLI (`npx` üzerinden kullanılabilir)
- EAS CLI (`eas-cli`)

## Kurulum

Proje dizininde terminal açılır ve aşağıdaki komutlarla bağımlılıklar yüklenir:

```bash
npm install
```

Aşağıdaki Babel eklentileri de ayrıca kurulmalıdır:

```bash
npm install --save-dev babel-preset-expo @babel/plugin-transform-private-methods metro-react-native-babel-preset
```

## Babel Yapılandırması

`babel.config.js` dosyası şu şekilde düzenlenir:

```js
module.exports = {
  presets: ['babel-preset-expo'],
  plugins: ['@babel/plugin-transform-private-methods'],
};
```

## Uygulamanın Çalıştırılması

Geliştirme ortamında projeyi başlatmak için aşağıdaki komut yeterlidir:

```bash
npx expo start
```


## eas.json İçeriği

Aşağıdaki yapı `eas.json` dosyasına yazılır:

```json
{
  "cli": {
    "version": ">= 3.0.0"
  },
  "build": {
    "production": {
      "android": {
        "buildType": "apk"
      }
    }
  }
}
```

## APK Oluşturma

1. EAS CLI kurulumu yapılmamışsa aşağıdaki komutla kurulur:

```bash
npm install -g eas-cli
```

2. Expo hesabına giriş yapılır:

```bash
eas login
```

3. EAS yapılandırması başlatılır:

```bash
eas init
```

4. APK dosyasını oluşturmak için aşağıdaki komut kullanılır:

```bash
eas build --platform android --profile production
```

İşlem tamamlandığında konsolda indirme bağlantısı görüntülenir.

## Açıklamalar

- API anahtarı `.env` dosyasında saklanır, güvenlik açısından `.gitignore` içine alınmalıdır.
- Arka plan geçişleri için `useState`, `useEffect` ve `setInterval` kullanılır.
- Hava durumu verileri OpenWeatherMap API üzerinden alınır.
- Görsel bileşenler `ImageBackground` ve `View` yapılarıyla tanımlanır.

## Kullanılan Başlıca Paketler

| Paket                               | Açıklama                          |
|------------------------------------|-----------------------------------|
| expo                               | React Native geliştirme ortamı   |
| axios                              | API istekleri için HTTP kütüphanesi |
| babel-preset-expo                  | Expo için Babel yapılandırması    |
| @babel/plugin-transform-private-methods | Özel sınıf metodları için Babel eklentisi |
| metro-react-native-babel-preset   | Metro paketi için Babel ayarları  |
| eas-cli                            | Expo uygulamalarını derlemek için |
