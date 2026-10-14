// Legal Services Catalog Page (26 Practice Areas)
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Search, Info, Scale } from 'lucide-react-native';
import ResponsiveLayout from '../components/ResponsiveLayout';
import ServiceCard from '../components/ServiceCard';
import EmptyState from '../components/EmptyState';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../styles/theme';
import { INITIAL_CATEGORIES } from '../lib/mockData';
import { useLanguage } from '../hooks/useLanguage';

export default function ServicesScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const [search, setSearch] = useState('');

  const filteredCategories = INITIAL_CATEGORIES.filter((cat) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      cat.title.toLowerCase().includes(q) ||
      cat.description.toLowerCase().includes(q)
    );
  });

  return (
    <ResponsiveLayout>
      {/* Page Header Banner */}
      <View style={styles.headerBanner}>
        <View style={styles.headerContent}>
          <View style={styles.badge}>
            <Scale size={14} color={COLORS.gold} />
            <Text style={styles.badgeText}>YURIDIK XIZMATLAR KATALOGI</Text>
          </View>
          <Text style={styles.pageTitle}>Huquqiy yo‘nalishlar va amaliy xizmatlar</Text>
          <Text style={styles.pageSubtitle}>
            O‘z muammongizga mos sohani tanlang va ushbu yo‘nalishda tajribali litsenziyalangan advokatlarni toping.
          </Text>

          {/* Search Input */}
          <View style={styles.searchBox}>
            <Search size={18} color={COLORS.gold} />
            <TextInput
              style={styles.searchInput}
              placeholder="Yo‘nalish yoki xizmat nomi bo‘yicha qidiring..."
              placeholderTextColor={COLORS.textMuted}
              value={search}
              onChangeText={setSearch}
            />
          </View>
        </View>
      </View>

      {/* Practical catalog disclaimer notice */}
      <View style={styles.contentContainer}>
        <View style={styles.disclaimerNotice}>
          <Info size={18} color={COLORS.goldDark} />
          <Text style={styles.disclaimerNoticeText}>
            Eslatma: Ushbu ro‘yxat platformada qulay qidiruv uchun amaliy katalog sifatida tuzilgan. Uni O‘zbekistondagi rasmiy advokatlik maqomi yoki ixtisosliklarining to‘liq rasmiy ro‘yxati deb talqin qilinmasligi lozim.
          </Text>
        </View>

        {/* Categories Grid */}
        {filteredCategories.length > 0 ? (
          <View style={styles.grid}>
            {filteredCategories.map((cat) => (
              <ServiceCard key={cat.id} category={cat} />
            ))}
          </View>
        ) : (
          <EmptyState
            title="Yo‘nalish topilmadi"
            description="Kiritilgan so‘rov bo‘yicha xizmat turi topilmadi. Qidiruvni tozalab ko‘ring."
            actionLabel="Qidiruvni tozalash"
            onAction={() => setSearch('')}
          />
        )}
      </View>
    </ResponsiveLayout>
  );
}

const styles = StyleSheet.create({
  headerBanner: {
    backgroundColor: COLORS.navy,
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.md,
  },
  headerContent: {
    maxWidth: 900,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.navyLight,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.goldDark,
    gap: 6,
    marginBottom: 12,
  },
  badgeText: {
    color: COLORS.gold,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  pageTitle: {
    color: COLORS.white,
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
  },
  pageSubtitle: {
    color: COLORS.textMuted,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 640,
    marginBottom: 20,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    paddingHorizontal: 14,
    width: '100%',
    maxWidth: 580,
    height: 46,
    ...SHADOWS.md,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: COLORS.text,
    fontSize: 14,
  },
  contentContainer: {
    maxWidth: 1240,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xl,
  },
  disclaimerNotice: {
    flexDirection: 'row',
    backgroundColor: COLORS.creamDark,
    padding: 12,
    borderRadius: RADIUS.md,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.gold,
    gap: 10,
    alignItems: 'center',
    marginBottom: 24,
  },
  disclaimerNoticeText: {
    color: COLORS.text,
    fontSize: 12,
    lineHeight: 18,
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'center',
  },
});
