-- AdvoCare Realistic Seed Data for Uzbekistan Legal System

-- 1. INSERT 26 LEGAL CATEGORIES
INSERT INTO public.legal_categories (id, title, slug, icon_name, description, service_count, is_active)
VALUES
('a0000001-0000-0000-0000-000000000001', 'Fuqarolik ishlari', 'fuqarolik', 'Scale', 'Mulk huquqi, shartnomaviy majburiyatlar va zararni undirish bo‘yicha nizolar.', 42, true),
('a0000001-0000-0000-0000-000000000002', 'Jinoyat ishlari', 'jinoyat', 'ShieldAlert', 'Tergov, surishtiruv va sud bosqichlarida professional advokatlik himoyasi.', 38, true),
('a0000001-0000-0000-0000-000000000003', 'Oila huquqi', 'oila', 'Users', 'Nikohdan ajrashish, aliment undirish, mulk taqsimoti va vasiylik masalalari.', 56, true),
('a0000001-0000-0000-0000-000000000004', 'Mehnat huquqi', 'mehnat', 'Briefcase', 'Ishdan noqonuniy bo‘shatish, ish haqi undirish va mehnat nizolarini hal etish.', 29, true),
('a0000001-0000-0000-0000-000000000005', 'Uy-joy va ko‘chmas mulk', 'uy-joy', 'Home', 'Oldi-sotdi, ijara, ro‘yxatdan chiqarish va mulk huquqini e’tirof etish.', 35, true),
('a0000001-0000-0000-0000-000000000006', 'Meros huquqi', 'meros', 'FileText', 'Vasiyatnoma, merosni qabul qilish muddati va merosxo‘rlar o‘rtasidagi nizolar.', 24, true),
('a0000001-0000-0000-0000-000000000007', 'Biznes va tadbirkorlik', 'biznes', 'Building2', 'Kompaniya ro‘yxatdan o‘tkazish, korporativ shartnomalar va biznes himoyasi.', 48, true),
('a0000001-0000-0000-0000-000000000008', 'Soliq huquqi', 'soliq', 'Receipt', 'Soliq tekshiruvlari, soliq imtiyozlari va soliq organlari qarorlari ustidan shikoyat.', 21, true),
('a0000001-0000-0000-0000-000000000009', 'Bank va moliya', 'bank-moliya', 'Landmark', 'Kredit shartnomalari, garov ta’minoti va qarzdorlikni qayta tuzish.', 19, true),
('a0000001-0000-0000-0000-000000000010', 'Xalqaro huquq', 'xalqaro', 'Globe', 'Tashqi iqtisodiy faoliyat, xalqaro arbitraj va eksport-import shartnomalari.', 15, true),
('a0000001-0000-0000-0000-000000000011', 'Migratsiya huquqi', 'migratsiya', 'Plane', 'Fuqarolik olish, yashash guvohnomasi va chet el fuqarolari maqomi.', 18, true),
('a0000001-0000-0000-0000-000000000012', 'Iste’molchilar huquqlari', 'iste-molchi', 'ShoppingBag', 'Sifatsiz tovar va xizmatlar uchun kompensatsiya undirish masalalari.', 22, true),
('a0000001-0000-0000-0000-000000000013', 'Sug‘urta huquqi', 'sug-urta', 'ShieldCheck', 'Yo‘l-transport hodisalari va sug‘urta to‘lovlarini undirish.', 16, true),
('a0000001-0000-0000-0000-000000000014', 'Intellektual mulk', 'intellektual-mulk', 'Lightbulb', 'Tovar belgilari, patentlar, litsenziyalar va brend himoyasi.', 25, true),
('a0000001-0000-0000-0000-000000000015', 'IT va internet huquqi', 'it-huquq', 'Code', 'IT-park rezidentligi, dasturiy ta’minot litsenziyalari va kiberxavfsizlik.', 31, true),
('a0000001-0000-0000-0000-000000000016', 'Ma’muriy ishlar', 'ma-muriy', 'Gavel', 'Ma’muriy jarimalar va davlat idoralari qarorlari ustidan sudga murojaat.', 27, true),
('a0000001-0000-0000-0000-000000000017', 'Iqtisodiy sud ishlari', 'iqtisodiy-sud', 'TrendingUp', 'Xo‘jalik yurituvchi subyektlar o‘rtasidagi da’volar va arbitraj.', 33, true),
('a0000001-0000-0000-0000-000000000018', 'Yer huquqi', 'yer-huquqi', 'Map', 'Yer uchastkasiga egalik, ijara va xususiylashtirish nizolari.', 20, true),
('a0000001-0000-0000-0000-000000000019', 'Harbiy huquq', 'harbiy-huquq', 'Award', 'Harbiy xizmatchilar huquqlari va harbiy xizmatdan ozod qilish masalalari.', 11, true),
('a0000001-0000-0000-0000-000000000020', 'Konstitutsiyaviy huquq', 'konstitutsiyaviy', 'BookOpen', 'Inson huquqlari, asosiy kafolatlar va konstitutsiyaviy odil sudlov.', 14, true),
('a0000001-0000-0000-0000-000000000021', 'Bankrotlik va to‘lovga qobiliyatsizlik', 'bankrotlik', 'DollarSign', 'Kompaniya va jismoniy shaxslarni bankrot deb topish jarayoni.', 13, true),
('a0000001-0000-0000-0000-000000000022', 'Korrupsiyaga oid ishlar', 'korrupsiya', 'ShieldAlert', 'Korrupsiyaviy huquqbuzarliklar bo‘yicha mustaqil advokatlik tekshiruvi va himoya.', 17, true),
('a0000001-0000-0000-0000-000000000023', 'Tibbiyot huquqi', 'tibbiyot', 'Activity', 'Shifokor xatosi, bemor huquqlari va tibbiy muassasalar javobgarligi.', 12, true),
('a0000001-0000-0000-0000-000000000024', 'Qurilish huquqi', 'qurilish', 'HardHat', 'Pudrat shartnomalari, ruxsatnomalar va qurilish nizolari.', 18, true),
('a0000001-0000-0000-0000-000000000025', 'Mualliflik va media huquqi', 'media-huquqi', 'Video', 'OAV, kontent muallifligi, tuhmat va sha’n-qadr-qimmatni himoya qilish.', 16, true),
('a0000001-0000-0000-0000-000000000026', 'Yo‘l harakati va transport', 'transport', 'Car', 'YTH, transport vositalari ekspertizasi va jarimalar bilan bog‘liq nizolar.', 30, true)
ON CONFLICT (id) DO NOTHING;

