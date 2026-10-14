# AdvoCare — O‘zbekiston Professional Yuridik Xizmatlar Platformasi

[![AdvoCare Uzbekistan](https://img.shields.io/badge/Platform-AdvoCare_Uzbekistan-0B1424?style=for-the-badge&logo=scale&logoColor=C6A15B)](https://advocare-uz.vercel.app)
[![Expo SDK 57](https://img.shields.io/badge/Expo-SDK_57-000000?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev)
[![React Native Web](https://img.shields.io/badge/React_Native-Web_%26_Mobile-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactnative.dev)
[![Supabase](https://img.shields.io/badge/Database-Supabase_PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com)
[![Vercel Ready](https://img.shields.io/badge/Deploy-Vercel_Ready-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)

---

## 🏛️ Loyiha Haqida

**AdvoCare** — O‘zbekiston Respublikasi qonunchiligiga to‘liq mos, fuqarolar, tadbirkorlar va litsenziyalangan advokatlarni yagona raqamli muhitda birlashtiruvchi professional yuridik xizmatlar platformasi.

Loyiha mobil (iOS, Android, planshetlar) hamda desktop brauzerlarida birdek ishlaydigan yagona Expo / React Native Web arxitekturasi asosida barpo etilgan.

---

## ✨ Asosiy Imkoniyatlar va Funksiyalar

1. **Bosh Sahifa & Qidiruv**:
   - Ko‘p parametrli qidiruv (Advokat ismi, mutaxassislik sohasi, O‘zbekiston viloyatlari bo‘yicha filtr).
   - Mashhur xizmatlar, tavsiya etilgan advokatlar, interaktiv qadamlar, foydalanuvchilar fikrlari va FAQ.
2. **26 ta Huquqiy Xizmatlar Katalogi**:
   - Fuqarolik, Jinoyat, Oila, Mehnat, Uy-joy, IT-huquq, Soliq, Bank, Ma’muriy, Intellektual mulk va barcha amaliy yo‘nalishlar.
3. **Advokatlar Katalogi va Profillari**:
   - O‘zbekiston Advokatlar palatasi a’zoligi va litsenziya holati (Tasdiqlangan advokat nishoni).
   - Tajriba yillari, reyting, sharhlar, ish jadvali, xizmat narxlari, muloqot tillari.
4. **Onlayn Uchrashuv va Bron Tizimi**:
   - Konsultatsiya sanasi va 45 daqiqalik vaqt oralig‘ini tanlash.
   - **Vaqt ziddiyatlarini oldini olish (Conflict Prevention)** algoritmi.
   - Statuslar: *Pending*, *Confirmed*, *Rejected*, *Cancelled*, *Completed*.
5. **Shaxsiy Xavfsiz Chat & Hujjatlar**:
   - Mijoz va advokat o‘rtasida advokatlik siri bilan himoyalangan xabarlar va fayl almashinuvi (PDF, DOCX, JPG, PNG).
   - O‘qilganlik belgilari (read status) va vaqt tamg‘alari.
6. **O‘zbekiston Respublikasi Konstitutsiyasi (Kitob Interfeysi)**:
   - 2023-yil 30-apreldagi referendumda qabul qilingan yangi tahrirning rasmiy matni ([Lex.uz havolasi](https://www.lex.uz/uz/acts/-6445145)).
   - Muqova, mundarija, boblar, moddalararo qulay navigatsiya, matn o‘lchamini o‘zgartirish (A- / A+) va chop etish (print) rejimi.
7. **Qonunchilik Milliy Bazasi (Lex.uz Integratsiyasi)**:
   - Fuqarolik, Mehnat, Jinoyat, Oila kodekslari va qonunlariga to‘g‘ridan-to‘g‘ri Lex.uz havolalari.
8. **Admin Panel**:
   - Haqiqiy platforma ko‘rsatkichlari (KPI), advokatlarni verifikatsiya qilish/bekor qilish, shikoyatlarni ko‘rib chiqish, audit loglar.
9. **To‘lovlar Arxitekturasi**:
   - O‘zbekiston to‘lov tizimlari (Click, Payme, Uzum Bank) integratsiyasiga tayyorlangan arxitektura va test (sandbox) rejimi.
10. **Ko‘p Tillilik (Multilingual)**:
    - O‘zbekcha (asosiy), Ruscha, Inglizcha interfeys.

---

## 🚀 Texnologiyalar Staki

- **Frontend & Mobil**: Expo SDK 57, React Native 0.86, React Native Web 0.21, Expo Router 57, TypeScript 6.
- **Ikonkalar**: Lucide Icons (`lucide-react-native`).
- **Dizayn Tizimi**: AdvoCare Luxury Legal Palette (To‘q navy `#0B1424`, Asosiy oltin `#C6A15B`, Oq `#FFFFFF`, Krem `#F7F5F0`).
- **Backend & Ma’lumotlar**: Supabase PostgreSQL, Supabase Auth, Row Level Security (RLS) siyosatlari.
- **Avtomatlashgan Testlar**: 10 ta mezon bo‘yicha avtonom test tizimi (`scripts/run-tests.js`).
- **Deploy**: GitHub, Vercel, Expo Go QR.

---

## 📁 Loyiha Papkalar Tuzilmasi

```
Advakat/
├── app.json                                 # Expo konfiguratsiyasi
├── package.json                             # Loyiha paketlari va skriptlar
├── tsconfig.json                            # TypeScript qoidalari va aliaslar
├── index.html                               # SEO va PWA shell
├── vercel.json                              # Vercel static rewrites
├── .npmrc                                   # legacy-peer-deps sozlamasi
├── .env.example                             # Muhit o'zgaruvchilari namunasi
├── .gitignore                               # Xavfsizlik va ignore qoidalari
├── scripts/
│   └── run-tests.js                         # Avtomatlashgan test skripti
├── supabase/
│   ├── migrations/
│   │   └── 20261014000000_init_advocare_schema.sql  # 15 ta jadval va RLS
│   └── seed.sql                             # 26 ta kategoriya va qonunchilik datalari
└── src/
    ├── app/                                 # Expo Router sahifalari
    │   ├── _layout.tsx                      # Ildiz navigator va AuthProvider
    │   ├── index.tsx                        # Bosh sahifa (Hero, xizmatlar, advokatlar, FAQ)
    │   ├── services.tsx                     # 26 ta huquqiy xizmatlar katalogi
    │   ├── lawyers.tsx                      # Advokatlar qidiruvi va ko'p filtrli ro'yxati
    │   ├── lawyers/[id].tsx                 # Advokatning to'liq profili va jadvali
    │   ├── appointments/index.tsx           # Uchrashuvlar ro'yxati va Click/Payme to'lov
    │   ├── appointments/book.tsx            # Ziddiyatsiz onlayn bron qilish formasi
    │   ├── constitution/index.tsx           # Konstitutsiya kitob ko'rinishi va qidiruv
    │   ├── constitution/chapters.tsx        # Bo'limlar va boblar ro'yxati
    │   ├── constitution/articles/[id].tsx   # Aniq modda o'quvchisi va Lex.uz havolasi
    │   ├── laws/index.tsx                   # Lex.uz kodeks va qonunlar kutubxonasi
    │   ├── login.tsx                        # Kirish va tezkor demo hisoblar
    │   ├── register.tsx                     # Mijoz / Advokat ro'yxatdan o'tishi
    │   ├── dashboard/client.tsx             # Mijoz kabineti va hujjatlar ombori
    │   ├── dashboard/lawyer.tsx             # Advokat kabineti va daromad statistikasi
    │   ├── admin/index.tsx                  # Boshqaruv paneli, verifikatsiya va audit
    │   ├── chat/[id].tsx                    # Shaxsiy himoyalangan chat va hujjat almashish
    │   └── qr.tsx                           # Mobil Expo Go va Vercel QR-kod markazi
    ├── components/
    │   ├── Header.tsx                       # Responsive navigatsiya va til almashtirgich
    │   ├── Footer.tsx                       # Lex.uz havolalari va huquqiy disclaimer
    │   ├── SearchBar.tsx                    # Hudud va kalit so'z bo'yicha qidiruv
    │   ├── LawyerCard.tsx                   # Advokat kartasi va verifikatsiya nishoni
    │   ├── ServiceCard.tsx                  # 26 ta yo'nalish Lucide kartalari
    │   ├── AppointmentCard.tsx              # Bron holati va to'lov tugmalari
    │   ├── ResponsiveLayout.tsx             # Max-width va layout adapteri
    │   ├── QRCodeView.tsx                   # Cross-platform QR generatori
    │   ├── ProtectedRoute.tsx               # Ruxsatlarni tekshirish komponenti
    │   ├── LoadingState.tsx                 # Yuklanish indikatori
    │   ├── EmptyState.tsx                   # Bo'sh natija holati
    │   └── ErrorState.tsx                   # Xatolik holati
    ├── lib/
    │   ├── supabase.ts                      # Supabase mijozi va oflayn fallback
    │   ├── validation.ts                    # +998 raqam, email, bron ziddiyati va fayl tekshiruvi
    │   ├── permissions.ts                   # Foydalanuvchi rollari huquqlari
    │   ├── constants.ts                     # Lug'atlar (uz, ru, en) va hududlar
    │   ├── mockData.ts                      # Haqiqiy namunaviy ma'lumotlar
    │   ├── constitutionData.ts              # Konstitutsiyaning rasmiy 2023 tahrir matnlari
    │   └── storage.ts                       # Persistent sessiya va ma'lumotlar ombori
    ├── hooks/
    │   ├── useAuth.ts                       # Sessiya va rolni boshqarish
    │   ├── useLanguage.ts                   # Ko'p tillilik hooki
    │   └── useResponsive.ts                 # Ekran o'lchamlariga moslashish
    ├── styles/
    │   └── theme.ts                         # AdvoCare brend ranglari, bo'shliq va soyalar
    ├── types/
    │   └── index.ts                         # Domain modellari va interfeyslar
    └── utils/
        └── formatters.ts                    # So'm valyutasi va sanalarni formatlash
```

---

## 🛠️ O‘rnatish va Ishga Tushirish

### 1. Bog‘liqliklarni o‘rnatish:
```bash
npm install --legacy-peer-deps
```

### 2. Veb-versiyani lokal rejimda ishga tushirish:
```bash
npm run web
# yoki
npx expo start --web
```
Brauzeringizda avtomatik ravishda `http://localhost:8081` ochiladi.

### 3. Mobil qurilmada Expo Go orqali ochish:
```bash
npx expo start
```
Terminalda paydo bo‘lgan QR-kodni telefoningiz kamerasi yoki **Expo Go** ilovasi orqali skanerlang.
Shuningdek, loyihaning `/qr` sahifasida maxsus **Expo Go Development QR** va **Vercel Production Web QR** kodlari generatori mavjud.

### 4. Production Web Build (Vercel uchun):
```bash
npm run build:web
```
Natijada `dist/` papkasida static veb-sayt shakllanadi.

### 5. Avtomatlashgan Testlarni ishga tushirish:
```bash
npm test
```

---

## 🗄️ Supabase Ma’lumotlar Bazasi Sozlamalari

1. [Supabase](https://supabase.com) platformasida yangi loyiha oching.
2. **SQL Editor** bo‘limiga kiring.
3. `supabase/migrations/20261014000000_init_advocare_schema.sql` fayli mazmunini nusxalang va ishga tushiring. Bu quyidagi 15 ta jadvalni yaratadi va RLS siyosatlarini yoqadi:
   - `profiles`
   - `lawyer_profiles`
   - `legal_categories`
   - `lawyer_services`
   - `lawyer_availability`
   - `appointments`
   - `conversations`
   - `messages`
   - `documents`
   - `reviews`
   - `notifications`
   - `payments`
   - `complaints`
   - `legal_documents`
   - `admin_audit_logs`
4. `supabase/seed.sql` faylini ishga tushirib, 26 ta kategoriya va qonunchilik ma’lumotlarini yuklang.
5. Loyiha ildizidagi `.env` fayliga o‘z kalitlaringizni kiriting:
```env
EXPO_PUBLIC_SUPABASE_URL=https://sizning-loyihangiz.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=sizning-anon-kalitingiz
EXPO_PUBLIC_VERCEL_URL=https://advocare-uz.vercel.app
```

---

## 🌐 Vercel Deployment Qo‘llanmasi

1. Ushbu GitHub repozitoriyani Vercel ga ulang: [https://github.com/dnasriddinova087-create/Advakat.git](https://github.com/dnasriddinova087-create/Advakat.git)
2. **Framework Preset**: *Other*
3. **Build Command**: `npm run build:web`
4. **Output Directory**: `dist`
5. **Install Command**: `npm install --legacy-peer-deps`
6. **Environment Variables**:
   - `EXPO_PUBLIC_SUPABASE_URL`
   - `EXPO_PUBLIC_SUPABASE_ANON_KEY`
   - `EXPO_PUBLIC_VERCEL_URL`
7. **Deploy** tugmasini bosing. Loyihadagi `vercel.json` SPA marshrutlashni avtomatik ta’minlaydi.

---

## 👥 Namunaviy Sinov Hisoblari (Bir marta bosish orqali kirish)

Tizimda har qanday rolni sinash uchun Login sahifasida maxsus tezkor tugmalar mavjud:
- **Mijoz (Client)**: `client@advocare.uz` — uchrashuv belgilash, hujjat yuklash, advokat bilan yozishish.
- **Advokat (Lawyer)**: `rustam.kamolov@advocare.uz` — bron so‘rovlarini tasdiqlash/rad etish, daromadlar statistikasi.
- **Bosh Administrator (Admin)**: `admin@advocare.uz` — advokatlarni verifikatsiya qilish, shikoyatlarni ko‘rib chiqish, audit loglar.

---

## ⚖️ Huquqiy Ogohlantirish (Disclaimer)

Ushbu platformadagi barcha normativ-huquqiy ma’lumotlar va Konstitutsiya matnlari umumiy ma’lumot xarakteriga ega bo‘lib, rasmiy yuridik xulosa hisoblanmaydi. Aniq da’vo yoki huquqiy nizo bo‘yicha albatta litsenziyalangan advokat bilan shaxsan maslahatlashish shart.
Rasmiy qonunchilik manbasi: [Lex.uz Qonunchilik ma’lumotlari milliy bazasi](https://lex.uz/).
