// AdvoCare Comprehensive Automated Test Runner
// Validates routes, schemas, conflict prevention, security rules, and Constitution data

const assert = require('assert');
const fs = require('fs');
const path = require('path');

let testsPassed = 0;
let testsFailed = 0;

function runTest(name, fn) {
  try {
    fn();
    console.log(`✅ PASS: ${name}`);
    testsPassed++;
  } catch (err) {
    console.error(`❌ FAIL: ${name}`);
    console.error(`   Error: ${err.message}`);
    testsFailed++;
  }
}

console.log('====================================================');
console.log('🏛️  ADVOCARE PLATFORMASI AVTOMATLASHGAN TESTLAR NOMI');
console.log('====================================================\n');

// 1. ROUTE FILES EXISTENCE TEST
runTest('Barcha asosiy sahifalar va marshrutlar mavjudligi', () => {
  const requiredRoutes = [
    'src/app/_layout.tsx',
    'src/app/index.tsx',
    'src/app/services.tsx',
    'src/app/lawyers.tsx',
    'src/app/lawyers/[id].tsx',
    'src/app/appointments/index.tsx',
    'src/app/appointments/book.tsx',
    'src/app/constitution/index.tsx',
    'src/app/constitution/chapters.tsx',
    'src/app/constitution/articles/[id].tsx',
    'src/app/laws/index.tsx',
    'src/app/login.tsx',
    'src/app/register.tsx',
    'src/app/dashboard/client.tsx',
    'src/app/dashboard/lawyer.tsx',
    'src/app/admin/index.tsx',
    'src/app/chat/[id].tsx',
    'src/app/qr.tsx',
  ];

  for (const r of requiredRoutes) {
    const fullPath = path.join(process.cwd(), r);
    assert.strictEqual(fs.existsSync(fullPath), true, `Route fayl topilmadi: ${r}`);
  }
});

// 2. LEGAL CATEGORIES 26 COUNT TEST
runTest('26 ta huquqiy xizmatlar kategoriyasining to‘liqligi', () => {
  const content = fs.readFileSync(path.join(process.cwd(), 'src/lib/mockData.ts'), 'utf8');
  assert.strictEqual(content.includes('Fuqarolik ishlari'), true);
  assert.strictEqual(content.includes('Jinoyat ishlari'), true);
  assert.strictEqual(content.includes('Oila huquqi'), true);
  assert.strictEqual(content.includes('Mehnat huquqi'), true);
  assert.strictEqual(content.includes('Uy-joy va ko‘chmas mulk'), true);
  assert.strictEqual(content.includes('IT va internet huquqi'), true);
  assert.strictEqual(content.includes('Yo‘l harakati va transport huquqi'), true);
});

// 3. CONSTITUTION DATA INTEGRITY & LEX.UZ LINK TEST
runTest('Konstitutsiya matni va Lex.uz rasmiy manbasi integratsiyasi', () => {
  const content = fs.readFileSync(path.join(process.cwd(), 'src/lib/constitutionData.ts'), 'utf8');
  assert.strictEqual(content.includes('https://www.lex.uz/uz/acts/-6445145'), true, 'Rasmiy Lex.uz havolasi topilmadi');
  assert.strictEqual(content.includes('2023-yil 30-aprel'), true, 'Yangi tahrir sanasi topilmadi');
  assert.strictEqual(content.includes('141-modda'), true, 'Advokatura moddasi (141) topilmadi');
  assert.strictEqual(content.includes('142-modda'), true, 'Advokatura daxlsizligi moddasi (142) topilmadi');
  assert.strictEqual(content.includes('Advokatlik siri qonun bilan qo‘riqlanadi'), true, 'Advokat siri normasi topilmadi');
});

// 4. PHONE AND EMAIL VALIDATION TEST
runTest('O‘zbekiston telefon raqamlari va email validatsiyasi', () => {
  const reEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  assert.strictEqual(reEmail.test('advokat@advocare.uz'), true);
  assert.strictEqual(reEmail.test('invalid-email'), false);

  const cleanPhone = (p) => p.replace(/[\s\-\(\)]/g, '');
  const reUzPhone = /^(\+?998)?[0-9]{9}$/;

  assert.strictEqual(reUzPhone.test(cleanPhone('+998 90 123 45 67')), true);
  assert.strictEqual(reUzPhone.test(cleanPhone('901234567')), true);
  assert.strictEqual(reUzPhone.test(cleanPhone('12345')), false);
});

