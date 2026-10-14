// Lawyers Catalog Screen with Multi-Criteria Filtering and Verified Badge
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Switch 
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { 
  Search, 
  SlidersHorizontal, 
  RotateCcw, 
  ShieldCheck, 
  Star, 
  MapPin, 
  Briefcase,
  Calendar
} from 'lucide-react-native';
import ResponsiveLayout from '../components/ResponsiveLayout';
import LawyerCard from '../components/LawyerCard';
import EmptyState from '../components/EmptyState';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../styles/theme';
import { UZBEKISTAN_REGIONS, LANGUAGES_LIST } from '../lib/constants';
import { INITIAL_CATEGORIES } from '../lib/mockData';
import { getStoredLawyers } from '../lib/storage';
import { LawyerProfile } from '../types';
import { useLanguage } from '../hooks/useLanguage';

export default function LawyersScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const params = useLocalSearchParams();

  const [lawyers, setLawyers] = useState<LawyerProfile[]>([]);
  const [search, setSearch] = useState<string>((params.search as string) || '');
  const [selectedRegion, setSelectedRegion] = useState<string>((params.region as string) || 'Barcha hududlar');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>((params.category as string) || 'Barchasi');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('Barchasi');
  const [onlineOnly, setOnlineOnly] = useState<boolean>(false);
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(500000);
  const [showFiltersMobile, setShowFiltersMobile] = useState<boolean>(false);

  useEffect(() => {
    const list = getStoredLawyers();
    setLawyers(list);
  }, []);

  const resetFilters = () => {
    setSearch('');
    setSelectedRegion('Barcha hududlar');
    setSelectedSpecialty('Barchasi');
    setSelectedLanguage('Barchasi');
    setOnlineOnly(false);
    setVerifiedOnly(false);
    setMinRating(0);
    setMaxPrice(500000);
  };

  const filteredLawyers = lawyers.filter((l) => {
    if (search) {
      const q = search.toLowerCase();
      const matchName = l.full_name.toLowerCase().includes(q);
      const matchBio = l.bio.toLowerCase().includes(q);
      const matchSpec = l.specializations.some((s) => s.toLowerCase().includes(q));
      if (!matchName && !matchBio && !matchSpec) return false;
    }

    if (selectedRegion !== 'Barcha hududlar' && l.region !== selectedRegion) {
      return false;
    }

    if (selectedSpecialty !== 'Barchasi' && !l.specializations.includes(selectedSpecialty)) {
      return false;
    }

    if (selectedLanguage !== 'Barchasi' && !l.languages.includes(selectedLanguage)) {
      return false;
    }

    if (onlineOnly && !l.is_online_available) {
      return false;
    }

    if (verifiedOnly && !l.is_verified) {
      return false;
    }

    if (l.rating < minRating) {
      return false;
    }

    if (l.consultation_price > maxPrice) {
      return false;
    }

    return true;
  });

  return (
    <ResponsiveLayout>
      <View style={styles.container}>
        {/* Top Header */}
        <View style={styles.topBanner}>
          <Text style={styles.bannerPreTitle}>MALAKALI ADVOKATLAR BAZASI</Text>
          <Text style={styles.bannerTitle}>O‘zbekiston advokatlari katalogi</Text>
          <Text style={styles.bannerSubtitle}>
            Mutaxassislik, hudud, tajriba va narx bo‘yicha eng mos advokatni tanlang.
          </Text>

          {/* Keyword Search */}
          <View style={styles.searchBox}>
            <Search size={18} color={COLORS.gold} />
            <TextInput
              style={styles.searchInput}
              placeholder="Advokat ismi, litsenziya raqami yoki yo‘nalish..."
              placeholderTextColor={COLORS.textMuted}
              value={search}
              onChangeText={setSearch}
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch('')}>
                <Text style={styles.clearSearchText}>Tozalash</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Main Content: Filter Sidebar + Lawyers Grid */}
        <View style={styles.mainContentRow}>
          {/* Filters Sidebar */}
          <View style={styles.filterSidebar}>
            <View style={styles.filterHeader}>
              <View style={styles.filterHeaderTitleRow}>
                <SlidersHorizontal size={16} color={COLORS.navy} />
                <Text style={styles.filterTitle}>Filtrlar</Text>
              </View>
              <TouchableOpacity onPress={resetFilters} style={styles.resetBtn}>
                <RotateCcw size={12} color={COLORS.danger} />
                <Text style={styles.resetBtnText}>Tozalash</Text>
              </TouchableOpacity>
            </View>

            {/* Region Filter */}
            <View style={styles.filterGroup}>
              <Text style={styles.filterGroupTitle}>Hudud bo‘yicha</Text>
              <ScrollView style={styles.filterScroll} nestedScrollEnabled>
                {UZBEKISTAN_REGIONS.map((reg) => (
                  <TouchableOpacity
                    key={reg}
                    style={[
                      styles.filterRadioItem,
                      selectedRegion === reg && styles.filterRadioItemActive,
                    ]}
                    onPress={() => setSelectedRegion(reg)}
                  >
                    <Text
                      style={[
                        styles.filterRadioText,
                        selectedRegion === reg && styles.filterRadioTextActive,
                      ]}
                    >
                      {reg}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Specialty Filter */}
            <View style={styles.filterGroup}>
              <Text style={styles.filterGroupTitle}>Mutaxassislik</Text>
              <ScrollView style={styles.filterScroll} nestedScrollEnabled>
                <TouchableOpacity
                  style={[
                    styles.filterRadioItem,
                    selectedSpecialty === 'Barchasi' && styles.filterRadioItemActive,
                  ]}
                  onPress={() => setSelectedSpecialty('Barchasi')}
                >
                  <Text
                    style={[
                      styles.filterRadioText,
                      selectedSpecialty === 'Barchasi' && styles.filterRadioTextActive,
                    ]}
                  >
                    Barchasi
                  </Text>
                </TouchableOpacity>
                {INITIAL_CATEGORIES.map((cat) => (
                  <TouchableOpacity
                    key={cat.id}
                    style={[
                      styles.filterRadioItem,
                      selectedSpecialty === cat.title && styles.filterRadioItemActive,
                    ]}
                    onPress={() => setSelectedSpecialty(cat.title)}
                  >
                    <Text
                      style={[
                        styles.filterRadioText,
                        selectedSpecialty === cat.title && styles.filterRadioTextActive,
                      ]}
                      numberOfLines={1}
                    >
                      {cat.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Language Filter */}
            <View style={styles.filterGroup}>
              <Text style={styles.filterGroupTitle}>Maslahat tili</Text>
              <View style={styles.pillRow}>
                {['Barchasi', ...LANGUAGES_LIST].map((lng) => (
                  <TouchableOpacity
                    key={lng}
                    style={[
                      styles.pill,
                      selectedLanguage === lng && styles.pillActive,
                    ]}
                    onPress={() => setSelectedLanguage(lng)}
                  >
                    <Text
                      style={[
                        styles.pillText,
                        selectedLanguage === lng && styles.pillTextActive,
                      ]}
                    >
                      {lng}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Toggle: Online consultation */}
            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>Faqat onlayn maslahat</Text>
              <Switch
                value={onlineOnly}
                onValueChange={setOnlineOnly}
                trackColor={{ false: COLORS.border, true: COLORS.gold }}
                thumbColor={COLORS.white}
              />
            </View>

            {/* Toggle: Verified only */}
            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>Faqat tasdiqlanganlar</Text>
              <Switch
                value={verifiedOnly}
                onValueChange={setVerifiedOnly}
                trackColor={{ false: COLORS.border, true: COLORS.gold }}
                thumbColor={COLORS.white}
              />
            </View>

            {/* Minimum Rating */}
            <View style={styles.filterGroup}>
              <Text style={styles.filterGroupTitle}>Minimal reyting</Text>
              <View style={styles.ratingRow}>
                {[0, 4.5, 4.8].map((r) => (
                  <TouchableOpacity
                    key={r}
                    style={[
                      styles.ratingBtn,
                      minRating === r && styles.ratingBtnActive,
                    ]}
                    onPress={() => setMinRating(r)}
                  >
                    <Star size={12} color={minRating === r ? COLORS.navy : COLORS.gold} fill={COLORS.gold} />
                    <Text
                      style={[
                        styles.ratingBtnText,
                        minRating === r && styles.ratingBtnTextActive,
                      ]}
                    >
                      {r === 0 ? 'Barchasi' : `${r}+`}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Results Grid */}
          <View style={styles.resultsArea}>
            <View style={styles.resultsCountBar}>
              <Text style={styles.resultsCountText}>
                Topilgan advokatlar: <Text style={{ fontWeight: '800', color: COLORS.navy }}>{filteredLawyers.length} nafar</Text>
              </Text>
              <TouchableOpacity
                style={styles.universalBookBtn}
                onPress={() => router.push('/appointments/book')}
              >
                <Calendar size={14} color={COLORS.navy} />
                <Text style={styles.universalBookBtnText}>Advokatni tezkor bron qilish</Text>
              </TouchableOpacity>
            </View>

            {filteredLawyers.length > 0 ? (
              <View style={styles.lawyersGrid}>
                {filteredLawyers.map((lawyer) => (
                  <LawyerCard key={lawyer.id} lawyer={lawyer} />
                ))}
              </View>
            ) : (
              <View style={styles.emptyFallbackBox}>
                <EmptyState
                  title="Tanlangan filtr bo‘yicha advokat topilmadi"
                  description="Filtrlarga qaramasdan, platformadagi barcha litsenziyalangan advokatlar orasidan o‘zingizga mos mutaxassisni darhol tanlab, maslahat vaqtini bron qilishingiz mumkin."
                  actionLabel="Filtrlarni tozalash"
                  onAction={resetFilters}
                />
                <TouchableOpacity
                  style={styles.directBookFallbackBtn}
                  onPress={() => router.push('/appointments/book')}
                >
                  <Calendar size={16} color={COLORS.navy} />
                  <Text style={styles.directBookFallbackBtnText}>
                    Filtrdan qat’i nazar advokatni bron qilish
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    </ResponsiveLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  topBanner: {
    backgroundColor: COLORS.navy,
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.md,
    alignItems: 'center',
  },
  bannerPreTitle: {
    color: COLORS.gold,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  bannerTitle: {
    color: COLORS.white,
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 6,
  },
  bannerSubtitle: {
    color: COLORS.textMuted,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    paddingHorizontal: 14,
    width: '100%',
    maxWidth: 620,
    height: 46,
    ...SHADOWS.md,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: COLORS.text,
    fontSize: 14,
  },
  clearSearchText: {
    color: COLORS.textMuted,
    fontSize: 12,
  },
  mainContentRow: {
    flexDirection: 'row',
    maxWidth: 1240,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xl,
    gap: 20,
    flexWrap: 'wrap',
  },
  filterSidebar: {
    width: 280,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignSelf: 'flex-start',
  },
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: 14,
  },
  filterHeaderTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  filterTitle: {
    color: COLORS.navy,
    fontSize: 15,
    fontWeight: '700',
  },
  resetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  resetBtnText: {
    color: COLORS.danger,
    fontSize: 11,
    fontWeight: '600',
  },
  filterGroup: {
    marginBottom: 16,
  },
  filterGroupTitle: {
    color: COLORS.navy,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
  },
  filterScroll: {
    maxHeight: 140,
  },
  filterRadioItem: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: RADIUS.sm,
    marginBottom: 2,
  },
  filterRadioItemActive: {
    backgroundColor: COLORS.cream,
  },
  filterRadioText: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  filterRadioTextActive: {
    color: COLORS.navy,
    fontWeight: '700',
  },
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.cream,
  },
  pillActive: {
    backgroundColor: COLORS.gold,
  },
  pillText: {
    color: COLORS.navy,
    fontSize: 11,
    fontWeight: '500',
  },
  pillTextActive: {
    fontWeight: '700',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  toggleLabel: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: '600',
  },
  ratingRow: {
    flexDirection: 'row',
    gap: 6,
  },
  ratingBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.cream,
    gap: 4,
  },
  ratingBtnActive: {
    backgroundColor: COLORS.gold,
  },
  ratingBtnText: {
    color: COLORS.navy,
    fontSize: 11,
    fontWeight: '600',
  },
  ratingBtnTextActive: {
    fontWeight: '800',
  },
  resultsArea: {
    flex: 1,
    minWidth: 320,
  },
  resultsCountBar: {
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
  },
  resultsCountText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  universalBookBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gold,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: RADIUS.md,
    gap: 6,
  },
  universalBookBtnText: {
    color: COLORS.navy,
    fontSize: 12,
    fontWeight: '800',
  },
  emptyFallbackBox: {
    alignItems: 'center',
  },
  directBookFallbackBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gold,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: RADIUS.md,
    gap: 8,
    marginTop: 16,
    ...SHADOWS.sm,
  },
  directBookFallbackBtnText: {
    color: COLORS.navy,
    fontSize: 14,
    fontWeight: '800',
  },
  lawyersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
});
