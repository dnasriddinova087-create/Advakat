// Rasmiy manba: https://www.lex.uz/uz/acts/-6445145
import { CONSTITUTION_PARTS, CONSTITUTION_CHAPTERS } from './mockData';
export { CONSTITUTION_PARTS, CONSTITUTION_CHAPTERS };

export interface FullArticle {
  id: number;
  chapter_id: number;
  article_number: number;
  title: string;
  content: string;
  part_name: string;
  chapter_title: string;
}

export const CONSTITUTION_META = {
  title: 'O‘ZBEKISTON RESPUBLIKASI KONSTITUTSIYASI',
  subtitle: 'Rasmiy matn bilan tanishing',
  adoptedDate: '1992-yil 8-dekabr',
  revisionDate: '2023-yil 30-apreldagi referendumda qabul qilingan yangi tahrir',
  officialSourceUrl: 'https://www.lex.uz/uz/acts/-6445145',
  verifiedDate: '2026-yil 14-oktabr holatiga amaldagi tahrir',
  preamble: `Biz, O‘zbekistonning yagona xalqi:
inson huquq va erkinliklariga, milliy va umuminsoniy qadriyatlarga, davlat suvereniteti prinsiplariga sodiqligimizni tantanali ravishda e’lon qilib;
xalqaro huquqning umum e’tirof etilgan qoidalari ustuvorligini e’tirof etgan holda;
inson, uning hayoti, erkinligi, sha’ni va qadr-qimmati oliy qadriyat hisoblanadigan insonparvar demokratik davlatni, ochiq va adolatli jamiyatni barpo etish maqsadida;
hozirgi va kelajak avlodlar oldidagi yuksak mas’uliyatimizni anglab;
o‘zbek davlatchiligi rivojining uch ming yildan ziyod tarixiy tajribasiga hamda jahon sivilizatsiyasiga beqiyos hissa qo‘shgan buyuk ajdodlarimizning ma’naviy merosiga tayanib;
O‘zbekiston Respublikasining ushbu Konstitutsiyasini qabul qilamiz va e’lon qilamiz.`
};