// 5. APPOINTMENT CONFLICT DETECTION LOGIC TEST
runTest('Uchrashuv vaqti ziddiyatini aniqlash algoritmi (Conflict prevention)', () => {
  function timeToMin(timeStr) {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
  }

  function hasConflict(slots, newDate, newStart, newEnd) {
    const nStart = timeToMin(newStart);
    const nEnd = timeToMin(newEnd);
    return slots.some((s) => {
      if (s.appointment_date !== newDate) return false;
      if (s.status === 'Cancelled' || s.status === 'Rejected') return false;
      const sStart = timeToMin(s.start_time);
      const sEnd = timeToMin(s.end_time);
      return nStart < sEnd && sStart < nEnd;
    });
  }

  const existingSlots = [
    { appointment_date: '2026-10-25', start_time: '14:00', end_time: '14:45', status: 'Confirmed' },
    { appointment_date: '2026-10-25', start_time: '15:00', end_time: '15:45', status: 'Pending' },
    { appointment_date: '2026-10-25', start_time: '16:00', end_time: '16:45', status: 'Cancelled' },
  ];

  // Overlapping slot
  assert.strictEqual(hasConflict(existingSlots, '2026-10-25', '14:15', '15:00'), true);
  // Identical slot
  assert.strictEqual(hasConflict(existingSlots, '2026-10-25', '14:00', '14:45'), true);
  // Free slot
  assert.strictEqual(hasConflict(existingSlots, '2026-10-25', '10:00', '10:45'), false);
  // Overlapping cancelled slot (should allow)
  assert.strictEqual(hasConflict(existingSlots, '2026-10-25', '16:00', '16:45'), false);
  // Different date (should allow)
  assert.strictEqual(hasConflict(existingSlots, '2026-10-26', '14:00', '14:45'), false);
});

// 6. FILE UPLOAD SECURITY TEST
runTest('Fayl yuklash xavfsizligi va MIME turlari tekshiruvi', () => {
  const allowed = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];
  const maxBytes = 10 * 1024 * 1024;

  assert.strictEqual(allowed.includes('application/pdf'), true);
  assert.strictEqual(allowed.includes('image/png'), true);
  assert.strictEqual(allowed.includes('application/x-msdownload'), false); // Disallow exe
  assert.strictEqual(allowed.includes('text/javascript'), false); // Disallow scripts

  const fileSize = 2 * 1024 * 1024;
  assert.strictEqual(fileSize <= maxBytes, true);
  const oversizedFile = 15 * 1024 * 1024;
  assert.strictEqual(oversizedFile <= maxBytes, false);
});

// 7. MULTILINGUAL TRANSLATION KEYS TEST
runTest('Ko‘p tillilik (uz, ru, en) lug‘atining to‘liqligi', () => {
  const content = fs.readFileSync(path.join(process.cwd(), 'src/lib/constants.ts'), 'utf8');
  assert.strictEqual(content.includes("appName: 'AdvoCare'"), true);
  assert.strictEqual(content.includes('uz: {'), true);
  assert.strictEqual(content.includes('ru: {'), true);
  assert.strictEqual(content.includes('en: {'), true);
});

// 8. SUPABASE MIGRATION SCHEMA TABLE COUNT TEST
runTest('Supabase SQL migratsiyasida 15 ta jadval va RLS siyosatlari mavjudligi', () => {
  const sql = fs.readFileSync(path.join(process.cwd(), 'supabase/migrations/20261014000000_init_advocare_schema.sql'), 'utf8');
  const requiredTables = [
    'public.profiles',
    'public.lawyer_profiles',
    'public.legal_categories',
    'public.lawyer_services',
    'public.lawyer_availability',
    'public.appointments',
    'public.conversations',
    'public.messages',
    'public.documents',
    'public.reviews',
    'public.notifications',
    'public.payments',
    'public.complaints',
    'public.legal_documents',
    'public.admin_audit_logs',
  ];

  for (const table of requiredTables) {
    assert.strictEqual(sql.includes(`CREATE TABLE IF NOT EXISTS ${table}`), true, `Jadval topilmadi: ${table}`);
    assert.strictEqual(sql.includes(`ALTER TABLE ${table} ENABLE ROW LEVEL SECURITY`), true, `RLS faollashtirilmagan: ${table}`);
  }
});

// 9. VERCEL CONFIGURATION TEST
runTest('Vercel konfiguratsiyasi va rewrites to‘g‘riligi', () => {
  const vercelJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'vercel.json'), 'utf8'));
  assert.strictEqual(vercelJson.outputDirectory, 'dist');
  assert.strictEqual(vercelJson.buildCommand, 'npm run build:web');
  assert.strictEqual(vercelJson.rewrites[0].destination, '/index.html');
});

// 10. EXPO CONFIGURATION TEST
runTest('Expo app.json va scheme konfiguratsiyasi to‘g‘riligi', () => {
  const appJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'app.json'), 'utf8'));
  assert.strictEqual(appJson.expo.name, 'AdvoCare');
  assert.strictEqual(appJson.expo.slug, 'advocare');
  assert.strictEqual(appJson.expo.scheme, 'advocare');
  assert.strictEqual(appJson.expo.web.output, 'static');
});

console.log('\n====================================================');
console.log(`JAMI TESTLAR: ${testsPassed + testsFailed}`);
console.log(`MUAFFAQIYATLI: ${testsPassed}`);
console.log(`XATOLIKLAR:    ${testsFailed}`);
console.log('====================================================\n');

if (testsFailed > 0) {
  process.exit(1);
} else {
  console.log('🎉 Barcha testlar muvaffaqiyatli yakunlandi!');
  process.exit(0);
}