-- 2. INSERT LEGAL DOCUMENTS (LEX.UZ REFERENCES)
INSERT INTO public.legal_documents (id, title, type, doc_number, date_adopted, lex_url, summary, status, last_verified)
VALUES
('b0000001-0000-0000-0000-000000000001', 'O‘zbekiston Respublikasining Konstitutsiyasi (Yangi tahrir)', 'konstitutsiya', 'O‘RQ-837', '2023-04-30', 'https://www.lex.uz/uz/acts/-6445145', 'Davlat qurilishi, inson va fuqarolarning asosiy huquqlari, erkinliklari hamda burchlari kafolati.', 'amaldagi', CURRENT_DATE),
('b0000001-0000-0000-0000-000000000002', 'O‘zbekiston Respublikasining Fuqarolik kodeksi', 'kodeks', '№ 163-I', '1995-12-21', 'https://lex.uz/docs/-111189', 'Mulkchilik, fuqarolik muomalasi, bitimlar va majburiyatlar huquqining asosiy qonuni.', 'amaldagi', CURRENT_DATE),
('b0000001-0000-0000-0000-000000000003', 'O‘zbekiston Respublikasining Mehnat kodeksi', 'kodeks', 'O‘RQ-798', '2022-10-28', 'https://lex.uz/docs/-6257288', 'Mehnat munosabatlari, xodim va ish beruvchi huquq hamda majburiyatlarini tartibga soluvchi yangi kodeks.', 'amaldagi', CURRENT_DATE),
('b0000001-0000-0000-0000-000000000004', 'O‘zbekiston Respublikasining Jinoyat kodeksi', 'kodeks', '№ 2012-XII', '1994-09-22', 'https://lex.uz/docs/-111460', 'Jinoiy javobgarlik asoslari, jazo choralari va huquqbuzarliklar tasnifi.', 'amaldagi', CURRENT_DATE),
('b0000001-0000-0000-0000-000000000005', 'O‘zbekiston Respublikasining Oila kodeksi', 'kodeks', '№ 607-I', '1998-04-30', 'https://lex.uz/docs/-104720', 'Oila a’zolari o‘rtasidagi huquqiy munosabatlar, nikoh va vasiylik qoidalari.', 'amaldagi', CURRENT_DATE),
('b0000001-0000-0000-0000-000000000006', 'Advokatura to‘g‘risida O‘zbekiston Respublikasi Qonuni', 'qonun', '№ 349-I', '1996-12-27', 'https://lex.uz/docs/-53723', 'Advokatlik faoliyati kafolatlari, advokatlar maqomi va professional yuridik yordam qoidalari.', 'amaldagi', CURRENT_DATE)
ON CONFLICT (id) DO NOTHING;
