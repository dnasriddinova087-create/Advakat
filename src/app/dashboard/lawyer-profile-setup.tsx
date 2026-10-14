// 6-Step Comprehensive Lawyer Profile Setup and Activation Wizard
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Image, 
  Switch 
} from 'react-native';
import { useRouter } from 'expo-router';
import { 
  Award, 
  User, 
  Briefcase, 
  Scale, 
  Star, 
  DollarSign, 
  Clock, 
  ShieldCheck, 
  CheckCircle, 
  ArrowLeft, 
  ArrowRight, 
  Upload, 
  MapPin, 
  Phone, 
  Mail, 
  Building2, 
  GraduationCap, 
  FileText 
} from 'lucide-react-native';
import ResponsiveLayout from '../../components/ResponsiveLayout';
import ProtectedRoute from '../../components/ProtectedRoute';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../styles/theme';
import { UZBEKISTAN_REGIONS, LANGUAGES_LIST } from '../../lib/constants';
import { getStoredLawyers, saveStoredLawyers, saveStoredUser } from '../../lib/storage';
import { useAuth } from '../../hooks/useAuth';
import { LawyerProfile } from '../../types';
import { formatMoney } from '../../utils/formatters';

export default function LawyerProfileSetupScreen() {
  const router = useRouter();
  const { user } = useAuth();

  const [step, setStep] = useState<number>(1);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [createdLawyerId, setCreatedLawyerId] = useState<string>('');

  // 1. Shaxsiy ma’lumotlar
  const [fullName, setFullName] = useState(user?.full_name || 'Rustam Kamolov');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar_url || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80');
  const [birthDate, setBirthDate] = useState('1988-05-14');
  const [selectedRegion, setSelectedRegion] = useState('Toshkent shahri');
  const [cityDistrict, setCityDistrict] = useState('Mirobod tumani');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['O‘zbek', 'Русский']);
  const [phone, setPhone] = useState(user?.phone || '+998 90 123 45 67');
  const [email, setEmail] = useState(user?.email || 'rustam.kamolov@advocare.uz');

  // 2. Kasbiy faoliyat
  const [licenseNumber, setLicenseNumber] = useState('ADV-TAS-2015-084');
  const [firmName, setFirmName] = useState('Kamolov & Partners Yuridik Firmasi');
  const [experienceYears, setExperienceYears] = useState<number>(12);
  const [education, setEducation] = useState('Toshkent Davlat Yuridik Universiteti (Magistratura)');
  const [certifications, setCertifications] = useState('Xalqaro arbitraj va biznes nizolari bo‘yicha sertifikat (2022)');
  const [docUploaded, setDocUploaded] = useState(true);

  // 3. Mutaxassislik yo‘nalishlari
  const [specializations, setSpecializations] = useState<string[]>([
    'Fuqarolik ishlari',
    'Biznes va tadbirkorlik',
    'Iqtisodiy sud ishlari',
  ]);

  const allSpecialtyOptions = [
    'Fuqarolik ishlari',
    'Jinoyat ishlari',
    'Oila huquqi',
    'Biznes va tadbirkorlik',
    'Mehnat huquqi',
    'Uy-joy va ko‘chmas mulk',
    'Meros huquqi',
    'Soliq huquqi',
    'Bank va moliya',
    'IT va internet huquqi',
    'Ma’muriy ishlar',
    'Iqtisodiy sud ishlari',
    'Yer huquqi',
    'Intellektual mulk',
  ];

  // 4. Tajriba va yutuqlar
  const [focusAreas, setFocusAreas] = useState('Korporativ nizolar, mulkiy shartnomalar, da’vo arizalari tuzish va sudda himoya.');
  const [complexCases, setComplexCases] = useState('Yirik ishlab chiqarish korxonasi foydasiga 1.8 mlrd so‘mlik debitor qarzdorlikni to‘liq undirib berganman.');
  const [achievements, setAchievements] = useState('O‘zbekiston Advokatlar palatasining "Yilning eng yaxshi iqtisodiy advokati" faxriy yorlig‘i sohibi.');
  const [clientApproach, setClientApproach] = useState('Har bir ishga individual yondashuv, shaffoflik, qat’iy advokatlik siri va maksimal natijaga erishish.');
  const [bio, setBio] = useState('12 yillik amaliy tajribaga ega litsenziyalangan advokat. 400 dan ortiq muvaffaqiyatli sud ishlarida fuqarolar va tadbirkorlar huquqlarini himoya qilganman.');

  // 5. Xizmatlar va narxlar
  const [consultationPrice, setConsultationPrice] = useState<number>(250000);
  const [isOnlineAvailable, setIsOnlineAvailable] = useState<boolean>(true);
  const [offlineMeetingPrice, setOfflineMeetingPrice] = useState<number>(350000);
  const [documentDraftPrice, setDocumentDraftPrice] = useState<number>(500000);
  const [courtRepresentationPrice, setCourtRepresentationPrice] = useState<string>('Shartnoma asosida (boshlang‘ich 2 000 000 so‘m)');
  const [hasFreeInitialIntro, setHasFreeInitialIntro] = useState<boolean>(true);

  // 6. Ishlash tartibi va tasdiqlash
  const [workingDays, setWorkingDays] = useState('Dushanba - Juma (09:00 - 18:00), Shanba (10:00 - 14:00)');
  const [acceptsEmergency, setAcceptsEmergency] = useState<boolean>(true);
  const [firstConsultDuration, setFirstConsultDuration] = useState('45 daqiqa');
  const [acceptingNewClients, setAcceptingNewClients] = useState<boolean>(true);
  const [agreeRules, setAgreeRules] = useState<boolean>(true);
  const [agreeDataProcessing, setAgreeDataProcessing] = useState<boolean>(true);
  const [confirmAccurate, setConfirmAccurate] = useState<boolean>(true);

  const toggleLanguage = (lang: string) => {
    if (selectedLanguages.includes(lang)) {
      if (selectedLanguages.length > 1) {
        setSelectedLanguages(selectedLanguages.filter((l) => l !== lang));
      }
    } else {
      setSelectedLanguages([...selectedLanguages, lang]);
    }
  };

  const toggleSpecialty = (spec: string) => {
    if (specializations.includes(spec)) {
      if (specializations.length > 1) {
        setSpecializations(specializations.filter((s) => s !== spec));
      }
    } else {
      setSpecializations([...specializations, spec]);
    }
  };

  const handleSaveAndActivate = () => {
    const lawyerId = user?.id || `lawyer-${Date.now()}`;
    setCreatedLawyerId(lawyerId);

    const updatedProfile: LawyerProfile = {
      id: lawyerId,
      email: email,
      full_name: fullName,
      role: 'lawyer',
      phone: phone,
      avatar_url: avatarUrl,
      license_number: licenseNumber,
      specializations: specializations,
      region: selectedRegion,
      city: cityDistrict,
      experience_years: experienceYears,
      bio: bio,
      consultation_price: consultationPrice,
      is_verified: true, // Activated immediately into the catalog as requested!
      rating: 5.0,
      review_count: 1,
      languages: selectedLanguages,
      is_online_available: isOnlineAvailable,
      education: education,
      firm_name: firmName,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Save into stored lawyers array
    const existing = getStoredLawyers();
    const filtered = existing.filter((l) => l.id !== lawyerId);
    const newList = [updatedProfile, ...filtered];
    saveStoredLawyers(newList);

    // Also update current active user session
    saveStoredUser(updatedProfile);

    setIsSaved(true);
  };

  return (
    <ProtectedRoute allowedRoles={['lawyer', 'admin']}>
      <ResponsiveLayout>
        <View style={styles.container}>
          {/* Top Wizard Progress Indicator */}
          <View style={styles.wizardHeader}>
            <View style={styles.wizardBadge}>
              <Award size={14} color={COLORS.navy} />
              <Text style={styles.wizardBadgeText}>ADVOCARE PROFESSIONAL PROFILI</Text>
            </View>
            <Text style={styles.wizardTitle}>Advokat profilini yaratish va faollashtirish</Text>
            <Text style={styles.wizardSubtitle}>
              Mijozlar sizning tajribangiz, litsenziyangiz va narxlaringizni bir qarashda ko‘rib, to‘g‘ridan-to‘g‘ri qabulingizga yozilishlari uchun profilni to‘ldiring.
            </Text>

            {/* Steps Progress */}
            <View style={styles.stepsBar}>
              {[1, 2, 3, 4, 5, 6].map((s) => (
                <TouchableOpacity 
                  key={s} 
                  style={[styles.stepDot, step === s && styles.stepDotActive, step > s && styles.stepDotCompleted]}
                  onPress={() => setStep(s)}
                >
                  <Text style={[styles.stepDotText, step === s && styles.stepDotTextActive, step > s && styles.stepDotTextCompleted]}>
                    {step > s ? '✓' : s}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.stepCounterText}>
              Bosqich {step} / 6: {
                step === 1 ? 'Shaxsiy ma’lumotlar' :
                step === 2 ? 'Kasbiy faoliyat va litsenziya' :
                step === 3 ? 'Mutaxassislik yo‘nalishlari' :
                step === 4 ? 'Tajriba va yutuqlar' :
                step === 5 ? 'Xizmatlar va narxlar' :
                'Ishlash tartibi va tasdiqlash'
              }
            </Text>
          </View>

          {isSaved ? (
            <View style={styles.successCard}>
              <View style={styles.successIconBox}>
                <CheckCircle size={56} color={COLORS.success} />
              </View>
              <Text style={styles.successHeading}>Profilingiz Muvaffaqiyatli Faollashtirildi! 🎉</Text>
              <Text style={styles.successMessage}>
                Sizning advokatlik profilingiz to‘liq saqlandi va AdvoCare platformasi advokatlar katalogiga darhol qo‘shildi. Endi mijozlar sizni topib, qabulingizga uchrashuv belgilashlari mumkin.
              </Text>

              <View style={styles.summaryBox}>
                <Text style={styles.summaryRow}>👤 <Text style={{ fontWeight: '700' }}>{fullName}</Text></Text>
                <Text style={styles.summaryRow}>📍 {selectedRegion}, {cityDistrict}</Text>
                <Text style={styles.summaryRow}>📜 Litsenziya: <Text style={{ color: COLORS.goldDark, fontWeight: '700' }}>{licenseNumber}</Text></Text>
                <Text style={styles.summaryRow}>⚖️ Mutaxassisliklar: {specializations.join(', ')}</Text>
                <Text style={styles.summaryRow}>💵 Birlamchi konsultatsiya: <Text style={{ fontWeight: '800' }}>{formatMoney(consultationPrice)}</Text></Text>
                <Text style={styles.summaryRow}>🛡️ Holati: <Text style={{ color: COLORS.success, fontWeight: '800' }}>Katalogda faol (Tasdiqlangan advokat)</Text></Text>
              </View>

              <View style={styles.successButtonsRow}>
                <TouchableOpacity
                  style={styles.viewLiveProfileBtn}
                  onPress={() => router.push(`/lawyers/${createdLawyerId || 'lawyer-1'}`)}
                >
                  <Text style={styles.viewLiveProfileBtnText}>Katalogdagi profilni ko‘rish</Text>
                  <ArrowRight size={16} color={COLORS.navy} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.toDashboardBtn}
                  onPress={() => router.push('/dashboard/lawyer')}
                >
                  <Text style={styles.toDashboardBtnText}>Advokat kabinetiga o‘tish</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.card}>
              {/* ================= STEP 1: Shaxsiy ma’lumotlar ================= */}
              {step === 1 && (
                <View style={styles.stepSection}>
                  <Text style={styles.sectionTitle}>1. Shaxsiy ma’lumotlar</Text>
                  <Text style={styles.sectionSubtitle}>Mijozlar siz bilan tanishishi uchun asosiy ma’lumotlar</Text>

                  <View style={styles.formGroup}>
                    <Text style={styles.label}>To‘liq ism-familiyangiz *</Text>
                    <TextInput
                      style={styles.input}
                      value={fullName}
                      onChangeText={setFullName}
                      placeholder="Rustam Kamolov"
                    />
                  </View>

                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Profil uchun surat URL manzili (yoki havola) *</Text>
                    <TextInput
                      style={styles.input}
                      value={avatarUrl}
                      onChangeText={setAvatarUrl}
                      placeholder="https://example.com/avatar.jpg"
                    />
                    {avatarUrl ? (
                      <View style={styles.avatarPreviewBox}>
                        <Image source={{ uri: avatarUrl }} style={styles.avatarPreview} />
                        <Text style={styles.avatarPreviewHint}>Surat ko‘rinishi</Text>
                      </View>
                    ) : null}
                  </View>

                  <View style={styles.formRow}>
                    <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                      <Text style={styles.label}>Faoliyat yuritadigan hududingiz *</Text>
                      <ScrollView style={styles.regionSelectorScroll} nestedScrollEnabled>
                        {UZBEKISTAN_REGIONS.filter(r => r !== 'Barcha hududlar').map((reg) => (
                          <TouchableOpacity
                            key={reg}
                            style={[styles.regionPill, selectedRegion === reg && styles.regionPillActive]}
                            onPress={() => setSelectedRegion(reg)}
                          >
                            <Text style={[styles.regionPillText, selectedRegion === reg && styles.regionPillTextActive]}>
                              {reg}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>

                    <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                      <Text style={styles.label}>Shahar / Tuman *</Text>
                      <TextInput
                        style={styles.input}
                        value={cityDistrict}
                        onChangeText={setCityDistrict}
                        placeholder="Mirobod tumani"
                      />

                      <Text style={[styles.label, { marginTop: 14 }]}>Tug‘ilgan sana (ixtiyoriy)</Text>
                      <TextInput
                        style={styles.input}
                        value={birthDate}
                        onChangeText={setBirthDate}
                        placeholder="1988-05-14"
                      />
                    </View>
                  </View>

                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Xizmat ko‘rsatish tillari *</Text>
                    <View style={styles.checkboxRow}>
                      {['O‘zbek', 'Русский', 'English', 'Qoraqalpoqcha'].map((l) => {
                        const checked = selectedLanguages.includes(l);
                        return (
                          <TouchableOpacity
                            key={l}
                            style={[styles.checkboxBtn, checked && styles.checkboxBtnActive]}
                            onPress={() => toggleLanguage(l)}
                          >
                            <Text style={[styles.checkboxBtnText, checked && styles.checkboxBtnTextActive]}>
                              {checked ? '✓ ' : '+ '} {l}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>

                  <View style={styles.formRow}>
                    <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                      <Text style={styles.label}>Bog‘lanish telefon raqami *</Text>
                      <TextInput
                        style={styles.input}
                        value={phone}
                        onChangeText={setPhone}
                        placeholder="+998 90 123 45 67"
                        keyboardType="phone-pad"
                      />
                    </View>
                    <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                      <Text style={styles.label}>Professional elektron pochta *</Text>
                      <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="advokat@advocare.uz"
                        keyboardType="email-address"
                        autoCapitalize="none"
                      />
                    </View>
                  </View>
                </View>
              )}

              {/* ================= STEP 2: Kasbiy faoliyat ================= */}
              {step === 2 && (
                <View style={styles.stepSection}>
                  <Text style={styles.sectionTitle}>2. Kasbiy faoliyat va litsenziya</Text>
                  <Text style={styles.sectionSubtitle}>Malakangiz va O‘zbekiston Advokatlar palatasidagi huquqiy maqomingiz</Text>

                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Advokatlik guvohnomasi / litsenziyasi raqami *</Text>
                    <TextInput
                      style={styles.input}
                      value={licenseNumber}
                      onChangeText={setLicenseNumber}
                      placeholder="ADV-TAS-2015-084"
                    />
                    <Text style={styles.hintText}>* Ushbu raqam Adliya vazirligi yagona ochiq reyestridan tekshiriladi.</Text>
                  </View>

                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Advokatlik tuzilmasi yoki yuridik tashkilot nomi *</Text>
                    <TextInput
                      style={styles.input}
                      value={firmName}
                      onChangeText={setFirmName}
                      placeholder="Masalan: Kamolov & Partners Yuridik Firmasi"
                    />
                  </View>

                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Necha yillik kasbiy tajribaga egasiz? *</Text>
                    <View style={styles.expPillsRow}>
                      {[
                        { val: 1, label: '1 yildan kam' },
                        { val: 3, label: '1–3 yil' },
                        { val: 5, label: '3–5 yil' },
                        { val: 8, label: '5–10 yil' },
                        { val: 12, label: '10 yildan ortiq' },
                      ].map((item) => (
                        <TouchableOpacity
                          key={item.val}
                          style={[styles.expPill, experienceYears === item.val && styles.expPillActive]}
                          onPress={() => setExperienceYears(item.val)}
                        >
                          <Text style={[styles.expPillText, experienceYears === item.val && styles.expPillTextActive]}>
                            {item.label}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>

                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Tamomlagan oliy ta’lim muassasasi *</Text>
                    <TextInput
                      style={styles.input}
                      value={education}
                      onChangeText={setEducation}
                      placeholder="Toshkent Davlat Yuridik Universiteti"
                    />
                  </View>

                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Malaka oshirish kurslari yoki sertifikatlar (ixtiyoriy)</Text>
                    <TextInput
                      style={styles.input}
                      value={certifications}
                      onChangeText={setCertifications}
                      placeholder="Xalqaro arbitraj, soliq nizolari sertifikatlari..."
                    />
                  </View>

                  <View style={styles.uploadBox}>
                    <Upload size={24} color={COLORS.gold} />
                    <Text style={styles.uploadBoxTitle}>Advokatlik litsenziyasi nusxasi (PDF / Rasm)</Text>
                    <Text style={styles.uploadBoxSub}>Fayl yuklangan: license_scan_2026.pdf (1.8 MB)</Text>
                    <Text style={styles.uploadBoxStatus}>✓ Hujjat tekshiruvga tayyor</Text>
                  </View>
                </View>
              )}

              {/* ================= STEP 3: Mutaxassislik yo‘nalishlari ================= */}
              {step === 3 && (
                <View style={styles.stepSection}>
                  <Text style={styles.sectionTitle}>3. Mutaxassislik yo‘nalishlari</Text>
                  <Text style={styles.sectionSubtitle}>Mijozlarga o‘z muammosi bo‘yicha aynan sizni topishda yordam beradi</Text>

                  <View style={styles.specsGrid}>
                    {allSpecialtyOptions.map((spec) => {
                      const isSelected = specializations.includes(spec);
                      return (
                        <TouchableOpacity
                          key={spec}
                          style={[styles.specItemCard, isSelected && styles.specItemCardActive]}
                          onPress={() => toggleSpecialty(spec)}
                        >
                          <View style={[styles.specCheckbox, isSelected && styles.specCheckboxActive]}>
                            <Text style={[styles.specCheckmark, isSelected && { color: COLORS.navy }]}>
                              {isSelected ? '✓' : ''}
                            </Text>
                          </View>
                          <Text style={[styles.specItemText, isSelected && styles.specItemTextActive]}>
                            {spec}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              )}

              {/* ================= STEP 4: Tajriba va yutuqlar ================= */}
              {step === 4 && (
                <View style={styles.stepSection}>
                  <Text style={styles.sectionTitle}>4. Tajriba va yutuqlar</Text>
                  <Text style={styles.sectionSubtitle}>Profilingizni boshqalardan ajratib turuvchi professional natijalaringiz</Text>

                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Eng ko‘p ishlaydigan sohalaringiz va ish turlari *</Text>
                    <TextInput
                      style={styles.textArea}
                      value={focusAreas}
                      onChangeText={setFocusAreas}
                      multiline
                      numberOfLines={3}
                    />
                  </View>

                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Qanday murakkab huquqiy masalalarni hal qilgansiz? *</Text>
                    <TextInput
                      style={styles.textArea}
                      value={complexCases}
                      onChangeText={setComplexCases}
                      multiline
                      numberOfLines={3}
                    />
                  </View>

                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Mijozlarga qanday yondashuvni taklif qilasiz? *</Text>
                    <TextInput
                      style={styles.textArea}
                      value={clientApproach}
                      onChangeText={setClientApproach}
                      multiline
                      numberOfLines={3}
                    />
                  </View>

                  <View style={styles.formGroup}>
                    <Text style={styles.label}>O‘zingiz haqingizda umumiy tanishtiruv (Bio) *</Text>
                    <TextInput
                      style={styles.textArea}
                      value={bio}
                      onChangeText={setBio}
                      multiline
                      numberOfLines={4}
                    />
                  </View>
                </View>
              )}

              {/* ================= STEP 5: Xizmatlar va narxlar ================= */}
              {step === 5 && (
                <View style={styles.stepSection}>
                  <Text style={styles.sectionTitle}>5. Xizmatlar va narxlar</Text>
                  <Text style={styles.sectionSubtitle}>Mijozlar shartlarni oldindan aniq bilishi uchun shaffof narxlar</Text>

                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Birlamchi maslahat narxi (so‘mda) *</Text>
                    <TextInput
                      style={styles.input}
                      value={String(consultationPrice)}
                      onChangeText={(val) => setConsultationPrice(Number(val) || 0)}
                      keyboardType="numeric"
                      placeholder="250000"
                    />
                    <Text style={styles.priceFormattedHint}>Ko‘rinishi: {formatMoney(consultationPrice)}</Text>
                  </View>

                  <View style={styles.switchRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.switchTitle}>Onlayn maslahat berasizmi?</Text>
                      <Text style={styles.switchSub}>Videochat va shaxsiy xabarlar orqali maslahat berish imkoniyati</Text>
                    </View>
                    <Switch
                      value={isOnlineAvailable}
                      onValueChange={setIsOnlineAvailable}
                      trackColor={{ false: COLORS.border, true: COLORS.gold }}
                      thumbColor={COLORS.white}
                    />
                  </View>

                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Ofisdagi yuzma-yuz uchrashuv narxi (so‘mda)</Text>
                    <TextInput
                      style={styles.input}
                      value={String(offlineMeetingPrice)}
                      onChangeText={(val) => setOfflineMeetingPrice(Number(val) || 0)}
                      keyboardType="numeric"
                    />
                  </View>

                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Hujjat va da’vo tayyorlash xizmatlari narxi (so‘mda)</Text>
                    <TextInput
                      style={styles.input}
                      value={String(documentDraftPrice)}
                      onChangeText={(val) => setDocumentDraftPrice(Number(val) || 0)}
                      keyboardType="numeric"
                    />
                  </View>

                  <View style={styles.switchRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.switchTitle}>Bepul dastlabki 10 daqiqalik ekspress tanishuv mavjudmi?</Text>
                      <Text style={styles.switchSub}>Mijoz bilan holatni baholash uchun qisqa suhbat</Text>
                    </View>
                    <Switch
                      value={hasFreeInitialIntro}
                      onValueChange={setHasFreeInitialIntro}
                      trackColor={{ false: COLORS.border, true: COLORS.gold }}
                      thumbColor={COLORS.white}
                    />
                  </View>
                </View>
              )}

              {/* ================= STEP 6: Ishlash tartibi va tasdiqlash ================= */}
              {step === 6 && (
                <View style={styles.stepSection}>
                  <Text style={styles.sectionTitle}>6. Ishlash tartibi va tasdiqlash</Text>
                  <Text style={styles.sectionSubtitle}>Profilni to‘liq faollashtirish va qonuniy shartlarga rozilik</Text>

                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Qaysi kunlari va soatlarda ishlaysiz? *</Text>
                    <TextInput
                      style={styles.input}
                      value={workingDays}
                      onChangeText={setWorkingDays}
                      placeholder="Dushanba - Juma (09:00 - 18:00)"
                    />
                  </View>

                  <View style={styles.switchRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.switchTitle}>Shoshilinch murojaatlarni qabul qilasizmi?</Text>
                      <Text style={styles.switchSub}>Dam olish kunlari yoki ishdan tashqari vaqtdagi tezkor qo‘ng‘iroqlar</Text>
                    </View>
                    <Switch
                      value={acceptsEmergency}
                      onValueChange={setAcceptsEmergency}
                      trackColor={{ false: COLORS.border, true: COLORS.gold }}
                      thumbColor={COLORS.white}
                    />
                  </View>

                  <View style={styles.switchRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.switchTitle}>Hozir yangi mijozlarni qabul qila olasizmi?</Text>
                      <Text style={styles.switchSub}>Katalogda "Band emas / Yangi mijozlarni qabul qilmoqda" belgisi ko‘rinadi</Text>
                    </View>
                    <Switch
                      value={acceptingNewClients}
                      onValueChange={setAcceptingNewClients}
                      trackColor={{ false: COLORS.border, true: COLORS.gold }}
                      thumbColor={COLORS.white}
                    />
                  </View>

                  {/* Consents & Agreements */}
                  <View style={styles.agreementsBox}>
                    <Text style={styles.agreementsHeading}>Yuridik rozilik va kafolatlar:</Text>

                    <TouchableOpacity style={styles.agreementItem} onPress={() => setConfirmAccurate(!confirmAccurate)}>
                      <View style={[styles.agreementCheck, confirmAccurate && styles.agreementCheckActive]}>
                        <Text style={styles.checkIcon}>{confirmAccurate ? '✓' : ''}</Text>
                      </View>
                      <Text style={styles.agreementText}>
                        Kiritilgan litsenziya va shaxsiy ma’lumotlarim haqiqiy va to‘g‘ri ekanligini tasdiqlayman.
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.agreementItem} onPress={() => setAgreeRules(!agreeRules)}>
                      <View style={[styles.agreementCheck, agreeRules && styles.agreementCheckActive]}>
                        <Text style={styles.checkIcon}>{agreeRules ? '✓' : ''}</Text>
                      </View>
                      <Text style={styles.agreementText}>
                        AdvoCare platformasi qoidalari va advokatlik etikasi talablariga to‘liq rioya qilishga roziman.
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.agreementItem} onPress={() => setAgreeDataProcessing(!agreeDataProcessing)}>
                      <View style={[styles.agreementCheck, agreeDataProcessing && styles.agreementCheckActive]}>
                        <Text style={styles.checkIcon}>{agreeDataProcessing ? '✓' : ''}</Text>
                      </View>
                      <Text style={styles.agreementText}>
                        Professional ma’lumotlarim katalogda e’lon qilinishiga va administrator tekshiruviga roziman.
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.privacyNoticeBox}>
                    <ShieldCheck size={18} color={COLORS.success} />
                    <Text style={styles.privacyNoticeText}>
                      Xavfsizlik kafolati: Yuklangan litsenziya hujjatingiz ommaviy sahifalarda ko‘rinmaydi, faqat administrator audit tekshiruvi uchun himoyalangan serverda saqlanadi.
                    </Text>
                  </View>
                </View>
              )}

              {/* Navigation Controls: Prev / Next / Submit */}
              <View style={styles.wizardFooterControls}>
                {step > 1 ? (
                  <TouchableOpacity 
                    style={styles.prevBtn}
                    onPress={() => setStep(step - 1)}
                  >
                    <ArrowLeft size={16} color={COLORS.navy} />
                    <Text style={styles.prevBtnText}>Oldingi bosqich</Text>
                  </TouchableOpacity>
                ) : <View />}

                {step < 6 ? (
                  <TouchableOpacity 
                    style={styles.nextBtn}
                    onPress={() => setStep(step + 1)}
                  >
                    <Text style={styles.nextBtnText}>Keyingi bosqich ({step + 1}/6)</Text>
                    <ArrowRight size={16} color={COLORS.navy} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity 
                    style={styles.finishBtn}
                    onPress={handleSaveAndActivate}
                  >
                    <CheckCircle size={18} color={COLORS.navy} />
                    <Text style={styles.finishBtnText}>Profilni Saqlash va Faollashtirish</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
        </View>
      </ResponsiveLayout>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: 880,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xl,
  },
  wizardHeader: {
    backgroundColor: COLORS.navy,
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderDark,
    ...SHADOWS.md,
    marginBottom: 20,
  },
  wizardBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gold,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
    gap: 6,
    marginBottom: 10,
  },
  wizardBadgeText: {
    color: COLORS.navy,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  wizardTitle: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 6,
  },
  wizardSubtitle: {
    color: COLORS.textMuted,
    fontSize: 13,
    textAlign: 'center',
    maxWidth: 620,
    lineHeight: 20,
    marginBottom: 18,
  },
  stepsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  stepDot: {
    width: 34,
    height: 34,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.navyLight,
    borderWidth: 2,
    borderColor: COLORS.borderDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepDotActive: {
    backgroundColor: COLORS.gold,
    borderColor: COLORS.goldLight,
  },
  stepDotCompleted: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
  stepDotText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
  stepDotTextActive: {
    color: COLORS.navy,
    fontWeight: '900',
  },
  stepDotTextCompleted: {
    color: COLORS.white,
  },
  stepCounterText: {
    color: COLORS.goldLight,
    fontSize: 13,
    fontWeight: '700',
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.md,
  },
  stepSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    color: COLORS.navy,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 4,
  },
  sectionSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginBottom: 18,
  },
  formGroup: {
    marginBottom: 14,
  },
  formRow: {
    flexDirection: 'row',
  },
  label: {
    color: COLORS.navy,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 6,
  },
  input: {
    backgroundColor: COLORS.cream,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: 12,
    height: 44,
    fontSize: 14,
    color: COLORS.text,
  },
  textArea: {
    backgroundColor: COLORS.cream,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    padding: 12,
    fontSize: 13,
    color: COLORS.text,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  hintText: {
    color: COLORS.textMuted,
    fontSize: 11,
    marginTop: 4,
  },
  priceFormattedHint: {
    color: COLORS.goldDark,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 4,
  },
  avatarPreviewBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  avatarPreview: {
    width: 50,
    height: 50,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.cream,
  },
  avatarPreviewHint: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  regionSelectorScroll: {
    maxHeight: 130,
    backgroundColor: COLORS.cream,
    borderRadius: RADIUS.md,
    padding: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  regionPill: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: RADIUS.sm,
  },
  regionPillActive: {
    backgroundColor: COLORS.gold,
  },
  regionPillText: {
    color: COLORS.text,
    fontSize: 12,
  },
  regionPillTextActive: {
    color: COLORS.navy,
    fontWeight: '700',
  },
  checkboxRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  checkboxBtn: {
    backgroundColor: COLORS.cream,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  checkboxBtnActive: {
    backgroundColor: COLORS.gold,
    borderColor: COLORS.goldDark,
  },
  checkboxBtnText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: '600',
  },
  checkboxBtnTextActive: {
    color: COLORS.navy,
    fontWeight: '700',
  },
  expPillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  expPill: {
    backgroundColor: COLORS.cream,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  expPillActive: {
    backgroundColor: COLORS.navy,
    borderColor: COLORS.navy,
  },
  expPillText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: '600',
  },
  expPillTextActive: {
    color: COLORS.gold,
    fontWeight: '700',
  },
  uploadBox: {
    backgroundColor: COLORS.cream,
    borderRadius: RADIUS.lg,
    borderWidth: 1.5,
    borderColor: COLORS.gold,
    borderStyle: 'dashed',
    padding: 18,
    alignItems: 'center',
    marginTop: 8,
  },
  uploadBoxTitle: {
    color: COLORS.navy,
    fontSize: 14,
    fontWeight: '700',
    marginTop: 6,
  },
  uploadBoxSub: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  uploadBoxStatus: {
    color: COLORS.success,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 6,
  },
  specsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  specItemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    backgroundColor: COLORS.cream,
    padding: 10,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 8,
  },
  specItemCardActive: {
    borderColor: COLORS.gold,
    backgroundColor: COLORS.goldLight + '25',
  },
  specCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  specCheckboxActive: {
    backgroundColor: COLORS.gold,
    borderColor: COLORS.goldDark,
  },
  specCheckmark: {
    fontSize: 12,
    fontWeight: '900',
  },
  specItemText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: '500',
    flex: 1,
  },
  specItemTextActive: {
    color: COLORS.navy,
    fontWeight: '700',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  switchTitle: {
    color: COLORS.navy,
    fontSize: 13,
    fontWeight: '700',
  },
  switchSub: {
    color: COLORS.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },
  agreementsBox: {
    backgroundColor: COLORS.cream,
    padding: 14,
    borderRadius: RADIUS.lg,
    marginVertical: 12,
    gap: 10,
  },
  agreementsHeading: {
    color: COLORS.navy,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
  },
  agreementItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  agreementCheck: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  agreementCheckActive: {
    backgroundColor: COLORS.gold,
    borderColor: COLORS.goldDark,
  },
  checkIcon: {
    fontSize: 11,
    fontWeight: '900',
    color: COLORS.navy,
  },
  agreementText: {
    color: COLORS.text,
    fontSize: 12,
    lineHeight: 18,
    flex: 1,
  },
  privacyNoticeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.successLight,
    padding: 12,
    borderRadius: RADIUS.md,
    gap: 8,
    marginTop: 8,
  },
  privacyNoticeText: {
    color: COLORS.navy,
    fontSize: 11,
    lineHeight: 16,
    flex: 1,
  },
  wizardFooterControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  prevBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.cream,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: RADIUS.md,
  },
  prevBtnText: {
    color: COLORS.navy,
    fontSize: 13,
    fontWeight: '600',
  },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.gold,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: RADIUS.md,
  },
  nextBtnText: {
    color: COLORS.navy,
    fontSize: 13,
    fontWeight: '700',
  },
  finishBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.gold,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: RADIUS.md,
  },
  finishBtnText: {
    color: COLORS.navy,
    fontSize: 14,
    fontWeight: '800',
  },
  successCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    padding: SPACING.xxl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.md,
  },
  successIconBox: {
    marginBottom: 16,
  },
  successHeading: {
    color: COLORS.navy,
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
  },
  successMessage: {
    color: COLORS.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    maxWidth: 580,
    lineHeight: 22,
    marginBottom: 20,
  },
  summaryBox: {
    backgroundColor: COLORS.cream,
    borderRadius: RADIUS.lg,
    padding: 16,
    width: '100%',
    maxWidth: 520,
    gap: 6,
    marginBottom: 24,
  },
  summaryRow: {
    color: COLORS.text,
    fontSize: 13,
  },
  successButtonsRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  viewLiveProfileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.gold,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: RADIUS.md,
  },
  viewLiveProfileBtnText: {
    color: COLORS.navy,
    fontSize: 13,
    fontWeight: '700',
  },
  toDashboardBtn: {
    backgroundColor: COLORS.navy,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: RADIUS.md,
  },
  toDashboardBtnText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
});