export const FULL_ARTICLES: FullArticle[] = [
  {
    id: 1,
    chapter_id: 1,
    article_number: 1,
    title: '1-modda',
    content: 'O‘zbekiston — boshqaruvning respublika shakliga ega bo‘lgan suveren, demokratik, huquqiy, ijtimoiy va dunyoviy davlat. Davlatning «O‘zbekiston Respublikasi» va «O‘zbekiston» degan nomlari bir ma’noni anglatadi.',
    part_name: 'I BO‘LIM. ASOSIY PRINSIPLAR',
    chapter_title: '1-bob. Davlat suvereniteti'
  },
  {
    id: 2,
    chapter_id: 1,
    article_number: 2,
    title: '2-modda',
    content: 'Davlat xalq irodasini ifoda etib, uning manfaatlariga xizmat qiladi. Davlat organlari va mansabdor shaxslar jamiyat va fuqarolar oldida mas’uldirlar.',
    part_name: 'I BO‘LIM. ASOSIY PRINSIPLAR',
    chapter_title: '1-bob. Davlat suvereniteti'
  },
  {
    id: 13,
    chapter_id: 2,
    article_number: 13,
    title: '13-modda',
    content: 'O‘zbekiston Respublikasida demokratiya umuminsoniy prinsiplarga asoslanadi, ularga ko‘ra inson, uning hayoti, erkinligi, sha’ni, qadr-qimmati va boshqa ajralmas huquqlari oliy qadriyat hisoblanadi.\n\nInson hamda davlatning bir-biriga nisbatan huquqlari va majburiyatlarining o‘zaro maqbulligi davlat faoliyatining asosiy prinsipidir.',
    part_name: 'I BO‘LIM. ASOSIY PRINSIPLAR',
    chapter_title: '2-bob. Xalq hokimiyatchiligi'
  },
  {
    id: 15,
    chapter_id: 3,
    article_number: 15,
    title: '15-modda',
    content: 'O‘zbekiston Respublikasida O‘zbekiston Respublikasi Konstitutsiyasi va qonunlarining ustunligi so‘zsiz tan olinadi.\n\nO‘zbekiston Respublikasi Konstitutsiyasi mamlakatning butun hududida oliy yuridik kuchga ega, to‘g‘ridan-to‘g‘ri amal qiladi va yagona huquqiy makonning asosini tashkil etadi.',
    part_name: 'I BO‘LIM. ASOSIY PRINSIPLAR',
    chapter_title: '3-bob. Konstitutsiya va qonunning ustunligi'
  },
  {
    id: 16,
    chapter_id: 3,
    article_number: 16,
    title: '16-modda',
    content: 'Birorta ham qonun yoki boshqa normativ-huquqiy hujjat Konstitutsiya normalari va qoidalariga zid kelishi mumkin emas.',
    part_name: 'I BO‘LIM. ASOSIY PRINSIPLAR',
    chapter_title: '3-bob. Konstitutsiya va qonunning ustunligi'
  },
  {
    id: 19,
    chapter_id: 5,
    article_number: 19,
    title: '19-modda',
    content: 'O‘zbekiston Respublikasida insonning huquq va erkinliklari xalqaro huquqning umum e’tirof etilgan normalariga muvofiq hamda ushbu Konstitutsiyaga binoan e’tirof etiladi va kafolatlanadi. Inson huquq va erkinliklari har kimga tug‘ilganidan boshlab tegishli bo‘ladi.\n\nO‘zbekiston Respublikasida barcha fuqarolar bir xil huquq va erkinliklarga ega bo‘lib, jinsi, irqi, millati, tili, dini, e’tiqodi, ijtimoiy kelib chiqishi, ijtimoiy mavqeidan qat’i nazar, qonun oldida tengdirlar.',
    part_name: 'II BO‘LIM. INSON VA FUQARONING ASOSIY HUQUQLARI, ERKINLIKLARI VA BURCHLARI',
    chapter_title: '5-bob. Umumiy qoidalar'
  },
  {
    id: 20,
    chapter_id: 5,
    article_number: 20,
    title: '20-modda',
    content: 'Fuqaroning qonunlarda mustahkamlab qo‘yilgan huquq va erkinliklari daxlsizdir hamda ulardan sud qarorisiz mahrum etishga yoki ularni cheklab qo‘yishga hech kim haqli emas.\n\nInsonning davlat organlari bilan o‘zaro munosabatlarida qonunchilikda yuzaga keladigan bartaraf etib bo‘lmaydigan barcha qarama-qarshiliklar va noaniqliklar inson foydasiga talqin etiladi.',
    part_name: 'II BO‘LIM. INSON VA FUQARONING ASOSIY HUQUQLARI, ERKINLIKLARI VA BURCHLARI',
    chapter_title: '5-bob. Umumiy qoidalar'
  },
  {
    id: 24,
    chapter_id: 6,
    article_number: 24,
    title: '24-modda',
    content: 'Yashash huquqi har bir insonning ajralmas huquqidir va u qonun bilan muhofaza qilinadi. Inson hayotiga suiqasd qilish eng og‘ir jinoyatdir.\n\nO‘zbekiston Respublikasida o‘lim jazosi taqiqlanadi.',
    part_name: 'II BO‘LIM. INSON VA FUQARONING ASOSIY HUQUQLARI, ERKINLIKLARI VA BURCHLARI',
    chapter_title: '6-bob. Shaxsiy huquq va erkinliklar'
  },
  {
    id: 25,
    chapter_id: 6,
    article_number: 25,
    title: '25-modda',
    content: 'Har kim erkinlik va shaxsiy daxlsizlik huquqiga ega.\n\nHech kim qonunga asoslanmagan holda hibsga olinishi, ushlab turilishi, qamoqqa olinishi, qamoqda saqlanishi yoki uning ozodligi boshqacha tarzda cheklanishi mumkin emas.\n\nHibsga olishga, qamoqqa olishga va qamoqda saqlashga faqat sudning qaroriga ko‘ra yo‘l qo‘yiladi. Shaxs sud qarorisiz qirq sakkiz soatdan ko‘p muddat ushlab turilishi mumkin emas.',
    part_name: 'II BO‘LIM. INSON VA FUQARONING ASOSIY HUQUQLARI, ERKINLIKLARI VA BURCHLARI',
    chapter_title: '6-bob. Shaxsiy huquq va erkinliklar'
  },
  {
    id: 26,
    chapter_id: 6,
    article_number: 26,
    title: '26-modda',
    content: 'Jinoyat sodir etganlikda ayblanayotgan shaxs uning aybi qonunda nazarda tutilgan tartibda, oshkora sud muhokamasida isbotlanmaguncha va sudning qonuniy kuchga kirgan hukmi bilan aniqlanmaguncha aybsiz hisoblanadi. Ayblanuvchiga o‘zini himoya qilish uchun barcha imkoniyatlar ta’minlanadi.\n\nAybdorlikka oid barcha shubhalar, agar ularni bartaraf etish imkoniyatlari tugagan bo‘lsa, gumon qilinuvchining, ayblanuvchining, sudlanuvchining yoki mahkumning foydasiga hal qilinishi kerak.',
    part_name: 'II BO‘LIM. INSON VA FUQARONING ASOSIY HUQUQLARI, ERKINLIKLARI VA BURCHLARI',
    chapter_title: '6-bob. Shaxsiy huquq va erkinliklar'
  },
  {
    id: 27,
    chapter_id: 6,
    article_number: 27,
    title: '27-modda',
    content: 'Har kim o‘z sha’ni va qadr-qimmati kamsitilishidan, shaxsiy hayotiga aralashishdan himoyalanish, turar joyi daxlsizligi huquqiga ega.\n\nHech kim sud qarorisiz va qonunga xilof ravishda turar joyga kirishi, tintuv o‘tkazishi yoki uni ko‘zdan kechirishi mumkin emas.',
    part_name: 'II BO‘LIM. INSON VA FUQARONING ASOSIY HUQUQLARI, ERKINLIKLARI VA BURCHLARI',
    chapter_title: '6-bob. Shaxsiy huquq va erkinliklar'
  },
  {
    id: 28,
    chapter_id: 6,
    article_number: 28,
    title: '28-modda',
    content: 'Hech kim o‘ziga va yaqin qarindoshlariga qarshi ko‘rsatuv berishga majbur emas.\n\nAgar shaxsning o‘z aybini tan olganligi unga qarshi yagona dalil bo‘lsa, u aybdor deb topilishi yoki jazoga tortilishi mumkin emas.\n\nOzodlikdan mahrum etilgan shaxslar o‘zlariga nisbatan insoniy munosabatda bo‘linishi hamda inson qadr-qimmati hurmat qilinishi huquqiga ega.',
    part_name: 'II BO‘LIM. INSON VA FUQARONING ASOSIY HUQUQLARI, ERKINLIKLARI VA BURCHLARI',
    chapter_title: '6-bob. Shaxsiy huquq va erkinliklar'
  },
  {
    id: 29,
    chapter_id: 6,
    article_number: 29,
    title: '29-modda',
    content: 'Har kimga malakali yuridik yordam olish huquqi kafolatlanadi. Qonunda nazarda tutilgan hollarda yuridik yordam davlat hisobidan ko‘rsatiladi.\n\nHar bir shaxs jinoyat protsessining har qanday bosqichida, ushlanganida esa uning harakatlanish erkinligi amalda cheklangan paytdan e’tiboran o‘z tanloviga ko‘ra advokat yordamidan foydalanish huquqiga ega.',
    part_name: 'II BO‘LIM. INSON VA FUQARONING ASOSIY HUQUQLARI, ERKINLIKLARI VA BURCHLARI',
    chapter_title: '6-bob. Shaxsiy huquq va erkinliklar'
  },
  {
    id: 54,
    chapter_id: 9,
    article_number: 54,
    title: '54-modda',
    content: 'Insonning huquq va erkinliklarini ta’minlash davlatning oliy maqsadidir. Davlat inson hamda fuqaroning Konstitutsiya va qonunlarda mustahkamlangan huquqlari va erkinliklarini ta’minlaydi.',
    part_name: 'II BO‘LIM. INSON VA FUQARONING ASOSIY HUQUQLARI, ERKINLIKLARI VA BURCHLARI',
    chapter_title: '9-bob. Inson huquq va erkinliklarining kafolatlari'
  },
  {
    id: 55,
    chapter_id: 9,
    article_number: 55,
    title: '55-modda',
    content: 'Har kim o‘z huquq va erkinliklarini qonunda taqiqlanmagan barcha usullar bilan himoya qilishga haqlidir.\n\nHar kimga o‘z huquq va erkinliklarini sud orqali himoya qilish, davlat organlarining hamda boshqa tashkilotlarning, ular mansabdor shaxslarining qonunga xilof qarorlari, harakatlari va harakatsizligi ustidan sudga shikoyat qilish huquqi kafolatlanadi.',
    part_name: 'II BO‘LIM. INSON VA FUQARONING ASOSIY HUQUQLARI, ERKINLIKLARI VA BURCHLARI',
    chapter_title: '9-bob. Inson huquq va erkinliklarining kafolatlari'
  },
  {
    id: 65,
    chapter_id: 11,
    article_number: 65,
    title: '65-modda',
    content: 'Fuqarolar farovonligini oshirishga qaratilgan O‘zbekiston iqtisodiyotining negizini xilma-xil shakllardagi mulk tashkil etadi. Davlat bozor munosabatlarini rivojlantirish va halol raqobat uchun shart-sharoitlar yaratadi, iste’molchilarning huquqlari ustuvorligini hisobga olgan holda iqtisodiy faoliyat, tadbirkorlik va mehnat qilish erkinligini kafolatlaydi.\n\nO‘zbekiston Respublikasida barcha mulk shakllarining teng huquqliligi va ularni rivojlantirish uchun huquqiy kafolatlar ta’minlanadi.',
    part_name: 'III BO‘LIM. JAMIYAT VA SHAXS',
    chapter_title: '11-bob. Jamiyatning iqtisodiy negizlari'
  },
  {
    id: 141,
    chapter_id: 23,
    article_number: 141,
    title: '141-modda',
    content: 'Jismoniy va yuridik shaxslarga yuridik yordam ko‘rsatish uchun advokatura faoliyat ko‘rsatadi.\n\nAdvokatlik faoliyati qonuniylik, mustaqillik va o‘z-o‘zini boshqarish prinsiplariga asoslanadi.\n\nAdvokaturani tashkil etish va uning faoliyati tartibi qonun bilan belgilanadi.',
    part_name: 'V BO‘LIM. DAVLAT HOKIMIYATINING TASHKIL ETILISHI',
    chapter_title: '23-bob. Advokatura'
  },
  {
    id: 142,
    chapter_id: 23,
    article_number: 142,
    title: '142-modda',
    content: 'Advokat o‘z kasbiy vazifalarini amalga oshirayotganda uning faoliyatiga aralashishga yo‘l qo‘yilmaydi.\n\nAdvokatga o‘z himoyasidagi shaxs bilan moneliksiz va xoli uchrashish, maslahatlar berish uchun shart-sharoitlar ta’minlanadi.\n\nAdvokat, uning sha’ni, qadr-qimmati va kasbiy faoliyati davlat himoyasida bo‘ladi va qonun bilan muhofaza qilinadi.',
    part_name: 'V BO‘LIM. DAVLAT HOKIMIYATINING TASHKIL ETILISHI',
    chapter_title: '23-bob. Advokatura'
  },
  {
    id: 143,
    chapter_id: 23,
    article_number: 143,
    title: '143-modda',
    content: 'Advokatlik siri qonun bilan qo‘riqlanadi. Advokatdan uning kasbiy vazifalarini bajarishi munosabati bilan unga ma’lum bo‘lgan holatlar to‘g‘risida ko‘rsatuvlar talab qilish taqiqlanadi.',
    part_name: 'V BO‘LIM. DAVLAT HOKIMIYATINING TASHKIL ETILISHI',
    chapter_title: '23-bob. Advokatura'
  }
];
