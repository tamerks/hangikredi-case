# 🗺️ HangiKredi E-Ticaret - Proje Yapısı Yol Haritası (v2)

## 🎯 Yeni Yaklaşım: Minimal & Profesyonel

Mevcut "parlak" UI (glassmorphism, gradientler, animasyonlar) kaldırılıyor.
**Gluestack UI** ile temiz, shadcn/ui benzeri monokromatik tasarıma geçiliyor.

---

## 📂 Hedeflenen Proje Yapısı

```
hangikredi-case/
├── src/
│   ├── components/
│   │   └── ui/                 # Gluestack UI bileşenleri (auto-generated)
│   ├── constants/
│   │   └── Theme.js            # Minimal renk paleti (OKLCH tabanlı)
│   ├── screens/
│   │   ├── auth/LoginScreen.js
│   │   ├── home/HomeScreen.js
│   │   ├── yemek/
│   │   └── market/
│   └── navigation/
```

---

## 🎨 Renk Paleti

| Token | Light Mode | Dark Mode |
|-------|------------|-----------|
| background | `#ffffff` | `#1a1a1a` |
| foreground | `#1a1a1a` | `#fafafa` |
| primary | `#262626` | `#e5e5e5` |
| secondary | `#f5f5f5` | `#404040` |
| muted | `#737373` | `#a3a3a3` |
| border | `#e5e5e5` | `rgba(255,255,255,0.1)` |
| destructive | `#dc2626` | `#ef4444` |

---

## 📅 Faz Özeti

1. **Temizlik:** Eski kütüphaneler ve bileşenler kaldırılacak
2. **Kurulum:** Gluestack UI entegrasyonu
3. **Theme:** Yeni minimal tema oluşturulacak
4. **Ekranlar:** Login, Home, Liste ekranları yeniden yazılacak

*Son Güncelleme: 3 Ocak 2026*
